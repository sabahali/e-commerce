import { apiSlice } from "../../app/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) =>({
     addOrdersToDB :builder.query({
         query : (checkoutItems) =>({
            
             url :'/addOrdertodb',
             method : 'POST',
             body : checkoutItems,
         })
     }),
     getOrderfromDb : builder.query ({
        query : (email) =>({
            url : '/getOrdersfromDb',
            method : 'POST',
            body : {email : email}
        })
     })
    
    })
 })
export const {useLazyAddOrdersToDBQuery ,useLazyGetOrderfromDbQuery,useGetOrderfromDbQuery} = orderApiSlice