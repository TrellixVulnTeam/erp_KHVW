const db = require('../../config/db')

fileInfoLoad = (file_id) => new Promise((resolve,reject) => {
    db.query(`SELECT co_name, fol_id, file_name FROM files f 
                INNER JOIN company c ON f.co_id = c.co_id
                WHERE f.file_id = ?`, [file_id], (err, rows, fields) => {
        resolve(rows)
    })
})

folderInfoLoad = (fol_id) => new Promise((resolve, reject) => {
    db.query(`SELECT fol_id, fol_parent_id, fol_name FROM folder WHERE fol_id = ?`, [fol_id], (err, rows, fields) => {
        resolve(rows)
    })
})

module.exports = {
    pathMaker : async(file_id) => {
        let fileInfo = await fileInfoLoad(file_id)
        let folderInfo = await folderInfoLoad(fileInfo[0].fol_id)
        
        let folderPath = []
        folderParentId = folderInfo[0].fol_parent_id

        while (true) {
            folderPath.push(folderInfo[0].fol_name)
            
            if(folderParentId == 0) {
                break
            } else {
                folderInfo = await folderInfoLoad(folderInfo[0].fol_parent_id)
                folderParentId = folderInfo[0].fol_parent_id
            }
        }
            
        path = ''

        for(let i=folderPath.length-1; i>=0; --i)
        {
            path += `/${folderPath[i]}`
        }

        path += `/${fileInfo[0].file_name}`

        return new Promise((resolve, reject) => {
            resolve(path)
        })
    }
}