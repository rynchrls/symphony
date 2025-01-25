const { fetchSelected } = require("../controller/selected.controller");

const express = require("express").Router();
const selectedRoute = express;

selectedRoute.get("/", fetchSelected);

module.exports = selectedRoute;
