/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

const paymentSchema = new Schema({
  _id: String,
  paymentId: String,
  object: String,
  status: String,
});

module.exports = mongoose.model('payments', paymentSchema);
