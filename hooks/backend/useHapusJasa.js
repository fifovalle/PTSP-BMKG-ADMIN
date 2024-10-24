import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusJasa = () => {
  const [sedangMemuatHapusJasa, setSedangMemuatHapusJasa] = useState(false);

  const hapusJasa = async (id) => {
    try {
      setSedangMemuatHapusJasa(true);
      const referensiJasa = doc(database, "jasa", id);
      await deleteDoc(referensiJasa);
      toast.success("Jasa berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus jasa: " + error.message);
    } finally {
      setSedangMemuatHapusJasa(false);
    }
  };

  return {
    sedangMemuatHapusJasa,
    hapusJasa,
  };
};

export default useHapusJasa;
