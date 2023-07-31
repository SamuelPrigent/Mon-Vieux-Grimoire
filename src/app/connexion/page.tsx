"use client"; // makes component a client component
import { useState } from "react";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import "./connexion.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={`SignIn flex h-100vh items-center justify-center bg-beige`}>
      <Image src={Logo} alt="Logo" height={"46"} priority />
      <form className="Form">
        <label htmlFor="email">
          <p>Adresse email</p>
          <input
            className="form-inputs"
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          <p>Mot de passe</p>
          <input
            className="form-inputs"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <div className="Submit">
          <button
            type="submit"
            className="signin-button"
            // onClick={signIn}
          >
            {"Se connecter"}
          </button>
          <div>ou</div>
          <button
            type="submit"
            className="signin-button"
            // onClick={signUp}
          >
            {"S'inscrire"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
