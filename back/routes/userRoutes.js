const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

// testé serveur
router.get("/ping", userController.ping);
// // créé une nouveaux user suivant cette path
router.post("/user", verifyToken, userController.createUser);
// // delete user selon cette path
router.delete("/user/:_id", userController.deleteUser);
// // modifier user selon cette path
router.put("/user/:id", userController.updateUser);
// // recuperer des user
router.get("/users", userController.getAllUser);
// // recuperer des user
router.get("/user/:id", userController.getOneUser);

module.exports = router;
