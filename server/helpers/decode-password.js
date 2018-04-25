const bcrypt = require('bcryptjs');

module.exports = {
    verify: function(password, hash){
        return bcrypt.compareSync(password, hash);
    }
}