
const mongoose = require('mongoose');

const loginandsignup = mongoose.createConnection("https://restaurant-app-61ro.onrender.com/loginandsignup", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
loginandsignup.on("connected", () => console.log("Connected to loginandsignup"));

const signupschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    verified: { type: Boolean, default: false },
    otp: { type: Number,  default: false  },
    otpExpiry: { type: Number,  default: false  },

})

const signupinfo = loginandsignup.model('info', signupschema);
module.exports = signupinfo;
// const mongoose = require('mongoose');
// async function main() {

//     await mongoose.connect('mongodb://127.0.0.1:27017/loginandsignup')
// }
// main();

// const signupschema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// const signupinfo = mongoose.model('info', signupschema);

// module.exports = signupinfo;
