'use strict'

const controller = {

    datosCurso: (req, res) => {
        let hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en framework',
            autor: 'Mariano Macias',
            url: 'marianomacias.com',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador'
        });
    },

}; //end controller

export default controller;