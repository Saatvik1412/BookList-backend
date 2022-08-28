const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

  const mongoUrl="mongodb+srv://starlord:linkinpa@cluster0.sk1bjdg.mongodb.net/?retryWrites=true&w=majority"

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://mybooklist-web.netlify.app/")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept Authorization"
//   )
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "POST, PUT, PATCH, GET, DELETE"
//     )
//     return res.status(200).json({})
//   }
//   next()
// })
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");


app.use("/", require("./routes/bookroutes"));


const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { uname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ status: "User Exists" });
    }
    await User.create({
      uname:uname,
      email:email,
      password:encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const {email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user){
    return res.json({ error: "User Not found" });

  }



  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
app.get('/', (_, res) => res.send('damn'))
app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started");
  });
app.use(cors());
