require("dotenv").config();
const express = require("express");
const path = require("path");
const Users = require("./db");
const http = require('http');
const argon2 = require('argon2');
const crypto = require('crypto');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.post('/signup', (req, res) => {
  Users.find({_id: req.body.email}).then((data) => {
    if (data.length === 0) {
      let salt = crypto.randomBytes(16);
      argon2.hash(req.body.pwd, {salt}).then((hashed) => {
        Users.insertMany([{_id: req.body.email, pwd: hashed, date: null, budget: 0}], {ordered: false})
        .then((data) => res.send())
        .catch((err) => res.send());
      });
    } else {
      res.send('An account under this email already exists. Please log in.');
    }
  });
})

app.post('/login', (req, res) => {
  Users.find({_id: req.body.email}).then((data) => {
    if (data.length !== 0) {
      argon2.verify(data[0].pwd, req.body.pwd).then((check) => {
        if (check) {
          res.send({'toDos': data[0].toDos, budget: data[0].budget, completedToDos: data[0].completedToDos, currentCost: data[0].currentCost, date: data[0].date, itinerary: data[0].itinerary, vendors: data[0].vendors});
        } else {
          res.send('Incorrect password. Please try again.');
        }
      });
    } else {
      res.send(`User with ${req.body.email} does not exist. Please create an account or try again.`);
    }
  });
})

app.post('/update', (req, res) => {
  let input = {};
  input[req.body.update] = req.body.data;
  Users.updateMany({_id: req.body.email}, input)
  .then((data) => res.send(data))
  .catch((err) => res.send(err));
})

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
