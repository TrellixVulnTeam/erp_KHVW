const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
router.use(cookieParser())

const storageRouter = require('./storageRouter')
const viewerRouter = require('./viewerRouter')

router.get("/", (req, res) => {
  res.render("../../views/main/index/index.ejs")
})

router.use('/storage', storageRouter)
router.use('/viewer', viewerRouter)

module.exports = router;