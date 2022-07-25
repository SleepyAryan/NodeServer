const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const checkAuth = require('./middleware/check-auth')

mongoose.connect('mongodb://127.0.0.1/videoServer',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(cors());
//cors: cross origin resource sharing errors, using cors I ensured errors regarding cors eg.(client requests on different ports and receives a resposne fron different ports)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/videos', express.static('media/uploads'));
//Routes here

app.use('/api/signUp', require('./router/signUp'));
app.use('/api/signIn', require('./router/signIn'));  
app.use('/api/upload', checkAuth,require('./router/upload'));
app.use('/api/videoList', checkAuth, require('./router/videoList'))

module.exports = app;