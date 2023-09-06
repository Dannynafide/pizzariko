const mongoose = require("mongoose");

const OperationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pizzas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
    },
  ],
});

OperationSchema.virtual("ingredients", {
  ref: "Ingredient",
  localField: "_id",
  foreignField: "operation",
  justOne: false,
});

OperationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Operation", OperationSchema);
