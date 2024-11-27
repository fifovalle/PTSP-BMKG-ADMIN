import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

export default function useSuntingPembayaran(idPemesanan) {
  const [statusPembayaran, setStatusPembayaran] = useState("");
  const [sedangMemuatSuntingPembayaran, setSedangMemuatSuntingPembayaran] =
    useState(false);

  console.log(idPemesanan);

  const ambilDataPembayaran = async () => {
    try {
      const pemesananRef = doc(database, "pemesanan", idPemesanan);
      const docSnap = await getDoc(pemesananRef);

      docSnap.exists()
        ? setStatusPembayaran(docSnap.data().Status_Pembayaran || "")
        : toast.error("Data pemesanan tidak ditemukan.");
    } catch (error) {
      console.error("Gagal mengambil data pembayaran:", error);
      toast.error("Terjadi kesalahan saat mengambil data pembayaran.");
    }
  };

  const validasiFormulir = () =>
    !statusPembayaran
      ? (toast.error("Masukkan status pembayaran"), false)
      : true;

  const suntingPembayaran = async () => {
    setSedangMemuatSuntingPembayaran(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingPembayaran(false);
      return;
    }

    try {
      const pemesananRef = doc(database, "pemesanan", idPemesanan);
      await updateDoc(pemesananRef, {
        Status_Pembayaran: statusPembayaran,
      });
      toast.success("Status pembayaran berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal memperbarui status pembayaran:", error);
      toast.error("Terjadi kesalahan saat memperbarui status pembayaran.");
    } finally {
      setSedangMemuatSuntingPembayaran(false);
    }
  };

  useEffect(() => {
    idPemesanan && ambilDataPembayaran();
  }, [idPemesanan]);

  return {
    statusPembayaran,
    setStatusPembayaran,
    suntingPembayaran,
    sedangMemuatSuntingPembayaran,
  };
}
