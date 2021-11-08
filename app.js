// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const port = process.env.PORT;
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorController = require("./controllers/errorController");
const imageRoute = require("./routes/ImageRoute");
const cartRoute = require("./routes/cartRoute");

////////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

////////////////////////////////////////////////////////////////////////////////

const passport = require("passport");
require("./config/passport");
app.use(passport.initialize());

////////////////////////////////////////////////////////////////////////////////

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
app.use("/cart", cartRoute);

app.use(errorController);

app.listen({ port }, () => {
  console.log(`server is running on port ${port}`);
});
