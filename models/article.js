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
export default Article;