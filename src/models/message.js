const mongoose = require('../database');

const MessageSchema = new mongoose.Schema({
    msg: {
        type: String
    },
    autor: {
        type: String
    },
    idConversa: {
        type: String
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
