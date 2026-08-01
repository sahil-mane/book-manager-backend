const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const otherController = require("../controllers/other.controller")
const otherRoutes = express.Router();

otherRoutes.use(authMiddleware)

otherRoutes.get("/getAllBooksCount",otherController?.getAllBooksCount)
otherRoutes.get("/getAllTags",otherController?.getAllTags)

module.exports = otherRoutes