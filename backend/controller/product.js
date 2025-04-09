// // const express = require("express");
// // const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
// // const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// // const router = express.Router();
// // const Product = require("../model/product");
// // const Order = require("../model/order");
// // const Shop = require("../model/shop");
// // const cloudinary = require("cloudinary");
// // const ErrorHandler = require("../utils/ErrorHandler");

// // // create product
// // router.post(
// //   "/create-product",
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       //const shopId = req.body.shopId;
// //       const shop = await Shop.findById(shopId);
// //       if (!shop) {
// //         return next(new ErrorHandler("Shop Id is invalid!", 400));
// //       } else {
// //         let images = [];

// //         if (typeof req.body.images === "string") {
// //           images.push(req.body.images);
// //         } else {
// //           images = req.body.images;
// //         }
      
// //         const imagesLinks = [];
      
// //         for (let i = 0; i < images.length; i++) {
// //           const result = await cloudinary.v2.uploader.upload(images[i], {
// //             folder: "products",
// //           });
      
// //           imagesLinks.push({
// //             public_id: result.public_id,
// //             url: result.secure_url,
// //           });
// //         }
      
// //         const productData = req.body;
// //         productData.images = imagesLinks;
// //         productData.shop = shop;

// //         const product = await Product.create(productData);

// //         res.status(201).json({
// //           success: true,
// //           product,
// //         });
// //       }
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // get all products of a shop
// // router.get(
// //   "/get-all-products-shop/:id",
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const products = await Product.find({ shopId: req.params.id });

// //       res.status(201).json({
// //         success: true,
// //         products,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // delete product of a shop
// // router.delete(
// //   "/delete-shop-product/:id",
// //   isSeller,
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const product = await Product.findById(req.params.id);

// //       if (!product) {
// //         return next(new ErrorHandler("Product is not found with this id", 404));
// //       }    

// //       for (let i = 0; 1 < product.images.length; i++) {
// //         const result = await cloudinary.v2.uploader.destroy(
// //           product.images[i].public_id
// //         );
// //       }
    
// //       await product.remove();

// //       res.status(201).json({
// //         success: true,
// //         message: "Product Deleted successfully!",
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // get all products
// // router.get(
// //   "/get-all-products",
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const products = await Product.find().sort({ createdAt: -1 });

// //       res.status(201).json({
// //         success: true,
// //         products,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // review for a product
// // router.put(
// //   "/create-new-review",
// //   isAuthenticated,
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const { user, rating, comment, productId, orderId } = req.body;

// //       const product = await Product.findById(productId);

// //       const review = {
// //         user,
// //         rating,
// //         comment,
// //         productId,
// //       };

// //       const isReviewed = product.reviews.find(
// //         (rev) => rev.user._id === req.user._id
// //       );

// //       if (isReviewed) {
// //         product.reviews.forEach((rev) => {
// //           if (rev.user._id === req.user._id) {
// //             (rev.rating = rating), (rev.comment = comment), (rev.user = user);
// //           }
// //         });
// //       } else {
// //         product.reviews.push(review);
// //       }

// //       let avg = 0;

// //       product.reviews.forEach((rev) => {
// //         avg += rev.rating;
// //       });

// //       product.ratings = avg / product.reviews.length;

// //       await product.save({ validateBeforeSave: false });

// //       await Order.findByIdAndUpdate(
// //         orderId,
// //         { $set: { "cart.$[elem].isReviewed": true } },
// //         { arrayFilters: [{ "elem._id": productId }], new: true }
// //       );

// //       res.status(200).json({
// //         success: true,
// //         message: "Reviwed succesfully!",
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // all products --- for admin
// // router.get(
// //   "/admin-all-products",
// //   isAuthenticated,
// //   isAdmin("Admin"),
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const products = await Product.find().sort({
// //         createdAt: -1,
// //       });
// //       res.status(201).json({
// //         success: true,
// //         products,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error.message, 500));
// //     }
// //   })
// // );
// // module.exports = router;



// // const express = require("express");
// // const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
// // const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// // const router = express.Router();
// // const Product = require("../model/product");
// // const Order = require("../model/order");
// // const cloudinary = require("cloudinary");
// // const ErrorHandler = require("../utils/ErrorHandler");

// // // Create product
// // router.post(
// //   "/create-product",
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       let images = [];

// //       if (typeof req.body.images === "string") {
// //         images.push(req.body.images);
// //       } else {
// //         images = req.body.images;
// //       }

// //       const imagesLinks = [];

// //       for (let i = 0; i < images.length; i++) {
// //         const result = await cloudinary.v2.uploader.upload(images[i], {
// //           folder: "products",
// //         });

// //         imagesLinks.push({
// //           public_id: result.public_id,
// //           url: result.secure_url,
// //         });
// //       }

// //       const productData = req.body;
// //       productData.images = imagesLinks;

// //       const product = await Product.create(productData);

// //       res.status(201).json({
// //         success: true,
// //         product,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // Delete product
// // router.delete(
// //   "/delete-product/:id",
// //   isSeller,
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const product = await Product.findById(req.params.id);

// //       if (!product) {
// //         return next(new ErrorHandler("Product not found", 404));
// //       }

// //       for (let i = 0; i < product.images.length; i++) {
// //         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
// //       }

// //       await product.remove();

// //       res.status(201).json({
// //         success: true,
// //         message: "Product deleted successfully!",
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // Get all products
// // router.get(
// //   "/get-all-products",
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const products = await Product.find().sort({ createdAt: -1 });

// //       res.status(201).json({
// //         success: true,
// //         products,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // Review for a product
// // router.put(
// //   "/create-new-review",
// //   isAuthenticated,
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const { user, rating, comment, productId, orderId } = req.body;

// //       const product = await Product.findById(productId);

// //       const review = {
// //         user,
// //         rating,
// //         comment,
// //         productId,
// //       };

// //       const isReviewed = product.reviews.find(
// //         (rev) => rev.user.toString() === req.user._id.toString()
// //       );

// //       if (isReviewed) {
// //         product.reviews.forEach((rev) => {
// //           if (rev.user.toString() === req.user._id.toString()) {
// //             rev.rating = rating;
// //             rev.comment = comment;
// //             rev.user = user;
// //           }
// //         });
// //       } else {
// //         product.reviews.push(review);
// //       }

// //       let avg = 0;

// //       product.reviews.forEach((rev) => {
// //         avg += rev.rating;
// //       });

// //       product.ratings = avg / product.reviews.length;

// //       await product.save({ validateBeforeSave: false });

// //       await Order.findByIdAndUpdate(
// //         orderId,
// //         { $set: { "cart.$[elem].isReviewed": true } },
// //         { arrayFilters: [{ "elem._id": productId }], new: true }
// //       );

// //       res.status(200).json({
// //         success: true,
// //         message: "Reviewed successfully!",
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error, 400));
// //     }
// //   })
// // );

// // // Get all products for admin
// // router.get(
// //   "/admin-all-products",
// //   isAuthenticated,
// //   isAdmin("Admin"),
// //   catchAsyncErrors(async (req, res, next) => {
// //     try {
// //       const products = await Product.find().sort({
// //         createdAt: -1,
// //       });
// //       res.status(201).json({
// //         success: true,
// //         products,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error.message, 500));
// //     }
// //   })
// // );

// // module.exports = router;




const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-product",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
      
        const imagesLinks = [];
      
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
            transformation: [
              { width: 1000, height: 1000, crop: "limit" } // Ensures the image does not exceed 1000x1000
            ]
          });
      
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      
        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
// router.delete(
//   "/delete-shop-product/:id",
//   isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const product = await Product.findById(req.params.id);

//       if (!product) {
//         return next(new ErrorHandler("Product is not found with this id", 404));
//       }    

//       for (let i = 0; 1 < product.images.length; i++) {
//         const result = await cloudinary.v2.uploader.destroy(
//           product.images[i].public_id
//         );
//       }
    
//       await product.remove();

//       res.status(201).json({
//         success: true,
//         message: "Product Deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      // Delete all associated images from Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      await product.remove();

      res.status(200).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all unique categories
router.get(
  "/get-all-categories",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Use aggregation to get unique categories
      const categories = await Product.distinct("category");

      // Transform into the format your frontend expects
      const formattedCategories = categories.map((cat, index) => ({
        id: index + 1, // Simple ID (or use a more robust method if needed)
        title: cat,
      }));

      res.status(200).json({
        success: true,
        categories: formattedCategories,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;





// const express = require("express");
// const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const router = express.Router();
// const Product = require("../model/product");
// const Order = require("../model/order");
// const Shop = require("../model/shop");
// const cloudinary = require("cloudinary");
// const ErrorHandler = require("../utils/ErrorHandler");

// // Create product
// router.post(
//   "/create-product",
//   isSeller, // Added to ensure only sellers can create products
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler("Shop Id is invalid!", 400));
//       }

//       // Verify the seller owns the shop
//       if (shop.seller.toString() !== req.seller._id.toString()) {
//         return next(new ErrorHandler("Unauthorized to create product for this shop", 403));
//       }

//       let images = [];
//       if (typeof req.body.images === "string") {
//         images.push(req.body.images);
//       } else {
//         images = req.body.images;
//       }

//       const imagesLinks = [];
//       for (let i = 0; i < images.length; i++) {
//         const result = await cloudinary.v2.uploader.upload(images[i], {
//           folder: "products",
//           transformation: [{ width: 1000, height: 1000, crop: "limit" }],
//         });
//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });
//       }

//       const productData = req.body;
//       productData.images = imagesLinks;
//       productData.shop = shop;

//       const product = await Product.create(productData);

//       res.status(201).json({
//         success: true,
//         product,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// // Get all products of a shop
// router.get(
//   "/get-all-products-shop/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const products = await Product.find({ shopId: req.params.id });

//       res.status(200).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// // Delete product of a shop
// router.delete(
//   "/delete-shop-product/:id",
//   isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const product = await Product.findById(req.params.id);

//       if (!product) {
//         return next(new ErrorHandler("Product is not found with this id", 404));
//       }

//       // Verify the seller owns the product
//       if (product.shopId.toString() !== req.seller._id.toString()) {
//         return next(new ErrorHandler("Unauthorized to delete this product", 403));
//       }

//       // Delete all associated images from Cloudinary
//       for (let i = 0; i < product.images.length; i++) {
//         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//       }

//       await product.remove();

//       res.status(200).json({
//         success: true,
//         message: "Product Deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// // Get all products
// router.get(
//   "/get-all-products",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const products = await Product.find().sort({ createdAt: -1 });

//       res.status(200).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// // Review for a product
// router.put(
//   "/create-new-review",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { user, rating, comment, productId, orderId } = req.body;

//       const product = await Product.findById(productId);
//       if (!product) {
//         return next(new ErrorHandler("Product not found", 404));
//       }

//       const review = {
//         user,
//         rating,
//         comment,
//         productId,
//       };

//       const isReviewed = product.reviews.find(
//         (rev) => rev.user._id.toString() === req.user._id.toString()
//       );

//       if (isReviewed) {
//         product.reviews.forEach((rev) => {
//           if (rev.user._id.toString() === req.user._id.toString()) {
//             rev.rating = rating;
//             rev.comment = comment;
//             rev.user = user;
//           }
//         });
//       } else {
//         product.reviews.push(review);
//       }

//       let avg = 0;
//       product.reviews.forEach((rev) => {
//         avg += rev.rating;
//       });
//       product.ratings = avg / product.reviews.length;

//       await product.save({ validateBeforeSave: false });

//       await Order.findByIdAndUpdate(
//         orderId,
//         { $set: { "cart.$[elem].isReviewed": true } },
//         { arrayFilters: [{ "elem._id": productId }], new: true }
//       );

//       res.status(200).json({
//         success: true,
//         message: "Reviewed successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// // All products --- for admin
// router.get(
//   "/admin-all-products",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const products = await Product.find().sort({ createdAt: -1 });

//       res.status(200).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// module.exports = router;