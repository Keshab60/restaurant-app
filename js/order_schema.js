const mongoose = require("mongoose");
const ordersDB = mongoose.createConnection("mongodb+srv://keshabg500:Keshab07112004@cluster0.vq06nt1.mongodb.net/ordersDB", {
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
