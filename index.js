const express = require("express");
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Bookstore API running on http://localhost:${PORT}`);
});
