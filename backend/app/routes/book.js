// ---- route books ----

const express = require("express"); // import express
const router = express.Router(); // import router
// controllers
const bookCtrl = require("../controllers/book");
// module
const jwt = require("../middleware/jwt"); // authentifie requêtes
const multer = require("../middleware/multer-config"); // gestion img

// middleware route
router.post("/books/", jwt, multer, bookCtrl.createBook); // Create new book
router.get("/books/", jwt, bookCtrl.getAllBooks); // Get All
router.get("/books/:id", jwt, bookCtrl.getOneBook); // Get One
router.put("/books/:id", jwt, multer, bookCtrl.editBook); // Edit
router.delete("/books/:id", jwt, bookCtrl.deleteBook); // Delete

// Rating ?
// router.post("/api/books/:id/rating", jwt, bookCtrl.likeStatus); //

// Export
module.exports = router;
