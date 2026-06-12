const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', auth, enrollmentController.minhasInscricoes);
router.post('/:idCurso', auth, enrollmentController.inscrever);
router.delete('/:idCurso', auth, enrollmentController.cancelar);

module.exports = router;