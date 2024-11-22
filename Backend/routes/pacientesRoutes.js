import express from 'express';
import { getAllPacientes, addPaciente, getPacienteById } from '../controllers/pacientesController.js';

const router = express.Router();

router.get('/', getAllPacientes);
router.post('/', addPaciente);
router.get('/:id', getPacienteById);

export default router;
