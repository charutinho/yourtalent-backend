const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const path = require('path');

// Criação do app
const app = express();

require('./src/config/getEnv')()

// Usando bodyparser pra requisições JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads/profile'));
app.use(express.static('uploads/posts'));


app.engine("ejs", engines.ejs);
app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");


/*Rota simples pra testar
app.get('/', (req, res) => { 
    res.send('TA OK');
 });
*/

require('./src/controllers/authController')(app);
require('./src/controllers/projectController')(app);
require('./src/controllers/dataController')(app);
require('./src/controllers/imgController')(app);
require('./src/controllers/postController')(app);
require('./src/controllers/sportController')(app);
require('./src/controllers/campController')(app);
require('./src/controllers/chatController')(app);
require('./src/controllers/pagarController')(app);

//Porta do servidor
app.listen(3000);
console.log('Servidor rodando na porta 3000')
