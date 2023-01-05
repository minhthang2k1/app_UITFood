const express = require("express");
const router = express.Router();
const db = require("../connectDB/connectDB");

// router api/getcart
// GET
// @desc: get all products in cart
// @access: public
// => API: http://localhost:8080/api/getcart

router.get("/getcart/:id", (req, res) => {
    const cus_id = req.params.id;
    var sql =
        "SELECT * FROM uitfood.cart JOIN uitfood.product ON cart.product_id = product.product_id WHERE cus_id = ?";
    db.query(sql, [cus_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// router api/addcart
// POST
// @desc: add product to cart
// @access: private

router.post("/addcart", (req, res) => {
    const { product_id, cart_quantity, cus_id } = req.body;
    var sql =
        "INSERT INTO uitfood.cart (product_id, cart_quantity, cus_id) VALUES (?, ?, ?)";
    db.query(sql, [product_id, cart_quantity, cus_id], (err, result) => {
        if (err) throw err;
        res.send({
            message: "Add product to cart successfully",
        });
    });
    // update product quantity
    var sql =
        "UPDATE uitfood.product SET product_quantity = product_quantity - ? WHERE product_id = ?";
    db.query(sql, [cart_quantity, product_id], (err, result) => {
        if (err) throw err;
    });
});

// router api/updatecart
// PUT
// @desc: update each product in cart
// @access: private

router.put("/updatecartD", (req, res) => {
    const { product_quantity, cart_quantity, cus_id, product_id } = req.body;
    var sql =
        "UPDATE uitfood.cart SET cart_quantity = ? WHERE cus_id = ? AND product_id = ?";
    db.query(sql, [cart_quantity, cus_id, product_id], (err, result) => {
        if (err) throw err;
        res.send({
            message: "Update product in cart successfully",
        });
    });
    // update product quantity
    var sql =
        "UPDATE uitfood.product SET product_quantity = ?+1 WHERE product_id = ?";
    db.query(sql, [product_quantity, product_id], (err, result) => {
        if (err) throw err;
    });
});

router.put("/updatecartP", (req, res) => {
    const { product_quantity, cart_quantity, cus_id, product_id } = req.body;
    var sql =
        "UPDATE uitfood.cart SET cart_quantity = ? WHERE cus_id = ? AND product_id = ?";
    db.query(sql, [cart_quantity, cus_id, product_id], (err, result) => {
        if (err) throw err;
        res.send({
            message: "Update product in cart successfully",
        });
    });
    // update product quantity
    var sql =
        "UPDATE uitfood.product SET product_quantity = ?-1 WHERE product_id = ?";
    db.query(sql, [product_quantity, product_id], (err, result) => {
        if (err) throw err;
    });
});

router.put("/updatecartD0", (req, res) => {
    const { product_quantity, cart_quantity, cus_id, product_id } = req.body;
    var sql =
        "UPDATE uitfood.cart SET cart_quantity = ? WHERE cus_id = ? AND product_id = ?";
    db.query(sql, [cart_quantity, cus_id, product_id], (err, result) => {
        if (err) throw err;
        res.send({
            message: "Update product in cart successfully",
        });
    });
    // update product quantity
    // var sql =
    //     "UPDATE uitfood.product SET product_quantity = ? - 1 WHERE product_id = ?";
    // db.query(sql, [product_id], (err, result) => {
    //     if (err) throw err;
    // });
});

// router api/deletecart
// DELETE
// @desc: Delete product in cart
// @access: private

router.delete("/deletecart/:cus_id", (req, res) => {
    const { cus_id } = req.params;
    const { cart_quantity, product_id } = req.body;
    var sql = "DELETE FROM uitfood.cart WHERE product_id = ? AND cus_id = ?";
    db.query(sql, [product_id, cus_id], (err, result) => {
        if (err) throw err;
        res.send({
            message: "Delete product in cart successfully",
        });
    });
    // update product quantity
    var sql =
        "UPDATE uitfood.product SET product_quantity = product_quantity + ? WHERE product_id = ?";
    db.query(sql, [cart_quantity, product_id], (err, result) => {
        if (err) throw err;
    });
});

// router api/getcartdup
// GET
// @desc: get product in cart duplicate
// @access: private
// => API: http://localhost:8080/api/getcartdup/1/3

router.get("/getcartdup/:product_id/:cus_id", (req, res) => {
    const { product_id, cus_id } = req.params;
    var sql = "SELECT * FROM uitfood.cart WHERE product_id = ? AND cus_id = ?";
    db.query(sql, [product_id, cus_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
