"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

export default function CategoriButtonBots() {
  const categories = ["Bots Discord"];
  const pathname = usePathname();

  // Obtener la categoría actual de la URL y restaurar los espacios reemplazando %20 por un espacio
  const currentCategory = pathname?.split("/")[2]?.replace(/%20/g, " ");

  // Asignar íconos de Iconify a las categorías (sin normalización)
  const categoryIcons = {
    "Bots Discord": <Icon icon="ic:outline-discord" />,
  };

  return (
    <div className="categories-container">
      <ul>
        {categories.map((cat) => {
          return (
            <li key={cat}>
              <Link
                href={`/bots/${encodeURIComponent(cat)}`}
                className={currentCategory === cat ? "active" : ""}
              >
                <span className="category-icon">{categoryIcons[cat]}</span>
                {cat}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
