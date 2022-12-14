const express = require("express");
const router = express.Router();

const sessionCtrl = require('../controllers/session');



router.delete('/:id', sessionCtrl.deleteSession)

router.get('/:id', sessionCtrl.getOneSession)


module.exports = router;





