//This middleware determines whether the email ends with @gmail.com or not
const checkEmail = (req, res, next) => {
  const email = req.body.email;

  if (email.endsWith("@gmail.com")) {
    return next();
  } else {
    res.json("Please enter a valid email");
  }
};

module.exports = { checkEmail };
