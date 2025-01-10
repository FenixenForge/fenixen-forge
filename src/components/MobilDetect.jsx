// src/components/MobilDetect.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DetectMobile() {
  const router = useRouter();

  useEffect(() => {
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    const pathname = window.location.pathname;

    // Si estamos en un dispositivo móvil y no hemos redirigido, redirigir a /mobile-page
    if (isMobile && pathname !== "/mobile-page") {
      // Redirige solo si no estamos ya en la página de móviles
      router.push("/mobile-page");
    } else if (!isMobile && pathname === "/mobile-page") {
      // Si no es móvil y estamos en /mobile-page, redirigir al inicio
      router.push("/");
    }
  }, [router]);

  return null; // Este componente no renderiza nada
}
