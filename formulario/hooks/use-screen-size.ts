import React from "react";
import { useState } from "react";
import { Dimensions } from "react-native";

export function useScreenSize() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    
    return () => subscription?.remove();
  }, []);
  
  return {
    isMobile: screenWidth < 768,
    isTablet: screenWidth >= 768 && screenWidth < 1024,
    isDesktop: screenWidth >= 1024,
    screenWidth
  };
};