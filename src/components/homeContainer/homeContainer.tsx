"use client"; // makes component a client component
// next
import Link from "next/link";
import Image from "next/image";
// style & assets
import "./homeContainer.css";
import Banner from "@/assets/home_banner.jpg";
import Decoration from "@/assets/Decoration.svg";
// books card
import Books from "@/components/booksList/booksList.tsx";
import { booksList } from "@/data/data.js";

function HomeContainer() {
  return (
    <div className="Home">
      <div
        className="banner "
        style={{ backgroundImage: `url(${Banner.src})` }}
      />
      <main className="main">
        <div className="containerBehind"></div>
        <header className="head relative">
          <h1 className="z-z1">Nos livres</h1>
          <p className="z-z1">à lire et à relire</p>
          <Link href="/ajouter" className="button z-z1 mb-12">
            <div className="font-sans font-light">+ Ajouter un livre</div>
          </Link>
          <Image
            src={Decoration}
            alt="decoration line"
            className="absolute top-[105px] z-0 h-[177px] w-[83%]"
          />
        </header>
        {/* <Books /> */}
        <div className="bookContainer">
          <div className="bookGrid">
            {booksList
              ? booksList.map((book) => (
                  <Books key={`book-${book.id}`} book={book} />
                ))
              : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomeContainer;
