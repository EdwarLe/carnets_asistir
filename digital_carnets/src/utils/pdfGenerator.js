import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const generatePdf = async (elementToPrintId) => {
    const element = document.getElementById(elementToPrintId);

    const canvas = await html2canvas(element, { scale: 1 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save(`${nameStudent}.pdf`);

    const blob = pdf.output("blob");

    return blob;
}