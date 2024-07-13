'use strict'

import express from 'express';
import controller from '../controllers/article.js';

const router = express.Router();

router.post('/datos-curso', controller.datosCurso);
router.get('/test-de-controller', controller.test);

export default router;