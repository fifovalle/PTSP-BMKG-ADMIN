import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanInformasi = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanInformasi, setSedangMemuatTampilkanInformasi] =
    useState(false);
  const [daftarInformasi, setDaftarInformasi] = useState([]);
  const [totalInformasi, setTotalInformasi] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarInformasi = useCallback(async () => {
    const referensiInformasi = collection(database, "informasi");
    try {
      setSedangMemuatTampilkanInformasi(true);
      const snapshot = await getDocs(referensiInformasi);
      const informasi = [];

      const totalDocs = snapshot.docs.length;
      setTotalInformasi(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const informasiRef = doc(database, "informasi", docSnapshot.id);
        const informasiDoc = await getDoc(informasiRef);

        if (informasiDoc.exists()) {
          informasi.push({
            id: informasiDoc.id,
            ...informasiDoc.data(),
          });
        }
      }

      setDaftarInformasi(informasi);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar informasi: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanInformasi(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarInformasi();
  }, [ambilDaftarInformasi]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalInformasi / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    daftarInformasi,
    totalInformasi,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTampilkanInformasi,
  };
};

export default useTampilkanInformasi;
