const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING=process.env.MONGODB_CONNECTION_STRING;
const CLDN_NAME=process.env.CLDN_NAME
const CLDN_API=process.env.CLDN_API
const CLDN_SECRET=process.env.CLDN_SECRET
const JWT_SECRET=process.env.JWT_SECRET
const ADMIN_EMAIL=process.env.ADMIN_EMAIL
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD
module.exports = {
   PORT,
   MONGODB_CONNECTION_STRING,
   CLDN_NAME,
   CLDN_API,
   CLDN_SECRET,
   JWT_SECRET,
   ADMIN_EMAIL,
   ADMIN_PASSWORD,
}