"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    // Validación simple
    let errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) errors[key] = `Por favor, ingresa tu ${key}.`;
    });

    setFormErrors(errors);

    // Si no hay errores, el formulario se puede enviar
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Respuesta del servidor:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        setFormSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        console.error("Error de conexión:", error);
        setSubmissionError(
          `Error al conectar con el servidor: ${error.message}`
        );
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="contact-container">
      <div className="form-contact">
        <h1>Enviar Mensaje</h1>

        <form onSubmit={handleSubmit}>
          {["name", "email", "subject"].map((field) => (
            <div key={field} className="inputGroup">
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <label htmlFor={field}>
                <Icon
                  icon={
                    field === "name"
                      ? "mdi:user"
                      : field === "email"
                      ? "ic:baseline-email"
                      : "mdi:chat-alert"
                  }
                  className="icon-contact"
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              {formErrors[field] && (
                <span className="error">{formErrors[field]}</span>
              )}
            </div>
          ))}

          <div className="inputGroup">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tu mensaje"
              rows="5"
              required
              disabled={isSubmitting}
            />
            <label className="label-textarea" htmlFor="message">
              <Icon icon="ic:baseline-message" className="icon-contact" />
              Mensaje:
            </label>
            {formErrors.message && (
              <span className="error">{formErrors.message}</span>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            <Icon icon="streamline:mail-send-email-message-solid" /> {""}
            {isSubmitting ? "  Enviando..." : "Enviar"}
          </button>

          {formSubmitted && (
            <p className="success-message">¡Mensaje enviado con éxito!</p>
          )}
          {submissionError && (
            <p className="error-message">{submissionError}</p>
          )}
        </form>
      </div>

      <div className="info-contact">
        <h2>Contacto</h2>
        {[
          { icon: "mdi:phone", text: "Teléfono: ", value: "5618702283" },
          {
            icon: "mdi:email",
            text: "Correo electrónico: ",
            value: "fenixenforgeto@gmail.com",
          },
        ].map((item, index) => (
          <div key={index} className="contact-label">
            <p>
              <Icon icon={item.icon} className="icon-contact-info" />
              <br />
              {item.text} <br /> {item.value}{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
