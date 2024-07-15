'use strict'

import express from 'express';
import controller from '../controllers/article.js';

const router = express.Router();

//rutas de pruebas
router.post('/datos-curso', controller.datosCurso);
router.get('/test-de-controller', controller.test);

//rutas utiles
router.post('/save', controller.save);
router.get('/articles', controller.getArticles);

export default router;