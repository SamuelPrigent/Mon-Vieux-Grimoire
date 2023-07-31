import Image from "next/image";
import "./booksList.css";
import StarEmpty from "@/assets/StarEmpty.svg";
import StarFull from "@/assets/StarFull.svg";
import Link from "next/link";

// mock of one book
// const bookObj = {
//   id: "12",
//   userId: "clc4wj5lh3gyi0ak4eq4n8syr",
//   title: "Zero to One",
//   author: "Peter Thiel",
//   imageUrl: "./books/zeroToOne(x2).jpg",
//   year: 2022,
//   genre: "Business",
//   averageRating: 4,
// };

interface Book {
  id: string;
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  year: number;
  genre: string;
  averageRating: number;
}

function Books({ book }: { book: Book }) {
  // console.log("book", book);
  if (book) {
    // Stars factory
    const ratings = [1, 2, 3, 4, 5];
    const ratingStars = ratings.map((starIndex) => {
      if (starIndex <= book.averageRating) {
        return (
          <Image
            src={StarFull}
            key={`red-star-${starIndex}`}
            alt="star full"
            height={23}
          />
        );
      } else {
        return (
          <Image
            src={StarEmpty}
            key={`star-full-${starIndex}`}
            alt="star empty"
            height={23}
          />
        );
      }
    });

    return (
      <Link href={`/book/${book.id}`}>
        <div className="bookCard">
          <Image
            priority
            className="bookCardImage"
            src={book.imageUrl}
            alt={`photo de ${book.title}`}
            height={260}
            width={200}
          />
          <div className="flex flex-col">
            <div className="bookCardRatings">{ratingStars}</div>
            <div className="bookCardTitle">{book.title}</div>
            <div className="bookCardDescription">{book.author}</div>
            <div className="bookCardDescription">{book.year}</div>
            <div className="bookCardDescription">{book.genre}</div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Books;
