// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

// define controllers
const register = require('./controllers/Register.js');
const signin = require('./controllers/SignIn.js');
const profile = require('./controllers/Profile.js');
const image = require('./controllers/Image.js');

// connect to the database
const database = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'evg1n',
        password: '',
        database: 'brain-database'
    }
});

const PORT = 3000;

// define middleware
app.use(bodyParser.json());
app.use(cors());

// route management
app.post('/signin', (req, res) => {signin.doSignIn(req, res, database, bcrypt)});
app.post('/register', (req, res) => {register.doRegister(req, res, database, bcrypt)});
app.get('/profile/:id', (req, res) => profile.getProfile(req, res, database));
app.put('/image', (req, res) => {image.getImage(req, res, database)});

// listen for requests on port
app.listen(PORT, () => {console.log('app is listening to port:', PORT);});
