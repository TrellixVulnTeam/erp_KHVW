const express = require('express')
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

router.post("/:co_id/:fol_id/:page/ajax", (req, res) => {  
  const {value} = req.body
  const {co_id, fol_id, page} = req.params

  if(value == "") { 
    
    Entry.entry(co_id, fol_id).then(entryObj => {
      entryObj.type = "reset"
      res.json(entryObj)
    })
  
  } else {

    Entry.search(co_id, value, page).then(searchObj => {
      searchObj.type = "search"
      res.json(searchObj)
    })
  }
})

module.exports = router;