const jwt = require('jsonwebtoken')
const DB = require('../models')
const altOnlineUser = require('../helpers/onlineusers')


// JWT Authentication
exports.jwtCheck = async function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    const blackListedToken = await DB.blackListedTokens.findOne({token: token})
    
    jwt.verify(token, 'SECRET_PASSWORD', (err, decoded) => {
        
        if( err || (blackListedToken != null) ){
            console.log(err)            
            if (Object.values(altOnlineUser).includes(decoded.username)){    
                const socketID = Object.keys(altOnlineUser).find(key => altOnlineUser[key] === decoded.username);
                delete altOnlineUser[socketID]
            }

            return res.status(401).send({
                message: "Invalid token"
            })
        }
        req.user = decoded;
        req.token = token
        
        next();
    });
}


// GENERATE COOKIE FUNCTION

function encryptAnInfo(info) {
    return jwt.sign(info, "ACCESS_TOKEN_PASSWORD", {expiresIn: '10m'})
}