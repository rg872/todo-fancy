const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

const TodoSchema = Schema({
    title: String,
    description: String,
    status: Boolean
},{
    timestamps:true
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;