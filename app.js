const express = require("express");
const app = express();

const cartRoutes = require("./cartRoutes")
const db = require("./fakeDb");

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.use("/items", cartRoutes);

/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new Error("page not found");
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;