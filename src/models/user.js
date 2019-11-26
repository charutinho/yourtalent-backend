const mongoose = require('../database');
const bcrypt = require('bcryptjs');

//Schema do mongodb, como se fosse uma tabela MySQL
//Schema do Usuário
const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    nasc: {
        type: String,
        require: true,
    },
    sexo: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },

    desc: {
        type: String,
    },

    //Localização
    cep: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },

    //Foto
    fotoPerfil: {
        type: String,
    },
    fotoCapa: {
        type: String,
    },

    //Esporte
    esporte: {
        type: String,
    },
    esporteFeed: {
        type: String
    },
    esportePosicao: {
        type: String
    },

    nivel: {
        type: Number
    },

    //Dados Olheiro
    tipo: {
        type: String
    },
    empresa: {
        type: String
    },
    tempo: {
        type: String
    },

    statusUser: {
        type: Number
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});


UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 15);
    this.senha = hash;

    if (this.esporte == ''){
        this.esporte = "Futebol";
    }
    if (this.pais == null){
        this.pais = "Brasil";
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
