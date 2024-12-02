import { useState } from "react";
import {
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusIKM = () => {
  const [sedangMemuatHapusIKM, setSedangMemuatHapusIKM] = useState(false);

  const hapusIKM = async (idPemesanan) => {
    try {
      setSedangMemuatHapusIKM(true);

      const ikmQuery = query(
        collection(database, "ikm"), // Koleksi IKM
        where("ID_Pemesanan", "==", idPemesanan) // Relasi berdasarkan ID Pemesanan
      );

      const ikmSnapshot = await getDocs(ikmQuery);

      if (!ikmSnapshot.empty) {
        // Looping untuk menghapus setiap dokumen IKM yang ditemukan
        const deletePromises = ikmSnapshot.docs.map((docIKM) =>
          deleteDoc(doc(database, "ikm", docIKM.id))
        );
        await Promise.all(deletePromises); // Tunggu semua dokumen selesai dihapus
        toast.success("Semua data IKM terkait berhasil dihapus!");
      } else {
        toast.warn("Tidak ada data IKM terkait dengan pemesanan ini.");
      }
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus data IKM: " + error.message
      );
    } finally {
      setSedangMemuatHapusIKM(false);
    }
  };

  return {
    sedangMemuatHapusIKM,
    hapusIKM,
  };
};

export default useHapusIKM;
