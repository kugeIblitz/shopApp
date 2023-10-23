const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getShopProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "cart",
    path: "/cart",
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProdById(prodId, (product) => {
    Cart.deleteProductFromCart(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  Product.findProdById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "products",
      path: "/products",
      prods: products,
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "orders",
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.getProductById = (req, res, next) => {
  const prodId = req.params.id;
  Product.findProdById(prodId, (product) => {
    res.render("shop/product-detail", {
      path: "/products/:id",
      pageTitle: "product details",
      product: product,
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
