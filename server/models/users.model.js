const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

const UserSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    exp: Number,
    lvl: Number,
    hp: Number,
    atk: Number,
    title: String,
    todo: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
},{
    timestamps:true
});

UserSchema.pre('save', function() {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

// UserSchema.post('save', function(error, doc, next) {
//     next(error)
//   });

const User = mongoose.model('User', UserSchema);

module.exports = User;