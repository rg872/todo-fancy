const jwt = require('jsonwebtoken');

module.exports = {
    decoding: function(token){
        return jwt.decode(token);
    }
}