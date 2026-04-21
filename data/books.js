const books = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    price: 49.99,
    stock: 12,
    createdAt: new Date("2024-01-10T08:00:00Z"),
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 39.99,
    stock: 8,
    createdAt: new Date("2024-01-15T09:30:00Z"),
  },
  {
    id: 3,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    price: 29.99,
    stock: 20,
    createdAt: new Date("2024-02-01T10:00:00Z"),
  },
  {
    id: 4,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    price: 54.99,
    stock: 5,
    createdAt: new Date("2024-02-20T11:15:00Z"),
  },
  {
    id: 5,
    title: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    price: 89.99,
    stock: 3,
    createdAt: new Date("2024-03-05T14:00:00Z"),
  },
];

module.exports = books;
