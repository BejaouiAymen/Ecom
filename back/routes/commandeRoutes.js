const router = require("express").Router();
const commandeController = require("../controllers/commandeController");
const verifyToken = require("../middlewares/verifyToken");

// // créé une nouveaux commande suivant cette path
router.post("/commande", verifyToken, commandeController.createCommande);
// // delete commande selon cette path
router.delete("/commande/:_id", verifyToken, commandeController.deleteCommande);
// // modifier commande selon cette path
router.put("/commande/:_id", verifyToken, commandeController.updateCommande);
// // recuperer des commande
router.get("/commandes", verifyToken, commandeController.getAllCommande);
// // recuperer des commande
router.get("/commande/:_id", verifyToken, commandeController.getOneCommande);

module.exports = router;
