// 📁 models/Template.js
const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
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