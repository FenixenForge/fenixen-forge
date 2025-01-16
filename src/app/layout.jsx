// src/app/layout.jsx
'use client'; // Marcar el archivo como cliente

import '../../styles/main.css';
import '../../styles/variables.css';
import '../../styles/skeleton.css';
import Navigation from '../components/Navigation';
import Ads from '../components/add';
import DetectMobile from '../components/MobilDetect'; // Asegúrate de importarlo aquí
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Obtener la ruta actual

  // Función para manejar el renderizado condicional
  const renderLayout = () => {
    // Si estamos en /mobile-page, solo mostrar el contenido de esa página, sin los elementos comunes
    if (pathname === '/mobile-page') {
      return (
        <html lang="es">
          <head>
            <meta
              name="google-adsense-account"
              content="ca-pub-5764070213530134"
            />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5764070213530134"
              crossorigin="anonymous"></script>
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5764070213530134"
              crossorigin="anonymous"></script>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Mobile Fenixen Forge</title>
          </head>
          <body>
            {children}
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5764070213530134"
              crossorigin="anonymous"></script>
          </body>
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
        <meta name="google-adsense-account" content="ca-pub-5764070213530134" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5764070213530134"
          crossorigin="anonymous"
        />
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5764070213530134"
          crossorigin="anonymous"></script>
      </body>
    </html>
  );
}
