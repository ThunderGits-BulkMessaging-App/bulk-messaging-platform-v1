const Subscription = require("../Models/subscriptionModel");



const checkActiveSubscription = async (req, res, next) => {
  try {
    const hospitalId = req.user?.hospital;

    if (!hospitalId) {
      return res.status(403).json({ message: "Hospital not found in user session" });
    }

    const subscription = await Subscription.findOne({ hospital: hospitalId });

    const isExpired = subscription && new Date(subscription.endDate) < new Date();

    if (!subscription || !subscription.isActive || isExpired) {
      return res.status(403).json({ message: "Your subscription is not active." });
    }

    next();
  } catch (error) {
    console.error("Subscription check error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkActiveSubscription;
