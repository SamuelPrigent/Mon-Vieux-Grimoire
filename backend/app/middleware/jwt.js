// ----- jwt (check request) ----

const jwt = require("jsonwebtoken"); // import

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Check token + accès infos liés
    const userId = decodedToken.userId; // on récup l'userId lié au token

    // Check si userId existe puis si correspond bien à l'userId qui passe la requête
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      // si userId correspond on le rend accessible au prochain middleware
      req.userId = userId;
      next();
    }
  } catch {
    res.status(403).json({ error: new Error("Unauthorized request!") });
  }
};
