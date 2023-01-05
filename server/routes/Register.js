const express = require("express");
const router = express.Router();
const db = require("../connectDB/connectDB");
// router api/register
// POST
// @desc:
// @access: public

router.post("/register", (req, res) => {
    const cus_email = req.body.cus_email;
    const cus_pass = req.body.cus_pass;
    var sql = "INSERT INTO uitfood.customer (cus_email, cus_pass) VALUES (?,?)";
    db.query(sql, [cus_email, cus_pass], (err) => {
        if (err) throw err;
        console.log(result);
        if (result)
            res.send({
                message: "success",
                cus_email: req.body.cus_email,
                cus_pass: req.body.cus_pass,
            });
        else {
            res.send({ message: "Wrong cus_email" });
        }
    });
});

module.exports = router;
