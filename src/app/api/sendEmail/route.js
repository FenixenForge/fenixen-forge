import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateEmailTemplate } from "../../../Utils/emailTemplate";

export async function POST(req) {
  // Solo imprimir logs si estás en desarrollo

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generar el HTML del correo usando la plantilla
    const htmlContent = generateEmailTemplate(name, email, subject, message);

    // Detalles del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Nuevo mensaje de ${name}: ${subject}`,
      text: `De: ${name} <${email}>\n\n${message}`, // Versión de texto plano
      html: htmlContent, // Versión HTML
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: "Mensaje enviado con éxito." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
