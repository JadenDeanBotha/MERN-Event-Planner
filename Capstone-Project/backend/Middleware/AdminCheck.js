const userSchema = require("../Model/UserModel");

//This function checks whther or not the user has admin permissions
const adminCheck = async (req, res, next) => {
  const user = await userSchema.findOne({ username: req.body.username });

  console.log(user);

  if (user.admin === true) {
    console.log("You have admin access");
    res.send("You have admin access");
    next();
  } else {
    console.log("You do not have admin access");
    res.send("You do not have admin access");
  }
};

module.exports = { adminCheck };
