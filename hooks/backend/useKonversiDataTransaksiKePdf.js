import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { PDFDocument, rgb } from "pdf-lib";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useKonversiDataTransaksiKePdf = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  useEffect(() => {
    const ambilDataTransaksi = async () => {
      try {
        const snapshotKueri = await getDocs(collection(database, "transaksi"));
        const data = snapshotKueri.docs.map((dokumen) => ({
          id: dokumen.id,
          ...dokumen.data(),
        }));
        setDataTransaksi(data);
      } catch (error) {
        console.error("Error mengambil data Transaksi:", error);
        toast.error("Gagal mengambil data Transaksi");
      }
    };

    ambilDataTransaksi();
  }, []);

  const unduhPdf = async () => {
    const pdfDoc = await PDFDocument.create();

    for (const item of dataTransaksi) {
      const page = pdfDoc.addPage([600, 400]);

      // Judul
      page.drawText("Data Transaksi", {
        x: 10,
        y: 350,
        size: 30,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Nama Pengguna: ${item.Nama_Pengguna || ""}`, {
        x: 10,
        y: 320,
      });
      page.drawText(`Email: ${item.Email || ""}`, { x: 10, y: 300 });
      page.drawText(`Kuantitas: ${item.Kuantitas || ""}`, { x: 10, y: 280 });
      page.drawText(`Produk: ${item.Produk || ""}`, { x: 10, y: 260 });
      page.drawText(`Status: ${item.Status || ""}`, { x: 10, y: 240 });
      page.drawText(
        `Tanggal Transaksi: ${
          item.Tanggal_Transaksi?.toDate().toLocaleString() || ""
        }`,
        { x: 10, y: 220 }
      );
      page.drawText(`Total Harga: ${item.Total_Harga || ""}`, {
        x: 10,
        y: 200,
      });
    }

    const namaDepan =
      dataTransaksi[0]?.Nama_Pengguna?.split(" ")[0] || "Pengguna";
    const namaFile = `Transaksi_${namaDepan}.pdf`;

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = namaFile;
    link.click();

    toast.success("PDF berhasil diunduh!");
  };

  return { dataTransaksi, unduhPdf };
};

export default useKonversiDataTransaksiKePdf;
