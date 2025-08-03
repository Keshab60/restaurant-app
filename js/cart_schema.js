const mongoose = require("mongoose");
const cartDB = mongoose.createConnection("https://restaurant-app-61ro.onrender.com/cartDB", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
cartDB.on("connected", () => console.log("Connected to cartDB"));

const cartSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    Dishname: { type: String, required: true },
    ItemQuantity: { type: Number, required: true },
    price: { type: String, required: true },
    TotalPrice: { type: Number, required: true },
    userId: { type: String, required: true }

});
const cart = cartDB.model("cart", cartSchema);
module.exports = cart;
