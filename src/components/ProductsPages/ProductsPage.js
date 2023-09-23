import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addTocart } from '../../features/Products/cartSlice';
import { useGetByCategoriesQuery } from '../../features/Products/productsApiSlice';
const ProductsPage = ({ category }) => {
        const dispatch = useDispatch()
    const { data, isLoading, isFetching } = useGetByCategoriesQuery(category)
    const [products, setProducts] = useState([])
    useEffect(() => {
        if(data?.products){
            setProducts(data.products)
        }
        
    }, [data])

    const handleTest = () => {
        console.log(category)
        console.log(data)
    }

const handleAddtocart = (id) =>{
    dispatch(addTocart(id))
}

    return (
        <div>
            {/* <button onClick={handleTest}>Test</button> */}
            <div className='container mt-4'>
                {isLoading ? <p>Loading</p> : isFetching ? <p>Please Wait</p> :
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {products.map((product) => (

                            <div className="col" key={product.id}>
                                <div className="card h-100">
                                    <img src={product.thumbnail} className="card-img-top" alt="..." />

                                    <div className="card-body" style={{height : '20vh',textOverflow :'ellipsis'}}>
                                        <h5 className="card-title">{product.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                                        <p className="card-text" >{(product.description).slice(0, 50)}...</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Price : {((product.price) * 83.12).toFixed(2)} Rs</li>
                                        <li className="list-group-item">Rating : {product.rating}</li>

                                    </ul>
                                    <div className="card-body p-4" style={{minHeight : '5vh'}}>
                                        <button className='btn btn-primary ' style={{position:'absolute',bottom:5}} onClick={()=>handleAddtocart(product.id)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>



                        ))}
                    </div>
                }
            </div>

        </div>
    )
}

export default ProductsPage