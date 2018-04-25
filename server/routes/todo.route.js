var express = require('express');
var router = express.Router();

const TodoController = require('../controllers/todo.controller')

router.post('/add', TodoController.addTodo);
router.post('/get', TodoController.getTodoByEmail);
router.post('/status', TodoController.changeTodoStatusById);
router.post('/delete', TodoController.deleteTodoById);

module.exports = router;