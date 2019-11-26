const express = require('express');

const router = express.Router();

const Denuncia = require('../models/denuncia');
const User = require('../models/user');
const Post = require('../models/post');
const Camp = require('../models/camp');

router.post('/enviardenuncia', async (req, res) => {
    if (req.body.outro == false) {
        req.body.outroTxt = ''
    };
    await Denuncia.create(req.body);
    return res.send({ message: true })
});

router.get('/getdenuncias', async (req, res) => {
    const denuncias = await Denuncia.find({})
        .populate('idDenuncia', 'nome fotoPerfil')
        .populate('idPost')
        .exec()

    if (denuncias == '') {
        return res.send({ message: true })
    } else {
        return res.send(denuncias);
    }

});

router.get('/anulardenuncia/:id', async (req, res) => {
    await Denuncia.findByIdAndDelete(req.params.id);
});

router.get('/banirusuario/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { $set: { statusUser: 1 } })
    await Post.deleteMany({ autor: req.params.id });
    await Camp.deleteMany({ idParticipante: req.params.id });
    await Denuncia.deleteMany({ idDenuncia: req.params.id })
    return res.send({ message: 'Usuário banido do sistema.' })
});

module.exports = app => app.use(router);
