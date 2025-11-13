import User from "./models/User.js";
const dummy = await User({
    name : "Dummy User",
    email : "ajsnu@gmail.com",
    password:"lol",
    verificationToken:"lolultra"

});

console.log(dummy);
