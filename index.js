const express = require('express');
const bodyParser = require('body-parser');

// Criação do app
const app = express();

// Usando bodyparser pra requisições JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads/profile'));
app.use(express.static('uploads/posts'));


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


//Porta do servidor
var porta = process.env.PORT || 3000;
app.listen(porta);
