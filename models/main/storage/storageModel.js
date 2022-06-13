const db = require('../../../config/db')

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

searchListLoad = (co_id, value) => new Promise((resolve, reject) => {
    const sql = `SELECT f.co_id, c.co_name ,f.file_id, file_path, file_name, file_extension, f.reg_date FROM files f
    INNER JOIN files_text ft ON f.file_id = ft.file_id
    INNER JOIN company c ON f.co_id = c.co_id
    WHERE f.co_id = ${co_id} AND (file_text LIKE '%${value}%' OR file_name LIKE '%${value}%') 
    LIMIT 0, 10`
    
    console.log(sql)

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

    search : async(co_id, value) => {
        searchObj = {
            searchList : await searchListLoad(co_id, value)
        }

        return new Promise((resolve, reject) => {
            resolve(searchObj)
        })  
    }
}
