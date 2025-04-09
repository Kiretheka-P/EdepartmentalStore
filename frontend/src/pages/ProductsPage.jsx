// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";
// import ProductCard from "../components/Route/ProductCard/ProductCard";
// import styles from "../styles/styles";

// const ProductsPage = () => {
//   const [searchParams] = useSearchParams();
//   const categoryData = searchParams.get("category");
//   const {allProducts,isLoading} = useSelector((state) => state.products);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (categoryData === null) {
//       const d = allProducts;
//       setData(d);
//     } else {
//       const d =
//       allProducts && allProducts.filter((i) => i.category === categoryData);
//       setData(d);
//     }
//     //    window.scrollTo(0,0);
//   }, [allProducts]);

//   return (
//   <>
//   {
//     isLoading ? (
//       <Loader />
//     ) : (
//       <div>
//       <Header activeHeading={3} />
//       <br />
//       <br />
//       <div className={`${styles.section}`}>
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
//           {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
//         </div>
//         {data && data.length === 0 ? (
//           <h1 className="text-center w-full pb-[100px] text-[20px]">
//             No products Found!
//           </h1>
//         ) : null}
//       </div>
//       <Footer />
//     </div>
//     )
//   }
//   </>
//   );
// };

// export default ProductsPage;



// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";
// import ProductCard from "../components/Route/ProductCard/ProductCard";
// import styles from "../styles/styles";

// const ProductsPage = () => {
//   const [searchParams] = useSearchParams();
//   const categoryData = searchParams.get("category");
//   const { allProducts, isLoading } = useSelector((state) => state.products);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     console.log("All Products:", allProducts); // Debugging step
//     console.log("Selected Category:", categoryData);

//     if (!categoryData) {
//       setData(allProducts || []);
//     } else {
//       const filteredProducts = (allProducts || []).filter((i) => i.category === categoryData);
//       setData(filteredProducts);
//     }
//   }, [allProducts, categoryData]);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <Header activeHeading={3} />
//           <br />
//           <br />
//           <div className={`${styles.section}`}>
//             <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
//               {data?.map((i, index) => <ProductCard data={i} key={index} />)}
//             </div>
//             {!data?.length && (
//               <h1 className="text-center w-full pb-[100px] text-[20px]">
//                 No products found!
//               </h1>
//             )}
//           </div>
//           <Footer />
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductsPage;



import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = decodeURIComponent(searchParams.get("category")); // Decode special characters
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("All Products:", allProducts);
    console.log("Selected Category:", categoryData);

    if (!categoryData || categoryData === "null") {
      setData(allProducts || []);
    } else {
      const filteredProducts = (allProducts || []).filter(
        (i) => i.category.toLowerCase() === categoryData.toLowerCase() // Case-insensitive matching
      );
      setData(filteredProducts);
    }
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.length > 0 ? (
                data.map((i, index) => <ProductCard data={i} key={index} />)
              ) : (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products found!
                </h1>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
