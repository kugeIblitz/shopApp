const path = require("path");
const fs = require("fs");

const p = path.join(__dirname, "..", "data", "cart.json");
module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex((p) => p.id === id);

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart
        const existingProduct = cart.products[existingProductIndex];
        existingProduct.qty++;
      } else {
        cart.products.push({ id, qty: 1 });
      }

      // Update the total price
      cart.totalPrice += parseFloat(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteProductFromCart(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.log(err);
        return;
      }

      let cart = JSON.parse(fileContent);
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);

      if (existingProductIndex !== -1) {
        cart.totalPrice -= price * cart.products[existingProductIndex].qty;

        cart.products.splice(existingProductIndex, 1);

        fs.writeFile(p, JSON.stringify(cart), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
