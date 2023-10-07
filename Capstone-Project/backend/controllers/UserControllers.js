const jwt = require("jsonwebtoken");

const userSchema = require("../Model/UserModel");

//This is the function in the backend that links up to the sign up endpoint which creates a new user document
const signUpUser = async (req, res) => {
  try {
    let payload = {
      username: req.body.username,
    };

    let jwtToken = jwt.sign(JSON.stringify(payload), "SecretKey", {
      algorithm: "HS256",
    });
    //This creates the new user according to the userSchema
    const user = await userSchema.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
    });

    res
      .status(200)
      .json({ message: "Sign Up Successful", user: user, token: jwtToken });
    console.log(user);
  } catch (error) {
    res.send([error, ""]);
  }
};

//This is the function which will log in a user
const logInUser = async (req, res) => {
  try {
    const user = await userSchema.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (req.body.password != user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    let payload = {
      username: req.body.username,
      password: req.body.password,
    };

    let token = jwt.sign(JSON.stringify(payload), "SecretKey", {
      algorithm: "HS256",
    });

    res
      .status(200)
      .json({ message: "Login Successful", user: user, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signUpUser, logInUser };
