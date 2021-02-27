const express = require('express');
const config = require('./config')
const cors = require('cors')
const dotenv = require('dotenv');
const Sequelize = require('sequelize')
const db = require('./config/index')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

dotenv.config();

// --- Check DB Connection ---
db.authenticate()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.error("Connection Failed", err))


// --- DONE ---

let app = express()

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(session({
    key: 'user',
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 60 * 24 *5       // cookie expires in 5 days
    }
}))

app.get('/', (req, res) => res.send("Index Page "))

// access /genres pages
app.use('/genres', require('./routes/genres'))


// access /media pages
app.use('/media', require('./routes/media'))

// access /reviewers pages
app.use('/reviewers', require('./routes/reviewers'))

// access /artist pages
app.use('/artist', require('./routes/artists'))

// login and register
app.use('/entry', require('./routes/entry'))


// user
// app.use('/user', userJWT, userAuthCheck, require('./routes/user'))
app.use('/user', require('./routes/user'))

// admin
// app.use('/user', userJWT, userAuthCheck, require('./routes/user'))
app.use('/admin', require('./routes/admin'))

app.listen(PORT, () => console.log("Server started on Port " + PORT))
