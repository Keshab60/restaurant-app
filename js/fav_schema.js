const mongoose = require("mongoose")

const fav_connect = mongoose.createConnection("mongodb://127.0.0.1:27017/favorate_dishes", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
fav_connect.on("connected", () => console.log("Connected to favorate_dishes"));

const favourateschema = new mongoose.Schema({

    ImageUrl: { type: String, required: true },
    dishname: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true }

})

const favorate = fav_connect.model("dishes", favourateschema)
module.exports = favorate;






