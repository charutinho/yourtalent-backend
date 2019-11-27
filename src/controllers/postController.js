const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');


router.post('/novopost', multer(multerConfig).single('img'), async (req, res) => {
    var categoria = req.headers.categoria;
    const id = req.headers.iduser;
    const imgName = req.file.filename;
    const ext = req.file.mimetype.split('/');
    try {
        const usuario = await User.findById(id);
        const novoPost = await new Post({
            descricao: ' ',
            conteudoPost: imgName,
            autor: usuario._id,
            categoria: categoria,
            tipo: ext[0]
        });
        await novoPost.save();
        return res.send({ message: novoPost._id })
    } catch (err) {
        return res.status(400).send({ error: "Algo deu errado" });
    }
});

router.post('/novopostdesc', async (req, res) => {
    const desc = req.body.desc;
    const idPost = req.body.idPost;
    await Post.findByIdAndUpdate(idPost, { $set: { descricao: desc } })
    return res.send({ message: 'Post criado com sucesso!' })
})

router.post('/listarposts', async (req, res) => {
    const esporte = req.body.esporte;

    await Post.find({ categoria: esporte })
        .sort([['createdAt', 'descending']])
        .populate('autor', 'nome fotoPerfil')
        .exec()
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Este post não existe"
                });
            }
            res.send({
                post
            });
        })
});

router.get('/listarposts/user/:id', async (req, res) => {
    await Post.find({ autor: req.params.id })
        .sort([['createdAt', 'descending']])
        .populate('autor', 'nome fotoPerfil')
        .exec()
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Este post não existe"
                });
            }
            res.send({
                post
            });
        })
});

router.post('/listarposts/especificos', async (req, res) => {
    const posicao = req.body.posicao;
    const estado = req.body.estado;
    const sexo = req.body.sexo;

    console.log(posicao, estado, sexo)

    await User.find({ nivel: 1, esportePosicao: posicao, sexo: sexo, estado: estado })
        .sort([['createdAt', 'descending']])
        .select('_id')
        .exec()
        .then(user => {
            if (user == '') {
                console.log('Nenhum atleta encontrado');
                return res.send({ message: 'Nenhum atleta encontrado' })
            }
            console.log(user);
            return res.send({ user })
        })
});

router.post('/listarposts/atleta', async (req, res) => {
    await Post.find({ autor: req.body.ids })
        .sort([['createdAt', 'descending']])
        .populate('autor')
        .exec()
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Este post não existe"
                });
            }
            res.send({
                post
            });
        })
})

module.exports = app => app.use(router);
