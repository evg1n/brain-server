const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

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

app.use(bodyParser.json());
app.use(cors());

const db = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '$2a$10$nw8uDRsqiGOLh1fzp2le4enaKw300qJZEVs16MaDEvhoDvUKwLGyC',
            email: ''
        }
    ]
}



app.get('/', (req, res) => {
    res.send('hello');
})

app.post('/signin', (req, res) => {
    if (req.body.email === db.users[1].email && req.body.password === db.users[1].password) {
        res.json(db.users[1]);
        console.log('success logging in');
    } else {
    res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
  database('users')
  .returning('*')
  .insert({
      name: name,
      email:email,
      joined: new Date(),
  }).then(user => {
      res.json(user[0]);
  })
  .catch(err => res.status(400).json('unable to register'));
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    
    let found = false;
   database.select('*').from('users').where({
       id: id
   }).then(user => {
      if (user.length){
          res.json(user[0])
      } else {
          res.status(400).json('user not found');
      }
   }).catch(err => res.status(400).json('error'))
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    database('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {res.send(entries[0])})
        .catch(err => res.staturs(400).json('error'))
});


app.listen(PORT, () => {
    console.log('app is listening to port:', PORT);
});
