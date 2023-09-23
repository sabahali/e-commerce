import React, { useState } from 'react'
import { useGetProductsQuery } from '../features/Products/productsApiSlice'

import Allproductscards from './Allproductscards'
const Allproductspage = () => {
    const[offset,setOffest] = useState(0)
     const { data : pageData, status, refetch ,isFetching,isLoading} = useGetProductsQuery(Number(offset))

    const handlePagination = (number) =>{
        setOffest(number*10)
        
    }
    const handleNextbutton = (number) =>{
        setOffest(prev => prev+10)
    }
    const handlePrevbutton = (number) =>{

    }
    const handletest = () => {
        console.log(pageData)

    }

    
    return (
        <div>
        <div className='mt-4'>
            {/* <button onClick={handletest}>TEST</button> */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    
                    <li className="page-item "><button className="page-link" onClick={()=>handlePagination(1)} >1</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>handlePagination(2)}>2</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>handlePagination(3)}>3</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>handlePagination(4)}>4</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>handlePagination(5)}>5</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>handlePagination(6)}>6</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>handlePagination(7)}>7</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>handlePagination(8)}>8</button></li>
                    
                </ul>
            </nav>
        </div>
        <div>

        </div>
        {isLoading ? <p>Loading</p> :isFetching ? <p>Please Wait</p> : <Allproductscards pageData = {pageData.products}/> }
        
        
        </div>
    )
}

export default Allproductspage