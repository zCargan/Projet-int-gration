const express = require("express");
const router = express.Router();

const donneesCtrl = require('../controllers/donnees');



router.post('/', donneesCtrl.createDonnees)

router.get('/', donneesCtrl.getDonnees)

router.get('/all', donneesCtrl.getAllDonnees)

module.exports = router;