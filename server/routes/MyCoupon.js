const express = require("express");
const router = express.Router();
const db = require("../connectDB/connectDB");
// router api/discount
// GET
// @desc: check if user is logged in
// @access: public
router.get("/my_coupon", (req, res) => {
    const cus_id = req.query.cus_id;
    var sql =
        "SELECT * FROM uitfood.my_coupon mc JOIN uitfood.discount d WHERE mc.dis_Id = d.dis_Id AND mc.cus_id = ?";
    db.query(sql, [cus_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//add my coupon
router.post("/my_coupon", (req, res) => {
    const cus_id = req.body.cus_id;
    const dis_id = req.body.dis_id;
    var sql = "INSERT INTO uitfood.my_coupon (cus_id, dis_id) VALUES (?,?)";
    db.query(sql, [cus_id, dis_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// delete my coupon
router.delete("/my_coupon", (req, res) => {
    const cus_id = req.body.cus_id;
    const dis_id = req.body.dis_id;
    var sql = "DELETE FROM uitfood.my_coupon WHERE cus_id = ? AND dis_id = ?";
    db.query(sql, [cus_id, dis_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

module.exports = router;
