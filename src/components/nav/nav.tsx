// next
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import "./nav.css";

function Navigation() {
  return (
    <div className="navContainer w-full items-center justify-between bg-white font-libreB">
      <Link href="/">
        <Image className="h-[29px] w-[227px]" src={Logo} alt="logo" priority />
      </Link>
      <div className="flex gap-10 text-lg">
        <Link href="/">Accueil</Link>
        <Link href="/ajouter">Ajouter un livre</Link>
        <Link href="/connexion">Se connecter</Link>
      </div>
    </div>
  );
}

export default Navigation;
