/**
 * Database Migration Script - Convert @lid to @s.whatsapp.net
 * Run this script to migrate existing database entries from @lid format to @s.whatsapp.net format
 */

import { migrateDbLidEntries } from './lib/jid-utils.js'
import fs from 'fs'

export async function migrateDatabaseScript() {
    try {
        console.log('[MIGRATION] Starting database migration for @lid entries...')
        
        // Load current database
        if (!global.db?.data) {
            console.log('[MIGRATION] Database not loaded, loading now...')
            await global.loadDatabase()
        }
        
        // Backup original database
        const backupPath = `./database.backup.${Date.now()}.json`
        fs.writeFileSync(backupPath, JSON.stringify(global.db.data, null, 2))
        console.log(`[MIGRATION] Database backed up to: ${backupPath}`)
        
        // Count original entries
        const originalUserCount = Object.keys(global.db.data.users || {}).length
        const originalChatCount = Object.keys(global.db.data.chats || {}).length
        const lidUserCount = Object.keys(global.db.data.users || {}).filter(id => id.includes('@lid')).length
        const lidChatCount = Object.keys(global.db.data.chats || {}).filter(id => id.includes('@lid')).length
        
        console.log(`[MIGRATION] Original stats:`)
        console.log(`  - Users: ${originalUserCount} (${lidUserCount} with @lid)`)
        console.log(`  - Chats: ${originalChatCount} (${lidChatCount} with @lid)`)
        
        // Perform migration
        global.db = migrateDbLidEntries(global.db)
        
        // Count migrated entries
        const newUserCount = Object.keys(global.db.data.users || {}).length
        const newChatCount = Object.keys(global.db.data.chats || {}).length
        const remainingLidUserCount = Object.keys(global.db.data.users || {}).filter(id => id.includes('@lid')).length
        const remainingLidChatCount = Object.keys(global.db.data.chats || {}).filter(id => id.includes('@lid')).length
        
        console.log(`[MIGRATION] Migration completed!`)
        console.log(`  - Users: ${newUserCount} (${remainingLidUserCount} still with @lid)`)
        console.log(`  - Chats: ${newChatCount} (${remainingLidChatCount} still with @lid)`)
        console.log(`  - Migrated users: ${lidUserCount - remainingLidUserCount}`)
        console.log(`  - Migrated chats: ${lidChatCount - remainingLidChatCount}`)
        
        // Save migrated database
        await global.db.write()
        console.log('[MIGRATION] Migration saved to database!')
        
        return {
            success: true,
            originalUserCount,
            originalChatCount,
            newUserCount,
            newChatCount,
            migratedUsers: lidUserCount - remainingLidUserCount,
            migratedChats: lidChatCount - remainingLidChatCount,
            backupPath
        }
        
    } catch (error) {
        console.error('[MIGRATION] Error during migration:', error)
        return {
            success: false,
            error: error.message
        }
    }
}

// Plugin untuk menjalankan migration secara manual
let handler = async function (m, { conn }) {
    if (!m.fromMe && !global.owner.map(([number]) => number + '@s.whatsapp.net').includes(m.sender)) {
        return m.reply('❌ Perintah ini hanya untuk owner bot!')
    }
    
    m.reply('🔄 Memulai migrasi database @lid...')
    
    const result = await migrateDatabaseScript()
    
    if (result.success) {
        const message = `✅ Migrasi database berhasil!

📊 **Statistik:**
👥 Users: ${result.originalUserCount} → ${result.newUserCount}
💬 Chats: ${result.originalChatCount} → ${result.newChatCount}

🔄 **Dipindahkan:**
👤 ${result.migratedUsers} users
💬 ${result.migratedChats} chats

💾 **Backup:** ${result.backupPath}

✨ Database telah diperbarui untuk mengatasi masalah @lid vs @s.whatsapp.net`
        
        m.reply(message)
    } else {
        m.reply(`❌ Migrasi gagal: ${result.error}`)
    }
}

handler.help = ['migrate-lid']
handler.tags = ['owner']
handler.command = /^(migrate-lid|migrate|fix-lid)$/i
handler.owner = true

export default handler
