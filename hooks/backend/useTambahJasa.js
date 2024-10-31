import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTambahJasa = () => {
  const [namaJasa, setNamaJasa] = useState("");
  const [hargaJasa, setHargaJasa] = useState("");
  const [pemilikJasa, setPemilikJasa] = useState("");
  const [deskripsiJasa, setDeskripsiJasa] = useState("");
  const [statusJasa, setStatusJasa] = useState("Tersedia");
  const [sedangMemuatTambahJasa, setSedangMemuatTambahJasa] = useState(false);

  const tentukanNomorRekening = () => {
    return pemilikJasa === "Meteorologi"
      ? 1111
      : pemilikJasa === "Klimatologi"
      ? 2222
      : pemilikJasa === "Geofisika"
      ? 3333
      : 0;
  };

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    !namaJasa
      ? ((sesuai = false), (pesanKesalahan += "Nama Jasa harus diisi. "))
      : null;
    !hargaJasa
      ? ((sesuai = false), (pesanKesalahan += "Harga Jasa harus diisi. "))
      : isNaN(hargaJasa)
      ? ((sesuai = false),
        (pesanKesalahan += "Harga Jasa harus berupa angka. "))
      : null;
    !pemilikJasa
      ? ((sesuai = false), (pesanKesalahan += "Pemilik Jasa harus dipilih. "))
      : null;
    !deskripsiJasa
      ? ((sesuai = false), (pesanKesalahan += "Deskripsi Jasa harus diisi. "))
      : null;

    if (!sesuai) {
      toast.error(pesanKesalahan.trim());
    }

    return sesuai;
  };

  const tambahJasa = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahJasa(true);

    const referensiJasa = collection(database, "jasa");
    const dataJasa = {
      Nama: namaJasa,
      Harga: parseFloat(hargaJasa),
      Pemilik: pemilikJasa,
      Deskripsi: deskripsiJasa,
      Nomor_Rekening: tentukanNomorRekening(),
      Tanggal_Pembuatan: serverTimestamp(),
      Status: statusJasa,
    };

    try {
      await setDoc(doc(referensiJasa), dataJasa);
      toast.success("Jasa berhasil ditambahkan!");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan jasa: " + error.message);
    } finally {
      setSedangMemuatTambahJasa(false);
    }
  };

  const aturUlangFormulir = () => {
    setNamaJasa("");
    setHargaJasa("");
    setPemilikJasa("");
    setDeskripsiJasa("");
    setStatusJasa("Tersedia");
  };

  return {
    namaJasa,
    hargaJasa,
    statusJasa,
    tambahJasa,
    pemilikJasa,
    setNamaJasa,
    setHargaJasa,
    deskripsiJasa,
    setStatusJasa,
    setPemilikJasa,
    setDeskripsiJasa,
    aturUlangFormulir,
    sedangMemuatTambahJasa,
  };
};

export default useTambahJasa;
