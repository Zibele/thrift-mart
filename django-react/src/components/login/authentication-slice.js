import {createSlice} from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({

    name:"authentication",

    initialState: {
        isAuthenticated:false,
        user:{},
        token:""
    },

    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload;
        },
        
        setIsAuthenticated:(state,action)=>{
            state.isAuthenticated=action.payload;
        },
        setUser:(state,action)=>{
            state.isAuthenticated=action.payload;
        }
    }

});

export const {setToken,setIsAuthenticated,setUser} = authenticationSlice.actions;

export default authenticationSlice.reducer;


