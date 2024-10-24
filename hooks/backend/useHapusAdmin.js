import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusAdmin = () => {
  const [sedangMemuatHapus, setSedangMemuatHapus] = useState(false);

  const hapusAdmin = async (id) => {
    try {
      setSedangMemuatHapus(true);
      const referensiAdmin = doc(database, "admin", id);
      await deleteDoc(referensiAdmin);
      toast.success("Admin berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus admin: " + error.message);
    } finally {
      setSedangMemuatHapus(false);
    }
  };

  return {
    sedangMemuatHapus,
    hapusAdmin,
  };
};

export default useHapusAdmin;
