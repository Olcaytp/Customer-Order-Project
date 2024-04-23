import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const AddOrderItem = () => {
  const { customerOrderId } = useParams(); // Get customer ID from URL
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0.0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/orderitems`, {
        customer_order_id: customerOrderId,
        product_name: productName,
        quantity: quantity,
        price_per_unit: pricePerUnit,
      });
      window.location.href = '/customerorder/viewCustomerOrderDetails/:'+ customerOrderId;
      console.log('New order item created:', response.data);
      console.log(response);
    } catch (error) {
      console.error('Error adding order item:', error);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
      <h2 className="text-2xl font-bold mb-4">Add New Order Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productname">
            Product Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productname"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            min={1} // Set minimum quantity to 1
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerUnit">
            Price Per Unit
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pricePerUnit"
            type="number"
            placeholder="Enter price per unit"
            min={0.01} // Set minimum price to 0.01
            step={0.01} // Allow decimal values
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrderItem;
