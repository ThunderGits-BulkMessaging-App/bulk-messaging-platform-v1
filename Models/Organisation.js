// models/Organisation.js

const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    // industry: {
    //   type: String,
    //   enum: ['Healthcare', 'E-commerce', 'Education', 'Finance', 'Marketing', 'Other'],
    //   default: 'Other',
    // },
    // subscriptionPlan: {
    //   type: String,
    //   enum: ['Free', 'Basic', 'Standard', 'Premium'],
    //   default: 'Free',
    // },
    isActive: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User', // initial user/admin who created this organisation
    //   required: true,
    // },
    // settings: {
    //   smsEnabled: { type: Boolean, default: true },
    //   emailEnabled: { type: Boolean, default: true },
    //   whatsappEnabled: { type: Boolean, default: false },
    //   instagramEnabled: { type: Boolean, default: false },
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Organisation', organisationSchema);
