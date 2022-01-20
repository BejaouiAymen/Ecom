const router = require("express").Router();
const categorieController = require("../controllers/categorieController");
const verifyToken = require("../middlewares/verifyToken");

// // créé une nouveaux categorie suivant cette path
router.post("/categorie", verifyToken, categorieController.createCategorie);
// // delete categorie selon cette path
router.delete(
  "/categorie/:_id",
  verifyToken,
  categorieController.deleteCategorie
);
// // modifier categorie selon cette path
router.put("/categorie/:_id", verifyToken, categorieController.updateCategorie);
// // recuperer des categorie
router.get("/categories", categorieController.getAllCategorie);
// // recuperer des categorie
router.get("/categorie/:_id", verifyToken, categorieController.getOneCategorie);

module.exports = router;
