import { CreateApi } from "@reduxjs/toolkit/dist/query";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";

const productAdapter = createEntityAdapter()
const initialState = productAdapter.getInitialState()
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
    
        getProducts : builder.query({
            query : (offset)=>({            //added limits
                url :'/getProducts',
                method :'POST',
                body : {offset},
                keepUnusedDataFor: 60,
            }),   
        }),
       
        getByCategories : builder.query({
            query : (category)=>({
                url :'/getByCategories',
                method :'POST',
                body : {category},
                keepUnusedDataFor: 60,
            }),
  
        }),
        getProductById : builder.query({
            query : (id) =>({
                url : '/getProductById',
                method : 'POST',
                body : id,
            })
        }),
        // getAllProducts : builder.query({
        //     query : ()=>({                        //getall200products
        //         url :'/getAllProducts',
        //         method :'get',
                
        //     }), 
            
        // }),
        
    })
})




export const {useGetProductsQuery,useGetByCategoriesQuery,useGetProductByIdQuery,useLazyGetAllProductsQuery} = productsApiSlice