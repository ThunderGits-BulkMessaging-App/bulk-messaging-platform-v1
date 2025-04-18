const Razorpay = require("razorpay");
const offerPlanModel = require("../models/offerPlanModel");
const Subscription = require("../Models/subscriptionModel");

// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const planDetail = await offerPlanModel.findById(req.query.offerId);
    if (!planDetail) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: "Subscription plan not found",
      });
    }

    const options = {
      amount: planDetail.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: "Failed to create Razorpay order",
      });
    }

    const subscription = await Subscription.findOne({
      organisation: req.user.organisation,
    });

    if (!subscription) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: "Subscription not found",
      });
    }

    subscription.razorpayOrderId = order.id;
    await subscription.save();

    res.status(200).json({
      status: 200,
      message: "Order created successfully",
      data: order,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: true,
      message: "Error creating order",
      data: error.message,
    });
  }
};


// Verify Razorpay payment success
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Uncomment to enable signature verification
    // const secret = process.env.RAZORPAY_SECRET;
    // const hmac = crypto.createHmac("sha256", secret);
    // hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    // const digest = hmac.digest("hex");

    // if (digest !== razorpay_signature) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: true,
    //     message: "Transaction verification failed",
    //   });
    // }

    const subscription = await Subscription.findOne({
      organisation: req.user.organisation,
    });

    if (!subscription) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: "Subscription not found",
      });
    }

    subscription.transactionId = razorpay_payment_id;
    subscription.isActive = true;
    subscription.isCancelled = false;
    await subscription.save();

    res.status(200).json({
      status: 200,
      error: false,
      message: "Payment verified successfully",
      data: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: true,
      message: "Error verifying payment",
      data: error.message,
    });
  }
};


module.exports = {
  createOrder,
  verifyPayment,
};
