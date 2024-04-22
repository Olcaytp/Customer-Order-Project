import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams hook'unu içe aktar
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const EditCustomerOrder = () => {
  const { customerOrderId } = useParams(); // URL'den müşteri ID'sini al
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const [formData, setFormData] = useState({}); // Form verileri için başlangıç değeri boş bir nesne
  const [orderItems, setOrderItems] = useState([]); // Sipariş öğeleri için başlangıç değeri boş bir dizi

  useEffect(() => {
    const fetchCustomerOrderDetails = async () => {
      try {
        // Müşteri siparişi detaylarını getir
        const response = await axios.get(`http://localhost:8080/customerorder/${customerOrderId}`);
        console.log(response.data);
        const modifiedData = {
          ...response.data,
          order_date: response.data.order_date.substring(0, response.data.order_date.indexOf('T'))
        };
        setFormData(modifiedData);

        // Tüm sipariş öğelerini getir
        const itemsResponse = await axios.get(`http://localhost:8080/orderitems`);
        //console.log(itemsResponse.data);

        // Sadece mevcut müşteri siparişi ID'sine sahip olanları filtrele
        const filteredItems = itemsResponse.data.filter(item => item.customer_order_id == customerOrderId);
        console.log(filteredItems);
        setOrderItems(filteredItems);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };
    
    fetchCustomerOrderDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Müşteri siparişini güncelle
      await axios.put(`http://localhost:8080/customerorder/${customerOrderId}`, formData);
      // Başarılı güncelleme işlemi mesajı veya yönlendirme yapılabilir
      window.location.href = '/customerorders';
    } catch (error) {
      console.error('Error updating customer order:', error);
    }
  };

  const handleSignOut = () => {
    // Kullanıcıyı çıkış yapmış olarak işaretle
    setIsLoggedIn(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {formData.customer_name ? (
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
          <h2 className="text-2xl font-bold mb-4">Edit Customer Order</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold">Customer Name:</label>
              <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            </div>
            <div>
              <label className="block mt-3 font-semibold">Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            </div>
            <div>
              <label className="block mt-3 font-semibold">Order Date:</label>
              <input type="date" name="order_date" value={formData.order_date} onChange={handleChange} className="border w-full h-10 px-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
            </div>
            <button type="submit" className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600">Update Customer Order</button>
          </form>
          {/* Sipariş öğeleri tablosu */}
          <h2 className="text-2xl font-bold mt-8">Order Items</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Product Name</th>
                <th className="border border-gray-200 px-4 py-2">Quantity</th>
                <th className="border border-gray-200 px-4 py-2">Price Per Unit</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map(item => (
                <tr key={item.order_item_id}>
                  <td className="border border-gray-200 px-4 py-2">{item.product_name}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.price_per_unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditCustomerOrder;
