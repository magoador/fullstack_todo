const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  text: String,
  doned: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
