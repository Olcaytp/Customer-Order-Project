import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import jsPDF from "jspdf";

const PdfViewer = ({ pdfUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Function to generate the same PDF
const generateSamePDF = () => {
    // Creating a new instance of jsPDF
    const doc = new jsPDF();

    // Adding the invoice title
    doc.setFontSize(24);
    doc.text("Invoice PDF", 40, 10);
    doc.setFontSize(10);
    doc.text("Date: " + new Date().toDateString(), 40, 20);

    // Adding the items section
    doc.setFontSize(14);
    doc.text("Items:", 40, 40);
    doc.line(40, 45, 200, 45);

    // Saving the generated PDF file as "invoice_same.pdf"
    doc.save("invoice_same.pdf");
};

    return (
        <div>
            <Viewer
                fileUrl={pdfUrl}
                plugins={[defaultLayoutPluginInstance]}
            />
            {/* Aynı PDF'i üretmek için bir düğme */}
            <button onClick={generateSamePDF}>Generate Same PDF</button>
        </div>
    );
};

export default PdfViewer;
