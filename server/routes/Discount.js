const express = require("express");
const router = express.Router();
const db = require("../connectDB/connectDB");

// router api/discount
// GET
// @desc:
// @access: public

router.get("/discount", (req, res) => {
    var today = new Date();
    var date =
        "'" +
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        "'";
    console.log(date);
    const cus_id = req.query.cus_id;
    var sql =
        "SELECT * FROM uitfood.discount WHERE dis_start <= " +
        date +
        "AND dis_end >= " +
        date +
        "AND dis_id NOT IN( SELECT dis_id FROM uitfood.my_coupon WHERE my_coupon.cus_id = ?)";
    db.query(sql, [cus_id], (err, result) => {
        if (err) throw err;
        // console.log(result);
        // console.log(sql);
        res.send(result);
    });
});

module.exports = router;
