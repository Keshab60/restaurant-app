const express = require('express')
const ejs = require('ejs');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const signupinfo = require('./mongoose.js');
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./order_schema.js");
const cartt = require("./cart_schema.js");
const cartt2 = require("./subtotal_schema.js");
const favv = require("./fav_schema.js");
const profileimg = require("./userprofile.js");
const book = require("./book_a_table_schema.js")
const usersenddata = require("./contact_us_message.js")
const paypal = require('@paypal/checkout-server-sdk');
const bodyParser = require('body-parser');
const sendEmail = require("./sendemail.js");
const jwt = require("jsonwebtoken");

const app = express()
const port = 3000

const templatepath = path.join(__dirname, '../templates')
app.set('view engine', 'ejs')
app.use(express.json());
app.set("views", templatepath)
app.use(express.urlencoded({ extended: true }));
// for image
app.use(express.static('public'));
app.use(express.static('js'));
app.use(cors({
  origin: "https://restaurant-app-61ro.onrender.com",  // or wherever your frontend runs //this line means it allows all the data sended from this link  
  credentials: true
}));

app.use(session({
  secret: "your_secret_key", // Change this to a strong secret key
  resave: false,
  saveUninitialized: false
}));


function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

app.get('/user', (req, res) => {
  if (req.session.user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.get('/', (req, res) => {
  // res.render("keshab9", { name: "flex" });
  res.render("keshab9")
})
app.post('/', (req, res) => {
  res.render("keshab9")
})


app.get('/signup', (req, res) => {
  res.render("signup")
})
app.post('/signup', async (req, res) => {
  // if (req.body.name && req.body.password) {
  //   const data = {
  //     name: req.body.name,
  //     password: req.body.password
  //   }
  //   await signupinfo.create(data)
  //   res.redirect("/login")
  // }
  // else {
  //   res.redirect("/signup")
  // }

  const email = req.body.name;
  const password = req.body.password;
  const user = await signupinfo.findOne({ email })
  console.log(" i am magician")
  if (user) {//i add this because when there is no existing username the user.name in the if bracket showed not define the user
    if (email && password && user.email != email) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const usercreate = await signupinfo.create({ email: req.body.name, password: hashedPassword });
      const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
      const expiry = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

      usercreate.otp = otp;
      usercreate.otpExpiry = expiry;
      await usercreate.save();
      // Send email
      sendEmail(email, "Test", "This is a test email.")
        .then(() => console.log("Email sent"))
        .catch((err) => console.error("Error:", err));
      console.log(" i am jadugar")
      res.json({ message: "now check your email" })

    } else {
      res.redirect("/signup");

    }
  } else {
    if (email && password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const usercreate = await signupinfo.create({ email: req.body.name, password: hashedPassword });
      const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
      console.log("keshab")
      const expiry = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

      usercreate.otp = otp;
      usercreate.otpExpiry = expiry;
      await usercreate.save();
      // Send email
      await sendEmail(email, "Test Purpose", `your otp code:${otp}`)
        .then(() => console.log("Email sent"))
        .catch((err) => console.error("Error:", err));
      console.log(" i am jadugar")
      res.redirect("/verify-email")
    } else {
      res.redirect("/signup");
    }
  }
})
app.get("/verify-email", (req, res) => {
  res.render("verify_email")
})
app.post("/verify-otp", async (req, res) => {
  const { Otp } = req.body
  console.log(Otp)
  const user = await signupinfo.findOne({ otp: Otp });
  if (!user) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  if (Date.now() < user.otpExpiry) {
    user.verified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    res.status(200).json({ message: "OTP verified", redirect: "/login" });
  } else {
    res.json({ message: "your otp is expired try again" })
  }
});


app.post('/resend-otp', async (req, res) => {
  const user = await signupinfo.findOne({ email: req.body.email });
  // console.log(user.email)
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  console.log("keshab")
  const expiry = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();
  // Send email
  await sendEmail(user.email, "Test Purpose", `your otp code:${otp}`)
    .then(() => console.log("Email sent"))
    .catch((err) => console.error("Error:", err));
  res.json({ message: "resend the OTP successfully" })
})

app.get('/login', (req, res) => {
  res.render("keshab7")
})
app.post('/login', async (req, res) => {
  // const naming = await signupinfo.findOne({ name: req.body.name });
  // const PAssword = await signupinfo.findOne({ password: req.body.password });
  // const user = await signupinfo.findOne({ name: req.body.name, password: req.body.password });


  // if (user) {
  //   console.log(user.name, user.password)
  //   if (user.name === req.body.name && user.password === req.body.password) {
  //     res.redirect("/")
  //   }
  //   else {
  //     res.render("invalid_credentials")
  //   }
  // }
  // else {
  //   res.render("invalid_credentials")
  // }
  // // res.redirect("/")

  const email = req.body.name;
  const password = req.body.password;
  console.log(email, password)
  const user = await signupinfo.findOne({ email });
  console.log(user)
  if (user && await bcrypt.compare(password, user.password) && user.verified) {
    req.session.user = user; // Store user in session
    console.log("bbjhbhbh")
    console.log("the session after log in:", req.session.user)
    res.redirect("/");

  } else {
    res.render("invalid_credentials");
  }
})

app.get('/forgot_password', async (req, res) => {
  res.render("forgot_password")
})
app.post('/send-otp', async (req, res) => {
  const userr = await signupinfo.findOne({ email: req.body.Email });
  // console.log(user.email)
  if (!userr) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  console.log("keshab")
  const expiry = Date.now() + 5 * 60 * 1000; // expires in 5 minutes
  userr.verified = false;
  userr.otp = otp;
  userr.otpExpiry = expiry;
  await userr.save();
  // Send email
  await sendEmail(userr.email, "Test Purpose", `your otp code:${otp}`)
    .then(() => console.log("Email sent"))
    .catch((err) => console.error("Error:", err));
  res.json({ message: "send the OTP successfully", redirect: "/reset_pas_otp" })
})

app.get('/reset_pas_otp', async (req, res) => {
  res.render("reset_pas_otp");
})
app.post("/verify-otp-for-reset-password", async (req, res) => {
  const { Otp } = req.body
  console.log(Otp)
  const user = await signupinfo.findOne({ otp: Otp });
  if (!user) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  if (Date.now() < user.otpExpiry) {
    user.verified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    res.status(200).json({ message: "OTP verified", redirect: "/reset-password" });
  } else {
    res.json({ message: "your otp is expired try again" })
  }
});

app.get('/reset-password', async (req, res) => {
  res.render("reset_password");
})

app.post("/reset-user-password", async (req, res) => {
  const user_info = await signupinfo.findOne({ email: req.body.Email });
  if (!user_info) return res.status(404).json({ message: "User not found" });
  const HashedPassword = await bcrypt.hash(req.body.Confirmpass, 10)
  user_info.password = HashedPassword;
  await user_info.save();
  res.json({ message: "reset successfully", redirect: "/login" })
});




//FOR PROFILE
app.get('/profile', isAuthenticated, async (req, res) => {
  const currentUserId = req.session.user._id;
  const fav_info = await favv.find({ userId: currentUserId })
  const book_a_table_infos = await book.find({ userId: currentUserId })
  res.render("profile", { fav_info, user: req.session.user, book_a_table_infos })
})
//FOR ABOUTUS
app.get('/aboutus', isAuthenticated, (req, res) => {
  res.render("aboutus")
})
//FOR MENU
app.get('/menu', isAuthenticated, (req, res) => {
  res.render("menu")
})
//FOR COUPONS
app.get('/coupons', isAuthenticated, (req, res) => {
  res.render("coupon")
})
//FOR NOTIFICATIONS
app.get('/notifications', isAuthenticated, (req, res) => {
  res.render("notification")
})
//for contact us

app.get('/contactus', isAuthenticated, (req, res) => {
  res.render("contactus")
})
app.post('/userinfo', (req, res) => {
  const usermessage = usersenddata(req.body)
  usermessage.save()

})


app.get("/cart", isAuthenticated, async (req, res) => {
  const currentUserId = req.session.user._id;
  const cartf = await cartt.find({ userId: currentUserId })
  console.log(cartf)
  res.render("cart", { cartf });
});

app.post("/api/cart", async (req, res) => {
  try {
    console.log("---- Incoming cart API request ----");
    console.log("Request body:", req.body);
    console.log("Session user:", req.session.user); // <== THIS might be undefined!
    console.log(req.session.user._id)
    // Check if session exists
    if (!req.session.user) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const currentUserId = req.session.user._id;
    console.log(req.body.Dishname)
    const cart = new cartt({ ...req.body, userId: currentUserId });
    const cartv = await cartt.findOne({ Dishname: req.body.Dishname, userId: currentUserId })
    console.log(cartv)
    if (cartv) {
      if (cartv.Dishname != req.body.Dishname) {
        await cart.save();
      } else {
        await cartt.updateOne({ Dishname: cartv.Dishname }, {
          $set:
            { ItemQuantity: req.body.ItemQuantity, TotalPrice: req.body.TotalPrice }
        })
      }
    } else {
      await cart.save();
    }
    res.status(201).json({ message: "cart info stored successfully!", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }



})

app.post("/api/cart/subtotal", async (req, res) => {

  const cart = new cartt2(req.body);
  console.log(req.body.Subtotal)
  const sub = await cartt2.findOne({ id: req.body.id })
  //    console.log(sub)
  if (sub) {
    await cartt2.updateOne({ id: req.body.id }, { $set: req.body })
  } else {
    await cart.save()
  }
  res.sendStatus(200);
  // const cartf = await cartt2.find()
  // console.log(cartf)

  // res.render("cart", { cartf });

})

app.post("/api/orders", async (req, res) => {
  try {
    console.log(req.body)
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order stored successfully!", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/cart/delete/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await cartt.findByIdAndDelete(itemId);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Error deleting item");
  }
});

const clientId = "ASTQZ6r8OEbA20uZcLzxs9yfSXNdo2NtYdAkbEY6lo-mZSIvysXo1HmqF01zWNjCpxxnwtgWAN8xOhGy";
const clientSecret = "ELhsY73REmpohM642sz7716QOC0yFDmuHeTRuH6fHDfdJOQdrlOltlTuWH8vCVBXzrMEokhhHLqi9wS0";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Create order route
app.post('/create-order', async (req, res) => {
  const { total } = req.body;
  const itemDetail = await cartt.find()//we fetch the item detail to calculate the price
  const Delivery = await cartt2.find()// same we fetch the delivery fee

  console.log(itemDetail)
  let itemPrice = 0;
  itemDetail.forEach(e => {
    console.log(e.TotalPrice)
    itemPrice = itemPrice + parseInt(e.TotalPrice)
  })
  console.log(itemPrice)
  Delivery.forEach(e => {
    console.log(e.DeliveryCharge)
    deliverycost = e.DeliveryCharge.replace("$", "").trim()
    console.log(deliverycost)
  })
  const wholeTotal = itemPrice + parseInt(deliverycost)
  console.log(wholeTotal)

  const request = new paypal.orders.OrdersCreateRequest();//i want to create a new order according to the request
  request.prefer("return=representation");// you want the full details of the created order returned in the response, not just a minimal acknowledgment.
  request.requestBody({    //it specifies what type of body you want in order
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "USD",
        value: wholeTotal
      }
    }]
  });

  try {
    const order = await client.execute(request);
    res.json({ orderID: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/payment", async (req, res) => {
  let cart2info = await cartt2.find()
  res.render("payment", { cart2info });
});

app.get("/api/dishinfo", async (req, res) => {
  let dishinfo = await cartt.find()
  res.json({ dishinfo });
});
app.post("/get-favorites", isAuthenticated, async (req, res) => {
  const currentUserId = req.session.user._id;
  const fav_items = await favv.find({ userId: currentUserId })
  res.status(201).json(fav_items)


})
app.post("/fav", isAuthenticated, async (req, res) => {
  const currentUserId = req.session.user._id;
  let fav = new favv({ ...req.body, userId: currentUserId })
  const dish = await favv.findOne({ dishname: req.body.dishname, userId: currentUserId })
  console.log(dish)
  if (dish) {
    console.log("already exist")
    // await favv.deleteOne({ dishname: dish.dishname })
    // console.log("delete successfully")

  } else {
    await fav.save()
    console.log("added successfully")
    res.status(201).json({ message: "favorate stored successfully!" });
  }
})

app.post("/fav-delete", isAuthenticated, async (req, res) => {
   const currentUserId = req.session.user._id
  let fav = new favv(req.body)
  const dish = await favv.findOne({ dishname: req.body.dishname,userId: currentUserId })
  console.log(dish)
  if (dish) {
    console.log("already exist")
    await favv.deleteOne({ dishname: dish.dishname })
    console.log("delete successfully")
    res.status(201).json({ message: "deleted successfully!" });
  }

})

app.get("/book-a-table", isAuthenticated, (req, res) => {

  res.render("book_a_table")

})
app.post("/book-a-tablee", isAuthenticated, async (req, res) => {
  const currentUserId = req.session.user._id;
  let book_info = new book({ ...req.body, userId: currentUserId })
  await book_info.save()
  res.json({ message: "successsfully booked" })

})

app.post("/userprofileimg", isAuthenticated, async (req, res) => {
  const currentUserId = req.session.user._id;
  let profileimgURL= new profileimg({ ...req.body, userId: currentUserId })
  await profileimgURL.save()
  res.json({ message: "successsfully added the img url" })

})

app.post("/getuserprofileimg", isAuthenticated, async (req, res) => {
  const currentUserId = req.session.user._id;
  const profileimgURL = await profileimg.find({userId: currentUserId })
  res.json({ imgURL: profileimgURL[0].imgURL})

})
//FOR LOG OUT
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.listen(port, () => {
  console.log(`https://restaurant-app-61ro.onrender.com`)
})

