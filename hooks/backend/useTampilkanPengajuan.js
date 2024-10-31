import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanPengajuan = (batasHalaman = 5) => {
  const [sedangMemuatPengajuan, setSedangMemuatPengajuan] = useState(false);
  const [daftarPengajuan, setDaftarPengajuan] = useState([]);
  const [totalPengajuan, setTotalPengajuan] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDataPengajuan = useCallback(async () => {
    setSedangMemuatPengajuan(true);
    console.log("Memulai pengambilan data pengajuan...");

    try {
      const koleksiPemesanan = collection(database, "pemesanan");
      const snapshot = await getDocs(koleksiPemesanan);
      const daftar = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Data per dokumen:", data);

        return {
          id: doc.id,
          Seluruh_Pesanan: Array.isArray(data.Seluruh_Pesanan)
            ? data.Seluruh_Pesanan.map((pesanan) => ({
                Data_Keranjang: Array.isArray(pesanan.Data_Keranjang)
                  ? pesanan.Data_Keranjang.map((item) => ({
                      Harga: item.Harga,
                      ID_Informasi: item.ID_Informasi,
                      Kuantitas: item.Kuantitas,
                      Nama: item.Nama,
                      Pemilik: item.Pemilik,
                    }))
                  : [],
                Jasa: Array.isArray(pesanan.Jasa)
                  ? pesanan.Jasa.map((jasa) => ({
                      Harga: jasa.Harga,
                      ID_Jasa: jasa.ID_Jasa,
                      Kuantitas: jasa.Kuantitas,
                      Nama: jasa.Nama,
                      Pemilik: jasa.Pemilik,
                      Total_Harga: jasa.Total_Harga,
                    }))
                  : [],
                Informasi: pesanan.Informasi || [],
                ID_Ajukan: pesanan.ID_Ajukan,
                ID_Pemesanan: pesanan.ID_Pemesanan,
                ID_Pengguna: pesanan.ID_Pengguna,
                Nama_Ajukan: pesanan.Nama_Ajukan,
                Tanggal_Pemesanan: pesanan.Tanggal_Pemesanan,
              }))
            : [],
        };
      });

      setDaftarPengajuan(daftar);
      setTotalPengajuan(daftar.length);
      console.log("Data pengajuan berhasil diambil:", daftar);
    } catch (error) {
      toast.error("Gagal memuat pengajuan: " + error.message);
      console.error("Error saat mengambil data pengajuan:", error);
    } finally {
      setSedangMemuatPengajuan(false);
      console.log("Pengambilan data selesai.");
    }
  }, []);

  const ambilHalamanSebelumnya = () => {
    setHalaman((prev) => {
      const halamanBaru = Math.max(prev - 1, 1);
      console.log("Halaman sebelumnya:", halamanBaru);
      return halamanBaru;
    });
  };

  const ambilHalamanSelanjutnya = () => {
    setHalaman((prev) => {
      const halamanBaru = prev + 1;
      console.log("Halaman selanjutnya:", halamanBaru);
      return halamanBaru;
    });
  };

  useEffect(() => {
    ambilDataPengajuan();
  }, [ambilDataPengajuan]);

  return {
    halaman,
    totalPengajuan,
    daftarPengajuan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatPengajuan,
  };
};

export default useTampilkanPengajuan;
