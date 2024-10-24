import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

export default function useSuntingInformasi(idInformasi) {
  const [namaInformasi, setNamaInformasi] = useState("");
  const [hargaInformasi, setHargaInformasi] = useState("");
  const [pemilikInformasi, setPemilikInformasi] = useState("");
  const [deskripsiInformasi, setDeskripsiInformasi] = useState("");
  const [sedangMemuatSuntingInformasi, setSedangMemuatSuntingInformasi] =
    useState(false);

  const ambilDataInformasi = async () => {
    try {
      const informasiRef = doc(database, "informasi", idInformasi);
      const docSnap = await getDoc(informasiRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNamaInformasi(data.Nama);
        setHargaInformasi(data.Harga);
        setPemilikInformasi(data.Pemilik);
        setDeskripsiInformasi(data.Deskripsi);
      } else {
        toast.error("Data informasi tidak ditemukan!");
      }
    } catch (error) {}
  };

  const validasiFormulir = () => {
    if (!namaInformasi) {
      toast.error("Masukkan nama informasi");
      return false;
    }
    if (!hargaInformasi) {
      toast.error("Masukkan harga informasi");
      return false;
    }
    if (!pemilikInformasi) {
      toast.error("Pilih pemilik informasi");
      return false;
    }
    if (!deskripsiInformasi) {
      toast.error("Ketik Deskripsi informasi");
      return false;
    }
    return true;
  };

  const suntingInformasi = async () => {
    setSedangMemuatSuntingInformasi(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingInformasi(false);
      return;
    }

    try {
      const informasiRef = doc(database, "informasi", idInformasi);
      await updateDoc(informasiRef, {
        Nama: namaInformasi,
        Harga: hargaInformasi,
        Pemilik: pemilikInformasi,
        Deskripsi: deskripsiInformasi,
      });

      toast.success("Jasa berhasil disunting!");
    } catch (error) {
      toast.error("Gagal menyunting jasa: " + error.message);
    } finally {
      setSedangMemuatSuntingInformasi(false);
    }
  };

  useEffect(() => {
    ambilDataInformasi();
  }, [idInformasi]);

  return {
    namaInformasi,
    hargaInformasi,
    suntingInformasi,
    pemilikInformasi,
    setNamaInformasi,
    setHargaInformasi,
    deskripsiInformasi,
    setPemilikInformasi,
    setDeskripsiInformasi,
    sedangMemuatSuntingInformasi,
  };
}
