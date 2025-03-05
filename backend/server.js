const express = require("express");
const app = express();
const connectDB = require("./config/db/db");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
connectDB();

app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(morgan("tiny"));

const userRoutes = require("./routes/user");
const commonRoutes = require("./routes/common");

app.use(`${process.env.BASEURL}/user`, userRoutes);
app.use(`${process.env.BASEURL}/`, commonRoutes);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`listening on port ${port}`));
