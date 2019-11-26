const mongoose = require('../database');

const DenunciaSchema = new mongoose.Schema({
    spam: {
        type: Boolean
    },
    violencia: {
        type: Boolean
    },
    assedio: {
        type: Boolean
    },
    falsosa: {
        type: Boolean
    },
    discurso: {
        type: Boolean
    },
    outro: {
        type: Boolean
    },
    outroTxt: {
        type: String
    },
    idDenuncia: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    idPost: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    },
    tipo: {
        type: String
    }
});

const Denuncia = mongoose.model('Denuncia', DenunciaSchema);

module.exports = Denuncia;
