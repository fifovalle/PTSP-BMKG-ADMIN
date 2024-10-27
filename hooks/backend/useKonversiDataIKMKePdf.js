import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { PDFDocument, rgb } from "pdf-lib";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useKonversiDataIKMKePdf = () => {
  const [dataIKM, setDataIKM] = useState([]);

  useEffect(() => {
    const ambilDataIKM = async () => {
      try {
        const snapshotKueri = await getDocs(collection(database, "ikm"));
        const data = snapshotKueri.docs.map((dokumen) => ({
          id: dokumen.id,
          ...dokumen.data(),
        }));
        setDataIKM(data);
      } catch (error) {
        console.error("Error mengambil data IKM:", error);
        toast.error("Gagal mengambil data IKM");
      }
    };

    ambilDataIKM();
  }, []);

  const unduhPdf = async () => {
    const pdfDoc = await PDFDocument.create();

    for (const item of dataIKM) {
      const page = pdfDoc.addPage([600, 400]);

      page.drawText("Data IKM", {
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
      page.drawText(`NIK: ${item.NIK || ""}`, { x: 10, y: 280 });
      page.drawText(`Koresponden: ${item.Koresponden || ""}`, {
        x: 10,
        y: 260,
      });
      page.drawText(`Jenis Layanan: ${item.Jenis_Layanan || ""}`, {
        x: 10,
        y: 240,
      });
      page.drawText(
        `Tanggal Pengisian: ${
          item.Tanggal_Pengisian?.toDate().toLocaleString() || ""
        }`,
        { x: 10, y: 220 }
      );
    }

    const namaDepan = dataIKM[0]?.Nama_Pengguna?.split(" ")[0] || "Pengguna";
    const namaFile = `IKM_${namaDepan}.pdf`;

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = namaFile;
    link.click();

    toast.success("PDF berhasil diunduh!");
  };

  return { dataIKM, unduhPdf };
};

export default useKonversiDataIKMKePdf;
