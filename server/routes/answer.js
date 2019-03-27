const router = require('express').Router(),
    answerController = require('../controller/answerContoller')


router.get('/all', answerController.all)





module.exports = router