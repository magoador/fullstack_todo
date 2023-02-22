const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  id: Number,
  text: String,
  doned: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
