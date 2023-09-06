const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  operation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Operation",
  },
  pizzas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
    },
  ],
});

IngredientSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
