import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

export default function useSuntingPengajuan(idPemesanan) {
  const [statusPengajuan, setStatusPengajuan] = useState("");
  const [dataKeranjang, setDataKeranjang] = useState([]);
  const [nomorVAs, setNomorVAs] = useState([]);
  const [sedangMemuatSuntingPengajuan, setSedangMemuatSuntingPengajuan] =
    useState(false);
  const [idAjukan, setIdAjukan] = useState("");

  const ambilDataPengajuan = async () => {
    try {
      const pemesananRef = doc(database, "pemesanan", idPemesanan);
      const docSnap = await getDoc(pemesananRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Data Pemesanan:", data);
        const idAjukanDariPemesanan = data.ID_Ajukan;
        setIdAjukan(idAjukanDariPemesanan);

        const keranjangData = data.Data_Keranjang || [];
        setDataKeranjang(keranjangData);

        setNomorVAs(keranjangData.map((item) => item.Nomor_VA || ""));

        const pengajuanRef = doc(database, "ajukan", idAjukanDariPemesanan);
        const pengajuanSnap = await getDoc(pengajuanRef);
        if (pengajuanSnap.exists()) {
          const pengajuanData = pengajuanSnap.data();
          setStatusPengajuan(pengajuanData.Status_Ajuan || "");

          if (pengajuanData.Jenis_Ajukan === "Gratis") {
            await updateDoc(pemesananRef, { Status_Pembayaran: "Lunas" });
          }
        } else {
          toast.error("Data pengajuan tidak ditemukan!");
        }
      } else {
        toast.error("Data pemesanan tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal mengambil data: " + error.message);
    }
  };

  const validasiFormulir = () => {
    if (!statusPengajuan) {
      toast.error("Masukkan status pengajuan");
      return false;
    }
    return true;
  };

  const suntingPengajuan = async () => {
    setSedangMemuatSuntingPengajuan(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingPengajuan(false);
      return;
    }

    try {
      const pengajuanRef = doc(database, "ajukan", idAjukan);
      await updateDoc(pengajuanRef, {
        Status_Ajuan: statusPengajuan,
      });

      const updatedKeranjang = dataKeranjang.map((item, index) => {
        const itemBaru = { ...item };
        if (nomorVAs[index]) {
          itemBaru.Nomor_VA = nomorVAs[index];
        }
        return itemBaru;
      });

      const pemesananRef = doc(database, "pemesanan", idPemesanan);
      await updateDoc(pemesananRef, {
        Data_Keranjang: updatedKeranjang,
      });

      toast.success("Pengajuan berhasil disunting dan Nomor VA diperbarui!");
    } catch (error) {
      toast.error("Gagal menyunting pengajuan: " + error.message);
    } finally {
      setSedangMemuatSuntingPengajuan(false);
    }
  };

  useEffect(() => {
    if (idPemesanan) {
      ambilDataPengajuan();
    }
  }, [idPemesanan]);

  return {
    statusPengajuan,
    setStatusPengajuan,
    suntingPengajuan,
    sedangMemuatSuntingPengajuan,
    dataKeranjang,
    nomorVAs,
    setNomorVAs,
  };
}
