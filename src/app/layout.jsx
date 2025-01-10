// src/app/layout.jsx
"use client"; // Marcar el archivo como cliente

import "../../styles/main.css";
import "../../styles/variables.css";
import "../../styles/skeleton.css";
import Navigation from "../components/Navigation";
import Ads from "../components/add";
import DetectMobile from "../components/MobilDetect"; // Asegúrate de importarlo aquí
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Obtener la ruta actual

  // Función para manejar el renderizado condicional
  const renderLayout = () => {
    // Si estamos en /mobile-page, solo mostrar el contenido de esa página, sin los elementos comunes
    if (pathname === "/mobile-page") {
      return (
        <html lang="es">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Mobile Fenixen Forge</title>
          </head>
          <body>{children}</body>
        </html>
      );
    }

    // Si no estamos en /mobile-page, renderizamos el layout normal
    return (
      <>
        <Navigation />
        <main className="main">
          <Ads />
          <div className="main-container">{children}</div>
        </main>
      </>
    );
  };

  return (
    <html lang="es">
      <head>
        <link
          rel="shortcut icon"
          href="/image/favicon/favicon.ico"
          type="image/x-icon"
        />
        <title>Fenixen Forge</title>
      </head>
      <body>
        <DetectMobile />
        {renderLayout()}
      </body>
    </html>
  );
}
