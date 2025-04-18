const Subscription = require("../Models/subscriptionModel");


// Get current subscription for logged-in user's hospital
exports.getCurrSubscriptions = async (req, res) => {
  try {
    console.log(req.user)
    const subscriptions = await Subscription.findOne({
      organisation: req.user.organisation,
    }).populate("organisation offerPlanId");

    res.status(200).json({
      status: 200,
      message: "Fetched current subscription",
      data: subscriptions,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch subscription",
      data: error.message,
      error: true,
    });
  }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate("organisation");
    res.status(200).json({
      status: 200,
      message: "Fetched all subscriptions",
      data: subscriptions,
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

// Get subscription by hospital ID
exports.getSubscriptionByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const subscription = await Subscription.findOne({ hospital: hospitalId });

    if (!subscription) {
      return res.status(404).json({
        status: 404,
        message: "Subscription not found",
        error: true,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Subscription found",
      data: subscription,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch subscription",
      data: error.message,
      error: true,
    });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Subscription.findByIdAndUpdate(
      id,
      { isCancelled: true, isActive: false },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        status: 404,
        message: "Subscription not found",
        error: true,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Subscription cancelled",
      data: updated,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to cancel subscription",
      data: error.message,
      error: true,
    });
  }
};

// Get all subscriptions (plan perspective?)
exports.getAllSubscriptionsPlan = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      status: 200,
      message: "Fetched all subscriptions",
      data: subscriptions,
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
