import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusInformasi = () => {
  const [sedangMemuatHapus, setSedangMemuatHapus] = useState(false);

  const hapusInformasi = async (id) => {
    try {
      setSedangMemuatHapus(true);
      const referensiInformasi = doc(database, "informasi", id);
      await deleteDoc(referensiInformasi);
      toast.success("Informasi berhasil dihapus!");
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus informasi: " + error.message
      );
    } finally {
      setSedangMemuatHapus(false);
    }
  };

  return {
    sedangMemuatHapus,
    hapusInformasi,
  };
};

export default useHapusInformasi;
