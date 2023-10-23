const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProducts);
router.get("/edit-product/:id", productsController.getEditProducts);

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProducts);
router.post("/edit-product", productsController.postEditProduct);
router.post("/delete-product", productsController.deleteProduct);

router.get("/products", productsController.getAdminProducts);
module.exports = router;
