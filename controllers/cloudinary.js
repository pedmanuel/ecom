const cloudinary = require("cloudinary");


//config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret:  process.env.CLOUDINARY_CLOUD_API_SECRET,

});

// path dos ficheiros
exports.upload = async (req, res) => {
    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id:`${Date.now()}`,
        resource_type: "auto",
    });

    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};


exports.remove = (req, res) => {
    let image_id = req.body.public_id;
  
    cloudinary.v2.uploader.destroy(image_id);
    };