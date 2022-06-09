const db = require('../../../config/db')

folderListLoad = (fol_id) => new Promise((resolve, reject) => {
    db.query(`SELECT fol_id, fol_name, reg_date FROM folder WHERE del_state = 1 AND fol_parent_id = ?`, [fol_id],  (err, rows, fields) => {
        resolve(rows)
    })
})

fileListLoad = (fol_id) => new Promise((resolve, reject) => {
    db.query(`SELECT file_id, f.co_id, c.co_name, fol_id, file_path, file_name, file_extension, f.reg_date FROM files f LEFT JOIN company c ON c.co_id = f.co_id WHERE f.del_state = 1 AND fol_id = ?`, [fol_id], (err, rows, fields) => {
        resolve(rows)
    })
})

module.exports = {
    entry : async(fol_id) => {
        entryObj = {
          folderList : await folderListLoad(fol_id), 
          fileList : await fileListLoad(fol_id)
        }

        return new Promise((resolve, reject) => {
          resolve(entryObj)
        }) 
    }
}
