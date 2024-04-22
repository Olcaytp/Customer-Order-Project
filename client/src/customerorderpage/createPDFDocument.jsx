import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import jsPDF from "jspdf";

const PdfViewer = ({ pdfUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Aynı PDF'i üretmek için bir fonksiyon
    const generateSamePDF = () => {
        // Yeni bir jsPDF örneği oluşturuluyor
        const doc = new jsPDF();

        // Fatura başlığı ekleniyor
        doc.setFontSize(24);
        doc.text("Invoice PDF", 40,10);
        doc.setFontSize(10);
        doc.text("Date: " + new Date().toDateString(), 40, 20);

        // Ürünler bölümü ekleniyor
        doc.setFontSize(14);
        doc.text("Items:", 40, 40);
        doc.line(40, 45, 200, 45);

        // Oluşturulan PDF dosyası "invoice.pdf" olarak kaydediliyor
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
