'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/articles.js';

//ejecuta express
// Crear una instancia de la aplicación Express
const app = express();

//cargar fichero rutas

//middleware
// Usar body-parser para manejar las solicitudes de cuerpo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

// CORS


export default app;