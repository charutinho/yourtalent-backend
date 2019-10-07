const mongoose = require('../database');

//Schema do Esporte
const SportSchema = new mongoose.Schema({
    nomeEsporte: {
        type: String,
        require: true,
    },
    categoria: {
        type: String,
        require: true
    }
});


const Sport = mongoose.model('Sport', SportSchema);

module.exports = Sport;
