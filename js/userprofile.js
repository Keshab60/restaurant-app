const mongoose = require("mongoose");
const userprofileimg = mongoose.createConnection("mongodb+srv://keshabg500:Keshab07112004@cluster0.vq06nt1.mongodb.net/userprofileimg", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
userprofile.on("connected", () => console.log("Connected to userprofile"));

const userprofileimgschema = new mongoose.Schema({
    id:{ type: Number, required: true },
    Subtotal: { type: String, required: true },
    DeliveryCharge: { type: String, required: true },
    Total:{ type: String, required: true }


});
const profileIMG =userprofileimg.model("imageURL",userprofileimgschema  );
module.exports =profileIMG;
