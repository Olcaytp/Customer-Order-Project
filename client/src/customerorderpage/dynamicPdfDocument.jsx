import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import jsPDF from "jspdf";
import axios from 'axios';

function DynamicPDFDocument() {
  // State variables
  const { customerOrderId } = useParams();
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  //const customerApiUrl = "http://localhost:8080/customerorder";
  const itemApiUrl = "http://localhost:8080/orderitems";
  
  // Fetch data from database
  useEffect(() => {
    // Example fetch function, replace with actual fetch function
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint to fetch customer data
        const customerResponse = await fetch(`http://localhost:8080/customerorder/${customerOrderId}`);
        const customerData = await customerResponse.json();
        console.log(customerData);
        setCustomerName(customerData.customer_name);
        setCustomerAddress(customerData.address);

        // Tüm sipariş öğelerini getir
        const itemsResponse = await axios.get(itemApiUrl);
        console.log(itemsResponse);
        // Sadece mevcut müşteri siparişi ID'sine sahip olanları filtrele
        const filteredItems = itemsResponse.data.filter(item => item.customer_order_id == customerOrderId);
        //console.log('filteredItems', filteredItems);
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [customerOrderId]);

  // Event handler for item changes
  const handleItemChange = (index, event) => {
    let newItems = [...items];
    newItems[index] = { ...newItems[index], [event.target.name]: event.target.value };
    setItems(newItems);
  };

  // Add new item to the list
  const addItem = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

 // Delete an item from the list
 const deleteItem = (index) => {
  let newItems = [...items];
  newItems.splice(index, 1);
  setItems(newItems);
};

// Function to generate the PDF document dynamically
const generatePDF = (customerName, customerAddress, items) => {
  // Müşteri adı ve adresi kontrol ediliyor
  if (!customerName || !customerAddress) {
    console.error('Customer name or address is missing.');
    return;
  }

  // Ürünlerin adı, miktarı ve fiyatı kontrol ediliyor
  if (items.some((item) => !item.product_name || !item.quantity || !item.price_per_unit)) {
    console.error('Item name, quantity, or price is missing.');
    return;
  }

  // Yeni bir jsPDF örneği oluşturuluyor
  const doc = new jsPDF();

  // Fatura başlığı ekleniyor
  doc.setFontSize(24);
  doc.text("Invoice PDF", 40,10);
  doc.setFontSize(10);
  doc.text("Date: " + new Date().toDateString(), 40, 20);
  doc.text(`Customer Name: ${customerName}`, 40, 25);
  doc.text(`Customer Address: ${customerAddress}`, 40, 30);

  // Ürünler bölümü ekleniyor
  doc.setFontSize(14);
  doc.text("Items:", 40, 40);
  doc.line(40, 45, 200, 45);

  // Ürün detayları ekleniyor
  let yOffset = 55;
  let total = 0;

  items.forEach((item, index) => {
    const itemTotal = item.quantity * item.price_per_unit;
    total += itemTotal;

    doc.text(`${index + 1}. ${item.product_name}`, 40, yOffset);
    doc.text(`Quantity: ${item.quantity}`, 80, yOffset);
    doc.text(`Price: $${item.price_per_unit}`, 120, yOffset);
    doc.text(`Total: $${itemTotal}`, 160, yOffset);

    yOffset += 10;
  });

  // Toplam ekleniyor
  doc.line(40, yOffset, 200, yOffset);
  doc.setFontSize(14);
  doc.text(`Total: $${total}`, 160, yOffset + 20);

  // Oluşturulan PDF dosyası "invoice.pdf" olarak kaydediliyor
  doc.save("invoice.pdf");
};


return (
  <Container maxWidth="md">
    <Typography variant="h3" component="h1" gutterBottom>
      Create PDF
    </Typography>

    {/* Customer Name and Address fields */}
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Customer Name"
          fullWidth
          margin="normal"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Customer Address"
          fullWidth
          margin="normal"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </Grid>
    </Grid>

    {/* Items table */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="pdf table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <TextField
                  fullWidth
                  value={item.product_name}
                  onChange={(event) => handleItemChange(index, event)}
                  name="product_name"
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  fullWidth
                  value={item.quantity}
                  onChange={(event) => handleItemChange(index, event)}
                  name="quantity"
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  fullWidth
                  value={item.price_per_unit}
                  onChange={(event) => handleItemChange(index, event)}
                  name="price_per_unit"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => deleteItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Buttons */}
    <Box mt={2} display="flex" gap={2}>
      <Button variant="contained" onClick={addItem}>
        Add Item
      </Button>
      <Button variant="outlined" color="success" onClick={() => generatePDF(customerName, customerAddress, items)}>
        Generate PDF
      </Button>
    </Box>

    {/* Error Snackbar */}
    <Snackbar
      open={error}
      autoHideDuration={6000}
      onClose={() => setError(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={() => setError(false)} severity="error">
        Please fill in all required fields.
      </Alert>
    </Snackbar>
  </Container>
);
}

export default DynamicPDFDocument;
