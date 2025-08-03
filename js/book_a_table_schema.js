const mongoose = require("mongoose")

const book_a_table = mongoose.createConnection("mongodb://127.0.0.1:27017/book_a_table", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
book_a_table.on("connected", () => console.log("Connected to book_a_table"));

const book_a_table_schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: String, required: true },
    requests: { type: String, required: true },
    userId: { type: String, required: true }


})

const book = book_a_table.model("book_a_table_schema_info", book_a_table_schema)
module.exports = book;






