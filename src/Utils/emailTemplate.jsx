export function generateEmailTemplate(name, email, subject, message) {
  return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo mensaje de contacto</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #c9c9c9;
            background-color: #060607;
          }
          .container {
            background-color: #060607;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          h1 {
            color: #f4f4f4;
          }
          .info {
            background-color: #161617;
            padding: 10px;
            color: #f4f4f4;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .message {
            color: #f4f4f4;
            background-color: #161617;
            padding: 10px;
            border-left: 4px solid #bf0436;;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Nuevo mensaje de contacto</h1>
          <div class="info">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
          </div>
          <div class="message">
            <h2>Mensaje:</h2>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
