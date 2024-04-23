import{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // useParams hook'unu içe aktar
import DynamicPDFDocument from './dynamicPdfDocument.jsx';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const ViewDetails = () => {
  const { customerOrderId } = useParams(); // URL'den müşteri ID'sini al
  const [customerOrder, setCustomerOrder] = useState({}); // Başlangıç değeri boş bir nesne
  const [orderItems, setOrderItems] = useState([]); // Sipariş öğeleri için başlangıç değeri boş bir dizi
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCustomerOrderDetails = async () => { // customerOrderId parametresi kaldırıldı
      try {
        // Müşteri siparişi detaylarını getir
        const response = await axios.get(`http://localhost:8080/customerorder/${customerOrderId}`);
        const modifiedData = {
          ...response.data,
          order_date: response.data.order_date.substring(0, response.data.order_date.indexOf('T'))
        };
        setCustomerOrder(modifiedData);
  
        // Tüm sipariş öğelerini getir
        const itemsResponse = await axios.get(`http://localhost:8080/orderitems`);
  
        // Sadece mevcut müşteri siparişi ID'sine sahip olanları filtrele
        const filteredItems = itemsResponse.data.filter(item => item.customer_order_id == customerOrderId);
        setOrderItems(filteredItems);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };
    
    fetchCustomerOrderDetails();
  }, [customerOrderId]); // customerOrderId dependency array içine eklendi
  const context = useContext(UserContext);

  const handleSignOut = () => {
    // Kullanıcıyı çıkış yapmış olarak işaretle
    context.setIsLoggedIn(false);
  };

  const handleRemoveItem = async (orderItemId) => {
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

  const handleGeneratePDF = () => {
    setShowForm(!showForm);
  }; 
  
  return (
    <div className="container mx-auto px-4 py-8">
      {customerOrder.customer_name ? (
        <div>
        <div>
        <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <nav>
            <ul className="flex space-x-4">
              {context.isLoggedIn ? (
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
                  <button onClick={handleSignOut} className="bg-gray-800 text-white">Sign out</button>
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
          <h2 className="text-2xl font-bold mb-4">Customer Order Details </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Customer ID</th>
                <th className="border border-gray-200 px-4 py-2">Customer Name</th>
                <th className="border border-gray-200 px-4 py-2">Address</th>
                <th className="border border-gray-200 px-4 py-2">Order Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">{customerOrder.customer_order_id}</td>
                <td className="border border-gray-200 px-4 py-2">{customerOrder.customer_name}</td>
                <td className="border border-gray-200 px-4 py-2">{customerOrder.address}</td>
                <td className="border border-gray-200 px-4 py-2">{customerOrder.order_date}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-2xl font-bold mt-8">Order Items</h2>
          <div className="flex justify-end">
          <div className="flex justify-end">
            <Link to={`/orderitem/add/${customerOrderId}`} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
              Add Item
            </Link>
          </div>
          </div>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Product Name</th>
                <th className="border border-gray-200 px-4 py-2">Quantity</th>
                <th className="border border-gray-200 px-4 py-2">Price Per Unit</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map(item => (
                <tr key={item.order_item_id}>
                  <td className="border border-gray-200 px-4 py-2">{item.product_name}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.price_per_unit}</td>
                <td className="border border-gray-200 px-4 py-2">
                    <button onClick={() => handleRemoveItem(item.order_item_id)} className="bg-red-500 text-white py-1 px-4 rounded-md mr-2">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!context.isLoggedIn && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Customer Order Details </h2>
              <button onClick={handleGeneratePDF} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
                {showForm ? 'Hide PDF' : 'Create PDF Dynamically'}
              </button>
              {showForm && <DynamicPDFDocument customerOrder={customerOrder} orderItems={orderItems} />}
            </div>
          )}
  </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewDetails;
