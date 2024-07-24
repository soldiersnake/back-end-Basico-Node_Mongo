"use strict";

import validator from "validator";
import Article from "../models/article.js";
import fs from "fs";
import path from "path";

const controller = {
  datosCurso: (req, res) => {
    let hola = req.body.hola;

    return res.status(200).send({
      curso: "Master en framework",
      autor: "Mariano Macias",
      url: "marianomacias.com",
      hola,
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la accion test de mi controlador",
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
        status: "Error",
        message: "Faltan datos por enviar!!",
      });
    }

    if (validate_title && validate_content) {
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
          status: "Success",
          article: articleStored,
        });
      } catch (error) {
        return res.status(200).send({
          status: "Error ",
          message: "El articulo no se ha guardado",
        });
      }
    } else {
      return res.status(200).send({
        status: "Error",
        message: "Los datos no son validos!!",
      });
    }
  },

  // Traer articulos
  getArticles: async (req, res) => {
    //guardamos la query en una funcion
    const query = Article.find({});
    const last = req.params.last;

    //modificamos la query si existe limite en la ruta que llama al controlador
    if (last || last != undefined) {
      query.limit(last);
    }
    try {
      //find
      //si al metodo .find el objeto enviamos vacio {} traemos toda la data
      //el metodo .sort es para darle un ordenamiento segun el campo y segun do signo el (-) invierte el orden
      let articles = await query.sort("-_id").exec();
      return res.status(200).send({
        status: "Success",
        articles,
      });
    } catch (error) {
      return res.status(500).send({
        status: "Error",
        message: "No se pudieron traer los articulos",
        error,
      });
    }
  },

  getArticle: async (req, res) => {
    //recoger el id de la url
    let articleId = req.params.id;
    //comprobar que exista
    if (!articleId || articleId == null || articleId == undefined) {
      return res.status(404).send({
        status: "Error",
        message: "No existe el articulo",
      });
    }

    //buscar el articulo
    try {
      let articuloEncontrado = await Article.findById(articleId);
      //verifico que no sea null ni undefined
      if (!articuloEncontrado) {
        return res.status(404).send({
          status: "Error",
          message: "Artículo no encontrado",
        });
      }
      //devolver el json
      return res.status(200).send({
        status: "Success",
        message: "Articulo encontrado",
        articuloEncontrado,
      });
    } catch (error) {
      return res.status(500).send({
        status: "Error",
        message: "Articulo no encontrado",
        error: error.message,
      });
    }
  },

  update: async (req, res) => {
    //tomar el ID de url
    let articleId = req.params.id;
    //recoger datos que llegan por PUT
    let params = req.body;
    //validar datos
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(404).send({
        status: "Error",
        message: "Faltan o son incorrectos...",
      });
    }

    if (validate_title && validate_content) {
      try {
        //find and update
        let articuloActualizado = await Article.findOneAndUpdate(
          { _id: articleId },
          params,
          { new: true }
        ); //busco el articulo por _id y lo actualizo
        return res.status(200).send({
          status: "Success",
          articuloActualizado,
        });
      } catch (error) {
        return res.status(500).send({
          status: "Error",
          message: error,
        });
      }
    } else {
      //devolver respuesta de error
      return res.status(500).send({
        status: "Error",
        message: "No fue posible la actualizacion...",
      });
    }
  },

  delete: async (req, res) => {
    //tomar el id de la URL
    let articleId = req.params.id;
    //find and Delete
    try {
      let articleDelete = await Article.findOneAndDelete({ _id: articleId });
      //verifico que no sea null o undefined
      if (!articleDelete) {
        return res.status(404).send({
          status: "Error",
          message: "Artículo no encontrado",
        });
      }

      return res.status(200).send({
        status: "Success",
        message: "Artículo eliminado correctamente",
        article: articleDelete,
      });
    } catch (error) {
      //mensaje de error
      return res.status(500).send({
        status: "Error",
        message: "Error al eliminar el artículo",
        error: error.message,
      });
    }
  },

  upload: async (req, res) => {
    //configurar el modulo connect multiparty router/article.js (se hace en el router agregando el middleware)

    //recojer el fichero de la peticion
    let file_name = "Imagen no subida....";

    if (!req.files) {
      return res.status(404).send({
        status: "Error",
        message: file_name,
      });
    }

    //conseguir el nombre de la extencion del archivo
    let file_path = req.files.imagen.path; // Cambiado a `imagen`
    let file_split = file_path.split("\\");
    //ADVERTENCIA EN LINUX O MAC
    // var file_split = file_path.split('/');

    //nombre del archivo
    file_name = file_split[2];
    //extencion del archivo
    let extencion_split = file_name.split(".");
    let file_ext = extencion_split[1];

    //comprobar la extencion, solo imagenes, sino borrar el fichero
    if (
      file_ext != "png" &&
      file_ext != "jpg" &&
      file_ext != "jpgeg" &&
      file_ext != "gif"
    ) {
      //borrar el archivo subido
      fs.unlink(file_path, (err) => {
        return res.status(404).send({
          status: "Error",
          message: "La extension de la imagen no es valida...",
        });
      });

      //buscar el articulo, asignarle un nombre de la imagen y actualizarlo
    } else {
      //si todo es valido es buscar el articulo, asignar nombre de imagen y actualizar
      let articleId = req.params.id;
      let params = req.body;
      try {
        let articuloActualizado = await Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}) //busco el elemento a actualizaer y le agrego unicamente la foto
        return res.status(200).send({
            status: 'Success',
            articuloActualizado
        })
      } catch (error) {
        return res.status(404).send({
            status: 'Error',
            message: 'No fue posible cargar la imagen.'
        })
      }
      return res.status(200).send({
        fichero: req.files,
        split: file_split,
        file_ext,
      });
    }
  }, //end upload file

}; //end controller

export default controller;
