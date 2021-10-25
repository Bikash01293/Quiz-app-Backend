var express = require('express')
var router = express.Router()
const teacherController  = require('../controller/teacherController')
const verifierTokenMiddleware  = require('../middleware/verifierTokenMiddleware')



router.post('/createquiz', verifierTokenMiddleware.verifyToken,teacherController.createQuiz)
router.get('/getuploadquiz', verifierTokenMiddleware.verifyToken,teacherController.getUploadquiz)
router.get('/gethomequiz', verifierTokenMiddleware.verifyToken,teacherController.getHomequiz)
router.get('/seestudents', verifierTokenMiddleware.verifyToken,teacherController.seeStudent)
router.delete('/blockuser/:id', verifierTokenMiddleware.verifyToken,teacherController.blockStudent)
router.delete('/unblockuser/:id', verifierTokenMiddleware.verifyToken,teacherController.unblockStudent)
router.delete('/deletequiz/:id', verifierTokenMiddleware.verifyToken,teacherController.deleteQuiz)
router.post('/uploadquiz', verifierTokenMiddleware.verifyToken,teacherController.uploadQuiz)
router.post('/addquestion', verifierTokenMiddleware.verifyToken,teacherController.addQuestion)
router.get('/getallquestion/:id', verifierTokenMiddleware.verifyToken,teacherController.getAllQuestion)
router.delete('/deletequestion/:id', verifierTokenMiddleware.verifyToken,teacherController.deleteQuestion)

module.exports = router
