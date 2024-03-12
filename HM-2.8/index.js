const express = require('express');
const mongoose = require('mongoose');
const error = require('./middleware/error-404');
const indexRouter = require('./routes/index.js');
const router = require('./routes/BookRoute.js');
const logger = require('./middleware/logger.js');
const viewRoute = require('./routes/viewRoute.js');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {
    usernameField: 'user',
    passwordField: 'password',
};

import { findById, findByUsername, verifyPassword, users } from './db/users.js';
import { Profile } from './db/profile.js';

const verify = (login, password, done) => {
    findByUsername(login, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!verifyPassword(user, password)) {
            return done(null, false);
        }

        return done(null, user);
    });
};

const db = require('./db/users.js')

const app = express();

app.use(express.json());
app.use('/', indexRouter)
app.use('/api/books', router);
app.use('/books', viewRoute);
app.use(logger);
app.use(error);
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    db.users.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy(options, verify));

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.get('/', (req, res) => {
    res.render('home', { user: req.user, message: app.get('message') });
    app.set('message', null);
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        console.log('req.user: ', req.user);
        res.redirect('/');
    }
);

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const user = new Profile(req.body);
    if (req.body.login && req.body.password) {
        users.push(user);
        app.set('message', true);
    }
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.get('/profile', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
},
    (req, res) => {
        res.render('profile', { user: req.user });
    }
);

async function start(PORT, UrlBD) {
    try {
        await mongoose.connect(UrlBD);
        app.listen(PORT);
        console.log(`Server listening on Port ${PORT}`);
    } catch (error) {
        console.log('error', error);
    }
};

const PORT = process.env.PORT || 3000;
const UrlDB = process.env.UrlDB || 'mongodb://root:example@mongo:27017/';

start(PORT, UrlDB);



