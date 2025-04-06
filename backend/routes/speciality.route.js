import express from 'express';
import { createSpeciality, getSpecialities } from '../controllers/speciality.controller.js';

const router = express.Router();

router.post('/specialities', createSpeciality);

router.get('/specialities', getSpecialities);

export default router;