const jwt = require('jsonwebtoken');
const fs = require('fs');


//private and public key
var privateKEY = fs.readFileSync('../../keys/private.key','utf8');
var publicKEY = fs.readFileSync('../../keys/public.key','utf8');

//signing options
var signOption = {
    expiresIn: '1h',
    algorithm: ['HS256']
}

const sign = async (user) => {
    let scopes;

    if(user.admin) {
        scopes = 'admin';
    }

    return jwt.sign({
        id: user._id,
        username: user.username,
        scope: scopes
  
    }, privateKEY,signOption);
}

const verify = async (token) => {
    let scopes;


    return jwt.verify(token, publicKEY,signOption);
}

const decode = (token) => {
    return jwt.decode(token,{complete: true})
}

module.exports = {
    sign: sign,
    verify: verify
}