const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadVideo = ({ fileBuffer, userId }) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `video/${userId}`,
          resource_type: "video",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      )
      .end(fileBuffer);
  });
};

module.exports = { uploadVideo };
