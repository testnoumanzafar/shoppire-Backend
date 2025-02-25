const cloudinary = require('cloudinary').v2;
const {     CLDN_NAME, CLDN_API, CLDN_SECRET  } = require('.');

const connectCloudinary = async ()=>{
       cloudinary.config({
        cloud_name:CLDN_NAME,
        api_key:CLDN_API,
        api_secret: CLDN_SECRET
       })
}
module.exports = {connectCloudinary}