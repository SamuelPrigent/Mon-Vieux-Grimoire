"use client"; // makes component a client component
// import { useState } from "react";
// next
// import { useRouter } from "next/navigation";
import Image from "next/image";
// style & assets
import "./BookForm.css";
import addImageCross from "@/assets/addImageCross.svg";

function BookForm() {
  return (
    <form className="Form">
      <input type="hidden" id="id" />
      <label htmlFor="title">
        <p>Titre du livre</p>
        <input className="form-inputs" type="text" id="title" />
      </label>
      <label htmlFor="author">
        <p>Auteur</p>
        <input className="form-inputs" type="text" id="author" />
      </label>
      <label htmlFor="year">
        <p>Année de publication</p>
        <input className="form-inputs" type="text" id="year" />
      </label>
      <label htmlFor="genre">
        <p>Genre</p>
        <input className="form-inputs" type="text" id="genre" />
      </label>
      {/* stars */}
      <label htmlFor="rate">
        <p>Note</p>
        <div className="rating--addBook mb-7 mr-auto mt-2">
          <input type="radio" id="star1" name="rate" value="1" />
          <label htmlFor="star1" title="text"></label>

          <input type="radio" id="star2" name="rate" value="2" />
          <label htmlFor="star2" title="text"></label>

          <input type="radio" id="star3" name="rate" value="3" />
          <label htmlFor="star3" title="text"></label>

          <input type="radio" id="star4" name="rate" value="4" />
          <label htmlFor="star4" title="text"></label>

          <input type="radio" id="star5" name="rate" value="5" />
          <label htmlFor="star5" title="text"></label>
        </div>
        {/* <div className="Stars">

        </div> */}
      </label>
      <label htmlFor="file">
        <p>Visuel</p>
        {/* dynamic */}
        {/* <div className="AddImage">
          {filePreview || book?.imageUrl ? (
            <>
              <Image src={filePreview ?? book?.imageUrl} alt="preview" />
              <p>Modifier</p>
            </>
          ) : (
            <>
              <Image src={addFileIMG} alt="Add file" />
              <p>Ajouter une image</p>
            </>
          )}
        </div> */}
        {/* static */}
        <div className="AddImage">
          <Image src={addImageCross} alt="Add file" />
          <div className="addImgText">Ajouter une image</div>
        </div>

        <input type="file" id="file" />
      </label>
      <button className="add-button" type="submit">
        Publier
      </button>
    </form>
  );
}

export default BookForm;
