'use strict'

import express from 'express';
import controller from '../controllers/article.js';
import multipart from 'connect-multiparty';

const router = express.Router();
const md_upload = multipart({uploadDir: './upload/articles'});

//rutas de pruebas
router.post('/datos-curso', controller.datosCurso);
router.get('/test-de-controller', controller.test);

//rutas utiles
router.post('/save', controller.save);
router.get('/articles/:last?', controller.getArticles);
router.get('/article/:id', controller.getArticle);
router.put('/article/:id', controller.update);
router.delete('/article/:id', controller.delete);
router.post('/upload-image/:id', md_upload, controller.upload);
router.get('/get-image/:image', controller.getImage);
router.get('/search/:search', controller.search);

export default router;