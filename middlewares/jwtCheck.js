const jwt = require('jsonwebtoken')
// JWT Authentication
exports.jwtCheck = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    
    jwt.verify(token, 'SECRET_PASSWORD', (err, decoded) => {
        req.user = decoded;
        req.token = token
        if( err || blackListedTokens.includes(token) ){
            const socketID = Object.keys(altOnlineUser).find(key => altOnlineUser[key] === req.user.username);
            if (Object.values(altOnlineUser).includes(req.user.username)){    
                delete altOnlineUser[socketID]
            }

            return res.status(401).send({
                message: "Invalid token"
            })
        }
        
        next();
    });
}

// // JWT Authentication
// exports.jwt = function jwtCheck(req, res, next){
//     const token = req.headers.authorization.split(' ')[1]
    
//     jwt.verify(token, 'SECRET_PASSWORD', (err, decoded) => {
//         req.user = decoded;
//         req.token = token
//         if( err || blackListedTokens.includes(token) ){
//             const socketID = Object.keys(altOnlineUser).find(key => altOnlineUser[key] === req.user.username);
//             if (Object.values(altOnlineUser).includes(req.user.username)){    
//                 delete altOnlineUser[socketID]
//             }

//             return res.status(401).send({
//                 message: "Invalid token"
//             })
//         }
        
//         next();
//     });
// }