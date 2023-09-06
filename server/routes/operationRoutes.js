const express = require("express");
const router = express.Router();

const Operation = require("../models/operation.model.js");
const Pizza = require("../models/pizza.model.js");
const { difference } = require("../utils/index.js");

// Retrieve all Operations
router.get("/", async (req, res) => {
  Operation.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving operations.",
      });
    });
});

// Retrieve a single Operation with id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  Operation.findById(id)
    .populate({
      path: "ingredients",
    })
    .populate("pizzas")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Operation with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Operation with id=" + id });
    });
});

// Create a new Operation
router.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newOperation = await Operation.create({
    name: req.body.name,
    pizzas: req.body.pizzas,
  });

  await Pizza.updateMany(
    { _id: newOperation.pizzas },
    { $push: { ingredients: newOperation._id } }
  );

  res.send(newOperation);
});

// Delete a Operation with id
router.delete("/:id", async function (req, res) {
  const _id = req.params.id;

  const operation = await Operation.findOne({ _id });

  await Operation.findByIdAndRemove(_id);

  await Pizza.updateMany(
    { _id: operation?.pizzas },
    { $pull: { operations: operation?._id } }
  );

  return res.send("Pizza was deleted successfully");
});

// Update a Operation with id
router.put("/:id", async function (req, res) {
  const _id = req.params.id;
  const operation = req.body;

  const newPizzas = operation.pizzas || [];

  const oldOperation = await Operation.findOne({ _id });
  const oldPizzas = oldOperation.pizzas;

  Object.assign(oldOperation, operation);
  const newOperation = await oldOperation.save();

  const addedPizzas = difference(newPizzas, oldPizzas);
  const removedPizzas = difference(oldPizzas, newPizzas);

  await Pizza.updateMany(
    { _id: addedPizzas },
    { $addToSet: { operations: oldOperation._id } }
  );
  await Pizza.updateMany(
    { _id: removedPizzas },
    { $pull: { operations: oldOperation._id } }
  );

  return res.send(newOperation);
});

module.exports = router;
