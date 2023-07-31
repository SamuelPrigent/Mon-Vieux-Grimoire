import Image from "next/image";
import Map from "@/assets/map_footer.png";
import "./footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="MapBlock">
        <div className="mapDiv">
          <Image
            src={Map}
            height={155}
            alt="Position Géographique Mon Vieux Grimoire"
            priority
          />
          <div className="brownCircle"></div>
        </div>
        <address className="addressText">
          {"8 place Jeanne d'Arc"}
          <br />
          59000 Lille
          <br />
          <a
            className="MapLink"
            target="_blank"
            href={
              "https://www.google.com/maps/place/8+Pl.+Jeanne+d'Arc,+59000+Lille,+France/@50.6259112,3.0641085,17z/data=!3m1!4b1!4m5!3m4!1s0x47c2d590f9fc2c2d:0xf0d7614e1aa1964e!8m2!3d50.6259112!4d3.0641085"
            }
            rel="noreferrer"
          >
            voir sur la carte
          </a>
        </address>
      </div>
      <div className="footerLittleText">
        <p>01 12 23 34 45</p>
        <p>Copyright 2022 - 2023</p>
        <p>Mentions légales</p>
      </div>
    </footer>
  );
}

export default Footer;
