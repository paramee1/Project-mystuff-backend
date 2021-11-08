require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const fs = require("fs");
const { Images, Product } = require("../models");

const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

exports.uploadImage = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { title: req.body.title } });
    if (req.files) {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploadPromise(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      newArr = [];
      urls.map(item => newArr.push(item.secure_url));
      const images = await Images.create({
        url1: newArr[0] || null,
        url2: newArr[1] || null,
        url3: newArr[2] || null,
        url4: newArr[3] || null,
        url5: newArr[4] || null,
        url6: newArr[5] || null,
        productId: product.id,
      });
      res.status(200).json({ message: "Add success", data: urls, images });
    } else {
      res.status(405).json({ message: "Images not uploaded" });
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllImages = async (req, res, next) => {
  try {
    const item = await Images.findAll();
    res.json({ images: item });
  } catch (err) {
    next(err);
  }
};

exports.getImageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Images.findOne({ where: { productId: id } });
    res.json({ image: item });
  } catch (err) {
    next(err);
  }
};
