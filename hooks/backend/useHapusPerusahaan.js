import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusPerusahaan = () => {
  const [sedangMemuatHapusPerusahaan, setSedangMemuatHapusPerusahaan] =
    useState(false);

  const hapusPerusahaan = async (id) => {
    try {
      setSedangMemuatHapusPerusahaan(true);
      const referensiPerusahaan = doc(database, "perusahaan", id);
      await deleteDoc(referensiPerusahaan);
      toast.success("Data perusahaan berhasil dihapus!");
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus data perusahaan: " + error.message
      );
    } finally {
      setSedangMemuatHapusPerusahaan(false);
    }
  };

  return {
    sedangMemuatHapusPerusahaan,
    hapusPerusahaan,
  };
};

export default useHapusPerusahaan;
