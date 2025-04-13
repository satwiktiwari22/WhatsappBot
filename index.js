// index.js
import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";
import { handleMessage } from "./handlers/messageHandler.js";

const { Client, LocalAuth } = pkg;
dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth({ clientId: process.env.CLIENT_ID }),
});

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("ready", () => console.log("✅ WhatsApp client is ready"));
client.on("message", (message) => handleMessage(message, client));

client.initialize();
