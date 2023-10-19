// ---- Book Controllers ----

const Book = require("../schema/book");
const fs = require("fs"); // fs permet delete img local pendant suppression objet

// == Get All Books
exports.getAllBooks = async (req, res, next) => {
  await Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// == Get one Book
exports.getOneBook = async (req, res, next) => {
  await Book.findOne({ _id: req.params.id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

// Create one Book
exports.createBook = async (req, res, next) => {
  const bookObject = JSON.parse(req.body.book); // thing ou book ?
  delete bookObject._id;
  const book = new Book({
    ...bookObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // create a link for img updated localy
    usersRatings: [], // initialise un tableau vide
  });
  await book
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// == Edit one Book (sécurité : Jwt)
exports.editBook = async (req, res, next) => {
  // jwt
  const jwt = require("jsonwebtoken");
  const token = req.headers.authorization.split(" ")[1]; // token req
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // check token + ouvre accès infos
  const userId = decodedToken.userId; // récup userId du token

  // get book
  const book = await Book.findOne({ _id: req.params.id });

  // Si book n'éxiste pas => err
  if (!book) {
    res.status(404).json({ message: "Objet introuvable !" });
    return;
  }

  // Si user n'est pas le créateur de l'object => err
  if (req.body.userId !== userId) {
    res.status(403).json({ message: "Action non autorisée !" });
    return;
  }

  // -- Code de modification de l'objet
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  // Update Book
  Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// == Delete one Book (sécurité : Jwt)
exports.deleteBook = async (req, res, next) => {
  // jwt
  const jwt = require("jsonwebtoken");
  const token = req.headers.authorization.split(" ")[1]; // token req
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // check token + ouvre accès infos
  const userId = decodedToken.userId; // récup userId du token

  // get book
  const book = await Book.findOne({ _id: req.params.id });

  // Si book n'éxiste pas => err
  if (!book) {
    res.status(404).json({ message: "Objet introuvable !" });
    return;
  }

  // Si user n'est pas le créateur de l'object => err
  if (req.body.userId !== userId) {
    res.status(403).json({ message: "Action non autorisée !" });
    return;
  }

  // -- Code de supression de l'objet
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      const filename = book.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// ----------------------------------------------------------------------------------------------------------------

// Pour tester la sécurité back end du modify ou delete :
/*
1 - Enlever le middleware auth de 3 routes = (get ALL / get 1 / put 1)
2 - Essayer une requette PUT via Postman pour modifier l'objet 
3 - La requette sera envoyé sans le middleware sécurisé car elle ne vérifie pas 
si la requette viens du même userId que celui qui a post le book
*/

// Code modify non sécurisé
/*
exports.editBook = (req, res, next) => {

  const bookObject = req.file ?
    {
      ...JSON.parse(req.body.book), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));

};
*/

// ----------------------------- DEBUT CODE LIKE ICI ------------------------------------------------------

// == POST Like (will be rated)
// exports.likeStatus = async (req, res, next) => {
//   const likeValue = req.body.like;
//   const userID = req.body.userId;
//   const BookID = req.params.id;

//   try {
//     const book = await Book.findOne({ _id: BookID }); // juste un bug sur le compteur
//     switch (likeValue) {
//       // Like
//       case 1:
//         if (!book.usersLiked.includes(userID)) {
//           await Book.updateOne(
//             { _id: BookID },
//             { $push: { usersLiked: userID }, $inc: { likes: 1 } },
//           );
//           res.status(200).json({ message: "Like !" });
//           break;
//         }

//       // Dislike
//       case -1:
//         if (!book.usersDisliked.includes(userID)) {
//           await Book.updateOne(
//             { _id: BookID },
//             { $push: { usersDisliked: userID }, $inc: { dislikes: 1 } },
//           );
//           res.status(200).json({ message: "Dislike !" });
//           break;
//         }

//       // Cancel Like
//       case 0:
//         if (book.usersLiked.includes(userID)) {
//           await Book.updateOne(
//             { _id: BookID },
//             { $pull: { usersLiked: userID }, $inc: { likes: -1 } },
//           );
//           res.status(200).json({ message: "Cancel Like !" });
//           break;
//         }

//       // Cancel Dislike
//       case 0:
//         if (book.usersDisliked.includes(userID)) {
//           await Book.updateOne(
//             { _id: BookID },
//             { $pull: { usersDisliked: userID }, $inc: { dislikes: -1 } },
//           );
//           res.status(200).json({ message: "Cancel Dislike !" });
//           break;
//         }
//       default:
//         res.status(400).json({ error: "Une erreur est arrivée !" });
//     } // fin switch
//   } catch (error) {
//     // fin function - try

//     res.status(400).json({ error });
//   }
// }; // fin middleware

// -----------------------------FIN CODE LIKE ICI ------------------------------------------------------
