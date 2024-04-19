// routes/searchRouter.js

const searchRouter = require("express").Router();

const searchController = require("../controller/search.controller");

searchRouter.get('/search', searchController.searchUsers);

module.exports = searchRouter;
