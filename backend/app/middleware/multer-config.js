// ----- multer -----

const multer = require("multer"); // import

// supporte 3 type de fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
//
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/booksImg"); // destination de stockage
  },
  // Assure un nom de fichier soit valide
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // remplace espace par _
    const extension = MIME_TYPES[file.mimetype]; // définis extension du fichier
    callback(null, name + Date.now() + "." + extension); // return le nom.ext (nom unique via date)
  },
});

module.exports = multer({ storage: storage }).single("image"); // single car 1 fichier

// Il faut modifier le format de la requettes qui contiennent ces images ??
