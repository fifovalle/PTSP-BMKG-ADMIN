import { useState, useEffect, useCallback } from "react";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { PDFDocument, rgb } from "pdf-lib";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useKonversiDataIKMKePdf = () => {
  const [dataIKM, setDataIKM] = useState([]);
  const [sedangMemuatIkm, setSedangMemuatIkm] = useState(false);

  const ambilDaftarIkm = useCallback(async () => {
    const referensiPemesanan = collection(database, "pemesanan");
    try {
      setSedangMemuatIkm(true);
      const snapshot = await getDocs(referensiPemesanan);
      const pemesanans = [];

      for (const docSnapshot of snapshot.docs) {
        const pemesananRef = doc(database, "pemesanan", docSnapshot.id);
        const pemesananDoc = await getDoc(pemesananRef);

        if (pemesananDoc.exists()) {
          const pemesananData = {
            id: pemesananDoc.id,
            ...pemesananDoc.data(),
          };

          const penggunaRef = doc(
            database,
            "perorangan",
            pemesananData.ID_Pengguna
          );
          const penggunaDoc = await getDoc(penggunaRef);

          if (penggunaDoc.exists()) {
            pemesananData.pengguna = {
              id: penggunaDoc.id,
              ...penggunaDoc.data(),
            };
          } else {
            const perusahaanRef = doc(
              database,
              "perusahaan",
              pemesananData.ID_Pengguna
            );
            const perusahaanDoc = await getDoc(perusahaanRef);

            if (perusahaanDoc.exists()) {
              pemesananData.pengguna = {
                id: perusahaanDoc.id,
                ...perusahaanDoc.data(),
              };
            }
          }

          const ajukanRef = doc(database, "ajukan", pemesananData.ID_Ajukan);
          const ajukanDoc = await getDoc(ajukanRef);

          if (ajukanDoc.exists()) {
            pemesananData.ajukan = {
              id: ajukanDoc.id,
              ...ajukanDoc.data(),
            };
          }

          const ikmRef = doc(database, "ikm", pemesananDoc.id);
          const ikmDoc = await getDoc(ikmRef);

          if (ikmDoc.exists()) {
            const ikmData = {
              id: ikmDoc.id,
              ...ikmDoc.data(),
            };

            if (
              typeof ikmData.Opsi_Yang_Dipilih === "object" &&
              !Array.isArray(ikmData.Opsi_Yang_Dipilih)
            ) {
              const opsiDipilih = Object.values(
                ikmData.Opsi_Yang_Dipilih
              ).flat();
              ikmData.Opsi_Yang_Dipilih = opsiDipilih;
            } else if (!Array.isArray(ikmData.Opsi_Yang_Dipilih)) {
              ikmData.Opsi_Yang_Dipilih = [];
            }

            if (Array.isArray(ikmData.ikmResponses)) {
              ikmData.ikmResponses = ikmData.ikmResponses.map((response) => ({
                ...response,
              }));
            } else {
              ikmData.ikmResponses = [];
            }

            pemesananData.ikm = ikmData;
          } else {
            console.log(
              "IKM document not found for pemesanan ID:",
              pemesananDoc.id
            );
          }

          pemesanans.push(pemesananData);
        }
      }

      setDataIKM(pemesanans);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data IKM: " + error.message
      );
    } finally {
      setSedangMemuatIkm(false);
    }
  }, []);

  useEffect(() => {
    ambilDaftarIkm();
  }, [ambilDaftarIkm]);

  const unduhPdf = async () => {
    const pdfDoc = await PDFDocument.create();

    for (const item of dataIKM) {
      const page = pdfDoc.addPage([600, 800]); // Atur tinggi halaman untuk cukup menampung data

      page.drawText("Data IKM", {
        x: 10,
        y: 750,
        size: 18,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Nama Pengguna: ${item.pengguna?.Nama_Lengkap || ""}`, {
        x: 10,
        y: 720,
      });

      page.drawText(`Email: ${item.pengguna?.Email || ""}`, { x: 10, y: 700 });

      page.drawText(`NIK: ${item.pengguna?.No_Identitas || ""}`, {
        x: 10,
        y: 680,
      });

      page.drawText(`Koresponden: ${item.ajukan?.Nama_Ajukan || ""}`, {
        x: 10,
        y: 660,
      });

      let yPos = 640;

      page.drawText("Detail Layanan IKM:", { x: 10, y: yPos });
      yPos -= 20;

      if (item.ikm?.ikmResponses?.length > 0) {
        item.ikm.ikmResponses.forEach((response, index) => {
          page.drawText(`Pertanyaan ${index + 1}: ${response.NamaPertanyaan}`, {
            x: 20,
            y: yPos,
            size: 12,
          });
          yPos -= 20;

          page.drawText(
            `Kualitas Layanan: ${response.KualitasLayanan || "-"}`,
            {
              x: 40,
              y: yPos,
              size: 10,
            }
          );
          yPos -= 15;

          page.drawText(
            `Harapan Konsumen: ${response.HarapanKonsumen || "-"}`,
            {
              x: 40,
              y: yPos,
              size: 10,
            }
          );
          yPos -= 20;

          if (yPos < 50) {
            yPos = 750;
            pdfDoc.addPage([600, 800]);
          }
        });
      } else {
        page.drawText("Tidak ada data IKM untuk pengguna ini.", {
          x: 20,
          y: yPos,
          size: 12,
        });
        yPos -= 20;
      }
    }

    const namaFile = `IKM_Data.pdf`;

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = namaFile;
    link.click();

    toast.success("PDF berhasil diunduh!");
  };

  return { dataIKM, unduhPdf, sedangMemuatIkm };
};

export default useKonversiDataIKMKePdf;
