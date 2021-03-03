// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')

// dotenv.config()

// // const userJWT = jwt( {secret: process.env.JWT_SECRET_USER} )

// // authorization check
// const userAuthCheck = (req, res, next) => {
//     const token = req.headers["x-access-token"]

//     if (!token)
//         return res.sendStatus(401)
//     else {
//         jwt.verify(token, process.env.JWT_SECRET_USER, (err, decoded) => {
//             if (err) {
//                 return res.sendStatus(401)
//             }
//             else {
//                 req.userId = decoded.id
//                 next()
//             }
//         })
//     }
// }

// module.exports = {userAuthCheck}