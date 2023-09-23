
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login/Login';
import{Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Welcome from './components/Welcome';
import Allproductspage from './components/Allproductspage';
import Adminpage from './components/AdminFolder/Adminpage';
import ProductsPage from './components/ProductsPages/ProductsPage';
import CartPage from './components/CartPage';
import PaymentFail from './components/PaymentFail';
import PaymentSuccesPage from './components/PaymentSuccesPage';
import OrdersPage from './components/Orders/OrdersPage';
function App() {
  return (
    <Routes>
      <Route path='/' element ={<Layout/>} >
        <Route index element = {<Login/>} />
        <Route path='home' element = {<Home/>} >
        <Route index element = {<Welcome/>}/>
        <Route path = 'allproductspage' element = {<Allproductspage/>}/>
        <Route path = 'admin' element = {<Adminpage/>}/>
        <Route path = 'categoryPage' element = {<ProductsPage/>}/>
        <Route path = 'cartPage' element = {<CartPage/>}/>
        <Route path = 'paymentsuccess' element = {<PaymentSuccesPage/>}/>
        <Route path = 'paymentfailed' element = {<PaymentFail/>}/>
        <Route path='orderspage' element ={<OrdersPage/>}/>

        </Route>
        

      </Route>
    </Routes>
  );
}

export default App;
