const orderModel = require('../models/order');

const orderController = async (req, res) => {
    console.log(req.body);
    try {
        const { userId, items, totalAmount, status, address } = req.body;

        const orderData = new orderModel({
            userId,
            items,
            totalAmount,
            status: status || "Order Placed", // Default status if not provided
            address,
        });

        const orderadded = await orderData.save();
        // console.log(orderadded, "orderadded");

        res.status(200).json({success: true, message: "Order added successfully", });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getOrders = async (req, res) => {
    
    try {
        const allOrders = await orderModel.find({});
        res.status(200).json({ success: true, orders: allOrders, message: "All Orders get" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


module.exports =  {orderController, getOrders};
