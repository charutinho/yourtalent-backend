const moongose = require('mongoose');

//Schema do mongodb, como se fosse uma tabela MySQL
const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    nasc: {
        type: Date,
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

const User = mongoose.model('User', UserSchema);

module.exports = User;