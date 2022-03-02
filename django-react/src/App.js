import React from "react";
import {
  BrowserRoute as Router,
  Route,
  Routes,
  Link,
  Redirect,
  Switch

}   from 'react-router-dom';  
import Header from "components/header/header";
import ProductList from "components/product-list/product-list";
import Footer from "components/footer/footer";
import {useMediaQuery} from "react-responsive";
import ScreenContext from "helpers/Screen";
import Login from "components/login/login";
import Checkout from "components/check-out/check-out";


const App = () => {

  const isSmallScreen = useMediaQuery({
    minWidth:640,
    maxWidth:767
   });

  const isExtraSmallScreen = useMediaQuery({
    maxWidth:639
  });

  const isMediumScreen = useMediaQuery({
    maxWidth:1023
  });

  const isLargeScreen = useMediaQuery({
    minWidth:1024,
    maxWidth:1279
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
                    <Routes>
                      <Route path='/products' element={<ProductList/>}/>
                      <Route exact path='/' element={<ProductList/>}/>
                      <Route exact path='/login' element={<Login/>}/>
                      <Route exact path='/checkout' element = {<Checkout/>} />
                    </Routes>
                  <Footer/>
          </ScreenContext.Provider>
  )



}


export default App;
