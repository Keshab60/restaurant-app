const mongoose = require("mongoose");
const ordersDB = mongoose.createConnection("https://restaurant-app-61ro.onrender.com/ordersDB", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
ordersDB.on("connected", () => console.log("Connected to ordersDB"));


const orderSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    CustomerPhone: String,
    EmailId: String,
    Street: String,
    State: String,
    City: String,
    Pin: String,
    Dish: [String],
    OrderQuantity: [String],
    price: [Number],
    totalPrice: Number,
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});
const Order = ordersDB.model("Order", orderSchema);
module.exports = Order;
