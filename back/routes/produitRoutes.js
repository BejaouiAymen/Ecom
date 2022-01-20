const router = require("express").Router();
const produitController = require("../controllers/produitController");
const verifyToken = require("../middlewares/verifyToken");

// // créé une nouveaux produit suivant cette path
router.post("/produit", verifyToken, produitController.createProduit);
// // créé une nouveaux produit suivant cette path
router.post(
  "/produit/:_id",
  verifyToken,
  produitController.addProduitToCategorie
);
// // delete produit selon cette path
router.delete("/produit/:_id", verifyToken, produitController.deleteProduit);
// // modifier produit selon cette path
router.put("/produit/:_id", verifyToken, produitController.updateProduit);
// // recuperer des produit
router.get("/produits", produitController.getAllProduit);
// // recuperer des produit
router.get("/produit/:_id", verifyToken, produitController.getOneProduit);

module.exports = router;
