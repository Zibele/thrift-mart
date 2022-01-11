import React from "react";      
import Header from "components/header/Header";
import ProductList from "components/productList/ProductList";
import Footer from "components/footer/Footer";
import {useMediaQuery} from "react-responsive";
import ScreenContext from "helpers/Screen";


const App = () => {


  const isSmallScreen = useMediaQuery({
    maxWidth:768
   });

  const isExtraSmallScreen = useMediaQuery({
    maxWidth:640
  });

  const isMediumScreen = useMediaQuery({
    maxWidth:1023
  });

  const isLargeScreen = useMediaQuery({
    maxWidth:1280
  });

  const isExtraLargeScreen = useMediaQuery({
    minWidth:1280
  });

  return (
          <ScreenContext.Provider 
            value ={
                {isLargeScreen:isLargeScreen,
                isMediumScreen:isMediumScreen,
                isSmallScreen:isSmallScreen,
                isExtraSmallScreen:isExtraSmallScreen,
                isExtraLargeScreen:isExtraLargeScreen}}>
                  <Header/>
                  <ProductList/>
                  <Footer/>
          </ScreenContext.Provider>
  )



}


export default App;
