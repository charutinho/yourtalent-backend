const mongoose = require('../database');

const ChatSchema = new mongoose.Schema({
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
