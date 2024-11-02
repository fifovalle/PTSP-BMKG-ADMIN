import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanPengajuan = (batasHalaman = 5) => {
  const [sedangMemuatPengajuan, setSedangMemuatPengajuan] = useState(false);
  const [daftarPengajuan, setDaftarPengajuan] = useState([]);
  const [totalPengajuan, setTotalPengajuan] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarPengajuan = useCallback(async () => {
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

          pemesanans.push(pemesananData);
        }
      }

      setDaftarPengajuan(pemesanans);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data pemesanan: " + error.message
      );
    } finally {
      setSedangMemuatPengajuan(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarPengajuan();
  }, [ambilDaftarPengajuan]);

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
    daftarPengajuan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatPengajuan,
  };
};

export default useTampilkanPengajuan;
