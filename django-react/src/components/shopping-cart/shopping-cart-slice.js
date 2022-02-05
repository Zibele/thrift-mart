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
        },

        addToTotalPrice: (state,action) =>{
            state.totalPrice += action.payload;
        },

        removeItemFromCart: (state,action)=> {
            
            state.cart = action.payload;
            
        },

        deductTotalPrice: (state,action) => {

            state.totalPrice -= action.payload;

        }

    }

})

export const {addItemToCart,removeItemFromCart,addToTotalPrice,deductTotalPrice} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;