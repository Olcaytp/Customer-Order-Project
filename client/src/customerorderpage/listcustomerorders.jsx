import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from './pagination'; 
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const ListCustomerOrder = () => {
  const [customerorders, setCustomerOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const apiUrl = "http://localhost:8080/customerorder";

  useEffect(() => {
    const fetchCustomerOrder = async () => {
      try {
        const response = await axios.get(apiUrl);
        const modifiedData = response.data.map(customerorder => ({
          ...customerorder,
          order_date: customerorder.order_date.substring(0, customerorder.order_date.indexOf('T'))
        }));
        setCustomerOrders(modifiedData);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerOrder();
  }, [apiUrl]);

  const handleDelete = async (customerOrderId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this customer?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/customerorder/${customerOrderId}`);
        setCustomerOrders(customerorders.filter(customerorder => customerorder.customer_order_id !== customerOrderId));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Current items
  const indexOfLastItem = currentPage * ordersPerPage;
  const indexOfFirstItem = indexOfLastItem - ordersPerPage;
  const currentOrders = customerorders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div>
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <nav>
              <ul className="flex space-x-4">
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/signin" className="hover:text-gray-300">Sign in</Link>
                    </li>
                    <li>
                      <Link to="/signup" className="hover:text-gray-300">Sign up</Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <button onClick={handleSignOut} className="text-gray-800">Sign out</button>
                  </li>
                )}
              </ul>
            </nav>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/customerOrders" className="hover:text-gray-300">List Customer Orders</Link>
                </li>
                <li>
                  <Link to="/orderitems" className="hover:text-gray-300">List Order Items</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Customer Order List</h2>
        <table className="w-full border-collapse border border-red-700 ">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Customer ID</th>
              <th className="border border-gray-200 px-4 py-2">Customer Name</th>
              <th className="border border-gray-200 px-4 py-2">Address</th>
              <th className="border border-gray-200 px-4 py-2">Order Date</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>{" "}
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((customerorder) => (
              <tr key={customerorder.customer_order_id}>
                <td className="border border-gray-200 px-4 py-2">
                  {customerorder.customer_order_id}
                </td>
                <td className="border border-gray-200  px-4 py-2">
                  {customerorder.customer_name}
                </td>
                <td className="border border-gray-200  px-4 py-2">
                  {customerorder.address}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {customerorder.order_date}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button className="border-gray-200 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 mb-2">
                  <Link to={`/edit/${customerorder.customer_order_id}`}>Edit</Link>
                  </button>
                  <button onClick={() => handleDelete(customerorder.customer_order_id)} className="border-gray-200 hover:bg-red-500 text-white font-bold py-1 px-2 rounded mb-2">
                    <Link>Delete</Link>
                  </button>
                  <button className="border-gray-200 hover:bg-red-500 text-white font-bold py-1 px-2 rounded">
                  <Link
                    to={`/customerorder/viewCustomerOrderDetails/${customerorder.customer_order_id}`} // View butonuna tıklandığında ilgili URL'ye yönlendir
                    className="bg-green-500 hover:bg-red-500 text-white font-bold py-1 px-4 rounded mt-1">
                    View
                  </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <Pagination
            currentPage={currentPage}
            ordersPerPage={ordersPerPage}
            totalOrders={customerorders.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        <button className=" text-white font-bold py-1 px-2 rounded mt-5">
        <Link to="/customerOrders/add" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
          Add Customer Order
        </Link>
        </button>
      </div>
    </div>
  );
};

export default ListCustomerOrder;
