const mongoose = require("mongoose");
const ordersDB = mongoose.createConnection("mongodb://localhost:27017/ordersDB", {
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
