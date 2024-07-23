const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration
cloudinary.config({ 
    cloud_name: process.env.Cloud_name, 
    api_key: process.env.API_key, 
    api_secret: process.env.API_secret // Click 'View Credentials' below to copy your API secret
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'rent-your-place',
      allowedFormate: ["png","jpeg","jpg"], // supports promises as well
    },
  });

  module.exports = {
    cloudinary,
    storage
  }