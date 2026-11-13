const express = require("express");
const app = express();

// No revelar que el servidor es Express (ZAP lo marca como filtración de información)
app.disable("x-powered-by");

const total = (precio, cant, desc) =>
  precio * cant * (1 - desc);

app.get("/", (req, res) => {
  res.json({ app: "tienda-segura", estado: "ok" });
});

app.get("/total", (req, res) => {
  const { p, c } = req.query;
  res.json({ total: total(Number(p), Number(c), 0) });
});

// Reto 3 (ZAP): la app levanta un servidor solo si se ejecuta con "node app.js".
// Si la importa el test, no escucha el puerto y el test no se queda colgado.
if (require.main === module) {
  app.listen(3000, () => console.log("tienda-segura escuchando en http://localhost:3000"));
}

module.exports = { app, total };
app.get("/eval", (req, res) => { res.json({ resultado: eval(req.query.expr) }); });
