import express from 'express';
import { getAllDoctores, addDoctor } from '../controllers/doctoresController.js';

const router = express.Router();

router.get('/', getAllDoctores);
router.post('/', addDoctor);

export default router;
