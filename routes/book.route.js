const express = require("express");
const bookRoutes = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const bookController = require("../controllers/book.controller");

bookRoutes.use(authMiddleware);

bookRoutes.post("/addBook", bookController?.addBook);
bookRoutes.post("/allBooks", bookController?.getBooks);
bookRoutes.put("/update", bookController?.updateBook);
bookRoutes.delete("/delete", bookController?.deleteBook);

module.exports = bookRoutes;
