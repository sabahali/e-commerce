import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLazyGetOrderfromDbQuery, useGetOrderfromDbQuery } from '../../features/Orders/orderApiSlice';
const OrdersPage = () => {

    const checkoutItems = useSelector(state => state.cart.checkoutitems);
    const email = useSelector(state => state.auth.email)
    // const [getData,{data,isLoading,isFetching}] = useLazyGetOrderfromDbQuery()
    const { data, isLoading, isFetching ,isSuccess,isUninitialized,isError} = useGetOrderfromDbQuery(email)


    const handleTest = () => {
        console.log(data)
    }
    return (
        <div>
            {/* <button onClick={handleTest}>TEST</button> */}
            {isLoading ? <p>Loading</p> : isFetching ? <p>Please Wait</p> :isSuccess? <>

                <div className='container mt-4'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Title</th>
                                <th scope="col">Amount</th>
                                <th scope="col">quantity</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                       {data.map((item,index)=>(
                        <tr key={index}>
                            <th scope='row'>{index}</th>
                            <td>{item.title}</td>
                            <td>{item.price} Rs</td>
                            <td>{item.count}</td>
                            <td>Payment Success</td>
                        </tr>
                       ))}
                     
                        </tbody>
                    </table>
                </div>
            </> : <p className='display-2'> No orders to show</p>}
        </div>
    )
}

export default OrdersPage