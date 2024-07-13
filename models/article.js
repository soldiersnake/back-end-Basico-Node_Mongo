'use strict';

import mongoose, { Schema } from "mongoose";

const Schema = mongoose.Schema;
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
export default Article;