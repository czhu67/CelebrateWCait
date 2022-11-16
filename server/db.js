const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/users');

// 2. Set up any schema and models needed by the app
let userSchema = mongoose.Schema({
  _id: String, // username
  pwd: String,
  date: Date,
  budget: {type: Number, default: 0},
  currentCost: {type: Number, default: 0},
  vendors: Array,
  completedToDos: Array, // toDo items that are already done
  addedToDos: Array, // new toDo items that a user has added through the add form
  stickies: Array
})

const Users = mongoose.model('Users', userSchema);

// 3. Export the models
// 4. Import the models into any modules that need them
module.exports = Users;