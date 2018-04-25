const Todo = require('../models/todo.model');
const User = require('../models/users.model')
const decodeJwt = require('../helpers/decode-jwt')

module.exports = {
    addTodo: function(req, res){
        
        let decoded = decodeJwt.decoding(req.body.token);
            
        let new_todo = {
            title: req.body.title,
            description: req.body.description,
            status: false
        }  

        Todo.create(new_todo)
        .then((todo)=>{           

            User.findOne({email: decoded.email})
            .then((user)=>{
                user.todo.push(todo);
                
                user.save()
                .then((user)=>{
                    res.status(200).json({
                        message: 'success create todo'
                    })
                })                               
            })
            
        })        
        .catch((error)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
          
    },

    getTodoByEmail: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;
        
        User.findOne({email: email})
        .populate('todo')
        .then((user)=>{
            console.log(user.todo)
            res.status(200).json({
                message: 'success get articles',
                todo: user.todo
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    changeTodoStatusById: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;

        Todo.findByIdAndUpdate(req.body.id, {status: req.body.status})
        .then((todo)=>{
            User.findOneAndUpdate({email: email}, {exp: req.body.exp, lvl: req.body.lvl, hp: req.body.hp, atk: req.body.atk})
            .then((user)=>{
                res.status(200).json({
                    message: 'success change todo status'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    deleteTodoById: function(req, res){
        let email = decodeJwt.decoding(req.body.token).email;

        Todo.findByIdAndRemove(req.body.id)
        .then(()=>{
            User.findOne({email: email})
            .then((user)=>{
                let todo_index = user.todo.indexOf(req.body.id)
                user.todo = user.todo.slice(todo_index, 1)
                user.save()
                .then((user)=>{
                    res.status(200).json({
                        message: 'success delete todo',
                        todo: user.todo
                    })
                })
            })            
        })
        .catch((err)=>{
            res.status(500).json({
                message: 'server error'
            })
        })
    }
}