const jwt = require("jsonwebtoken");

// cette methode pour vérifier autorisation du router
const privatekey = process.env.PRIVATE_KEY;

//methode token
module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  //console.log(req.headers)
  if (!token) {
    // est ce ily a une data existe dans le token ou non
    res.status(400).json({ msg: " acces réjetter !" });
   
  }
  try {
    jwt.verify(token, process.env.PRIVATE_KEY); // vrification est ce que token vraie ou non
    next(); // pour passé vers l'autre middleware
  } catch (e) {
    console.log(e)

    res.status(400).json({ msg: e });
  }
};
