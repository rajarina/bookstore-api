# Bookstore API

A simple RESTful API for managing a bookstore inventory, built with Node.js and Express.

## Setup

```bash
npm install
npm start
```

The server starts on `http://localhost:3000`.

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/books` | List all books |
| GET | `/api/books/:id` | Get a single book |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/:id` | Replace a book |
| PATCH | `/api/books/:id` | Partially update a book |
| DELETE | `/api/books/:id` | Delete a book |

## Book Schema

```json
{
  "id": 1,
  "title": "The Pragmatic Programmer",
  "author": "David Thomas & Andrew Hunt",
  "price": 49.99,
  "stock": 12,
  "createdAt": "2024-01-10T08:00:00.000Z"
}
```

## Example Requests

**Create a book**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Jane Doe","price":19.99,"stock":10}'
```

**Update stock**
```bash
curl -X PATCH http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"stock":5}'
```
