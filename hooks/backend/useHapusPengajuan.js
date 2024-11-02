import { useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import { database, storage } from "@/lib/firebaseConfig";

const useHapusPengajuan = () => {
  const [sedangMemuatHapus, setSedangMemuatHapus] = useState(false);

  const hapusPengajuan = async (idPengajuan) => {
    try {
      setSedangMemuatHapus(true);

      const referensiPengajuan = doc(database, "pemesanan", idPengajuan);
      const docSnap = await getDoc(referensiPengajuan);

      if (docSnap.exists()) {
        const dataPemesanan = docSnap.data();
        const idAjukan = dataPemesanan.ID_Ajukan;
        const File_Ajukan = dataPemesanan.File_Ajukan;

        await deleteDoc(referensiPengajuan);

        if (idAjukan) {
          const referensiAjukan = doc(database, "ajukan", idAjukan);
          await deleteDoc(referensiAjukan);
        }

        if (File_Ajukan && Array.isArray(File_Ajukan)) {
          for (const fileId of File_Ajukan) {
            try {
              const filePath = `File_Ajukan/${fileId}`;
              const referensiFile = ref(storage, filePath);
              await deleteObject(referensiFile);
            } catch (error) {
              console.error("Gagal menghapus file:", fileId, error);
            }
          }
        }

        toast.success("Pengajuan berhasil dihapus!");
      } else {
        toast.error("Data pemesanan tidak ditemukan!");
      }
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus pengajuan: " + error.message
      );
    } finally {
      setSedangMemuatHapus(false);
    }
  };

  return {
    sedangMemuatHapus,
    hapusPengajuan,
  };
};

export default useHapusPengajuan;
