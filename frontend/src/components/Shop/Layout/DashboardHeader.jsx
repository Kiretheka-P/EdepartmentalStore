// import React from "react";
// import { AiOutlineGift } from "react-icons/ai";
// import { MdOutlineLocalOffer } from "react-icons/md";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { BiMessageSquareDetail } from "react-icons/bi";

// const DashboardHeader = () => {
//   const { seller } = useSelector((state) => state.seller);
//   return (
//     <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
//       <div>
//         <Link to="/dashboard">
//           <img
//             src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//             alt=""
//           />
//         </Link>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center mr-4">
//           <Link to="/dashboard/cupouns" className="800px:block hidden">
//             <AiOutlineGift
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-events" className="800px:block hidden">
//             <MdOutlineLocalOffer
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-products" className="800px:block hidden">
//             <FiShoppingBag
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-orders" className="800px:block hidden">
//             <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           <Link to="/dashboard-messages" className="800px:block hidden">
//             <BiMessageSquareDetail
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to={`/shop/${seller._id}`}>
//             <img
//               src={`${seller.avatar?.url}`}
//               alt=""
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;




// import React from "react";
// import { AiOutlineGift } from "react-icons/ai";
// import { MdOutlineLocalOffer } from "react-icons/md";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { BiMessageSquareDetail } from "react-icons/bi";

// const DashboardHeader = () => {
//   const { seller } = useSelector((state) => state.seller);
//   const { user } = useSelector((state) => state.user); // Get user from Redux store

//   // Check if the user is an admin
//   const isAdmin = user?.role === "admin"; 

//   return (
//     <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
//       <div>
//         <Link to="/dashboard">
//           <img
//             src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//             alt="Logo"
//           />
//         </Link>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center mr-4">
//           <Link to="/dashboard/coupons" className="800px:block hidden">
//             <AiOutlineGift color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           <Link to="/dashboard-events" className="800px:block hidden">
//             <MdOutlineLocalOffer color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           <Link to="/dashboard-products" className="800px:block hidden">
//             <FiShoppingBag color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           <Link to="/dashboard-orders" className="800px:block hidden">
//             <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           <Link to="/dashboard-messages" className="800px:block hidden">
//             <BiMessageSquareDetail color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>

//           {/* ✅ Allow admin to access the shop dashboard */}
//           {(seller || isAdmin) ? (
//             <Link to={`/shop/${seller?._id || "admin"}`}>
//               <img
//                 src={seller?.avatar?.url || user?.avatar?.url || "/default-avatar.png"} 
//                 alt="Avatar"
//                 className="w-[50px] h-[50px] rounded-full object-cover"
//               />
//             </Link>
//           ) : (
//             <p className="text-gray-500">Loading...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;




import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          {/* <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          /> */}
          <h6 className="text-blue-500 font-bold text-3xl">
                SRI SELVAKUMARAN STORES
          </h6>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

