const Product = require("../models/product");
exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
  });
};

exports.getEditProducts = (req, res, next) => {
  const prodId = req.params.id;
  Product.findProdById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "edit Product",
      path: "/admin/edit-product",
      product: product,
      editing: true,
    });
  });
};

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const desc = req.body.description;
  const img = req.body.image;

  const p = new Product(null, title, price, img, desc);

  p.save();
  res.redirect("/");
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedImg = req.body.image;
  console.log(req.body);
  const p = new Product(
    id,
    updatedTitle,
    updatedPrice,
    updatedImg,
    updatedDesc
  );
  console.log(p);
  p.save();
  res.redirect("/");
};

exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  console.log(req.body);
  Product.delete(id);
  console.log(id);
  res.redirect("/");
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "products",
      path: "/admin/product",
      prods: products,
      editing: false,
    });
  });
};
