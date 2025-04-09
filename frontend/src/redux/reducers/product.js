import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  // deleteProductSuccess: (state, action) => {
  //   state.isLoading = false;
  //   state.message = action.payload;
  // },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.products = state.products.filter((product) => product._id !== action.payload);
    state.message = action.payload;
  },
  
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});





// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: false, // Changed to false for initial state (no loading by default)
//   products: [], // Added to store shop products
//   allProducts: [], // For all products (unchanged)
//   product: null, // For single product (e.g., after creation)
//   success: false, // For product creation success
//   error: null, // For error messages
//   message: null, // For success messages (e.g., deletion)
// };

// export const productReducer = createReducer(initialState, {
//   // Create product
//   productCreateRequest: (state) => {
//     state.isLoading = true;
//   },
//   productCreateSuccess: (state, action) => {
//     state.isLoading = false;
//     state.product = action.payload;
//     state.success = true;
//     state.error = null; // Clear any previous errors
//   },
//   productCreateFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },

//   // Get all products of a shop
//   getAllProductsShopRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsShopSuccess: (state, action) => {
//     state.isLoading = false;
//     state.products = action.payload;
//     state.error = null; // Clear any previous errors
//   },
//   getAllProductsShopFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // Delete product of a shop
//   deleteProductRequest: (state) => {
//     state.isLoading = true;
//   },
//   deleteProductSuccess: (state, action) => {
//     state.isLoading = false;
//     state.products = state.products.filter((product) => product._id !== action.payload);
//     state.message = "Product deleted successfully"; // Optional message
//     state.error = null; // Clear any previous errors
//   },
//   deleteProductFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // Get all products
//   getAllProductsRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsSuccess: (state, action) => {
//     state.isLoading = false;
//     state.allProducts = action.payload;
//     state.error = null; // Clear any previous errors
//   },
//   getAllProductsFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   // Clear errors
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });