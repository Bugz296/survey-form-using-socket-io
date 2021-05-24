/**
 * Require Modules
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

const server = app.listen(8000, function(){
    console.log("Listening to Port 8000");
});
const io = require('socket.io')(server);

/* Socket Event Listener */
io.on('connection', function(socket){
    socket.on('posting_form', function(req){
        socket.emit('updated_message', {data: req, luckyNum: emitLuckyNum()});
    });
});
/**
 * Routes
 */
app.get('/', function(req, res){
    res.render('index', {user_data: "Hey"});
});

app.post('/users', function(req, res){
    res.render('users', {user: req.body});
});

function emitLuckyNum(){
    return Math.floor(Math.random()*1001);
}