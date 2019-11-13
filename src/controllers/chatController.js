const express = require("express");

const router = express.Router();

const Chat = require('../models/chat');
const Message = require('../models/message');

router.post('/chat', async (req, res) => {
    // console.log(req.body);
    const autor = req.body.autor;
    const destinatario = req.body.destinatario;
    const msg = req.body.msg;
    var nivel = req.body.nivel;

    const temChat = await Chat.find({ autor, destinatario })
    if (temChat == '') {
        if(msg == ''){
            return;
        }
        const idConversa = await Chat.create({ autor, destinatario });
        const idConversaChat = await idConversa._id;

        const idMessage = await Message.create({ msg, autor, idConversa: idConversaChat });
        const idMessageChat = await idMessage._id;

        await Chat.findByIdAndUpdate(idConversaChat, { messages: idMessageChat });
        return res.send({ message: 'Conversa criada e mensagem enviada!' })

    } else {
        if(msg == ''){
            return;
        }
        if (nivel == 1) {
            var autorNivel = req.body.destinatario;
        } else {
            var autorNivel = req.body.autor;
        }
        const idConversa = await Chat.find({ autor, destinatario })
        const idConversaChat = await idConversa[0]._id
        await Message.create({ msg, autor:autorNivel, idConversa: idConversaChat })
        return res.send({ message: 'Mensagem enviada' })
    }
})

router.post('/getchat', async (req, res) => {
    const autor = req.body.autor;
    const destinatario = req.body.destinatario;

    const idConversa = await Chat.find({ autor, destinatario })
    const idConversaChat = await idConversa[0]._id

    const msgs = await Message.find({ idConversa: idConversaChat })
    return res.send({
        msgs
    })
});

router.post('/getconversa', async (req, res) => {
    const nivel = req.body.nivel;
    if (nivel == 1) {
        const destinatario = req.body.autor;
        await Chat.find({ destinatario })
            .populate('destinatario autor', 'nome fotoPerfil')
            .exec()
            .then(conversas => {
                if (conversas == '') {
                    return res.send({ message: 'Nenhuma conversa' })
                } else {
                    return res.send(conversas)
                }
            })
    } else {
        const autor = req.body.autor;
        await Chat.find({ autor })
            .populate('destinatario autor', 'nome fotoPerfil')
            .exec()
            .then(conversas => {
                if (conversas == '') {
                    return res.send({ message: 'Nenhuma conversa' })
                } else {
                    return res.send(conversas)
                }
            })
    }
})

module.exports = app => app.use(router);
