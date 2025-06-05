const mongoose = require("mongoose");

const emailCredentialSchema = new mongoose.Schema({
  organisation: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation", required: true },
  service: { type: String, default: "Gmail" },
  email: { type: String, required: true },
  password: { type: String, required: true } // Consider encryption later
}, { timestamps: true });

emailCredentialSchema.index({ userId: 1, email: 1 }, { unique: true });


module.exports = mongoose.model("EmailCredential", emailCredentialSchema);
