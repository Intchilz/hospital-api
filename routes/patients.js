const express = require('express');
const router = express.Router();

const usersController = require('../controllers/patients');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', usersController.createPatient);
router.put('/:id', usersController.updatePatient);
router.delete('/:id', usersController.deletePatient);

module.exports = router;