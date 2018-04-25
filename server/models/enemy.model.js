const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

const EnemySchema = Schema({
    name: String,
    hp: Number,
    atk: Number,
    difficulty: String
},{
    timestamps:true
});

const Enemy = mongoose.model('Enemy', EnemySchema);

module.exports = Enemy;