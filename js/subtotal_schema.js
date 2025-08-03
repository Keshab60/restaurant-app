const mongoose = require("mongoose");
const cartDB = mongoose.createConnection("mongodb+srv://keshabg500:Keshab07112004@cluster0.vq06nt1.mongodb.net/cartDB", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
cartDB.on("connected", () => console.log("Connected to subtotal"));

const cartSchema2 = new mongoose.Schema({
    id:{ type: Number, required: true },
    Subtotal: { type: String, required: true },
    DeliveryCharge: { type: String, required: true },
    Total:{ type: String, required: true }


});
const cart2 = cartDB.model("cart2", cartSchema2);
module.exports = cart2;
