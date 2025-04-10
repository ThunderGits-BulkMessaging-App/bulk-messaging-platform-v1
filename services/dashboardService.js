const Sent = require("../Models/Sent");
const moment = require("moment");

const staticAnalytic = async () => {
  const now = moment();
  const startOfYear = moment().startOf("year").toDate();
  const startOfLast12Months = moment().subtract(11, "months").startOf("month").toDate();
  const startOf7Days = moment().subtract(6, "days").startOf("day").toDate();
  const startOfMonth = moment().startOf("month").toDate();
  const endOfMonth = moment().endOf("month").toDate();
  const MONTHLY_TARGET = 10000;

  const data = await Sent.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfLast12Months },
      },
    },
    {
      $project: {
        messageType: 1,
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
        isCurrentMonth: {
          $and: [
            { $gte: ["$createdAt", startOfMonth] },
            { $lte: ["$createdAt", endOfMonth] },
          ],
        },
      },
    },
    {
      $facet: {
        // Monthly aggregation
        monthly: [
          {
            $group: {
              _id: { month: "$month", type: "$messageType" },
              count: { $sum: 1 },
            },
          },
        ],
        // Daily aggregation
        daily: [
          {
            $match: {
              createdAt: { $gte: startOf7Days },
            },
          },
          {
            $group: {
              _id: { day: "$day", type: "$messageType" },
              count: { $sum: 1 },
            },
          },
        ],
        // Total aggregation
        totals: [
          {
            $group: {
              _id: "$messageType",
              count: { $sum: 1 },
              currentMonthCount: {
                $sum: { $cond: ["$isCurrentMonth", 1, 0] },
              },
            },
          },
        ],
      },
    },
  ]);

  const [monthlyData, dailyData, totalData] = [data[0].monthly, data[0].daily, data[0].totals];

  // Monthly Formatting
  const monthlyEmailAndSmsSeries = [
    { name: "Email", year: [], data: [] },
    { name: "Sms", year: [], data: [] },
  ];

  for (let i = 0; i < 12; i++) {
    const date = moment().month(i).startOf("month");
    const label = date.format("MMM");

    const emailCount = monthlyData.find(
      (d) => d._id.month === i + 1 && d._id.type === "Email"
    )?.count || 0;
    const smsCount = monthlyData.find(
      (d) => d._id.month === i + 1 && d._id.type === "SMS"
    )?.count || 0;

    monthlyEmailAndSmsSeries[0].year.push(label);
    monthlyEmailAndSmsSeries[0].data.push(emailCount);

    monthlyEmailAndSmsSeries[1].year.push(label);
    monthlyEmailAndSmsSeries[1].data.push(smsCount);
  }

  // Daily Formatting
  const dailyEmailAndSmsSeries = [
    { name: "Email", day: [], data: [] },
    { name: "Sms", day: [], data: [] },
  ];

  for (let i = 6; i >= 0; i--) {
    const dayLabel = moment().subtract(i, "days").format("DD-MM-YYYY");

    const emailCount = dailyData.find(
      (d) => d._id.day === dayLabel && d._id.type === "Email"
    )?.count || 0;
    const smsCount = dailyData.find(
      (d) => d._id.day === dayLabel && d._id.type === "SMS"
    )?.count || 0;

    dailyEmailAndSmsSeries[0].day.push(dayLabel);
    dailyEmailAndSmsSeries[0].data.push(emailCount);

    dailyEmailAndSmsSeries[1].day.push(dayLabel);
    dailyEmailAndSmsSeries[1].data.push(smsCount);
  }

  // Total & Monthly Target Data
  const totalSmsSent = totalData.find((d) => d._id === "SMS")?.count || 0;
  const totalEmailSent = totalData.find((d) => d._id === "Email")?.count || 0;

  const currentMonthSms = totalData.find((d) => d._id === "SMS")?.currentMonthCount || 0;
  const currentMonthEmail = totalData.find((d) => d._id === "Email")?.currentMonthCount || 0;

  // Monthly % change
  const currentMonthIndex = now.month();
  const lastMonthIndex = (currentMonthIndex + 11) % 12; // handles Jan -> Dec wrap

  const emailData = monthlyEmailAndSmsSeries[0].data;
  const smsData = monthlyEmailAndSmsSeries[1].data;

  const emailPercentChange =
    emailData[lastMonthIndex] > 0
      ? ((emailData[currentMonthIndex] - emailData[lastMonthIndex]) / emailData[lastMonthIndex]) * 100
      : 0;

  const smsPercentChange =
    smsData[lastMonthIndex] > 0
      ? ((smsData[currentMonthIndex] - smsData[lastMonthIndex]) / smsData[lastMonthIndex]) * 100
      : 0;

  // Monthly target % completion
  const smsProgressPercent = (currentMonthSms / MONTHLY_TARGET) * 100;
  const emailProgressPercent = (currentMonthEmail / MONTHLY_TARGET) * 100;

  return {
    monthlyEmailAndSmsSeries,
    dailyEmailAndSmsSeries,
    totalSmsSent,
    totalEmailSent,
    currentMonthSms,
    currentMonthEmail,
    emailPercentChange: emailPercentChange.toFixed(2),
    smsPercentChange: smsPercentChange.toFixed(2),
    smsProgressPercent: smsProgressPercent.toFixed(2),
    emailProgressPercent: emailProgressPercent.toFixed(2),
  };
};

module.exports = { staticAnalytic };
