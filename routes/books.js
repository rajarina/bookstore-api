const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DB_PATH = path.join(__dirname, "../data/db.json");

const SEED = {
  books: [
    { id: 1, title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt", price: 49.99, stock: 12, createdAt: "2024-01-10T08:00:00.000Z" },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", price: 39.99, stock: 8, createdAt: "2024-01-15T09:30:00.000Z" },
    { id: 3, title: "You Don't Know JS", author: "Kyle Simpson", price: 29.99, stock: 20, createdAt: "2024-02-01T10:00:00.000Z" },
    { id: 4, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", price: 54.99, stock: 5, createdAt: "2024-02-20T11:15:00.000Z" },
    { id: 5, title: "The Art of Computer Programming", author: "Donald E. Knuth", price: 89.99, stock: 3, createdAt: "2024-03-05T14:00:00.000Z" },
  ],
};

if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(SEED, null, 2));
}

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function nextId(books) {
  return books.length === 0 ? 1 : Math.max(...books.map((b) => b.id)) + 1;
}

// GET /api/books
router.get("/", (req, res) => {
  const { books } = readDB();
  res.json(books);
});

// GET /api/books/:id
router.get("/:id", (req, res) => {
  const { books } = readDB();
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST /api/books
router.post("/", (req, res) => {
  const { title, author, price, stock } = req.body;
  if (!title || !author || price == null || stock == null) {
    return res.status(400).json({ error: "title, author, price, and stock are required" });
  }
  const db = readDB();
  const book = {
    id: nextId(db.books),
    title,
    author,
    price: parseFloat(price),
    stock: parseInt(stock),
    createdAt: new Date().toISOString(),
  };
  db.books.push(book);
  writeDB(db);
  res.status(201).json(book);
});

// PUT /api/books/:id
router.put("/:id", (req, res) => {
  const { title, author, price, stock } = req.body;
  if (!title || !author || price == null || stock == null) {
    return res.status(400).json({ error: "title, author, price, and stock are required" });
  }
  const db = readDB();
  const index = db.books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  db.books[index] = {
    ...db.books[index],
    title,
    author,
    price: parseFloat(price),
    stock: parseInt(stock),
  };
  writeDB(db);
  res.json(db.books[index]);
});

// PATCH /api/books/:id
router.patch("/:id", (req, res) => {
  const db = readDB();
  const book = db.books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, author, price, stock } = req.body;
  if (title != null) book.title = title;
  if (author != null) book.author = author;
  if (price != null) book.price = parseFloat(price);
  if (stock != null) book.stock = parseInt(stock);

  writeDB(db);
  res.json(book);
});

// DELETE /api/books/:id
router.delete("/:id", (req, res) => {
  const db = readDB();
  const index = db.books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  db.books.splice(index, 1);
  writeDB(db);
  res.status(204).send();
});

module.exports = router;
