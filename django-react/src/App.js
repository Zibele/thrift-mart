import React from "react";      
import Header from "components/header/Header";
import ProductList from "components/productList/ProductList";
import Footer from "components/footer/Footer";
import {useMediaQuery} from "react-responsive";

const App = () => {


  const isTabletOrMobile = useMediaQuery({
   query: '(max-width: 1024px)'
  })
  

  return (
          <>
            <Header isTabletOrMobile = {isTabletOrMobile}/>
            <ProductList/>
            <Footer/>
          </>
  )



}


export default App;
