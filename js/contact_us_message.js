const mongoose = require("mongoose")
const usersenddata = mongoose.createConnection("mongodb://127.0.0.1:27017/usermessage", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
usersenddata.on("connected", () => console.log("Connected to usermessage"));


const messageschema = new mongoose.Schema({
    Name: { type: String, required: false },
    Email: { type: String, required:false },
    Subject: { type: String, required: false },
    Message: { type: String, required: false }
})

const messagemodel = usersenddata.model("usersenddata", messageschema)
module.exports = messagemodel;



