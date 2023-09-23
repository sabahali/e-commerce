import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


const initialState = {
    cartNumber : 0,
    cartItems : [],
    carts  : [],
    checkoutitems :[],
    orders : []
}

export const cartSlice = createSlice({
    name :'cart',
    initialState,
    reducers : {
        addTocart :(state,action) =>{
            state.cartNumber += 1;
            
            state.cartItems.push(action.payload)
           const id = action.payload;
            const foundItem = state.carts.find(item => item.id === action.payload)
            
            if(foundItem){
                foundItem.count += 1;
            }else{
                state.carts.push({id :action.payload,count : 1})
            }

        },
        decreaseCount : (state,action) =>{
            
            const foundItem = state.carts.find(item => item.id === action.payload);
            if(foundItem?.count !== 0){
                foundItem.count -= 1;
                state.cartNumber -=1; 
            }else{
                return
            }
        },
        addTocheckout : (state,action) =>{
            // const item = {item : action.payload.item,count : action.payload.count};
            // state.checkoutitems.push(action.payload)
            // const newArray = [];
            // newArray.push(item);
            const foundItem = state.checkoutitems.find((item)=>item.id === action.payload.id)
            if(foundItem){
               
                foundItem.count = action.payload.count
            } else{
                state.checkoutitems.push(action.payload)
            }   
        },
        addToOrder : (state,action) =>{

            action.payload.forEach((item)=>{

                state.orders.push(item)
            })
            
        }
    }

})
export const {addTocart,decreaseCount,addTocheckout,addToOrder} = cartSlice.actions;

export default cartSlice.reducer