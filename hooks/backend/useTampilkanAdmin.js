import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanAdmin = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanAdmin, setSedangMemuatTampilkanAdmin] =
    useState(false);
  const [daftarAdmin, setDaftarAdmin] = useState([]);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarAdmin = useCallback(async () => {
    const referensiAdmin = collection(database, "admin");
    try {
      setSedangMemuatTampilkanAdmin(true);
      const snapshot = await getDocs(referensiAdmin);
      const admins = [];

      const totalDocs = snapshot.docs.length;
      setTotalAdmin(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        admins.push({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        });
      }

      setDaftarAdmin(admins);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar admin: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanAdmin(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarAdmin();
  }, [ambilDaftarAdmin]);

  const ambilAdminSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilAdminSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalAdmin / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalAdmin,
    daftarAdmin,
    ambilAdminSebelumnya,
    ambilAdminSelanjutnya,
    sedangMemuatTampilkanAdmin,
  };
};

export default useTampilkanAdmin;
