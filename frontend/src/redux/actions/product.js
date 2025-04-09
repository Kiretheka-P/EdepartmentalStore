import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// // delete product of a shop
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProductRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response.data.message,
//     });
//   }
// };


// export const deleteProduct = (id, sellerId) => async (dispatch) => {
//   try {
//     dispatch({ type: "deleteProductRequest" });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       { withCredentials: true }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: id, // Pass the ID to update Redux store
//     });

//     // Refresh product list after deletion
//     dispatch(getAllProductsShop(sellerId));
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response?.data?.message || "Delete request failed",
//     });
//   }
// };

export const deleteProduct = (id, sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: id, // Only send ID to remove it from state
    });

    // No need to fetch all products again if Redux state updates correctly
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || "Delete request failed",
    });
  }
};


// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};




// import axios from "axios";
// import { server } from "../../server";

// // Create product
// export const createProduct =
//   (
//     name,
//     description,
//     category,
//     tags,
//     originalPrice,
//     discountPrice,
//     stock,
//     shopId,
//     images
//   ) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: "productCreateRequest" });

//       const { data } = await axios.post(
//         `${server}/product/create-product`,
//         {
//           name,
//           description,
//           category,
//           tags,
//           originalPrice,
//           discountPrice,
//           stock,
//           shopId,
//           images,
//         },
//         { withCredentials: true } // Added for consistency with authentication
//       );

//       dispatch({
//         type: "productCreateSuccess",
//         payload: data.product,
//       });
//     } catch (error) {
//       dispatch({
//         type: "productCreateFail",
//         payload: error.response?.data?.message || "Failed to create product",
//       });
//     }
//   };

// // Get all products of a shop
// export const getAllProductsShop = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: "getAllProductsShopRequest" });

//     const { data } = await axios.get(
//       `${server}/product/get-all-products-shop/${id}`,
//       { withCredentials: true } // Added for consistency
//     );

//     dispatch({
//       type: "getAllProductsShopSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsShopFailed",
//       payload: error.response?.data?.message || "Failed to fetch shop products",
//     });
//   }
// };

// // Delete product of a shop
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: "deleteProductRequest" });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       { withCredentials: true }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: id, // Pass the ID to filter in the reducer
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response?.data?.message || "Failed to delete product",
//     });
//   }
// };

// // Get all products
// export const getAllProducts = () => async (dispatch) => {
//   try {
//     dispatch({ type: "getAllProductsRequest" });

//     const { data } = await axios.get(`${server}/product/get-all-products`);

//     dispatch({
//       type: "getAllProductsSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsFailed",
//       payload: error.response?.data?.message || "Failed to fetch all products",
//     });
//   }
// };