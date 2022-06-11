const express = require('express')
const db = require('../../config/db')
const router = express.Router()
const Entry = require('../../models/main/storage/storageModel')

router.get("/:co_id/:fol_id", (req, res) => {
  const {co_id, fol_id} = req.params
  
  Entry.entry(co_id, fol_id).then(entryObj => {
    res.render("../../views/main/storage/index.ejs", {
      entryObj
    })
  })
})

router.post("/:co_id/:fol_id/ajax", (req, res) => {
  const {value} = req.body
  const {co_id, fol_id} = req.params


  const sql = `SELECT f.co_id, c.co_name ,f.file_id, file_path, file_name, file_extension, file_text, f.reg_date FROM files f
  LEFT JOIN files_text ft ON f.file_id = ft.file_id
  LEFT JOIN company c ON f.co_id = c.co_id
  WHERE file_text LIKE '%${value}%' OR file_name LIKE '%${value}%' AND f.co_id = ${co_id}
  LIMIT 0, 10`

  const searchResult = () => new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {  
      resolve(rows)
    })
  })

  if(value == "") { 
    
    Entry.entry(co_id, fol_id).then(entryObj => {
      entryObj.type = "reset"
      res.json(entryObj)
    })
  
  } else {

    searchResult().then(fileObj => {
      entryObj = {fileList : fileObj} 
      entryObj.type = "search"
      res.json(entryObj) 
    })
  }
    
})

module.exports = router;