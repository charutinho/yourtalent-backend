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
    descricao: {
        type: String,
    },
    pais: {
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
    fotoPerfil: {
        type: String,
    },
    fotoCapa: {
        type: String,
    },
    esporte: {
        type: String,
    },
    nivel: {
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
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
