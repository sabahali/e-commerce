import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category : ''
}

export const productStatusSlice = createSlice({
    name :'productStatus',
    initialState,
    reducers : {
        chooseCategory : (state,action) =>{
            state.category = action.payload
        }
    }


})

export const currentCategory = (state) => state.category;
export const {chooseCategory} = productStatusSlice.actions


export default productStatusSlice.reducer