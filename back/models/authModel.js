const mongoose = require("mongoose");

let schemaAuthUser = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

var AuthUser = mongoose.model("AuthUser", schemaAuthUser, "authUsers");
module.exports = AuthUser;
