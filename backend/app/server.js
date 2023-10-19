const mongoose = require("mongoose");
require("dotenv").config();

// Exécuté via = "nodemon server"
// ------------------------------------------------------
// Connexion Bdd via mongoose
mongoose
  .connect(process.env.MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie ! (server)"))
  .catch(() => console.log("Connexion à MongoDB échouée ! (server)"));
// ------------------------------------------------------

const http = require("http");
const app = require("./app"); // import express de l'app

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000"); // ligne du port
// normalizePort = port toujours valide (chaine caractère ou nombre)

app.set("port", port); // set port

// errorHandler recherche les erreurs et les gère
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// create server
const server = http.createServer(app);

// ecoute les évênement et nous indique dans la console sur quel port ils sont écouté
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// Ecoute requette http et y répond
server.listen(port);
