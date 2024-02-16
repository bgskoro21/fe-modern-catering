import React, { createContext, useState } from "react";

// Buat context baru
const LandingPageContext = createContext();

// Buat state provider
export const LandingPageProvider = ({ children }) => {
  const [bannerData, setBannerData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [testimonyData, setTestimonyData] = useState(null);

  return (
    <LandingPageContext.Provider
      value={{
        bannerData,
        setBannerData,
        categoryData,
        setCategoryData,
        testimonyData,
        setTestimonyData,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};

export default LandingPageContext;
