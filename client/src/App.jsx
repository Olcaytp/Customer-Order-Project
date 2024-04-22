import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListCustomerOrder from "./customerorderpage/listcustomerorders";
import ViewDetails from "./customerorderpage/viewdetails";
import EditCustomerOrder from "./customerorderpage/editcustomerorder";
import ListOrderItems from "./orderitemspage/listorderitems";
import EditOrderItem from "./orderitemspage/editorderitem";
import AddCustomerOrder from "./customerorderpage/addCustomerOrder";
import AddOrderItem from "./orderitemspage/AddOrderItem";
import SignIn from "./userspage/SignIn";
import HomePage from "./homepage/homepage";

import './App.css'

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customerOrders" element={<ListCustomerOrder />} />
        <Route path="/customerOrders/add" element={<AddCustomerOrder />} /> 
        <Route path="/customerOrder/viewdetails/:customerOrderId" element={<ViewDetails />} /> {/* viewdetails sayfasını yönlendir */}
        <Route path="/edit/:customerOrderId" element={<EditCustomerOrder />} /> {/* customerId parametresi için dinamik yol */}
        <Route path="/orderitems" element={<ListOrderItems />} />
        <Route path="/editorderitem/:orderItemId" element={<EditOrderItem />} />
        <Route path="/orderitem/add/:customerOrderId" element={<AddOrderItem />} />
        <Route path="/signin" element={<SignIn />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
