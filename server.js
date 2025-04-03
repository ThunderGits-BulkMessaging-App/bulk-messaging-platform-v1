const express = require("express");
const app = express();
const connectDB = require("./config/db/db");
const cors = require("cors");
const morgan = require("morgan");
const credentialsRoutes = require('./routes/sms.js');
const contactRoutes = require('./routes/contact.routes.js');
const groupRoutes = require('./routes/group.routes.js');
require("dotenv").config();
connectDB();
app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(morgan("tiny"));

const userRoutes = require("./routes/user");
const commonRoutes = require("./routes/common");

app.use(`${process.env.BASEURL}/user`, userRoutes);
app.use(`${process.env.BASEURL}/`, commonRoutes);
app.use(`${process.env.BASEURL}/sms`, credentialsRoutes);
app.use(`${process.env.BASEURL}/`, contactRoutes);
app.use(`${process.env.BASEURL}/group`, groupRoutes);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`listening on port ${port}`));
