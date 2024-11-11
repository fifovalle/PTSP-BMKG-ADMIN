import { useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database, storage } from "@/lib/firebaseConfig";

const useKirimFile = (idPemesanan) => {
  const [kirimFile, setKirimFile] = useState(null);
  const [sedangMemuatKirimFile, setSedangMemuatKirimFile] = useState(false);

  const kirim = async () => {
    if (!kirimFile) {
      toast.error("File belum dipilih.");
      return;
    }

    setSedangMemuatKirimFile(true);

    try {
      const pemesananRef = doc(database, "pemesanan", idPemesanan);
      const pemesananSnap = await getDoc(pemesananRef);

      if (!pemesananSnap.exists()) {
        throw new Error("Dokumen pemesanan tidak ditemukan.");
      }

      const dataPemesanan = pemesananSnap.data();
      const idPengguna = dataPemesanan.ID_Pengguna;

      if (!idPengguna)
        throw new Error("ID Pengguna tidak ditemukan di pemesanan.");

      const fileRef = ref(
        storage,
        `Penerimaan/${idPengguna}/${kirimFile.name}`
      );
      await uploadBytes(fileRef, kirimFile);

      const downloadURL = await getDownloadURL(fileRef);

      const penerimaanRef = doc(collection(database, "penerimaan"));
      await setDoc(penerimaanRef, {
        File: downloadURL,
        ID_Pengguna: idPengguna,
        Tanggal_Pembuatan: serverTimestamp(),
      });

      const idPenerimaan = penerimaanRef.id;

      await updateDoc(pemesananRef, {
        ID_Penerimaan: idPenerimaan,
        Status_Pesanan: "Selesai",
      });

      toast.success("File berhasil dikirim dan data diperbarui.");
    } catch (error) {
      console.error("Gagal mengirim file:", error);
      toast.error("Gagal mengirim file. Silakan coba lagi.");
    } finally {
      setSedangMemuatKirimFile(false);
    }
  };

  return {
    kirim,
    setKirimFile,
    sedangMemuatKirimFile,
  };
};

export default useKirimFile;
