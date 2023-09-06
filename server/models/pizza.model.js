const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  imageSrc: String,
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
  operations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operation",
    },
  ],
  date: {
    type: Date,
    default: Date.new,
  },
});

PizzaSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Pizza", PizzaSchema);
