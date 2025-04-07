const express = require("express");
const app = express();
const connectDB = require("./config/db/db");
const cors = require("cors");
const morgan = require("morgan");
// const credentialsRoutes = require('./routes/sms.js');
const contactRoutes = require('./routes/contact.routes.js');
const groupRoutes = require('./routes/group.routes.js');
const credentialsRoutes = require('./routes/credentials.routes.js');
const smsCredentialsRoutes = require('./routes/smsCredentials.routes.js');
const smsCampaignRoutes = require('./routes/smsCampaign.routes.js');
const emailCredentialsRoutes = require('./routes/emailCredential.routes.js');
const emailCampaignRoutes = require('./routes/emailCampaign.routes.js');
const templateRoutes = require('./routes/template.routes.js');
require("dotenv").config();
connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("tiny"));

const userRoutes = require("./routes/user");
const commonRoutes = require("./routes/common");

app.use(`${process.env.BASEURL}/user`, userRoutes);
app.use(`${process.env.BASEURL}/`, commonRoutes);
// app.use(`${process.env.BASEURL}/sms`, credentialsRoutes);
app.use(`${process.env.BASEURL}/`, contactRoutes);
app.use(`${process.env.BASEURL}/group`, groupRoutes);
app.use(`${process.env.BASEURL}`, credentialsRoutes);
app.use(`${process.env.BASEURL}`, smsCredentialsRoutes);
app.use(`${process.env.BASEURL}`, smsCampaignRoutes);
app.use(`${process.env.BASEURL}`, emailCredentialsRoutes);
app.use(`${process.env.BASEURL}`, emailCampaignRoutes);
app.use(`${process.env.BASEURL}/templates`, templateRoutes);


const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`listening on port ${port}`));
