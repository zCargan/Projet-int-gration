const express = require("express");
const router = express.Router();

const donneesCtrl = require('../controllers/donnees');



router.post('/', donneesCtrl.createDonnees)

router.get('/', donneesCtrl.getDonnees)

module.exports = router;






module.exports = router;