var express = require('express')
const { verify } = require('jsonwebtoken')
var router = express.Router()
const adminController  = require('../controller/adminController')
const verifierTokenMiddleware = require('../middleware/verifierTokenMiddleware')


router.get('/seestudents', verifierTokenMiddleware.verifyToken,adminController.seeStudent)
router.get('/seeteachers', verifierTokenMiddleware.verifyToken,adminController.seeTeacher)
router.delete('/blockuser/:id', verifierTokenMiddleware.verifyToken,adminController.block)
router.delete('/unblockuser/:id', verifierTokenMiddleware.verifyToken,adminController.unblock)

module.exports = router
