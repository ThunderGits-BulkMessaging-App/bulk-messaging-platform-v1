const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  key: { type: String, required: true },          // e.g., 'billing', 'create_medicine'
  label: { type: String, required: true },        // e.g., 'Billing', 'Create Medicine'
  description: { type: String },                  // Optional: to explain what this feature does
  isEnabled: { type: Boolean, default: false },   // True if this feature is accessible in this plan
});

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["free_trial", "basic", "standard", "premium"],
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0, // Free trial = 0
    },
    validityInDays: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
    features: [featureSchema], // All the features enabled/disabled in this plan

    limits: {
      userLimit: { type: Number, default: 1 },
      departmentLimit: { type: Number, default: 1 },
      medicineLimit: { type: Number, default: 50 },
      saleLimitPerDay: { type: Number, default: 100 },
    },

    isVisible: {
      type: Boolean,
      default: true, // Can toggle whether this plan is shown on frontend or not
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OfferPlan", planSchema);
