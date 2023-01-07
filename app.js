const fs = require("fs");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const withLog = () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("ready", () => {
    console.log("Conexion exitosa!");
    listenMessage(client);
  });

  client.on("auth_failure", () => {
    console.log(
      "Error de autentificacion, vuelve a generar el codigo QR, ('Borra la carpeta wwebjs_auth')"
    );
  });

  client.initialize();
};

const withOutLog = () => {
  console.log("Iniciando el sistema...");
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Conexion exitosa!");
    listenMessage(client);
  });

  client.on("auth_failure", () => {
    console.log(
      "Error de autentificacion, vuelve agenerar el codigo QR, ('Borra la carpeta wwebjs_auth')"
    );
  });

  client.initialize();
};

/**
 * Esta funcion escucha la entrada de mensajes
 */

const listenMessage = (client) => {
  client.on("message", (msg) => {
    const { from, to, body } = msg;
    console.log(from, to, body);
    message = "Hola, como estas?"
    sendMessage(client, from, message)
  });
};

const sendMessage = (client, to, message) => {

    client.sendMessage(to, message)
}

if (fs.existsSync("./.wwwebjs_auth")) {
  withLog();
} else {
  withOutLog();
}
