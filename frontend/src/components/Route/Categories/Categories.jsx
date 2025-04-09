// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { brandingData, categoriesData } from "../../../static/data";
// import styles from "../../../styles/styles";

// const Categories = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className={`${styles.section} hidden sm:block`}>
//         <div
//           className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
//         >
//           {brandingData &&
//             brandingData.map((i, index) => (
//               <div className="flex items-start" key={index}>
//                 {i.icon}
//                 <div className="px-3">
//                   <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
//                   <p className="text-xs md:text-sm">{i.Description}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div
//         className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
//         id="categories"
//       >
//         <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
//           {categoriesData &&
//             categoriesData.map((i) => {
//               const handleSubmit = (i) => {
//                 navigate(`/products?category=${i.title}`);
//               };
//               return (
//                 <div
//                   className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
//                   key={i.id}
//                   onClick={() => handleSubmit(i)}
//                 >
//                   <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
//                   <img
//                     src={i.image_Url}
//                     className="w-[120px] object-cover"
//                     alt=""
//                   />
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { brandingData, categoriesData } from "../../../static/data";
// import styles from "../../../styles/styles";

// const Categories = () => {
//   const navigate = useNavigate();

//   if (!categoriesData || categoriesData.length === 0) {
//     return <p>No categories found.</p>;
//   }

//   const handleSubmit = (categoryTitle) => {
//     navigate(`/products?category=${categoryTitle}`);
//   };

//   return (
//     <>
//       <div className={`${styles.section} hidden sm:block`}>
//         <div className="branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md">
//           {brandingData &&
//             brandingData.map((i, index) => (
//               <div className="flex items-start" key={index}>
//                 {i.icon}
//                 <div className="px-3">
//                   <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
//                   <p className="text-xs md:text-sm">{i.Description}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">
//         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
//           {categoriesData.map((i) => (
//             <div
//               className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
//               key={i.id}
//               onClick={() => handleSubmit(i.title)}
//             >
//               <h5 className="text-[18px] leading-[1.3]">{i.title}</h5>
//               <img src={i.image_Url} className="w-[120px] object-cover" alt={i.title} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-all-categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Define handleSubmit
  const handleSubmit = (categoryTitle) => {
    navigate(`/products?category=${categoryTitle}`);
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  // if (!categories || categories.length === 0) {
  //   return <p>No categories found.</p>;
  // }

  return (
    <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <div
            className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
            key={category.id}
            onClick={() => handleSubmit(category.title)} // handleSubmit is used here
          >
            <h5 className="text-[18px] leading-[1.3]">{category.title}</h5>
            <img
              src={category.image_Url || "path/to/fallback-image.jpg"}
              className="w-[120px] object-cover"
              alt={category.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;