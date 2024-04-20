import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListOrderItems = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orderitems');
        setOrderItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderItems();
  }, []);

  const handleDelete = async (orderItemId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this order item?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/orderitems/${orderItemId}`);
        setOrderItems(orderItems.filter(item => item.order_item_id !== orderItemId));
      } catch (error) {
        console.error("Error deleting order item:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-xl font-bold">My App</h1>
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
      <h1 className="text-3xl mb-4">Order Items List</h1>
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 px-5">Order Item ID</th>
            <th className="text-left p-3 px-5">Customer Order ID</th>
            <th className="text-left p-3 px-5">Product Name</th>
            <th className="text-left p-3 px-5">Quantity</th>
            <th className="text-left p-3 px-5">Price per Unit</th>
            <th className="text-left p-3 px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map(item => (
            <tr key={item.order_item_id} className="border-b hover:bg-orange-100">
              <td className="p-3 px-5">{item.order_item_id}</td>
              <td className="p-3 px-5">{item.customer_order_id}</td>
              <td className="p-3 px-5">{item.product_name}</td>
              <td className="p-3 px-5">{item.quantity}</td>
              <td className="p-3 px-5">{item.price_per_unit}</td>
              <td className="p-3 px-5 flex justify-end">
                <Link to={`/editorderitem/${item.order_item_id}`} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(item.order_item_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ListOrderItems;
