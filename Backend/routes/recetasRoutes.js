import express from 'express';
import { getRecetasByPaciente } from '../controllers/recetasController.js';

const router = express.Router();

router.get('/:id', getRecetasByPaciente);

export default router;
