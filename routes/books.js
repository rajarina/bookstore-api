const express = require("express");
const router = express.Router();
const books = require("../data/books");

let nextId = books.length + 1;

// GET /api/books — list all books
router.get("/", (req, res) => {
  res.json(books);
});

// GET /api/books/:id — get a single book
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST /api/books — create a new book
router.post("/", (req, res) => {
  const { title, author, price, stock } = req.body;
  if (!title || !author || price == null || stock == null) {
    return res.status(400).json({ error: "title, author, price, and stock are required" });
  }
  const book = {
    id: nextId++,
    title,
    author,
    price: parseFloat(price),
    stock: parseInt(stock),
    createdAt: new Date(),
  };
  books.push(book);
  res.status(201).json(book);
});

// PUT /api/books/:id — replace a book
router.put("/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const { title, author, price, stock } = req.body;
  if (!title || !author || price == null || stock == null) {
    return res.status(400).json({ error: "title, author, price, and stock are required" });
  }

  books[index] = {
    ...books[index],
    title,
    author,
    price: parseFloat(price),
    stock: parseInt(stock),
  };
  res.json(books[index]);
});

// PATCH /api/books/:id — partial update
router.patch("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, author, price, stock } = req.body;
  if (title != null) book.title = title;
  if (author != null) book.author = author;
  if (price != null) book.price = parseFloat(price);
  if (stock != null) book.stock = parseInt(stock);

  res.json(book);
});

// DELETE /api/books/:id — remove a book
router.delete("/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
