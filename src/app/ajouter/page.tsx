"use client"; // makes component a client component
import { useState } from "react";
// next
// import { useRouter } from "next/navigation";
// <button type="button" onClick={() => router.push('/dashboard')}>
import Link from "next/link";
import Image from "next/image";
import "./ajouter.css";
//
import Navigation from "@/components/nav/nav.tsx";
import Footer from "@/components/footer/footer.tsx";
import BookForm from "@/components/BookForm/BookForm.tsx";
//
// assets
import bookAdd from "@/assets/book_add.jpg";

function AddBook() {
  // const router = useRouter();
  const [created, setCreated] = useState(false);

  return (
    <>
      <Navigation />
      <div className="min-h-89vh bg-lightBeige p-12 pb-24">
        <div className="content-container">
          {/* <BackArrow /> */}
          <div className="Container">
            {!created ? (
              <>
                <h1 className="AddBookTitle">Ajouter un livre</h1>
                <p className="ContainerText">
                  Tous les champs sont obligatoires
                </p>
                <BookForm
                // err : Typescript
                // validate={setCreated}
                />
              </>
            ) : (
              <div className="Created">
                <h1>Merci!</h1>
                <p>votre livre a bien été publié</p>
                <Image src={bookAdd} alt="Livre ajouté" />
                <Link href="/" className="button">
                  {"Retour à l'accueil"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddBook;
