const express = require("express");
const router = express.Router();
const db = require("../connectDB/connectDB");
// router api/login
// GET
// @desc: check if user is logged in
// @access: public

router.post("/login", (req, res) => {
    const cus_email = req.body.cus_email;
    const cus_pass = req.body.cus_pass;
    var sql =
        "SELECT * FROM uitfood.customer WHERE cus_email = ? AND cus_pass = ?";
    db.query(sql, [cus_email, cus_pass], (err, result) => {
        if (err) throw err;
        // console.log(result);
        if (result.length > 0) {
            if (res) {
                // console.log("success");
                res.send({
                    message: "success",
                    result: result,
                });
            } else {
                res.send({ message: "Wrong cus_pass" });
            }
        } else {
            res.send({ message: "Wrong cus_email" });
        }
    });
});

// router api/data
// GET
// @desc:
// @access: public

router.get("/data", (req, res) => {
    var sql = "SELECT * FROM uitfood.customer";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

module.exports = router;
