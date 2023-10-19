// ---- route user ----

const express = require("express"); // import express
const router = express.Router(); // import router
const userCtrl = require("../controllers/user"); // import controller

// middleware route
router.post("/auth/signup", userCtrl.signup); // inscription
router.post("/auth/login", userCtrl.login); // connection

// Export
module.exports = router;
