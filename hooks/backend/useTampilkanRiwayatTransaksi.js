import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanRiwayatTransaksi = (batasHalaman = 5) => {
  const [sedangMemuatPengajuan, setSedangMemuatPengajuan] = useState(false);
  const [daftarTransaksi, setDaftarTransaksi] = useState([]);
  const [totalPengajuan, setTotalPengajuan] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarTransaksi = useCallback(async () => {
    const referensiPemesanan = collection(database, "pemesanan");
    try {
      setSedangMemuatPengajuan(true);
      const snapshot = await getDocs(referensiPemesanan);
      const pemesanans = [];

      const totalDocs = snapshot.docs.length;
      setTotalPengajuan(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
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

          for (const keranjangItem of pemesananData.Data_Keranjang || []) {
            if (!keranjangItem?.ID_Penerimaan) continue;

            const penerimaanRef = doc(
              database,
              "penerimaan",
              keranjangItem.ID_Penerimaan
            );
            const penerimaanDoc = await getDoc(penerimaanRef);

            if (penerimaanDoc.exists()) {
              pemesananData.penerimaan = {
                id: penerimaanDoc.id,
                ...penerimaanDoc.data(),
              };
            }
          }

          console.log(pemesananData);

          if (pemesananData.ID_Transaksi) {
            try {
              const transaksiRef = doc(
                database,
                "transaksi",
                pemesananData.ID_Transaksi
              );
              const transaksiDoc = await getDoc(transaksiRef);

              if (transaksiDoc.exists()) {
                pemesananData.transaksi = {
                  id: transaksiDoc.id,
                  ...transaksiDoc.data(),
                };
              }
            } catch (error) {
              console.error(
                "Error pada dokumen transaksi:",
                pemesananData.ID_Transaksi,
                error
              );
            }
          } else {
            console.warn(
              "ID_Transaksi tidak ditemukan pada data:",
              pemesananData
            );
          }

          pemesanans.push(pemesananData);
        }
      }

      setDaftarTransaksi(pemesanans);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data pemesanan: " + error.message
      );
    } finally {
      setSedangMemuatPengajuan(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarTransaksi();
  }, [ambilDaftarTransaksi]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalPengajuan / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalPengajuan,
    daftarTransaksi,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatPengajuan,
  };
};

export default useTampilkanRiwayatTransaksi;
