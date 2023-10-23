const express = require("express");

const shopController = require("../controller/shopController");
const router = express.Router();

router.get("/", shopController.getShopProducts);
router.get("/cart", shopController.getCart);
router.get("/products", shopController.getProducts);
router.get("/orders", shopController.getOrders);
router.get("/products/:id", shopController.getProductById);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCartDeleteProduct);
router.get("/checkout", shopController.getCheckout);
module.exports = router;
