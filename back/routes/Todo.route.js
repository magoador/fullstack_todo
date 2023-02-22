const { Router } = require('express')
const { TodoController } = require('../controllers/todo.controllers')

const router = Router()

router.get('/todos/', TodoController.getTodos);
router.post('/todos/', TodoController.addTodo);
router.patch('/todos/update/:id', TodoController.updateTodo);
router.delete('/todos/delete/:id', TodoController.deleteTodo)

module.exports = router;