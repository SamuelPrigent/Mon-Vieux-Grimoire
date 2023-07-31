import Image from "next/image";
import "./booksProposition.css";
import StarEmpty from "@/assets/StarEmpty.svg";
import StarFull from "@/assets/StarFull.svg";
import Link from "next/link";

export interface BooksPropositions {
  id: string;
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  year: number;
  genre: string;
  averageRating: number;
}

function BooksProposition({ book }: { book: BooksPropositions }) {
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
            height={19}
          />
        );
      } else {
        return (
          <Image
            src={StarEmpty}
            key={`star-full-${starIndex}`}
            alt="star empty"
            height={19}
          />
        );
      }
    });

    return (
      <Link href={`/book/${book.id}`}>
        <div className="bookCard--p">
          <Image
            priority
            className="bookCardImage--p"
            src={book.imageUrl}
            alt={`photo de ${book.title}`}
            height={260}
            width={200}
          />
          <div className="flex min-w-[110px] flex-col">
            <div className="bookCardRatings--p">{ratingStars}</div>
            <div className="bookCardTitle--p">{book.title}</div>
            <div className="bookCardDescription--p">{book.author}</div>
            <div className="bookCardDescription--p">{book.year}</div>
            <div className="bookCardDescription--p">{book.genre}</div>
          </div>
        </div>
      </Link>
    );
  }
}

export default BooksProposition;

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
