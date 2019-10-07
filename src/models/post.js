const mongoose = require('../database');

//Schema dos posts
const PostSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    descricao: {
        type: String,
        required: true,
    },
    conteudo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
