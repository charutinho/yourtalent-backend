const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');


router.post('/novopost', multer(multerConfig).single('img'), async (req, res) => {

    const desc = req.headers.desc;
    var categoria = req.headers.categoria;
    const id = req.headers.iduser;
    const imgName = req.file.filename;

    if (categoria == '') {
        categoria = "futebol"
    }

    const file = req.file;

    try {
        if (!file) {
            return res.status(404).send({
                error: "Nenhum arquivo selecionado"
            });

        } else {
            try {

                const usuario = await User.findById(id);

                const novoPost = new Post({
                    descricao: desc,
                    conteudoPost: imgName,
                    autor: usuario._id,
                    categoria: categoria
                });

                return novoPost.save();

            } catch (err) {
                return res.status(400).send({ error: "Algo deu errado" });
            }
        }
    } catch (err) {
        return res.status(400).send({ error: "Algo deu errado" });
    }
});

router.get('/listarposts/:nomeesporte', async (req, res) => {

    await Post.find({ categoria: req.params.nomeesporte })
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
    await Post.find({ autor : req.params.id })
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

module.exports = app => app.use(router);
