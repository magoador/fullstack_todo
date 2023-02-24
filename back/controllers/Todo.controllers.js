const Todo = require("../models/Todo.model");

module.exports.TodoController = {
  addTodo: async (req, res) => {
    try {
      const addedTodo = await Todo.create({
        text: req.body.text,
      });
      res.json(addedTodo);
    } catch (err) {
      res.json(err);
    }
  },
  getTodos: async (req, res) => {
    try {
      const allTodos = await Todo.find();
      res.json(allTodos);
    } catch (err) {
      res.json(err);
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
      res.json(deletedTodo);
    } catch (err) {
      res.json(err);
    }
  },
  updateTodo: async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
        doned: req.body.doned,
      });
      res.json(updatedTodo);
    } catch (err) {
      res.json(err);
    }
  },
};
