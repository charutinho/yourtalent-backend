const mongoose = require('../database');
const bcrypt = require('bcryptjs');

//Schema do mongodb, como se fosse uma tabela MySQL
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
        unique: true,
        lowercase: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    nivel:{
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 15);
    this.senha = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;