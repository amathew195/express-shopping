const express = require("express");
const db = require("./fakeDb");
const { NotFoundError, BadRequestError } = require("./expressError");
const router = new express.Router();

router.use('/:name', function (req, res, next) {
  const name = req.params.name;
  if (!db.Items.itemsList.find(item => item.name === name)) {
    throw new NotFoundError('This item was not found!');
  }
  return next();
});

router.get("/", function (req, res) {
  const items = db.Items.all();
  return res.json({ 'items': items });
});

router.post("/", validData, duplicateCheck, function (req, res) {
  const item = req.body;
  const addedItem = db.Items.add(item);
  return res.json({ 'added': addedItem });
});

router.get("/:name", function (req, res) {
  const name = req.params.name;
  return res.json(db.Items.get(name));
});

router.patch('/:name', validData, function (req, res) {
  const name = req.params.name;
  const item = req.body;
  const updatedItem = db.Items.update(name, item);
  return res.json({updated: updatedItem});
});

router.delete('/:name', function (req, res) {
  const name = req.params.name;
  db.Items.delete(name);

  return res.json({message: "Deleted"});
});

function duplicateCheck(req, res, next) {
  const name = req.body.name;
  if(db.Items.get(name)) throw new BadRequestError(`${name} already exists!`)
  return next();
}

function validData(req, res, next) {
  const keys = Object.keys(req.body);
  if (!(keys.length === 2 && keys.includes('name') && keys.includes('price'))) {
    throw new BadRequestError('Invalid JSON Format!');
  } else {
    const item = req.body;
    if (isNaN(Number(item.price)) || Number(item.price) < 0) {
      throw new BadRequestError('Invalid Price!');
    }
  }
  return next();
}

module.exports = router;