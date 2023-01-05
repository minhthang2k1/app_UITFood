const express = require("express");
const router = express.Router();
const db = require("../connectDB/connectDB");

// router api/product
// GET
// @desc: get all product
// @access: public

router.get("/product", (req, res) => {
    var sql = "SELECT * FROM uitfood.product";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// router api/product/:id
// GET
// @desc: get all product
// @access: public
// => API: http://localhost:8080/api/product/1

router.get("/product/:id", (req, res) => {
    const product_id = req.params.id;
    var sql = "SELECT * FROM uitfood.product WHERE product_id = ?";
    db.query(sql, [product_id], (err, result) => {
        if (err) throw err;
        res.send(...result);
    });
});

// router api/review/:id
// GET
// @desc: get all review of product
// @access: public
// => API: http://localhost:8080/api/review/1

router.get("/review/:id", (req, res) => {
    const product_id = req.params.id;
    const cus_id = req.query.cus_id;
    var sql =
        "SELECT * FROM uitfood.review JOIN uitfood.customer ON review.cus_id = customer.cus_id  WHERE product_id = ?";
    db.query(sql, [product_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// router api/review/:id
// POST
// @desc: add review of product
// @access: public
// => API:
router.post("/review/:id", (req, res) => {
    const product_id = req.params.id;
    const { review_comment, review_rating, review_status, cus_id } = req.body;
    var sql =
        "INSERT INTO uitfood.review (product_id, review_comment, review_rating, review_status, cus_id) VALUES (?, ?, ?, ?, ?)";
    db.query(
        sql,
        [product_id, review_comment, review_rating, review_status, cus_id],
        (err, result) => {
            if (err) throw err;
            res.send({
                message: "Add review success",
            });
        }
    );
});

module.exports = router;
