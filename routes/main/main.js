const express = require('express')
const router = express.Router()
const db = require('../../config/db')

const cookieParser = require('cookie-parser');
router.use(cookieParser())

const storageRouter = require('./storageRouter')
const viewerRouter = require('./viewerRouter')
const loginRouter = require('./loginRouter')



router.get("/", (req, res) => {
  db.query(`SELECT co_id, co_name FROM company`, (err, rows) => {
    res.render("../../views/main/index/index.ejs", {
      companyObj : rows
    })
  })
})

router.use('/storage', storageRouter)
router.use('/viewer', viewerRouter)
router.use('/login', loginRouter)

module.exports = router;