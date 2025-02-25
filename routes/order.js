
const express = require('express');
// const orderController = require('../Controller/order');
// const getOrders = require('../Controller/order');
const { orderController, getOrders } = require('../Controller/order');

const orderRouter = express.Router();

orderRouter.post('/place-order', orderController);
orderRouter.get('/get-order', getOrders);


module.exports= orderRouter;

