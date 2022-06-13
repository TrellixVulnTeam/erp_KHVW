const db = require('../../../config/db')
const PathMaker = require('../../common/pathMakerModel')


folderListLoad = (co_id, fol_id) => new Promise((resolve, reject) => {
    db.query(`SELECT  co_id, fol_id, fol_name, reg_date FROM folder WHERE co_id = ? AND fol_parent_id = ? AND del_state = 1`, [co_id, fol_id],  (err, rows, fields) => {
        resolve(rows)
    })
})

fileListLoad = (co_id, fol_id) => new Promise((resolve, reject) => {
    db.query(`SELECT file_id, f.co_id, c.co_name, fol_id, file_path, file_name, file_extension, f.reg_date FROM files f INNER JOIN company c ON c.co_id = f.co_id WHERE f.co_id = ? AND fol_id = ? AND f.del_state = 1`, [co_id, fol_id], (err, rows, fields) => {
        resolve(rows)
    })
})

searchListLoad = (co_id, value, page) => new Promise((resolve, reject) => {
    
    page = page * 20
    
    sql = `SELECT f.co_id, c.co_name, f.file_id, file_name, file_extension, f.reg_date FROM files f
    INNER JOIN files_text ft ON f.file_id = ft.file_id
    INNER JOIN company c ON f.co_id = c.co_id
    WHERE f.co_id = ${co_id} AND (file_text LIKE '%${value}%' OR file_name LIKE '%${value}%') 
    LIMIT ${page}, 20`
    
    db.query(sql, (err, rows) => {  
        resolve(rows)
    })
})

module.exports = {
    entry : async(co_id, fol_id) => {
        entryObj = {
          folderList : await folderListLoad(co_id, fol_id), 
          fileList : await fileListLoad(co_id, fol_id)
        }

        return new Promise((resolve, reject) => {
          resolve(entryObj)
        }) 
    },

    search : async(co_id, value, page) => {
        searchObj = {
            searchList : await searchListLoad(co_id, value, page)
        }

        pathList = []
        
        for(let i=0; i<searchObj.searchList.length; ++i ) {
            pathList[i] = await PathMaker.pathMaker(searchObj.searchList[i].file_id) 
        }

        searchObj.file_path = pathList 

        return new Promise((resolve, reject) => {
            resolve(searchObj)
        })  
    }
}
