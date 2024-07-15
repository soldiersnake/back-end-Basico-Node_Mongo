// 'use strict'
import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno desde .env
dotenv.config();

const uriBD = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

async function connectBD(){
    try {
        //coneccion a base de datos
        await mongoose.connect(uriBD, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            dbName: 'test'  // Aquí especificamos el nombre de la base de datos
            // dbName: 'coder_app'  // Especificar la base de datos
        })
          console.log('Conexión a MongoDB exitosa');
          // Iniciar el servidor
        app.listen(PORT, () => {
        console.log(`Servidor está corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.log('Error :', error);
    }
};

connectBD();

