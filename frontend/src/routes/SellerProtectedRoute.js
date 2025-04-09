// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

// const SellerProtectedRoute = ({ children }) => {
//   const { isLoading, isSeller } = useSelector((state) => state.seller);
//   const { user } = useSelector((state) => state.user);
//   if (isLoading === true) {
//     return <Loader />;
//   } else {
//     if (!isSeller || user?.role !== "Admin") {
//       return <Navigate to={`/shop-login`} replace />;
//     }
//     return children;
//   }
// };

// export default SellerProtectedRoute;


// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

// const SellerProtectedRoute = ({ children }) => {
//   const { isLoading, isSeller } = useSelector((state) => state.seller);
//   const { user } = useSelector((state) => state.user); // Correctly getting user

//   if (isLoading) {
//     return <Loader />;
//   }

//   // Allow access if the user is a Seller OR an Admin
//   if (!isSeller && user?.role !== "Admin") {
//     return <Navigate to="/shop-login" replace />;
//   }

//   return children;
// };

// export default SellerProtectedRoute;



import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;


