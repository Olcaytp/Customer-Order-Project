import { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ViewDetailsPDF from './ViewDetailsPDF'; // Assuming this is your PDF document component

const PDFViewerComponent = ({ customerOrder, orderItems }) => {
  const [showPDF, setShowPDF] = useState(false);
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
        setOrderItems(filteredItems);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };
    
    fetchCustomerOrderDetails();
  }, [customerOrderId]); // customerOrderId dependency array içine eklendi

  return (
    <div>
      <button onClick={() => setShowPDF(true)}>View PDF</button>
      {showPDF && (
        <PDFViewer width="100%" height="600px">
          <ViewDetailsPDF customerOrder={customerOrder} orderItems={orderItems} />
        </PDFViewer>
      )}
      <PDFDownloadLink document={<ViewDetailsPDF customerOrder={customerOrder} orderItems={orderItems} />} fileName="order_details.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFViewerComponent;
