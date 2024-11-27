import express from 'express';
import { getAllCitas, addCita } from '../controllers/citasController.js';

const router = express.Router();

router.get('/', getAllCitas);
router.post('/', addCita);

export default router;
