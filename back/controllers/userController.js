const User = require("../models/UserModel");

exports.ping = async (req, res, next) => {
  res.send("welcome");
};

exports.createUser = async (req, res, next) => {
  const { name, email, address, password, role, paymentMethod } = req.body;

  const user = new User({
    name,
    email,
    address,
    password,
    role,
    paymentMethod,
  });
  if (user) {
    await user.save();
    res.status(201).json({ user });
  } else {
    res.status(403).json({ error: "User cannot be created" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { _id } = req.params;
  const user = await User.findById(_id);

  if (user) {
    await user.deleteOne({ _id });
    res.status(201).json({ msg: "user supprimer" });
  } else {
    res.status(404).json({ msg: "user not found" });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params; //requieri f id
  console.log(req.body)
  const user = User.findById({_id:id}); // recherche par id
  console.log(user)
  if (user) {
    //  existence user
    const user1 = User.findOneAndUpdate({_id:id },{
      name: req.body.User.name,
      email: req.body.User.email,
      address: user.address,
      password: req.body.User.password,
      role: user.role,
      paymentMethod: user.paymentMethod,
    }, { new: true },(err, contact) => {
      if (err) {
        console.log(err)
        res.status(400).json(err);
      }
    });
    res.status(201).json({ user });
  } else {
    res.status(404).json({ message: "user is not found" });
  }
};

// //récuperer des user
exports.getAllUser = async (req, res, next) => {
  const user = await User.find({});
  res.status(201).json({ user });
};
//récuperer des user selon cette path
exports.getOneUser = async (req, res, next) => {
  const { id } = req.params; //requieri f id

  const user = await User.findOne({ _id:id });
  if (user) {
    res.status(201).json({ user });
  } else {
    res.status(400).json("not found");
  }
};
