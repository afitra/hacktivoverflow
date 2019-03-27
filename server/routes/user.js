const router = require('express').Router(),
    userController = require('../controller/userController')



router.post('/register', userController.register)
router.post('/login', userController.login)




router.get('/all', userController.all)
router.delete('/delete/:id', userController.remove)

module.exports = router