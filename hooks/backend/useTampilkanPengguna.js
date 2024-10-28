import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanPengguna = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanPengguna, setSedangMemuatTampilkanPengguna] =
    useState(false);
  const [daftarPengguna, setDaftarPengguna] = useState([]);
  const [totalPengguna, setTotalPengguna] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarPengguna = useCallback(async () => {
    const referensiPengguna = collection(database, "perorangan");
    try {
      setSedangMemuatTampilkanPengguna(true);
      const snapshot = await getDocs(referensiPengguna);
      const penggunaList = [];

      const totalDocs = snapshot.docs.length;
      setTotalPengguna(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const penggunaRef = doc(database, "perorangan", docSnapshot.id);
        const penggunaDoc = await getDoc(penggunaRef);

        if (penggunaDoc.exists()) {
          penggunaList.push({
            id: penggunaDoc.id,
            ...penggunaDoc.data(),
          });
        }
      }

      setDaftarPengguna(penggunaList);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar pengguna: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanPengguna(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarPengguna();
  }, [ambilDaftarPengguna]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalPengguna / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalPengguna,
    daftarPengguna,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTampilkanPengguna,
  };
};

export default useTampilkanPengguna;
