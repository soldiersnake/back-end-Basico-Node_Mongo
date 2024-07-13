// 'use strict'
import mongoose from 'mongoose';
import app from './app.js';

const uriBD = 'mongodb+srv://marianomacias:mariano2311@coderhouse.ioorf9s.mongodb.net/?retryWrites=true&w=majority&appName=coderhouse';
const PORT = process.env.PORT || 3000;

async function connectBD(){
    try {
        //coneccion a base de datos
        await mongoose.connect(uriBD)
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

