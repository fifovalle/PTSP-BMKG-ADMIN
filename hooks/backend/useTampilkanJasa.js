import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanJasa = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanJasa, setSedangMemuatTampilkanJasa] =
    useState(false);
  const [daftarJasa, setDaftarJasa] = useState([]);
  const [totalJasa, setTotalJasa] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarJasa = useCallback(async () => {
    const referensiJasa = collection(database, "jasa");
    try {
      setSedangMemuatTampilkanJasa(true);
      const snapshot = await getDocs(referensiJasa);
      const jasas = [];

      const totalDocs = snapshot.docs.length;
      setTotalJasa(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const jasaRef = doc(database, "jasa", docSnapshot.id);
        const jasaDoc = await getDoc(jasaRef);

        if (jasaDoc.exists()) {
          jasas.push({
            id: jasaDoc.id,
            ...jasaDoc.data(),
          });
        }
      }

      setDaftarJasa(jasas);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar jasa: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanJasa(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarJasa();
  }, [ambilDaftarJasa]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalJasa / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalJasa,
    daftarJasa,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTampilkanJasa,
  };
};

export default useTampilkanJasa;
