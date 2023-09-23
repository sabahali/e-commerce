
import { useSelector, useDispatch } from "react-redux"
import CartsTable from "./CartsTable"
import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyStripeSessionQuery } from "../features/User/stripeApiSlice";
import axios from 'axios';
import { store } from "../app/store";


const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const carts = useSelector(state => state.cart.carts)
    const checkoutItems = useSelector(state => state.cart.checkoutitems)
    const [totalPrice, setTotalPrice] = useState(0)
    // const state = store.getState()
    // const email = state.auth.email
    // const[getAllProducts,{isSuccess,isLoading,data,isFetching}] = useLazyGetAllProductsQuery()
    const [session, { data }] = useLazyStripeSessionQuery()
    useEffect(() => {
        if (checkoutItems) {
            let price = 0;
            checkoutItems.forEach(item => {
                const total = item.price * item.count * 83.2;
                price += total
            });
            setTotalPrice(price.toFixed(2))
            // console.log(price.toFixed(2))
        }
    }, [checkoutItems])



    const handleTEst = () => {
        localStorage.setItem('carts', JSON.stringify(checkoutItems));  
        console.log(checkoutItems)
        // console.log(email)
    }
    const handleCheckout = async () => {
        localStorage.setItem('carts', JSON.stringify(checkoutItems));    
        console.log(checkoutItems)
        try {
            const stripe = await loadStripe('pk_test_51NM31RSHQMvGYYZ8eq9lCsw6Vu4LETpSDsXL7RWPGGLLzHXkojyJBil53qD38Vd9Nj1Oq631CkkqNsfDLhVGlGUF005jWW0pt2');
            
            const response = await session(checkoutItems).unwrap()
            console.log(response);
            if (response?.id) {
                const result = stripe.redirectToCheckout({
                    sessionId: response.id
                })
                if (result.error) {
                    console.log(result.error)
                }
            }
        } catch (err) {
            console.log(err)

        }


    }
    return (
        <div>
            <div className="container" >
                {/* <button onClick={handleTEst}>TEST</button> */}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((item, index) => (
                            <CartsTable id={item.id} index={index} key={index} count={item.count} />

                        ))}

                    </tbody>
                </table>
                <div>
                    <p> Total Price : {totalPrice} Rs</p>
                    <button onClick={() => handleCheckout()} className={totalPrice != 0 ? 'btn btn-info' : 'btn btn-info disabled'}>CHECKOUT</button>
                    {/* <button onClick={() => handleTEst()}>CHECKOUT</button> */}

                </div>

            </div>
        </div>
    )
}

export default CartPage