import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanPembayaran = (batasHalaman = 5) => {
  const [sedangMemuatPemesanan, setSedangMemuatPemesanan] = useState(false);
  const [daftarPemesanan, setDaftarPemesanan] = useState([]);
  const [totalPemesanan, setTotalPemesanan] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarPemesanan = useCallback(async () => {
    const referensiPemesanan = collection(database, "pemesanan");
    try {
      setSedangMemuatPemesanan(true);
      const snapshot = await getDocs(referensiPemesanan);
      const pemesanans = [];

      const totalDocs = snapshot.docs.length;
      setTotalPemesanan(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const pemesananData = { id: docSnapshot.id, ...docSnapshot.data() };

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

        if (pemesananData.ID_Transaksi) {
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
        }

        pemesanans.push(pemesananData);
      }

      setDaftarPemesanan(pemesanans);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data pemesanan: " + error.message
      );
    } finally {
      setSedangMemuatPemesanan(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarPemesanan();
  }, [ambilDaftarPemesanan]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalPemesanan / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    sedangMemuatPemesanan,
    daftarPemesanan,
    totalPemesanan,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  };
};

export default useTampilkanPembayaran;
