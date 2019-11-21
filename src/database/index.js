const mongoose = require('mongoose');

//Conexão com mongodb
const uri = 'mongodb://localhost/yourtalent'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }) 
mongoose.Promise = global.Promise;

module.exports = mongoose;