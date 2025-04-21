const express = require("express");

// Middleware to parse JSON bodies
const app = express();

app.use(express.json());

// Simulated data for API
const books = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  setTimeout(() => {
    try {
      const { genre } = req.query;
      //TODO: ADD CODE HERE ⬇️ to Filter books by genre.
      if (genre) {
        const filteredBooks = books.filter((book) =>
          book.genre.includes(genre)
        );

        if (filteredBooks.length === 0) {
          const err = new Error("No books found with this genre");
          err.status = 404;
          return next(err);
        }

        res.json(filteredBooks);
      } else {
        //TODO: ADD CODE HERE ⬇️
        res.send(books);
      }
    } catch (err) {
      next(err);
    }
  }, 1000); // Simulate a 1-second delay
});

// GET specific book by ID with async/await
app.get("/books/:id", async (req, res, next) => {
  try {
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundBook = books.find(
          (b) => b.id === parseInt(req.params.id, 10)
        );
        if (foundBook) {
          resolve(foundBook);
        } else {
          //TODO: ADD CODE to reject the promise
          const err = new Error("Book not found");
          err.status = 404;
          reject(err);
        }
      }, 1000); // Simulate a 1-second delay
    });
    res.send(book);
  } catch (err) {
    //TODO: ADD CODE HERE ⬇️
    next(err);
  }
});

//TODO: ADD CODE HERE ⬇️
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status;
  const response = {
    message: err.message,
    status: status,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  console.log(err.stack);
  res.status(status).json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🤗`);
});
