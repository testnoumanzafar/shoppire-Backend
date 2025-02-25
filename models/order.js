const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  date: { type: Date, default: Date.now },
  address: { type: Object, required: true },
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
module.exports = orderModel;
