const { searchMusic } = require("../controller/search.controller");

const express = require("express").Router();
const searchRoute = express;

searchRoute.post("/music", searchMusic);

module.exports = searchRoute;
