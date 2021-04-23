const express = require('express');
const { Sequelize } = require('../config');
const { Users, Auth_Tokens } = require('../models/Users')
const argon2 = require('argon2')
const { hashPWConfig, hashValidatorConfig } = require('../keys')
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
            type: hashPWConfig.type, hashLength: 18, // create a digest of length 18 *4/3 = 24 
            timeCost: 5, parallelism: hashPWConfig.p
        })

        let hashedPw = await argon2.hash(pw, {
            type: hashPWConfig.type, hashLength: hashPWConfig.length, // create a digest of length 96 *4/3 = 128
            timeCost: hashPWConfig.t, parallelism: hashPWConfig.p
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
    const isRemember = req.body.remember

    Users.findOne({
        where: { email: email }
    })
        .then(async (result) => {
            if (result !== null) {  // there's a user with that email
                const user = result.dataValues
                const hashedPw = user.password
                const verify = await argon2.verify(hashedPw, pw);
                if (verify) {

                    const id = user.user_id
                    const token = (user.role === 'admin') ?
                        jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, { expiresIn: 60 * 60 * 60 * 24 * 5 })
                        : jwt.sign({ id }, process.env.JWT_SECRET_USER, { expiresIn: 60 * 60 * 60 * 24 * 5 })

                    req.session.user = { user_id: user.user_id, role: user.role, email: user.email, display_name: user.display_name }
                    req.session.token = token

                    let selector = ''
                    let validator = ''

                    // create a hased 
                    if (isRemember) {
                        selector = generateRandomString(24)
                        validator = generateRandomString(64)

                        let hashedValidator = await argon2.hash(validator, {
                            type: hashValidatorConfig.type,
                            hashLength: hashValidatorConfig.length, // create a digest of length 96 *4/3 = 128
                            timeCost: hashValidatorConfig.t,
                            parallelism: hashValidatorConfig.p
                        })

                        const todayInSeconds = new Date().getTime() / 1000
                        const expireTimestamp = todayInSeconds + (5 * 24 * 60 * 60)     // expire in 5 days

                        Auth_Tokens.create({
                            selector: selector,
                            hashedValidator: hashedValidator,
                            expires: expireTimestamp,
                            user_id: user.user_id
                        })
                            .then(response => {
                                console.log(response)
                            })
                            .catch(err => console.error(err))
                    }

                    res.send({
                        user_id: user.user_id,
                        email: email,
                        role: user.role,
                        display_name: user.display_name,
                        token: (selector + validator)
                    })
                }
                else
                    res.send({ message: "Wrong email/password combination!" })
            }
            else
                res.send({ message: "There's no user with this Email. Signup instead!" })

        })
        .catch(err => res.send(err))
})

router.get('/logout/:token', (req, res) => {
    const selector = req.params.token.substr(0, 24)

    Auth_Tokens.destroy({
        where: {selector: selector}
    })

    req.session.destroy();
    res.send({ isLoggedOut: true })
})


// login using cookie or session
router.get('/login/:cookie', (req, res) => {
    const token = req.params.cookie
    if (token !== "undefined") {
        const selector = token.substr(0, 24)
        const validator = token.substr(24, token.length - 1)

        Auth_Tokens.findOne({
            where: { selector: selector },
            include: [{ model: Users }]
        })
            .then(async result => {
                if (result !== null) {
                    const hashedValidator = result.hashedValidator
                    const verify = await argon2.verify(hashedValidator, validator)
                    const user = result.User

                    if (verify) {
                        res.send({
                            fromCookie: true, isLoggedIn: true, 
                            user: {
                                user_id: user.user_id,
                                role: user.role,
                                email: user.email,
                                display_name: user.display_name
                            }
                        })
                    }
                    else {
                        res.send({ isLoggedIn: false })
                    }
                }
                else {
                    res.send({ isLoggedIn: false })
                }
            })

    }
    else if (req.session.user) {
        res.send({ isLoggedIn: true, user: req.session.user })
    }
    else {
        res.send({ isLoggedIn: false })
    }
})


// random selector and validator for auth_tokens table
const generateRandomString = (length) => {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}


module.exports = router