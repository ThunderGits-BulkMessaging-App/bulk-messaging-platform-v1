const offerPlanModel = require("../models/offerPlanModel");

exports.getOfferPlans = async (req, res) => {
  try {
    const offers = await offerPlanModel.find({ name: { $ne: "free_trial" } });
    res.status(200).json({
      status: 200,
      message: "Fetched all offers",
      data: offers,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch subscriptions",
      data: error.message,
      error: true,
    });
  }
};
