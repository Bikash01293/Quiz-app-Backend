var express = require('express')
const { verify } = require('jsonwebtoken')
var router = express.Router()
const adminController  = require('../controller/adminController')
const verifierTokenMiddleware = require('../middleware/verifierTokenMiddleware')


router.get('/seestudents', verifierTokenMiddleware.verifyToken,adminController.seeStudent)
router.get('/seeteachers', verifierTokenMiddleware.verifyToken,adminController.seeTeacher)
router.delete('/blockuser/:id', verifierTokenMiddleware.verifyToken,adminController.block)
router.delete('/unblockuser/:id', verifierTokenMiddleware.verifyToken,adminController.unblock)
router.get('/getallquiz', verifierTokenMiddleware.verifyToken,adminController.getallquiz)
router.get('/getallquestion/:id', verifierTokenMiddleware.verifyToken,adminController.getAllQuestion)
router.delete('/deletequestion/:id', verifierTokenMiddleware.verifyToken,adminController.deleteQuestion)
router.delete('/deletequiz/:id', verifierTokenMiddleware.verifyToken,adminController.deleteQuiz)
// router.post('/registerstudnet',apiController.registerStudent)
module.exports = router
