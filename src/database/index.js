const mongoose = require('mongoose');

//Conexão com mongodb
const uri = 'mongodb+srv://admin:ytadmin777@yourtalent-c3na1.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }) 
mongoose.Promise = global.Promise;

module.exports = mongoose;