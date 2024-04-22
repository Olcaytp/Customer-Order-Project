import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListCustomerOrder from "./customerorderpage/listcustomerorders";
import ViewDetails from "./customerorderpage/viewCustomerOrderDetails";
import EditCustomerOrder from "./customerorderpage/editcustomerorder";
import ListOrderItems from "./orderitemspage/listorderitems";
import EditOrderItem from "./orderitemspage/editorderitem";
import AddCustomerOrder from "./customerorderpage/addCustomerOrder";
import AddOrderItem from "./orderitemspage/AddOrderItem";
import SignIn from "./userspage/SignIn";
import SignUp from "./userspage/SignUp";
import HomePage from "./homepage/homepage";
import { UserProvider } from "./context/UserContext";

import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <UserProvider value={{isLoggedIn, setIsLoggedIn}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customerOrders" element={<ListCustomerOrder />} />
            <Route path="/customerOrders/add" element={<AddCustomerOrder />} />
            <Route path="/customerOrder/viewCustomerOrderDetails/:customerOrderId" element={<ViewDetails />}/>
            <Route path="/edit/:customerOrderId" element={<EditCustomerOrder />} />
            <Route path="/orderitems" element={<ListOrderItems />} />
            <Route path="/editorderitem/:orderItemId" element={<EditOrderItem />} />
            <Route path="/orderitem/add/:customerOrderId" element={<AddOrderItem />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App
