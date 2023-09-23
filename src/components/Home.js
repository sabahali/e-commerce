import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux';
import { Outlet, useAsyncError } from 'react-router-dom';
import { logout } from '../features/User/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { chooseCategory } from '../features/Products/productStatusSlice';
import { useState } from 'react';
import ProductsPage from './ProductsPages/ProductsPage';

const Home = () => {
    const username = useSelector(state => state.auth.username)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useState('')
    const [show, setShow] = useState(false)
    const cartNumber = useSelector(state => state.cart.cartNumber)


    const handleLougout = async () => {
        const controller = new AbortController();
        try {
            const response = await axios.get('http://127.0.0.1:8000/logout', {
                withCredentials: true
            })
            if (response?.status == 204) {
                dispatch(logout())
                const signal = controller.signal
                navigate('/')
            }
        } catch (err) {
            navigate('/')
            const signal = controller.signal
        }
    }

    const handleCategory = (name) => {
        setShow(true)
        setCategory(name)
        dispatch(chooseCategory(name))
    }
 const handleOrder = () => {
        navigate('/home/orderspage')

 }



    return (
        <div className='d-flex flex-column ' style={{ width: '100vw', height: '100vh' }} >
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home">
                                <Nav.Link onClick={() => setShow(false)}>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="admin">
                                <Nav.Link onClick={() => setShow(false)}>Admin</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="allproductspage">
                                <Nav.Link onClick={() => setShow(false)}>All Products </Nav.Link>
                            </LinkContainer>


                            <NavDropdown title="Gent's" id="collapsible-nav-dropdown">

                                <NavDropdown.Item onClick={() => handleCategory('mens-shirts')}>Men's-shirts </NavDropdown.Item>


                                <NavDropdown.Item onClick={() => handleCategory('mens-shoes')}>Men's-shoes </NavDropdown.Item>

                                <NavDropdown.Item onClick={() => handleCategory('mens-watches')} >Men's-watches </NavDropdown.Item>


                            </NavDropdown>
                            <NavDropdown title="Women's" id="collapsible-nav-dropdown">

                                <NavDropdown.Item onClick={() => handleCategory('womens-dresses')}>Women's-dresses </NavDropdown.Item>

                                <NavDropdown.Item onClick={() => handleCategory('womens-shoes')}>Women's-shoes </NavDropdown.Item>

                                <NavDropdown.Item onClick={() => handleCategory('womens-watches')}>Women's-watches </NavDropdown.Item>

                                <NavDropdown.Item onClick={() => handleCategory('womens-bags')}>Women's-bags </NavDropdown.Item>



                            </NavDropdown>
                            <NavDropdown title="Life Style" id="collapsible-nav-dropdown">

                                <NavDropdown.Item onClick={() => handleCategory('skincare')}>Skincare </NavDropdown.Item>

                                <NavDropdown.Item onClick={() => handleCategory('sunglasses')}>Sunglasses </NavDropdown.Item>

                                <NavDropdown.Item onClick={() => handleCategory('fragrances')}>Fragrances</NavDropdown.Item>



                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <NavDropdown title={username} id='collapsible-nav-dropdown'>
                                
                                
                                    <button className="nav-link nav-item dropdown-item" onClick={() => handleLougout()} >Logout</button>
                                    <button className="nav-link nav-item dropdown-item" onClick={() => handleOrder()}>My Orders</button>
                                
                            </NavDropdown>
                            <LinkContainer to="cartPage">
                                <Nav.Link >
                                    <button type="button" className="btn  position-relative" onClick={() => setShow(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartNumber}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </button>
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='flex-grow-1 '>
                {show ? <ProductsPage category={category} /> : <Outlet />}

            </div>
            <div className='d-flex flex-column align-items-center justify-content-start p-2 w-100 bg-light'>
                <p> &copy; Copyright 2023 </p>
            </div>



        </div >
    )
}

export default Home