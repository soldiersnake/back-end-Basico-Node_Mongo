'use strict'

import express from 'express';
import controller from '../controllers/article.js';

const router = express.Router();

//rutas de pruebas
router.post('/datos-curso', controller.datosCurso);
router.get('/test-de-controller', controller.test);

//rutas utiles
router.post('/save', controller.save);
router.get('/articles/:last?', controller.getArticles);
router.get('/article/:id', controller.getArticle);

export default router;