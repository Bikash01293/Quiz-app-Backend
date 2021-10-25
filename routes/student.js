var express = require('express')
var router = express.Router()
const studentController  = require('../controller/studentController')
const verifierTokenMiddleware  = require('../middleware/verifierTokenMiddleware')



router.get('/getallquiz', verifierTokenMiddleware.verifyToken,studentController.getallquiz)
router.get('/getallquestion/:id', verifierTokenMiddleware.verifyToken,studentController.getAllQuestion)
router.put('/blockme', verifierTokenMiddleware.verifyToken,studentController.blockMe)
module.exports = router
