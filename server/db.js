const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/users');

let userSchema = mongoose.Schema({
  _id: String, // username
  pwd: String,
  firstName: String,
  lastName: String,
  date: Date,
  budget: {type: Number, default: 0},
  currentCost: {},
  vendors: Array,
  completedToDos: Array, // toDo items that are already done
  toDos: Array, // current toDo items shown (included newly added ones)
  itinerary: {}
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;