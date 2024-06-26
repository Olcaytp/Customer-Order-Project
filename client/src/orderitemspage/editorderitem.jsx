import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';


import '../App.css'

const EditOrderItem = () => {
  const { orderItemId } = useParams();
  const [orderItem, setOrderItem] = useState({
    productName: '',
    quantity: '',
    pricePerUnit: ''
  });
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const fetchOrderItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/orderitems/${orderItemId}`);
        const { product_name, quantity, price_per_unit } = response.data;
        setOrderItem({
          productName: product_name || '',
          quantity: quantity || '',
          pricePerUnit: price_per_unit !== '' ? parseFloat(price_per_unit) : ''
        });
      } catch (error) {
        console.error('Error fetching order item details:', error);
      }
    };
  
    fetchOrderItemDetails();
  }, [orderItemId]);
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/orderitems/${orderItemId}`, orderItem);
      window.location.href = '/orderitems';
    } catch (error) {
      console.error('Error updating order item:', error);
    }
  };

  const handleChange = (e) => {
    setOrderItem({
      ...orderItem,
      [e.target.name]: e.target.value
    });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
    <div className="container mx-auto flex justify-between items-center px-4">
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-2">
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
    <h2 className="text-2xl font-bold mb-4">Edit Order Item</h2>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
            Product Name
        </label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="productName" name="productName" type="text" placeholder="Product Name" value={orderItem.productName} onChange={handleChange} />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
        </label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" name="quantity" type="text" placeholder="Quantity" value={orderItem.quantity} onChange={handleChange} />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerUnit">
            Price Per Unit
        </label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pricePerUnit" name="pricePerUnit" type="text" placeholder="Price Per Unit" value={orderItem.pricePerUnit} onChange={handleChange} />
        </div>
        <div className="mb-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleUpdate}>Update Order Item</button>
        </div>
    </form>
    </div>
  );
};

export default EditOrderItem;
