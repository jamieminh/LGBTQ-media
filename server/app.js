const express = require('express');
const config = require('./config')
const cors = require('cors')
const dotenv = require('dotenv');
const Sequelize = require('sequelize')
const db = require('./config/index')

dotenv.config();

// --- Check DB Connection ---
db.authenticate()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.error("Connection Failed", err))


// --- DONE ---

let app = express()

const PORT = process.env.PORT || 5000;

app.use(cors())

app.get('/', (req, res) => res.send("Index Page "))

// access /genres pages
app.use('/genres', require('./routes/genres'))


// access /media pages
app.use('/media', require('./routes/media'))

// access /reviewers pages
app.use('/reviewers', require('./routes/reviewers'))


app.listen(PORT, () => console.log("Server started on Port " + PORT))

