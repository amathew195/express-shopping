const express = require("express");
const db = require("./fakeDb");
const router = new express.Router();

router.get("/", function (req, res) {
  const items = db.Items.all();
  return res.json({ 'items': items });
});

router.post("/", function (req, res) {
  const item = req.body;
  const addedItem = db.Items.add(item);
  return res.json({ 'added': addedItem });
});

router.get("/:name", function (req, res) {
  const name = req.params.name;
  return res.json(db.Items.get(name));
});


module.exports = router;