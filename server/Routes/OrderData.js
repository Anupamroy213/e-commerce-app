const express = require('express');
const router = express.Router();
const Order = require("../models/Orders");
router.post('/OrderData', async (req, res) => {
    try {
        // Extract order data and order date from the request body
        const { email, order_data, order_date } = req.body;

        // Add order date to each order item
        const ordersWithDate = order_data.map(order => ({ ...order, Order_date: order_date }));

        // Find if an order exists for the given email
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // Create a new order if none exists
            await Order.create({
                email,
                order_data: ordersWithDate
            });
        } else {
            // Append new orders to the existing order data
            existingOrder.order_data.push(...ordersWithDate);
            await existingOrder.save();
        }

        // Send success response
        res.json({ success: true });
    } catch (error) {
        console.error('Error processing order:', error.message);
        // Send error response
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});


router.post('/myorders', async (req, res) => {
   

    try {
        let orders = await Order.findOne({ 'email': req.body.email });
        res.json({orderDatas: orders});
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;

