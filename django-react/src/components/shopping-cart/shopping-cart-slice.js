import {createSlice} from '@reduxjs/toolkit';

export const shoppingCartSlice = createSlice({
    name:"shoppingCart",
    initialState:{
        cart:[],
        totalPrice:0
    },
    reducers:{

        addItemToCart: (state,action)=> {
            state.cart.push(action.payload);
            state.totalPrice += parseInt(action.payload.price);
        },

        removeItemFromCart: (state,action)=> {
            state.cart = state.cart.filter(product=>product.id !== action.payload.id);
            state.totalPrice -= parseInt(action.payload.price);
        }

    }

})

export const {addItemToCart,removeItemFromCart} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;