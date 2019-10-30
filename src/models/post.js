const mongoose = require('../database');

//Schema dos posts
const PostSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    conteudoPost: {
        type: String,
    },

    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    categoria: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
