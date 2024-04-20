import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // useParams hook'unu içe aktar
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink  } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

const ViewDetails = () => {
  const { customerOrderId } = useParams(); // URL'den müşteri ID'sini al

  const [customerOrder, setCustomerOrder] = useState({}); // Başlangıç değeri boş bir nesne
  const [orderItems, setOrderItems] = useState([]); // Sipariş öğeleri için başlangıç değeri boş bir dizi

  useEffect(() => {
    const fetchCustomerOrderDetails = async () => { // customerOrderId parametresi kaldırıldı
      try {
        // Müşteri siparişi detaylarını getir
        const response = await axios.get(`http://localhost:8080/customerorder/${customerOrderId}`);
        //console.log(response.data);
        const modifiedData = {
          ...response.data,
          order_date: response.data.order_date.substring(0, response.data.order_date.indexOf('T'))
        };
        setCustomerOrder(modifiedData);
  
        // Tüm sipariş öğelerini getir
        const itemsResponse = await axios.get(`http://localhost:8080/orderitems`);
        //console.log('itemsResponse', itemsResponse.data);
  
        // Sadece mevcut müşteri siparişi ID'sine sahip olanları filtrele
        const filteredItems = itemsResponse.data.filter(item => item.customer_order_id == customerOrderId);
        //console.log('filteredItems', filteredItems);
        setOrderItems(filteredItems);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };
    
    fetchCustomerOrderDetails();
  }, [customerOrderId]); // customerOrderId dependency array içine eklendi

  const handleRemoveItem = async (itemId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to remove this item?");
      if (isConfirmed) {
        // Öğeyi kaldırma isteği gönder
        await axios.delete(`http://localhost:8080/orderItems/${itemId}`);
        // Başarı durumunu işle veya bir güncelleme yap
        console.log('Item removed successfully:', itemId);
        // Kaldırılan öğeyi yenilemek için sipariş öğelerini güncelle
        setOrderItems(orderItems.filter(item => item.order_item_id !== itemId));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };  
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      {customerOrder.customer_name ? (
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
            <Link to={`/editorderitem/add/${customerOrderId}`} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
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
                    <button onClick={() => handleRemoveItem(customerOrder.order_item_id)} className="bg-red-500 text-white py-1 px-4 rounded-md mr-2">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      <PDFDownloadLink document={<ViewDetailsPDF customerOrder={customerOrder} />} fileName="order_details.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const ViewDetailsPDF = ({ customerOrder }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Customer ID: {customerOrder.customer_order_id} </Text>
        <Text>Customer Name: {customerOrder.customer_name} </Text>
        <Text>Address: {customerOrder.address} </Text>
        <Text>Order Date: {customerOrder.order_date} </Text>
      </View>
    </Page>
  </Document>
);

ViewDetailsPDF.propTypes = {
  customerOrder: PropTypes.object.isRequired,
};

export default ViewDetails;
