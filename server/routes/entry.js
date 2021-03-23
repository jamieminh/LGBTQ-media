const express = require('express');
const { Sequelize } = require('../config');
const { Users } = require('../models/Users')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();
const Op = Sequelize.Op;

router.post('/register', async (req, res) => {
    const email = req.body.email
    const username = email.split('@')
    let display_name = req.body.displayName
    const pw = req.body.password
    let isAvailable = true

    // 32-character name include, user entered name, an underscore and a random 7 digit number
    display_name = display_name + '_' + Math.ceil(Math.random() * 8999999 + 1000000)

    await Users.findOne({ where: { email: email } })
        .then(result => {
            if (result !== null) {
                isAvailable = false
                res.send({ message: "This Email is already taken!" })
            }
        })

    if (isAvailable) {
        let id = await argon2.hash(username + Date.now, {
            type: argon2.argon2id, hashLength: 18, // create a digest of length 18 *4/3 = 24 
            timeCost: 5, parallelism: 2
        })

        let hashedPw = await argon2.hash(pw, {
            type: argon2.argon2id, hashLength: 96, // create a digest of length 96 *4/3 = 128
            timeCost: 500, parallelism: 2
        })

        id = id.split('$')[5];
        // console.log(hashedPw);
        Users.create({ user_id: id, email: email, display_name: display_name, password: hashedPw })
            .then(response => {
                res.send({ isSuccess: true })
                console.log(response)
            })
            .catch(err => console.error(err))
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const email = req.body.email
    const pw = req.body.password

    Users.findOne({
        where: { email: email }
    })
        .then(async (result) => {
            console.log(result);
            if (result !== null) {  // there's a user with that email
                const user = result.dataValues
                const hashedPw = user.password
                const verify = await argon2.verify(hashedPw, pw);
                if (verify) {

                    const id = user.user_id
                    const token = (user.role === 'admin') ?
                        jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, { expiresIn: 60 * 60 * 60 * 24 * 5 })
                        : jwt.sign({ id }, process.env.JWT_SECRET_USER, { expiresIn: 60 * 60 * 60 * 24 * 5 })

                    req.session.user = {user_id: user.user_id, role: user.role, email: user.email, display_name: user.display_name}
                    req.session.token = token

                    res.send({ user_id: user.user_id, email: email, role: user.role, display_name: user.display_name })
                }
                else
                    res.send({ message: "Wrong email/password combination!" })
            }
            else
                res.send({ message: "There's no user with this Email. Signup instead!" })

        })
        .catch(err => res.send(err))
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send({isLoggedOut: true})
})


// login using session
router.get('/login', (req, res) => {
    if (req.session.user) {
        console.log(req.session.user);
        res.send({ isLoggedIn: true, user: req.session.user })
    }    
    else {
        res.send({ isLoggedIn: false })
    }
})


module.exports = router