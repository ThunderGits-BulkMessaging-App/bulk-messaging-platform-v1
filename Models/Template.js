// 📁 models/Template.js
const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    variables: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);