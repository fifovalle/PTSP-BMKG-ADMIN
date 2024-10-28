import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanPerusahaan = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanPerusahaan, setSedangMemuatTampilkanPerusahaan] =
    useState(false);
  const [daftarPerusahaan, setDaftarPerusahaan] = useState([]);
  const [totalPerusahaan, setTotalPerusahaan] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarPerusahaan = useCallback(async () => {
    const referensiPerusahaan = collection(database, "perusahaan");
    try {
      setSedangMemuatTampilkanPerusahaan(true);
      const snapshot = await getDocs(referensiPerusahaan);
      const perusahaanList = [];

      const totalDocs = snapshot.docs.length;
      setTotalPerusahaan(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const perusahaanRef = doc(database, "perusahaan", docSnapshot.id);
        const perusahaanDoc = await getDoc(perusahaanRef);

        if (perusahaanDoc.exists()) {
          perusahaanList.push({
            id: perusahaanDoc.id,
            ...perusahaanDoc.data(),
          });
        }
      }

      setDaftarPerusahaan(perusahaanList);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar perusahaan: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanPerusahaan(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarPerusahaan();
  }, [ambilDaftarPerusahaan]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalPerusahaan / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalPerusahaan,
    daftarPerusahaan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTampilkanPerusahaan,
  };
};

export default useTampilkanPerusahaan;
