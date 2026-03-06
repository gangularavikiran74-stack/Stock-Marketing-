const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* GET all products */
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
});

/* ADD product */
app.post("/products", (req, res) => {
  const { name, category, quantity, price, supplier } = req.body;

  db.query(
    "INSERT INTO products (name, category, quantity, price, supplier) VALUES (?, ?, ?, ?, ?)",
    [name, category, quantity, price, supplier],
    (err, result) => {
      if (err) res.send(err);
      res.send("Product Added");
    }
  );
});

/* DELETE product */
app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
    if (err) res.send(err);
    res.send("Deleted");
  });
});

/* UPDATE stock */
app.put("/products/:id", (req, res) => {
  const { quantity } = req.body;

  db.query(
    "UPDATE products SET quantity = ? WHERE id = ?",
    [quantity, req.params.id],
    (err) => {
      if (err) res.send(err);
      res.send("Updated");
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));