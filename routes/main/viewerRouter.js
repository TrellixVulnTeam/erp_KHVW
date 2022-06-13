const express = require('express')
const router = express.Router()
const db = require('../../config/db')

const PathMaker = require('../../models/common/pathMakerModel')

router.get("/:file_extension/:file_id", (req, res) => {
    const {file_extension, file_id} = req.params
    
    PathMaker.pathMaker(file_id).then(path => {
        res.render("../../views/main/viewer/index.ejs", {
            path: path,
            file_extension: file_extension
        })
    })
})

module.exports = router;