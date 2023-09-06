const express = require("express");
const router = express.Router();

const Ingredient = require("../models/ingredient.model.js");
const Pizza = require("../models/pizza.model.js");
const { difference } = require("../utils/index.js");

// Retrieve all Ingredients
router.get("/", async (req, res) => {
  Ingredient.find()
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

// Retrieve a single Ingredient with id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  Ingredient.findById(id)
    .populate("pizzas")
    .populate("operation")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Ingredient with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Ingredient with id=" + id });
    });
});

// Create a new Ingredient
router.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newIngredient = await Ingredient.create({
    name: req.body.name,
    operation: req.body.operation,
    pizzas: req.body.pizzas,
  });

  await Pizza.updateMany(
    { _id: newIngredient.pizzas },
    { $push: { ingredients: newIngredient._id } }
  );

  return res.send(newIngredient);
});

// Delete a Ingredient with id
router.delete("/:id", async function (req, res) {
  const _id = req.params.id;

  const ingredient = await Ingredient.findOne({ _id });

  await Ingredient.findByIdAndRemove(_id);

  await Pizza.updateMany(
    { _id: ingredient?.pizzas },
    { $pull: { ingredients: ingredient?._id } }
  );

  return res.send("Pizza was deleted successfully");
});

// Update a Pizza with id
router.put("/:id", async function (req, res) {
  const _id = req.params.id;
  const ingredient = req.body;

  const newPizzas = ingredient.pizzas || [];

  const oldIngredient = await Ingredient.findOne({ _id });
  const oldPizzas = oldIngredient.pizzas;

  Object.assign(oldIngredient, ingredient);
  const newIngredient = await oldIngredient.save();

  const addedPizzas = difference(newPizzas, oldPizzas);
  const removedPizzas = difference(oldPizzas, newPizzas);

  await Pizza.updateMany(
    { _id: addedPizzas },
    { $addToSet: { ingredients: oldIngredient._id } }
  );
  await Pizza.updateMany(
    { _id: removedPizzas },
    { $pull: { ingredients: oldIngredient._id } }
  );

  return res.send(newIngredient);
});

module.exports = router;
