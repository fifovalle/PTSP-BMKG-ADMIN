import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusAdmin = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);

  const hapusAdmin = async (id) => {
    try {
      setSedangMemuatHapusAdmin(true);
      const referensiAdmin = doc(database, "admin", id);
      await deleteDoc(referensiAdmin);
      toast.success("Admin berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus admin: " + error.message);
    } finally {
      setSedangMemuatHapusAdmin(false);
    }
  };

  return {
    hapusAdmin,
    sedangMemuatHapusAdmin,
  };
};

export default useHapusAdmin;
