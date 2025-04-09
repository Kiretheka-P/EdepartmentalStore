const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      // if (req.body.status === "Processing") {
      //   order.cart.forEach(async (o) => {
      //     await updateOrder(o._id, o.qty);
      //   });
      // }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * .10;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        
        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
// const Order = require("../model/order");
// const Shop = require("../model/shop");
// const Product = require("../model/product");

// // create new order
// router.post(
//   "/create-order",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

//       // Group cart items by shopId
//       const shopItemsMap = new Map();

//       for (const item of cart) {
//         const shopId = item.shopId;
//         if (!shopItemsMap.has(shopId)) {
//           shopItemsMap.set(shopId, []);
//         }
//         shopItemsMap.get(shopId).push(item);
//       }

//       // Create an order for each shop
//       const orders = [];

//       for (const [shopId, items] of shopItemsMap) {
//         const order = await Order.create({
//           cart: items,
//           shippingAddress,
//           user,
//           totalPrice,
//           paymentInfo,
//         });
//         orders.push(order);
//       }

//       res.status(201).json({
//         success: true,
//         orders,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // get all orders of user
// router.get(
//   "/get-all-orders/:userId",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const orders = await Order.find({ "user._id": req.params.userId }).sort({
//         createdAt: -1,
//       });

//       res.status(200).json({
//         success: true,
//         orders,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // get all orders of seller
// router.get(
//   "/get-seller-all-orders/:shopId",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const orders = await Order.find({
//         "cart.shopId": req.params.shopId,
//       }).sort({
//         createdAt: -1,
//       });

//       res.status(200).json({
//         success: true,
//         orders,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // update order status for seller
// router.put(
//   "/update-order-status/:id",
//   isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const order = await Order.findById(req.params.id);

//       if (!order) {
//         return next(new ErrorHandler("Order not found with this id", 400));
//       }

//       // If order is transferred to delivery, update stock
//       if (req.body.status === "Transferred to delivery partner") {
//         for (const o of order.cart) {
//           await updateStock(o.productId, o.qty);
//         }
//       }

//       order.status = req.body.status;

//       if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//         order.paymentInfo.status = "Succeeded";
//         const serviceCharge = order.totalPrice * 0.10;
//         await updateSellerBalance(order.shopId, order.totalPrice - serviceCharge);
//       }

//       await order.save({ validateBeforeSave: false });

//       res.status(200).json({
//         success: true,
//         order,
//       });

//       // Helper function to update stock
//       async function updateStock(id, qty) {
//         const product = await Product.findById(id);
//         if (!product) return console.error(`❌ Product not found: ${id}`);

//         console.log(`✅ Updating product ${id}: Stock -${qty}, Sold +${qty}`);
//         product.stock -= qty;
//         product.sold += qty;

//         await product.save({ validateBeforeSave: false });
//       }

//       // Helper function to update seller balance
//       async function updateSellerBalance(shopId, amount) {
//         const seller = await Shop.findById(shopId);
//         if (!seller) return console.error(`❌ Seller not found: ${shopId}`);

//         seller.availableBalance += amount;
//         await seller.save();
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // give a refund ----- user
// router.put(
//   "/order-refund/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const order = await Order.findById(req.params.id);

//       if (!order) {
//         return next(new ErrorHandler("Order not found with this id", 400));
//       }

//       order.status = req.body.status;

//       await order.save({ validateBeforeSave: false });

//       res.status(200).json({
//         success: true,
//         order,
//         message: "Order Refund Request successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // accept the refund ---- seller
// router.put(
//   "/order-refund-success/:id",
//   isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const order = await Order.findById(req.params.id);

//       if (!order) {
//         return next(new ErrorHandler("Order not found with this id", 400));
//       }

//       order.status = req.body.status;

//       await order.save();

//       res.status(200).json({
//         success: true,
//         message: "Order Refund successful!",
//       });

//       // If refund is successful, update stock
//       if (req.body.status === "Refund Success") {
//         for (const o of order.cart) {
//           await restoreStock(o.productId, o.qty);
//         }
//       }

//       // Helper function to restore stock on refund
//       async function restoreStock(id, qty) {
//         const product = await Product.findById(id);
//         if (!product) return console.error(`❌ Product not found: ${id}`);

//         console.log(`♻️ Restoring product ${id}: Stock +${qty}, Sold -${qty}`);
//         product.stock += qty;
//         product.sold -= qty;

//         await product.save({ validateBeforeSave: false });
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // all orders --- for admin
// router.get(
//   "/admin-all-orders",
//   isAuthenticated,
//   isAdmin("Admin"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const orders = await Order.find().sort({
//         deliveredAt: -1,
//         createdAt: -1,
//       });
//       res.status(201).json({
//         success: true,
//         orders,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// module.exports = router;
