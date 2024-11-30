import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusPerorangan = () => {
  const [sedangMemuatHapusPerorangan, setSedangMemuatHapusPerorangan] =
    useState(false);

  const hapusPerorangan = async (id) => {
    try {
      setSedangMemuatHapusPerorangan(true);
      const referensiPerorangan = doc(database, "perorangan", id);
      await deleteDoc(referensiPerorangan);
      toast.success("Data perorangan berhasil dihapus!");
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus data perorangan: " + error.message
      );
    } finally {
      setSedangMemuatHapusPerorangan(false);
    }
  };

  return {
    sedangMemuatHapusPerorangan,
    hapusPerorangan,
  };
};

export default useHapusPerorangan;
