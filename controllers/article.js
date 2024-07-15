'use strict'

import validator from 'validator';
import Article from '../models/article.js';


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

    save: async (req, res) => {
        //recoger parametros por POST
        let params = req.body;

        //validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (error) {
            // console.log('Error', error);
            return res.status(200).send({
                status: 'Error',
                message: 'Faltan datos por enviar!!'
            })
        }

        if(validate_title && validate_content){
            //crear el objeto a guardar
            let article = new Article();
            
            //asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            try {
                //se guarda el articulo
                let articleStored = await article.save();
                //devolver respuesta
                return res.status(200).send({
                    status: 'Success',
                    article: articleStored
                })
            } catch (error) {
                return res.status(200).send({
                    status: 'Error ',
                    message: 'El articulo no se ha guardado'
                })
            }
            
        }else{
            return res.status(200).send({
                status:'Error',
                message:'Los datos no son validos!!'
            })
        }
    },

    // Traer articulos
    getArticles: async (req, res) => {
        try {
            //find
            //si al metodo .find el objeto enviamos vacio {} traemos toda la data
            //el metodo .sort es para darle un ordenamiento segun el campo y segun do signo el (-) invierte el orden
            let articles = await Article.find({}).sort('-_id').exec() 
            return res.status(200).send({
                status: 'Success',
                articles
            })
        } catch (error) {
            return res.status(500).send({
                status: 'Error',
                message: 'No se pudieron traer los articulos',
                error
            })
        }
    },

}; //end controller

export default controller;