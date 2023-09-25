const express = require("express");
const router = express.Router();

const Pizza = require("../models/pizza.model.js");
const Ingredient = require("../models/ingredient.model.js");
const Operation = require("../models/operation.model.js");
const { difference } = require("../utils/index.js");

// Retrieve all Pizzas
router.get("/", async (req, res) => {
  Pizza.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

// Retrieve a single Pizza with id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  Pizza.findById(id)
    .populate("ingredients")
    .populate("operations")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Pizza with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Pizza with id=" + id });
    });
});

// Create a new Pizza
router.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newPizza = await Pizza.create({
    name: req.body.name,
    price: req.body.price,
    imageSrc: req.body.imageSrc,
    ingredients: req.body.ingredients,
    operations: req.body.operations,
  });

  await Ingredient.updateMany(
    { _id: newPizza.ingredients },
    { $push: { pizzas: newPizza._id } }
  );

  await Operation.updateMany(
    { _id: newPizza.operations },
    { $push: { pizzas: newPizza._id } }
  );

  return res.send(newPizza);
});

// Delete a Pizza with id
router.delete("/:id", async function (req, res) {
  const _id = req.params.id;

  const pizza = await Pizza.findOne({ _id });

  await Pizza.findByIdAndRemove(_id);

  await Ingredient.updateMany(
    { _id: pizza?.ingredients },
    { $pull: { pizzas: pizza?._id } }
  );

  await Operation.updateMany(
    { _id: pizza?.operations },
    { $push: { pizzas: pizza?._id } }
  );

  return res.send("Pizza was deleted successfully");
});

// Update a Pizza with id
router.put("/:id", async function (req, res) {
  const _id = req.params.id;
  const pizza = req.body;

  const newIngredients = pizza.ingredients || [];
  const newOperations = pizza.operations || [];

  const oldPizza = await Pizza.findOne({ _id });
  const oldIngredients = oldPizza.ingredients;
  const oldOperations = oldPizza.operations;

  Object.assign(oldPizza, pizza);
  const newPizza = await oldPizza.save();

  const addedIngredients = difference(newIngredients, oldIngredients);
  const removedIngredients = difference(oldIngredients, newIngredients);
  const addedOperations = difference(newOperations, oldOperations);
  const removedOperations = difference(oldOperations, newOperations);

  await Ingredient.updateMany(
    { _id: addedIngredients },
    { $addToSet: { pizzas: oldPizza._id } }
  );
  await Ingredient.updateMany(
    { _id: removedIngredients },
    { $pull: { pizzas: oldPizza._id } }
  );
  await Operation.updateMany(
    { _id: addedOperations },
    { $addToSet: { pizzas: oldPizza._id } }
  );
  await Operation.updateMany(
    { _id: removedOperations },
    { $pull: { pizzas: oldPizza._id } }
  );

  return res.send(newPizza);
});

module.exports = router;
