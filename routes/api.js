var express = require('express')
var router = express.Router()
const apiController = require('../controller/apiController')
const verifierTokenMiddleware = require('../middleware/verifierTokenMiddleware')

// require('dotenv').config()

router.post('/registeradmin', apiController.registerAdmin)
router.post('/registerstudent', apiController.registerStudent)
router.post('/registerteacher', apiController.registerTeacher)
router.post('/login', apiController.logIn)
router.post('/reset', apiController.Reset)
router.post('/reset-password-done', apiController.resestPasswordDone)


router.get('/check', verifierTokenMiddleware.verifyToken, apiController.getCheck)


// router.post('/testdone', apiController.testDone)


// router.get('/abc', (req, res) => {
//     console.log(process.env.ABC)
//     console.log(process.env.PQR)
//     res.send("hello get abc");
// })

module.exports = router
