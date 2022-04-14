const express = require("express");
const { request } = require("./app");

const db = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items in cart */
router.get("/", function (req, res) {
  return res.json({items: db.items});
});

/** POST /items: add item to list of items */
router.post("/", function (req, res) {
  db.items.push(req.body);
  return res
  .status(201)
  .json({added: req.body});
});

/** DELETE /items/:name: delete item, return {message: Deleted} */
router.delete("/:name", function (req, res) {
  db.items.delete(req.params.name);
  return res.json({ message: "Deleted" });
});

/** GET /items/:name: get item using name in url */
router.get("/:name", function (req, res) {
  let [item] = db.items.filter(item => item.name == req.params.name);
  return res.json(item);
});

module.exports = router;