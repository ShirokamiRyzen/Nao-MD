/*import axios from "axios"
let handler = async (m, {command, conn}) => {
if (command == 'akira') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/akira.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'akiyama') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/akiyama.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'anna') {
let haha = await conn.getFile(`https://api.sekha.tech/api/wallpaper/ana?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
// ana baru
if (command == 'ana') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/ana.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'asuna') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/asuna.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'ayuzawa') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/ayuzawa.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'boruto') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/boruto.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'chiho') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/chiho.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}     
if (command == 'chitoge') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/chitoge.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'deidara') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/deidara.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'erza') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/erza.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'elaina') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/elaina.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'eba') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/eba.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'emilia') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/emilia.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'hestia') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/hestia.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'hinata') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/hinata.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
//baru
if (command == 'hentai') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/hentai.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'hekel') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/hekel.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
// done baru
if (command == 'inori') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/inori.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'isuzu') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/isuzu.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}     
if (command == 'itachi') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/itachi.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'itori') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/itori.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'kaga') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/kaga.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'kagura') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/kagura.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'kaori') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/kaori.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'keneki') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/keneki.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)} 
if (command == 'kotori') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/kotori.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'kurumi') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/kurumi.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'madara') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/madara.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'mikasa') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/mikasa.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'miku') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/miku.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'minato') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/minato.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)} 
if (command == 'naruto') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/naruto.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'nezuko') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/nezuko.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'sagiri') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/sagiri.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'sasuke') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/sasuke.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)} 
if (command == 'sakura') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/sakura.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'cosplay') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/WH-MODS-BOT/scrape/main/cosplay.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}     
}
handler.command = handler.help = ['akira', 'akiyama', 'anna', 'ana', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'hinata', 'hekel', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay']
handler.tags = ['anime']
export default handler */

import axios from "axios"
let handler = async (m, {command, conn}) => {
if (command == 'akira') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/akira?apikey=APIKEY`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'akiyama') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/akiyama?apikey=APIKEY`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'anna') {
let haha = await conn.getFile(`https://api.sekha.tech/api/wallpaper/ana?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'asuna') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/asuna?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'ayuzawa') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/ayuzawa?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'boruto') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/boruto?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'chiho') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/chiho?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}     
if (command == 'chitoge') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/chitoge?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'deidara') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/deidara?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'erza') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/erza?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'elaina') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/elaina?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'eba') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/eba?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'emilia') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/emilia?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'hestia') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/hestia?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'hinata') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/hinata?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'inori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/inori?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'isuzu') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/isuzu?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}     
if (command == 'itachi') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/itachi?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'itori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/itori?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'kaga') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kaga?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}
if (command == 'kagura') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kagura?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'kaori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kaori?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'keneki') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/keneki?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)} 
if (command == 'kotori') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kotori?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'kurumi') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/kurumi?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'madara') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/madara?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'mikasa') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/mikasa?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'miku') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/miku?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'minato') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/minato?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)} 
if (command == 'naruto') {
let haha = await conn.getFile(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/naruto.json`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'nezuko') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/nezuko?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'sagiri') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sagiri?apikey=APIKEY`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}    
if (command == 'sasuke') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sasuke?apikey=APIKEY`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)} 
if (command == 'sakura') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/wallpaper/sakura?apikey=APIKEY`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}  
if (command == 'cosplay') {
let haha = await conn.getFile(`https://api-reysekha.herokuapp.com/api/random/cosplay?apikey=apirey`)
conn.sendButton(m.chat, `_${command}_`.trim(), author, haha.data, [['🔄 NEXT 🔄', `/${command}`]], m)}     
}
handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay']
handler.tags = ['anime']
export default handler



