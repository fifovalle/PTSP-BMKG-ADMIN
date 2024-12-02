import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

export default function useSuntingPembayaran(idPemesanan) {
  const [statusPembayaran, setStatusPembayaran] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [sedangMemuatSuntingPembayaran, setSedangMemuatSuntingPembayaran] =
    useState(false);

  const ambilDataPembayaran = async () => {
    try {
      const pemesananRef = doc(database, "pemesanan", idPemesanan);
      const docSnap = await getDoc(pemesananRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setStatusPembayaran(data.Status_Pembayaran || "");
        setKeterangan(data.Keterangan || "");
      } else {
        toast.error("Data pemesanan tidak ditemukan.");
      }
    } catch (error) {
      console.error("Gagal mengambil data pembayaran:", error);
      toast.error("Terjadi kesalahan saat mengambil data pembayaran.");
    }
  };

  const validasiFormulir = () => {
    if (!statusPembayaran) {
      toast.error("Masukkan status pembayaran.");
      return false;
    }

    if (statusPembayaran === "Ditolak" && !keterangan.trim()) {
      toast.error("Masukkan keterangan untuk penolakan.");
      return false;
    }

    return true;
  };

  const suntingPembayaran = async () => {
    setSedangMemuatSuntingPembayaran(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingPembayaran(false);
      return;
    }

    try {
      const pemesananRef = doc(database, "pemesanan", idPemesanan);
      const updateData = {
        Status_Pembayaran: statusPembayaran,
        Keterangan: statusPembayaran === "Ditolak" ? keterangan.trim() : "",
      };

      await updateDoc(pemesananRef, updateData);
      toast.success("Status pembayaran berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal memperbarui status pembayaran:", error);
      toast.error("Terjadi kesalahan saat memperbarui status pembayaran.");
    } finally {
      setSedangMemuatSuntingPembayaran(false);
    }
  };

  useEffect(() => {
    if (idPemesanan) {
      ambilDataPembayaran();
    }
  }, [idPemesanan]);

  return {
    statusPembayaran,
    setStatusPembayaran,
    keterangan,
    setKeterangan,
    suntingPembayaran,
    sedangMemuatSuntingPembayaran,
  };
}
