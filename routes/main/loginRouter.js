const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.render("../../views/main/login/index.ejs")
})

router.post('/process', (req, res) => {
   const {id, pw} = req.body
   if(id == "admin" && pw == "admin") {
    req.session.user = {
        id : "admin"
    }
    res.redirect("/")
   }
})

module.exports = router;