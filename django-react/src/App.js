import React from "react";      
import Header from "components/header/Header";
import ProductList from "components/productList/ProductList";
import Footer from "components/footer/Footer";
import {useMediaQuery} from "react-responsive";
import ScreenContext from "helpers/Screen";



const App = () => {


  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1024px)'
   });

   console.log("Before returning");
  return (
          <ScreenContext.Provider value ={{isTabletOrMobile:isTabletOrMobile}} >
            <Header isTabletOrMobile = {isTabletOrMobile}/>
            <ProductList/>
            <Footer/>
          </ScreenContext.Provider>
  )



}


export default App;
