const express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3001;
app.listen(port, () => {
  console.log("App is listening on port", port);
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});
MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    var db = client.db("productsDB");
    if (db) {
      console.log("Database Connected!");
    }

    db.collection("products", (err, collection) => {
      app.get("/displayProducts", (req, res) => {
        collection.find().toArray((err, items) => {
          if (err) throw err;
          res.set("Access-Control-Allow-Origin", "*");
          res.json(items);
        });
      });
      app.post("/insertProduct", (req, res) => {
        db.collection("products").countDocuments((err, count) => {
          if (err) throw err;
          db.eval("getNextSequence('id')", function (err, result) {
            console.log(result);
          });
          var query = {
            id: count + 1,
            name: req.body.name,
            categories: req.body.categories,
            price: req.body.price,
            quantity: req.body.quantity,
          };
          collection.insertOne(query, (err, res) => {
            if (err) throw err;
            console.log(res);
          });
        });
      });
    });
  }
);
app.get("/", (req, res) => {
  res.send("Error 404!");
});
