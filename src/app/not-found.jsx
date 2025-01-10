import Link from "next/link";
import "../../styles/404.css";
import img from "../lib/img";
import { Icon } from "@iconify/react";

async function getData() {
  // Aquí podrías hacer una llamada a una API o a una base de datos
  // Por ejemplo:
  // const res = await fetch('https://api.example.com/some-data')
  // return res.json()

  // Por ahora, solo devolveremos un objeto simulado
  return { message: "Datos personalizados para la página 404" };
}

export default async function NotFound() {
  const data = await getData();

  return (
    <div className="error-container">
      <div className="error-img">
        <img src={img.eror} alt="" />
      </div>
      <div className="error-info">
        <h1>Ups al pareces no existe esta pagina</h1>
        <p>Por favor preciona el boton para regresar al inicio</p>
        <Link href="/">
          <Icon icon="material-symbols:home" className="icon-error" /> Volver Al
          Inicio
        </Link>
      </div>
    </div>
  );
}
