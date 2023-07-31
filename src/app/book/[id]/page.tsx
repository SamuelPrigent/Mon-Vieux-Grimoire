"use client"; // makes component a client component
import { useEffect, useState } from "react";
// next
import Image from "next/image";
import Link from "next/link.js";
// components
import Navigation from "@/components/nav/nav.tsx";
import Footer from "@/components/footer/footer.tsx";
// style & assets
import "./book.css";
import backArrow from "@/assets/backArrow.svg";
import StarFull from "@/assets/StarFull.svg";
import StarEmpty from "@/assets/StarEmpty.svg";
import Decoration2 from "@/assets/Decoration2.svg";
// factory
import Books, {
  BooksPropositions,
} from "@/components/booksProposition/booksProposition.tsx";

// data
import { booksList } from "@/data/data.js";

// typage :
interface Book {
  id: string;
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  imageUrlBig: string;
  year: number;
  genre: string;
  averageRating: number;
}

// mock of one book
// const bookObj = {
//   id: "12",
//   userId: "clc4wj5lh3gyi0ak4eq4n8syr",
//   title: "Milwaukee Mission",
//   author: "Peter Thiel",
//   imageUrl: "/books/mission(x3).jpg",
//   year: 2021,
//   genre: "Policier",
//   averageRating: 4,
// };

// Similar books
const booksProposition = [
  {
    id: "1",
    userId: "clc4wj5lh3gyi0ak4eq4n8syr",
    title: "Milwaukee Mission",
    author: "Elder Cooper",
    imageUrl: "/books/mission(x2).jpg",
    year: 2021,
    genre: "Policier",
    averageRating: 3,
  },
  {
    id: "2",
    userId: "clc4wj5lh3gyi0ak4eq4n8syr",
    title: "Book of Esther",
    author: "Alabaster",
    imageUrl: "/books/bookOfEsther(x2).jpg",
    year: 2022,
    genre: "Paysage",
    averageRating: 4,
  },
  {
    id: "3",
    userId: "clc4wj5lh3gyi0ak4eq4n8syr",
    title: "The Kinflok Table",
    author: "Nathan Williams",
    imageUrl: "/books/theKinfolkTable(x2).jpg",
    year: 2022,
    genre: "Cuisine",
    averageRating: 3,
  },
];

// find by ID === obj.id
function getData(id: string) {
  const book = booksList.find((book) => book.id === id);
  return book;
}

// ratings function {19}
function getStars(averageRating: number) {
  const ratings = [1, 2, 3, 4, 5];
  const ratingStars = ratings.map((starIndex) => {
    if (starIndex <= averageRating) {
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
  return ratingStars;
}

interface BookPageProps {
  params: { id: string };
}

function BookPage({ params }: BookPageProps) {
  // const [data, setData] = useState(null);
  const [data, setData] = useState<Book | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof params.id !== "undefined") {
          const bookObj: Book | undefined = getData(params.id); // Déclarer le type de bookObj comme Book | undefined
          if (bookObj) {
            setData(bookObj);
          }
        } else {
          // setError("id is undefined");
        }
      } catch (error) {
        console.error(error);
        // setError("Failed to fetch data");
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="z-z2 flex min-h-100vh w-full flex-col items-center bg-lightBeige">
      <Navigation />
      <div className="bookPageContainer">
        <div className="containerBehind"></div>
        <div className="backElement">
          <Link className="backArrow" href={"/"}>
            <Image src={backArrow} alt="backArrow" height={20} width={40} />
            <div className="backText">Retour</div>
          </Link>
        </div>
        <div className="topContainer">
          {/* left */}
          <div className="topContainerLeft">
            {data ? (
              <Image
                priority
                className="bookPageImg"
                src={data.imageUrlBig}
                alt={`book-${data.title}`}
                height={260}
                width={200}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <div className="loader"></div>
              </div>
            )}
          </div>
          {/* right */}
          <div className="topContainerRight">
            <div className="topContainerRightTitle">
              {data ? data.title : "..."}
            </div>
            <div className="DescriptionLine1">
              <div className="leftElement">
                par {data ? data.author : "..."}
              </div>
              <div className="RightElement">{data ? data.year : "..."}</div>
            </div>
            <div className="DescriptionLine2">
              <div className="leftElement">{data ? data.genre : "..."}</div>
              <div className="RightElement">
                <div className="flex">
                  {data ? getStars(data.averageRating) : null}
                </div>
                <div>{data ? data.averageRating : "..."}</div>
              </div>
            </div>
            {/* rate this book */}
            <div className="bookReviewContainer">
              <div className="bookReviewTitle">Notez cet ouvrage</div>
              <div className="rating mb-2">
                <input type="radio" id="star5" name="rate" value="5" />
                <label htmlFor="star5" title="text"></label>
                <input type="radio" id="star4" name="rate" value="4" />
                <label htmlFor="star4" title="text"></label>
                <input type="radio" id="star3" name="rate" value="3" />
                <label htmlFor="star3" title="text"></label>
                <input type="radio" id="star2" name="rate" value="2" />
                <label htmlFor="star2" title="text"></label>
                <input type="radio" id="star1" name="rate" value="1" />
                <label htmlFor="star1" title="text"></label>
              </div>
              <div className="validate-button">Valider</div>
            </div>
          </div>
        </div>
        <div className="lineSeparator--container">
          <div className="lineSeparator"></div>
        </div>
        {/* 3 books */}
        <div className="relative">
          <div className="bookProposition">Livres similaires...</div>
          <Image
            priority
            className="absolute left-[331px] top-[52px] z-z2 h-9 w-1/2"
            src={Decoration2}
            alt="background decoration"
          />
        </div>
        <div className="bookGrid--p">
          {booksProposition
            ? booksProposition.map((book) => (
                <Books key={`book-${book.id}`} book={book} />
              ))
            : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookPage;
