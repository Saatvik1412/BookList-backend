const mongoose = require('mongoose')

const UserDetailsSchema = new mongoose.Schema(
    {
    uname: String,
    email: String,
    password: String,
    },
    {
        collection: "UserInfo",
    }
);
mongoose.model("UserInfo", UserDetailsSchema);
