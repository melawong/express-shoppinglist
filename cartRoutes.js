const express = require("express");
const { request } = require("./app");

const db = require("./fakeDb");
const { find, get, _delete, showAllItems, add } = require("./models");

const router = new express.Router();

/** GET /items: get list of items in cart */
router.get("/", function (req, res) {
  return res.json({ items: db.items });
});

/** POST /items: add item to list of items */
router.post("/", function (req, res) {
  add(req.body);
  return res
    .status(201)
    .json({ added: req.body });
});

/** GET /items/:name: get item using name in url */
router.get("/:name", function (req, res) {
  let item = get(req.params.name);
  return res.json(item);
});

/** PATCH /items: update item from list of items */
router.patch("/:name", function (req, res) {
  let item = get(req.params.name);
  item = req.body;
  return res.json({ updated: req.body });
});

/** DELETE /items/:name: delete item, return {message: Deleted} */
router.delete("/:name", function (req, res) {
  _delete(req.params.name);
  return res.json({ message: "Deleted" });
});


module.exports = router;