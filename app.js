const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const app = express();
const MongoClient = require('mongodb').MongoClient;
global.ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://<USER>:<PASS>@cluster0-n92ax.gcp.mongodb.net/logins?retryWrites=true"

MongoClient.connect(uri,{ useNewUrlParser: true },function (err,result){
    if(err)
    {
        console.log('Error Occured');
        global.db = null;
        return;
    }
    global.db = result.db('logins');
});

app.set('port', process.env.PORT || 8080);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));

app.use(logger('dev'));

app.use(session({
    secret: 'SpaceMom',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 120000000
    }
}));

app.get('/', routes.index);
app.post('/login', user.login);
app.get('/login', routes.login);
app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/home',routes.index);
app.get('/logout', user.logout);
app.get('*', routes.fourohfourG);
app.post('*', routes.fourohfourP);
app.listen(8080);