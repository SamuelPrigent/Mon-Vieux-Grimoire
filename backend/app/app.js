const express = require("express"); // import express
const path = require("path"); // for img
const app = express(); // define app
// routes
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");

// Attribut un header à nos réponses pour éviter erreurs de sécurité (CORS)
app.use((req, res, next) => {
  // * = tout le monde peut accéder à l'API
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next(); // => to next middleware
});

// Express remplace bodyParser
app.use(express.json());

// Permet d'aller chercher des img static (local)
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
app.use(userRoutes);
app.use(bookRoutes);

// Export app
module.exports = app;
