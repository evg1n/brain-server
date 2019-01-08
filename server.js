const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
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
    res.send(db.users);
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
    bcrypt.hash(password, null, null, (err, hash) => {
        console.log(hash);
    })
    db.users.push( {
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })

    res.json(db.users[db.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    
    let found = false;
    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });

    if (!found) {
        res.status(400).json('not found!');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json('not found!');
    }
})

app.listen(PORT, () => {
    console.log('app is listening to port:', PORT);
} );
