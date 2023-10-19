const User = require("../schema/user"); // schema for data
const bcrypt = require("bcrypt"); // hash password
const jwt = require("jsonwebtoken"); // produce a token to auth request later

// --- Inscription ---
exports.signup = async (req, res, next) => {
  // -- pas de async ici sinon bug ?
  await bcrypt
    .hash(req.body.password, 10) // hash le password
    .then((hash) => {
      // create User
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save() // add User
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// --- Connection ---
exports.login = (req, res, next) => {
  // Search User in bdd with email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        // if user not found
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // check password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            // if not valid
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // Renvoie le token d'accès pour auth
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id }, // récupéré lors du verify de jwt.js pour sécuriser l'edit des obj
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" },
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
