const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./connectDB/connectDB");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

// require API routes
const login = require("./routes/Login");
const register = require("./routes/Register");
const profile = require("./routes/Profile");
const discount = require("./routes/Discount");
const product = require("./routes/Product");
const cart = require("./routes/Cart");
const invoice = require("./routes/Invoice");
const my_coupon = require("./routes/MyCoupon");

// call API routes
// Login
app.use("/api", login);

// Register
app.use("/api", register);

// Profile
app.use("/api", profile);

// Discount
app.use("/api", discount);

// My Coupon
app.use("/api", my_coupon);

// Product
app.use("/api", product);

// Cart
app.use("/api", cart);

// Invoice
app.use("/api", invoice);
