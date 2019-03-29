const router = require('express').Router(),
    questionController = require('../controller/questionContoller'),
    answerController = require('../controller/answerContoller')




router.post('/add', questionController.addData)
router.post('/add/answer', answerController.create)
router.post('/:id', questionController.one)
router.post('/upvote/:id', questionController.upvote)
router.post('/downvote/:id', questionController.downvote)



router.get('/all', questionController.all)
router.delete('/delete/:id', questionController.remove)
module.exports = router