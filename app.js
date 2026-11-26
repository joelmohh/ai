const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
const key = require("./service-account.json");

const auth = new JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ["https://www.googleapis.com/auth/calendar.events"],
});

const calendar = google.calendar({ version: "v3", auth });
const calendarId = "support@joelmo.dev";

async function criarEvento() {
  const inicio = new Date();
  const fim = new Date(inicio.getTime() + 5 * 60 * 1000);
  const res = await calendar.events.insert({
    calendarId,
    sendUpdates: "none",
    requestBody: {
      summary: "Processar pedido",
      description: "Quais são os primeiros 10 diigtos de pi",
      start: { dateTime: inicio.toISOString() },
      end: { dateTime: fim.toISOString() },
    },
  });
  return res.data.id;
}

async function apagarEvento(eventId) {
  await calendar.events.delete({
    calendarId,
    eventId,
    sendUpdates: "none",
  });
}

criarEvento()
  .then((id) => console.log("criado:", id))
  .catch((e) => console.error("ERRO:", e.response?.data || e.message || e));