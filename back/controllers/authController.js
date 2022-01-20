const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { name, email, address, password,paymentMethod } = req.body.data;
  const role="user"
console.log(password)
  bcrypt
    .hash(password, 10)
    .then(async (hashedPassword) => {
      const user = new User({
        name,
        email,
        role:1,
        address,
        password: hashedPassword,
        paymentMethod,
       
      });
      console.log(user)

      if (user) {
        await user.save();
        res.status(201).json({ user });
      } else {
        res.status(403).json({ error: "user cannot be created" });
      }
    })
    .catch((error) => {
      console.log(error)

      res.status(500).json({ error });
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
 
  bcrypt
    .compare(password, user.password)
    .then(async (samePassword) => {
      if (samePassword) {
        const token = jwt.sign(
          { id: user._id, email: user._email },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({ token });
      } else {
        res.status(403).json({ error: "wrong credentials" });
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error });
    });
};
