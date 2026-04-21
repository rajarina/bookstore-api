const express = require("express");
const path = require("path");
const https = require("https");
const http = require("http");
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Bookstore API running on http://localhost:${PORT}`);

  const baseUrl = process.env.RENDER_EXTERNAL_URL;
  if (baseUrl) {
    const client = baseUrl.startsWith("https") ? https : http;
    setInterval(() => {
      client.get(`${baseUrl}/health`, (res) => {
        console.log(`[self-ping] ${new Date().toISOString()} — status ${res.statusCode}`);
        res.resume();
      }).on("error", (err) => {
        console.error(`[self-ping] failed: ${err.message}`);
      });
    }, 10 * 60 * 1000);
    console.log(`Self-ping active → ${baseUrl}/health every 10 min`);
  }
});
