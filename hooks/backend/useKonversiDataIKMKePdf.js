import { useState, useEffect, useCallback } from "react";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";
import { formatTanggal } from "@/constants/formatTanggal";

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

  const splitTextIntoLines = (text, maxWidth, font, fontSize) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (lineWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  const unduhPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontSize = 10;

    const imageBytes = await fetch("/ikm.jpg").then((res) => res.arrayBuffer());
    const image = await pdfDoc.embedJpg(imageBytes);

    const dataValidIKM =
      dataIKM.find((item) => item.ikm?.ikmResponses?.length > 0) || dataIKM[0];

    let page = pdfDoc.addPage([600, 850]);
    let yPos = 750;

    const imageWidth = 550;
    const imageHeight = 110;
    const offsetY = 100;
    page.drawImage(image, {
      x: 25,
      y: yPos - imageHeight + offsetY,
      width: imageWidth,
      height: imageHeight,
    });

    const gapBetweenImageAndText = -70;
    yPos -= imageHeight + gapBetweenImageAndText;

    const text = "LAPORAN DATA IKM";
    const textWidth = font.widthOfTextAtSize(text, 20);
    const pageWidth = 600;
    const xPos = (pageWidth - textWidth) / 2;

    page.drawText(text, {
      x: xPos,
      y: yPos,
      size: 15,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    yPos -= 40;

    page.drawText(
      `Tanggal Pemesanan: ${
        formatTanggal(dataValidIKM.Tanggal_Pemesanan) || ""
      }`,
      {
        x: 20,
        y: yPos,
        size: 12,
        font,
      }
    );
    yPos -= 20;

    page.drawText(`Koresponden: ${dataValidIKM.ajukan?.Nama_Ajukan || ""}`, {
      x: 20,
      y: yPos,
      size: 12,
      font,
    });
    yPos -= 20;

    page.drawText(
      `Nama Pengguna: ${dataValidIKM.pengguna?.Nama_Lengkap || ""}`,
      {
        x: 20,
        y: yPos,
        size: 12,
        font,
      }
    );
    yPos -= 20;

    page.drawText(`Email: ${dataValidIKM.pengguna?.Email || ""}`, {
      x: 20,
      y: yPos,
      size: 12,
      font,
    });
    yPos -= 20;

    if (dataValidIKM.Data_Keranjang && dataValidIKM.Data_Keranjang.length > 0) {
      dataValidIKM.Data_Keranjang.forEach((produk, index) => {
        page.drawText(
          `Nama Produk ${index + 1}: ${
            produk?.Nama || "Tidak ada nama produk"
          }`,
          {
            x: 20,
            y: yPos,
            size: 12,
            font,
          }
        );
        yPos -= 20;
      });
    }

    page.drawText(``, {
      x: 20,
      y: yPos,
      size: 12,
      font,
    });
    yPos -= 20;

    if (dataValidIKM.ikm?.ikmResponses?.length > 0) {
      const tableStartY = yPos;
      const headerHeight = 22;
      const cellHeight = 26;
      const cellPadding = 5;

      const headers = [
        "No",
        "Pertanyaan",
        "Kualitas Layanan",
        "Harapan Konsumen",
      ];
      const columnWidths = [30, 350, 100, 100];

      let x = 10;
      headers.forEach((header, index) => {
        page.drawRectangle({
          x,
          y: tableStartY,
          width: columnWidths[index],
          height: headerHeight,
          borderWidth: 0.5,
          borderColor: rgb(0, 0, 0),
          color: rgb(0.8, 0.8, 0.8),
        });
        page.drawText(header, {
          x: x + cellPadding,
          y: tableStartY + 10,
          size: fontSize,
          font: fontBold,
          color: rgb(0, 0, 0),
        });
        x += columnWidths[index];
      });

      yPos = tableStartY - headerHeight;

      dataValidIKM.ikm.ikmResponses.forEach((response, index) => {
        let x = 10;
        const rowData = [
          `${index + 1}`,
          response.NamaPertanyaan || "-",
          response.KualitasLayanan || "-",
          response.HarapanKonsumen || "-",
        ];

        const pertanyaanLines = splitTextIntoLines(
          rowData[1],
          columnWidths[1] - 2 * cellPadding,
          font,
          fontSize
        );

        const dynamicRowHeight = Math.max(
          cellHeight,
          pertanyaanLines.length * (fontSize + 2)
        );

        rowData.forEach((data, colIndex) => {
          page.drawRectangle({
            x,
            y: yPos,
            width: columnWidths[colIndex],
            height: dynamicRowHeight,
            borderWidth: 0.5,
            borderColor: rgb(0, 0, 0),
            color: rgb(1, 1, 1),
          });

          if (colIndex === 1) {
            pertanyaanLines.forEach((line, lineIndex) => {
              page.drawText(line, {
                x: x + cellPadding,
                y: yPos + dynamicRowHeight - (lineIndex + 1) * (fontSize + 2),
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
              });
            });
          } else {
            page.drawText(data, {
              x: x + cellPadding,
              y: yPos + 15,
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            });
          }

          x += columnWidths[colIndex];
        });

        yPos -= dynamicRowHeight;
      });
    } else {
      page.drawText("Tidak ada data IKM untuk pengguna ini.", {
        x: 10,
        y: yPos,
        size: 12,
        font,
        color: rgb(0.8, 0.1, 0.1),
      });
    }

    const namaFile = `IKM_Data.pdf`;
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = namaFile;
    link.click();
  };

  return { dataIKM, unduhPdf, sedangMemuatIkm };
};

export default useKonversiDataIKMKePdf;
