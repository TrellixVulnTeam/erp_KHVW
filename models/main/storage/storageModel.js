const db = require('../../../config/db')

folderListLoad = (co_id, fol_id) => new Promise((resolve, reject) => {
    db.query(`SELECT  co_id, fol_id, fol_name, reg_date FROM folder WHERE del_state = 1 AND fol_parent_id = ? AND co_id = ?`, [fol_id, co_id],  (err, rows, fields) => {
        resolve(rows)
    })
})

fileListLoad = (co_id, fol_id) => new Promise((resolve, reject) => {
    db.query(`SELECT file_id, f.co_id, c.co_name, fol_id, file_path, file_name, file_extension, f.reg_date FROM files f LEFT JOIN company c ON c.co_id = f.co_id WHERE f.del_state = 1 AND fol_id = ? AND f.co_id = ?`, [fol_id, co_id], (err, rows, fields) => {
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
    }
}
