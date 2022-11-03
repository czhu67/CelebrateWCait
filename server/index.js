require("dotenv").config();
const express = require("express");
const path = require("path");
// const Glossary = require("./db");

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
