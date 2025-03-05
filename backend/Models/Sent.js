const mongoose = require("mongoose");

const sentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Sent = mongoose.model("Sent", sentSchema);

module.exports = Sent;
