/**
 * JID Utilities for handling @lid and @s.whatsapp.net conversion
 * Solves the issue where group participants use @lid format instead of @s.whatsapp.net
 */

/**
 * Convert @lid to @s.whatsapp.net format
 * @param {string} jid - JID that might be in @lid format
 * @returns {string} - Standardized JID in @s.whatsapp.net format
 */
export function standardizeJid(jid) {
    if (!jid) return jid
    
    // If already in correct format, return as is
    if (jid.includes('@s.whatsapp.net') || jid.includes('@g.us') || jid.includes('@broadcast')) {
        return jid
    }
    
    // Convert @lid to @s.whatsapp.net
    if (jid.includes('@lid')) {
        const number = jid.split('@')[0]
        if (number && /^\d+$/.test(number)) {
            return number + '@s.whatsapp.net'
        }
    }
    
    return jid
}

/**
 * Get consistent user ID for database operations
 * Ensures all user data is stored with @s.whatsapp.net format
 * @param {Object} m - Message object
 * @returns {string} - Standardized user ID
 */
export function getConsistentUserId(m) {
    if (!m) return ''
    
    let userId = m.sender
    
    // If sender contains @lid, try to get the real WhatsApp number
    if (userId && userId.includes('@lid')) {
        // Try to get from key.participantPn (newer Baileys versions)
        if (m.key?.participantPn) {
            userId = m.key.participantPn
        } else {
            // Fallback: convert @lid to @s.whatsapp.net
            userId = standardizeJid(userId)
        }
    }
    
    return userId || ''
}

/**
 * Migrate existing @lid entries in database to @s.whatsapp.net format
 * @param {Object} db - Database object
 * @returns {Object} - Updated database with migrated entries
 */
export function migrateDbLidEntries(db) {
    if (!db || !db.data) return db
    
    const { users, chats } = db.data
    const migratedUsers = {}
    const migratedChats = {}
    
    // Migrate users
    if (users) {
        for (const [userId, userData] of Object.entries(users)) {
            const standardizedId = standardizeJid(userId)
            
            // If ID was changed (was @lid), merge with existing data or create new entry
            if (standardizedId !== userId) {
                if (migratedUsers[standardizedId]) {
                    // Merge data, prioritizing existing data
                    migratedUsers[standardizedId] = {
                        ...userData,
                        ...migratedUsers[standardizedId],
                        // Keep registration status from newer entry
                        registered: migratedUsers[standardizedId].registered || userData.registered,
                        // Keep higher exp
                        exp: Math.max(migratedUsers[standardizedId].exp || 0, userData.exp || 0),
                        // Keep higher limit
                        limit: Math.max(migratedUsers[standardizedId].limit || 0, userData.limit || 0)
                    }
                } else {
                    migratedUsers[standardizedId] = userData
                }
                console.log(`[JID-UTILS] Migrated user ${userId} -> ${standardizedId}`)
            } else {
                migratedUsers[standardizedId] = userData
            }
        }
    }
    
    // Migrate chats (for private chats that might use @lid)
    if (chats) {
        for (const [chatId, chatData] of Object.entries(chats)) {
            const standardizedId = standardizeJid(chatId)
            
            if (standardizedId !== chatId) {
                if (migratedChats[standardizedId]) {
                    // Merge chat data
                    migratedChats[standardizedId] = {
                        ...chatData,
                        ...migratedChats[standardizedId]
                    }
                } else {
                    migratedChats[standardizedId] = chatData
                }
                console.log(`[JID-UTILS] Migrated chat ${chatId} -> ${standardizedId}`)
            } else {
                migratedChats[standardizedId] = chatData
            }
        }
    }
    
    // Update database
    db.data.users = migratedUsers
    db.data.chats = migratedChats
    
    return db
}

/**
 * Get group participant mapping for @lid to @s.whatsapp.net conversion
 * @param {Object} conn - WhatsApp connection
 * @param {string} groupJid - Group JID
 * @returns {Promise<Map>} - Map of @lid to @s.whatsapp.net
 */
export async function getGroupParticipantMapping(conn, groupJid) {
    try {
        if (!groupJid.endsWith('@g.us')) return new Map()
        
        const groupMetadata = await conn.groupMetadata(groupJid).catch(() => null)
        if (!groupMetadata?.participants) return new Map()
        
        const mapping = new Map()
        groupMetadata.participants.forEach(participant => {
            if (participant.lid && participant.jid) {
                mapping.set(participant.lid, participant.jid)
            }
            if (participant.id && participant.jid && participant.id !== participant.jid) {
                mapping.set(participant.id, participant.jid)
            }
        })
        
        return mapping
    } catch (error) {
        console.error('[JID-UTILS] Error getting group participant mapping:', error)
        return new Map()
    }
}
