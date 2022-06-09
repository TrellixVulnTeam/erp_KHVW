const express = require('express')
const db = require('../../config/db')
const router = express.Router()
const Entry = require('../../models/main/storage/storageModel')



// "../../views/storage/쎄넘/회사 관련 서류/영문주소.hwp"

router.get("/", (req, res) => {
  Entry.entry(0).then(entryObj => {
    res.render("../../views/main/storage/index.ejs", {
      entryObj,
    })
  })
})

router.get("/:fol_id", (req, res) => {
  fol_id = req.params.fol_id
  
  Entry.entry(fol_id).then(entryObj => {
    res.render("../../views/main/storage/index.ejs", {
      entryObj
    })
  })
})

router.post("/:fol_id/ajax", (req, res) => {
  const {value} = req.body
  const {fol_id} = req.params

  const sql = `SELECT c.co_name ,f.file_id, file_path, file_name, file_extension, file_text, f.reg_date FROM files f
  LEFT JOIN files_text ft ON f.file_id = ft.file_id
  LEFT JOIN company c ON f.co_id = c.co_id
  WHERE file_text LIKE '%${value}%' OR file_name LIKE '%${value}%'`

  const searchResult = () => new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {  
      resolve(rows)
    })
  })

  if(value == "") { 
    
    Entry.entry(fol_id).then(entryObj => {
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