import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

export default function useSuntingJasa(idJasa) {
  const [namaJasa, setNamaJasa] = useState("");
  const [hargaJasa, setHargaJasa] = useState("");
  const [pemilikJasa, setPemilikJasa] = useState("");
  const [deskripsiJasa, setDeskripsiJasa] = useState("");
  const [noRekening, setNoRekening] = useState("");
  const [sedangMemuatSuntingJasa, setSedangMemuatSuntingJasa] = useState(false);

  const ambilDataJasa = async () => {
    try {
      const jasaRef = doc(database, "jasa", idJasa);
      const docSnap = await getDoc(jasaRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNamaJasa(data.Nama);
        setHargaJasa(data.Harga);
        setPemilikJasa(data.Pemilik);
        setNoRekening(data.Nomor_Rekening);
        setDeskripsiJasa(data.Deskripsi);
      } else {
        toast.error("Data jasa tidak ditemukan!");
      }
    } catch (error) {}
  };

  const validasiFormulir = () =>
    !namaJasa
      ? (toast.error("Masukkan nama jasa"), false)
      : !hargaJasa
      ? (toast.error("Masukkan harga jasa"), false)
      : !pemilikJasa
      ? (toast.error("Pilih pemilik jasa"), false)
      : !deskripsiJasa
      ? (toast.error("Ketik Deskripsi jasa"), false)
      : true;

  const suntingJasa = async () => {
    setSedangMemuatSuntingJasa(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingJasa(false);
      return;
    }

    try {
      const jasaRef = doc(database, "jasa", idJasa);
      await updateDoc(jasaRef, {
        Nama: namaJasa,
        Harga: hargaJasa,
        Pemilik: pemilikJasa,
        Deskripsi: deskripsiJasa,
      });

      toast.success("Jasa berhasil disunting!");
    } catch (error) {
      toast.error("Gagal menyunting jasa: " + error.message);
    } finally {
      setSedangMemuatSuntingJasa(false);
    }
  };

  useEffect(() => {
    ambilDataJasa();
  }, [idJasa]);

  return {
    namaJasa,
    hargaJasa,
    noRekening,
    pemilikJasa,
    setNamaJasa,
    suntingJasa,
    setHargaJasa,
    deskripsiJasa,
    setPemilikJasa,
    setDeskripsiJasa,
    sedangMemuatSuntingJasa,
  };
}
