import { notFound } from "next/navigation";
import Terms from "../../../components/Terms/Policies";
import Policies from "../../../components/Terms/Terms";
import Contact from "../../../components/Terms/Contact";

export default async function TermsPage({ params }) {
  // Esperamos a que se resuelva la promesa de params
  const { slug } = await params;

  let Component;
  switch (slug) {
    case "terminos":
      Component = Terms;
      break;
    case "politicas":
      Component = Policies;
      break;
    case "contacto":
      Component = Contact;
      break;
    default:
      notFound();
  }

  return (
    <div>
      <Component />
    </div>
  );
}

export function generateStaticParams() {
  return [{ slug: "terminos" }, { slug: "politicas" }, { slug: "contacto" }];
}
