'use strict';

import mongoose from "mongoose";

const { Schema } = mongoose;
const ArticleSchema = Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    image: String,
});

// Exportar el modelo basado en el esquema
const Article = mongoose.model('Article', ArticleSchema);
// const Article = mongoose.model('Product', ArticleSchema, 'products'); //probando otra coleccion en otra BD, hay q especificar en el archivo de configuracion a que base ira con el  dbName: 'test'
export default Article;