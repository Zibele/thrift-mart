import {createSlice} from '@reduxjs/toolkit';

export const ProductListSlice = createSlice({
    name:'productList',
    initialState:{
        items:[]
    },
    reducers:{
        setProductList: (state,action) =>{
            state.items = action.payload;
        }
    }
})

export const {setProductList} = ProductListSlice.actions;

export default ProductListSlice.reducer;