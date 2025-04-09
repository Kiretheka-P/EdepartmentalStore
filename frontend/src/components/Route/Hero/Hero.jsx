// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import backgroundImage from "../../Images/Black Minimalist Fashion Store Twitter Ad.png";

// const Hero = () => {
//   return (
//     <div
//       className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//       }}
//     >
//       <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
//         <h1
//           className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
//         >
//           Best Collection for <br /> home Decoration
//         </h1>
//         <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
//           assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
//           quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
//           <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
//         </p>
//         <Link to="/products" className="inline-block">
//             <div className={`${styles.button} mt-5`}>
//                  <span className="text-[#fff] font-[Poppins] text-[18px]">
//                     Shop Now
//                  </span>
//             </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Hero;



import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
 
const Hero = () => {
  return (
    <div
      className={`relative min-h-[90vh] w-full bg-cover bg-center flex items-center`}
      style={{
        backgroundImage: "url(/banner.png)",
      }}
    >
      {/* Moved text more to the left */}
      <div className={`${styles.section} w-[90%] md:w-[50%] lg:w-[40%] px-6 md:px-12 ml-[5%]`}>
        {/* <h1 className="text-[35px] md:text-[50px] lg:text-[60px] leading-[1.2] text-[#3d3a3a] font-[600] capitalize">
          Best Collection for <br /> Home Decoration
        </h1> */}
        <h1 className="text-[35px] md:text-[50px] lg:text-[60px] leading-[1.2] text-[#3d3a3a] font-[600] capitalize">
        Best Prices, Best Choices, <br /> Just for You!
    </h1>
        {/* <p className="pt-5 text-[16px] md:text-[18px] font-[Poppins] text-[#000000ba] leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur
          aliquam deserunt officia. Dolorum saepe nulla provident.
        </p> */}
        <p className="pt-5 text-[16px] md:text-[18px] font-[Poppins] text-[#000000ba] leading-relaxed">
        Discover top-quality products, exciting offers, and a seamless shopping experience designed just for you.
    </p>
        <Link to="/products" className="inline-block mt-5">
          <div className={`${styles.button}`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
 
export default Hero;