const Sent = require("../Models/Sent");
const moment = require("moment");

const staticAnalytic = async () => {
  const currentYear = new Date().getFullYear();

  const monthlyEmailAndSmsSeries = [
    {
      name: "Email",
      year: [],
      data: [],
    },
    {
      name: "Sms",
      year: [],
      data: [],
    },
  ];

  const dailyEmailAndSmsSeries = [
    {
      name: "Email",
      day: [],
      data: [],
    },
    {
      name: "Sms",
      day: [],
      data: [],
    },
  ];

  // Monthly Aggregation (last 12 months)
  for (let i = 0; i < 12; i++) {
    const start = moment().month(i).startOf("month").toDate();
    const end = moment().month(i).endOf("month").toDate();
    const monthLabel = moment(start).format("MMM");

    const smsCount = await Sent.countDocuments({
      messageType: "SMS",
      createdAt: { $gte: start, $lte: end },
    });

    const emailCount = await Sent.countDocuments({
      messageType: "Email",
      createdAt: { $gte: start, $lte: end },
    });

    monthlyEmailAndSmsSeries[0].year.push(monthLabel);
    monthlyEmailAndSmsSeries[0].data.push(emailCount);

    monthlyEmailAndSmsSeries[1].year.push(monthLabel);
    monthlyEmailAndSmsSeries[1].data.push(smsCount);
  }

  // Daily Aggregation (last 7 days)
  for (let i = 6; i >= 0; i--) {
    const date = moment().subtract(i, "days");
    const start = date.startOf("day").toDate();
    const end = date.endOf("day").toDate();
    const dayLabel = date.format("DD-MM-YYYY");

    const smsCount = await Sent.countDocuments({
      messageType: "SMS",
      createdAt: { $gte: start, $lte: end },
    });

    const emailCount = await Sent.countDocuments({
      messageType: "Email",
      createdAt: { $gte: start, $lte: end },
    });

    dailyEmailAndSmsSeries[0].day.push(dayLabel);
    dailyEmailAndSmsSeries[0].data.push(emailCount);

    dailyEmailAndSmsSeries[1].day.push(dayLabel);
    dailyEmailAndSmsSeries[1].data.push(smsCount);
  }

  // Totals
  const totalSmsSent = await Sent.countDocuments({ messageType: "SMS" });
  const totalEmailSent = await Sent.countDocuments({ messageType: "Email" });

  return {
    monthlyEmailAndSmsSeries,
    dailyEmailAndSmsSeries,
    totalSmsSent,
    totalEmailSent,
  };
};

module.exports = {staticAnalytic};
