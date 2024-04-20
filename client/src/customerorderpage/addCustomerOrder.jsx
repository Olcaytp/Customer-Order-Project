import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddCustomerOrder = () => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);

  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [customerOrderId, setCustomerOrderId] = useState(null);

  const handleAddCustomerOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/customerorder/', {
        customer_name: customerName,
        address: address,
        order_date: orderDate
      });
      setCustomerOrderId(response.data.customer_order_id);
      setShowAddItemForm(true);
    } catch (error) {
      console.error('Error adding customer order:', error);
    }
  };
  
  const handleAddOrderItem = async () => {
    try {
      await axios.post(`http://localhost:8080/orderItems/`, {
        customerId: customerOrderId,
        productName: productName,
        quantity: quantity,
        pricePerUnit: pricePerUnit
      });
      // Başarı durumunu işle veya başka bir sayfaya yönlendir
    } catch (error) {
      console.error('Order öğesi eklenirken hata oluştu:', error);
    }
  };
  
  const handleCancelAddItem = () => {
    setShowAddItemForm(false);
  };
  
  return (
    <div>
      <div>
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex justify-center items-center px-4">
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
    <div className="relative flex text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">Add Customer Order</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <div className="px-8 py-6">
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <label className="block font-semibold">Customer Name:</label>
                <input 
                  type="text" 
                  placeholder="Customer Name" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" 
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block font-semibold">Address:</label>
                <input 
                  type="text" 
                  placeholder="Address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" 
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block font-semibold">Order Date:</label>
              <input 
                type="date" 
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" 
              />
            </div>
            <div className="flex justify-end items-baseline mt-4">
                <button 
                  type="button"
                  onClick={handleAddCustomerOrder}
                  className="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
                >
                  Add Customer Order
                </button>
            </div>
            {showAddItemForm && (
              <form className="mt-4">
                {/* Add Order Item Form */}
                <label className="block mt-3 font-semibold">Product Name:</label>
                <input 
                  type="text" 
                  placeholder="Product Name" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" 
                />
                <label className="block mt-3 font-semibold">Quantity:</label>
                <input 
                  type="number" 
                  placeholder="Quantity" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" 
                />
                <label className="block mt-3 font-semibold">Price Per Unit:</label>
                <input 
                  type="number" 
                  placeholder="Price Per Unit" 
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(parseInt(e.target.value))}
                  className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" 
                />
                <div className="flex justify-between items-baseline mt-4">
                  <button 
                    type="submit"
                    onClick={handleAddOrderItem} 
                    className="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
                  >
                    Add Item
                  </button>
                  <button 
                    type="button" 
                    onClick={handleCancelAddItem}
                    className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
      </div>
  );
}

export default AddCustomerOrder;
