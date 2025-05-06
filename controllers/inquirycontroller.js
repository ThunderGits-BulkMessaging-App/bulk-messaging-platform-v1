// controllers/inquiryController.js

const InquiryModel = require("../models/InquiryModel");

exports.createInquiry = async (req, res) => {
  try {
    const inquiryNumber = Date.now() / 1000;
    const inquiry = await InquiryModel.create({ ...req.body, inquiryNumber });
    return res.status(201).json({
      status: 201,
      message: 'Inquiry submitted successfully',
      data: inquiry,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
      error: true,
    });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await InquiryModel.find().populate('resolver', 'name email');
    return res.status(200).json({
      status: 200,
      message: 'Fetched all inquiries successfully',
      data: inquiries,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
      error: true,
    });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const resolver = req.user._id;
    const updateData = {
      status,
      resolver,
      resolvedAt: status === 'resolved' ? new Date() : null,
    };
    const inquiry = await InquiryModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!inquiry) {
      return res.status(404).json({
        status: 404,
        message: 'Inquiry not found',
        error: true,
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Inquiry updated successfully',
      data: inquiry,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
      error: true,
    });
  }
};
