
// import Navbar from "./Components/Navbar";
// import ProductsPage from "./Components/ProductPage";

// import AddProduct from "./Components/DashBoard/AddProduct";
import Dashboard from "./Components/DashBoard/Dashboard";
// import Login from "./Components/AdminLogin/Login"
// import UserLogin from "./Components/UserLogin";
// import UserRegister from "./Components/UserRegister";
// import User_forgot_password from "./Components/User_forgot_password";
// import DashBoard_Users from "@/app/Components/DashBoard/DashBoard_Users"
import OpenOrders from "./Components/DashBoard/OpenOrders";
import DeliveredOrderedList from "./Components/DashBoard/DeliveredOrderedList";
import AddShopForm from "./Components/DashBoard/Retailers_List/AddShopForm";
import ShopList from "./Components/DashBoard/Retailers_List/ShopList";


export default function Home() {
  return (
    <>
  <ShopList/>
    <AddShopForm/>
    <DeliveredOrderedList/>
    <OpenOrders/>
    {/* <User_forgot_password/> */}
{/* <UserRegister/> */}
    {/* <UserLogin/> */}
    {/* <Login/> */}
    {/* <AddProduct/> */}
    {/* <DashBoard_Users/> */}
    <Dashboard/>
     {/* <Navbar/>
    <ProductsPage/>  */}
    </>
  );
}
