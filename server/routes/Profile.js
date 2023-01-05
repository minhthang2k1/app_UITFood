const express = require("express");
const router = express.Router();
const db = require("../connectDB/connectDB");
// router api/profile
// GET
// @desc:
// @access: public

router.get("/profile", (req, res) => {
    const cus_id = req.query.cus_id;
    const cus_email = req.query.cus_email;
    var sql =
        "SELECT * FROM uitfood.customer WHERE cus_id = ? and cus_email = ?";
    db.query(sql, [cus_id, cus_email], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(...result);
    });
});

//get profile by cus_id
router.get("/profile_by_id", (req, res) => {
    const cus_id = req.query.cus_id;
    console.log(cus_id);
    var sql = "SELECT * FROM uitfood.customer where cus_id = ?";
    db.query(sql, [cus_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result) {
            res.send({
                message: "success",
                result,
            });
        } else {
            res.send({ message: "error" });
        }
    });
});
router.put("/profile", (req, res) => {
    const cus_id = req.body.cus_id;
    const cus_name = req.body.cus_name;
    const cus_numphone = req.body.cus_numphone;
    const cus_email = req.body.cus_email;
    const cus_birthday = req.body.cus_birthday;
    const cus_gender = req.body.cus_gender;
    console.log(cus_id + "/" + cus_name + "/" + cus_birthday);
    var sql =
        "UPDATE customer SET cus_name = ? , cus_numphone = ? , cus_email= ?, cus_birthday = ?, cus_gender = ?  where cus_id = ?";
    db.query(
        sql,
        [cus_name, cus_numphone, cus_email, cus_birthday, cus_gender, cus_id],
        (err, result) => {
            if (err) throw err;
            console.log(result);
            if (result) {
                res.send({
                    message: "success",
                    result,
                });
            } else {
                res.send({ message: "error" });
            }
        }
    );
});

router.put("/change_password", (req, res) => {
    const cus_id = req.body.cus_id;
    const cus_pass = req.body.cus_pass;
    console.log(cus_id + "/" + cus_pass);
    var sql = "UPDATE customer SET cus_pass = ? where cus_id = ?";
    db.query(sql, [cus_pass, cus_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result) {
            res.send({
                message: "success",
                result,
            });
        } else {
            res.send({ message: "error" });
        }
    });
});

module.exports = router;
