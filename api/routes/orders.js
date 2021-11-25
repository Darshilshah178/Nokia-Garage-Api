const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
    message: 'Orders were Patched'
    });
});

router.post("/", (req, res, next) => {
    const order  = {
        productId: req.body.productId,
        quantity: req.body.quantity
      };
    res.status(201).json({
    message: 'Orders were Created',
    order: order
    });
});

router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
    message: 'Orders detailes',
    orderId: req.params.orderId
    });
});


router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
    message: 'Orders deleted',
    orderId: req.params.orderId
    });
});

module.exports = router;
