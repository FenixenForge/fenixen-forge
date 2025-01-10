import img from "../../lib/img";
import "../../../styles/mobile.css";
import { Icon } from "@iconify/react";

export default function mobilePage() {
  return (
    <>
      <nav>
        <img src={img.logoName} alt="" />
      </nav>
      <div className="mobile-container">
        <div className="mobile-alert">
          <h1>Fenixen Forge</h1>
          <h3>No esta disponible por ahora para Mobil</h3>
          <p>Usa la Vista Estritorio para usar nuestro sitio web</p>
        </div>
        <div className="mobile-tuto">
          <h2>Como activar la Vista Escritorio</h2>
          <img src={img.escritorio} alt="" />
        </div>
      </div>
    </>
  );
}
