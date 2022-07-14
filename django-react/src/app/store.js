import {configureStore} from '@reduxjs/toolkit';
import shoppingCartReducer from 'components/shopping-cart/shopping-cart-slice';
import productListReducer from 'components/product-list/product-list-slice';
import authenticationReducer from 'components/login/authentication-slice'

export default configureStore({
    reducer:{

       shoppingCart:shoppingCartReducer,
       productList:productListReducer,
       authentication:authenticationReducer,

    }
})