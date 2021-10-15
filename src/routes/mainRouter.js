const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get("/", mainController.home);
router.get('/selector-de-documento', mainController.selectorDeDocumento);
router.get('/captura-frente', mainController.capturaFrente);
router.get('/captura-dorso', mainController.capturaDorso);
router.get('/liveness', mainController.liveness);
router.get('/verificacion', mainController.verificacion);

module.exports = router