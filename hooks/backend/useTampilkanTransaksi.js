import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanTransaksi = (batasHalaman = 5) => {
  const [sedangMemuatTransaksi, setSedangMemuatTransaksi] = useState(false);
  const [daftarTransaksi, setDaftarTransaksi] = useState([]);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarTransaksi = useCallback(async () => {
    const referensiPemesanan = collection(database, "pemesanan");
    try {
      setSedangMemuatTransaksi(true);
      const snapshot = await getDocs(referensiPemesanan);
      const pemesanan = [];

      const totalDocs = snapshot.docs.length;
      setTotalTransaksi(totalDocs);

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

          if (pemesananData.ID_Pengguna) {
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
              } else {
                pemesananData.pengguna = null;
                console.error(
                  `Pengguna dengan ID ${pemesananData.ID_Pengguna} tidak ditemukan.`
                );
              }
            }
          }

          if (pemesananData.ID_Ajukan) {
            const ajukanRef = doc(database, "ajukan", pemesananData.ID_Ajukan);
            const ajukanDoc = await getDoc(ajukanRef);

            if (ajukanDoc.exists()) {
              pemesananData.ajukan = {
                id: ajukanDoc.id,
                ...ajukanDoc.data(),
              };
            } else {
              pemesananData.ajukan = null;
              console.error(
                `Data ajukan dengan ID ${pemesananData.ID_Ajukan} tidak ditemukan.`
              );
            }
          }

          pemesanan.push(pemesananData);
        }
      }

      setDaftarTransaksi(pemesanan);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data pemesanan: " + error.message
      );
    } finally {
      setSedangMemuatTransaksi(false);
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
    const totalHalaman = Math.ceil(totalTransaksi / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalTransaksi,
    daftarTransaksi,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTransaksi,
  };
};

export default useTampilkanTransaksi;
