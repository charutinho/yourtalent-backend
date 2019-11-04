const mongoose = require('../database');

const CampSchema = new mongoose.Schema({
    nomeCamp: {
        type: String,
        required: true
    },
    colocacao: {
        type: String
    },
    data: {
        type: String
    },
    idParticipante: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Camp = mongoose.model('Camp', CampSchema);

module.exports = Camp;
