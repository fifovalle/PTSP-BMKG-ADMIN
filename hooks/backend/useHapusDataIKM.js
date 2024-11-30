import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusIKM = () => {
  const [sedangMemuatHapusIKM, setSedangMemuatHapusIKM] = useState(false);

  const hapusIKM = async (id) => {
    try {
      setSedangMemuatHapusIKM(true);
      const referensiIKM = doc(database, "ikm", id);
      await deleteDoc(referensiIKM);
      toast.success("IKM berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus IKM: " + error.message);
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
