const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user')

router.post('/inscription', userCtrl.createUser)

router.get('/:id', userCtrl.getOneUser)

router.post('/objectif', userCtrl.updateUserObjectif)
 
router.put('/:id', userCtrl.modifyUser)

router.delete('/:id', userCtrl.deleteUser)

router.get('/', userCtrl.getAllUser)

router.get('/email/:email', userCtrl.getWithMail)

router.post('/email', userCtrl.getOneMail)

router.post('/username', userCtrl.getOneUsername)

router.post('/login', userCtrl.login)

router.post('/find', userCtrl.getUserCity)

router.put('/follow/:id', userCtrl.updateUserFollowers)

router.get('/follows', userCtrl.getManyUsers)
module.exports = router;

