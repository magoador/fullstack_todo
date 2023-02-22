const { Router } = require('express')
const { TodoController } = require('../controllers/Todo.controllers')

const router = Router()

router.get('/', TodoController.getTodos);
router.post('/', TodoController.addTodo);
router.patch('/', TodoController.updateTodo);
router.delete('/', TodoController.deleteTodo)

module.exports = router;