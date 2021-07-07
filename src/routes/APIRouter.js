const express = require('express');
const router = express.Router();
const API = require('../controllers/APIController');

router.get('/autocapture', API.autocapture);
router.get('/liveness', API.liveness);

router.post('/codereader', API.codeReader);
router.post('/faceanddoc', API.faceAndDocument);

module.exports = router