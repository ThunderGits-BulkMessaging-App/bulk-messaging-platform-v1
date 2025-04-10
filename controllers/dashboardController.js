const { staticAnalytic } = require("../services/dashboardService");


const getAnalytics = async (req, res) => {
  try {
    console.log("first")
    const analyticsData = await staticAnalytic();
    return res.status(200).json({
      success: true,
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
    });
  }
};

module.exports = {
  getAnalytics,
};
