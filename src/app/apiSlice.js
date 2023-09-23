import {createApi,fetchBaseQuery} from'@reduxjs/toolkit/query/react' 
import { addCredentials,logout } from '../features/User/authSlice'
const baseQuery = fetchBaseQuery({
    baseUrl : 'http://127.0.0.1:8000',
    credentials : 'include',
    prepareHeaders : (headers,{getState}) =>{
        const token = getState().auth.accesstoken;
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async(args,api,extraOptions) =>{
    let result = await baseQuery(args,api,extraOptions);
        console.log('result',result.meta)
    if(result?.error?.originalStatus === 403){
        console.log('sending Refresh Token')
        const refreshResult = await baseQuery('/refresh',api,extraOptions);
        console.log(refreshResult);
        if(refreshResult?.data){
            const user = api.getState().auth
            api.dispatch(addCredentials({...user,accesstoken : refreshResult.data.accesstoken,username : refreshResult.data.username,email:refreshResult.data.email,role:refreshResult.data.role}))
            result = await baseQuery(args,api,extraOptions)
        }else{
            api.dispatch(logout())
        }
    }
    return result;
}

export const apiSlice = createApi({
    reducerPath :'api',
    baseQuery : baseQueryWithReauth,
    endpoints : builder =>({})
})