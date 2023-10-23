const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "data", "products.json");
const Cart = require("./cart");

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }

    const products = JSON.parse(fileContent);
    return cb(products);
  });
};

module.exports = class Product {
  constructor(id, title, price, image, desc) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
    this.desc = desc;
  }

  static delete(id) {
    console.log(id);
    getProductFromFile((products) => {
      const existingProductIndex = products.findIndex((prod) => prod.id === id);

      if (existingProductIndex !== -1) {
        const product = products[existingProductIndex];

        // Call the deleteProductFromCart method to update the cart
        Cart.deleteProductFromCart(id, product.price);

        // Remove the product from the products array
        products.splice(existingProductIndex, 1);

        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log(`Product with ID ${id} not found.`);
      }
    });
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        if (existingProductIndex !== -1) {
          products[existingProductIndex] = this;
        } else {
          console.log("Product with this ID doesn't exist.");
        }
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static findProdById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }
};
