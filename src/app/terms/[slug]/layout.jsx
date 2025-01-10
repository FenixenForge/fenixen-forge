"use client";

import { useParams } from "next/navigation";

export default function TermsLayout({ children }) {
  const params = useParams();
  const { slug } = params;

  if (!slug) {
    return <div>Cargando...</div>;
  }

  return children;
}
