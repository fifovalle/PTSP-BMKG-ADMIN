import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTambahInformasi = () => {
  const [namaInformasi, setNamaInformasi] = useState("");
  const [hargaInformasi, setHargaInformasi] = useState("");
  const [pemilikInformasi, setPemilikInformasi] = useState("");
  const [deskripsiInformasi, setDeskripsiInformasi] = useState("");
  const [statusInformasi, setStatusInformasi] = useState("Tersedia");
  const [sedangMemuatTambahInformasi, setSedangMemuatTambahInformasi] =
    useState(false);

  const tentukanNomorRekening = () => {
    return pemilikInformasi === "Meteorologi"
      ? 1111
      : pemilikInformasi === "Klimatologi"
      ? 2222
      : pemilikInformasi === "Geofisika"
      ? 3333
      : 0;
  };

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    !namaInformasi
      ? ((sesuai = false), (pesanKesalahan += "Nama Informasi harus diisi. "))
      : null;
    !hargaInformasi
      ? ((sesuai = false), (pesanKesalahan += "Harga Informasi harus diisi. "))
      : isNaN(hargaInformasi)
      ? ((sesuai = false),
        (pesanKesalahan += "Harga Informasi harus berupa angka. "))
      : null;
    !pemilikInformasi
      ? ((sesuai = false),
        (pesanKesalahan += "Pemilik Informasi harus dipilih. "))
      : null;
    !deskripsiInformasi
      ? ((sesuai = false),
        (pesanKesalahan += "Deskripsi Informasi harus diisi. "))
      : null;

    if (!sesuai) {
      toast.error(pesanKesalahan.trim());
    }

    return sesuai;
  };

  const tambahInformasi = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahInformasi(true);

    const referensiInformasi = collection(database, "informasi");
    const dataInformasi = {
      Nama: namaInformasi,
      Harga: parseFloat(hargaInformasi),
      Pemilik: pemilikInformasi,
      Deskripsi: deskripsiInformasi,
      Tanggal_Pembuatan: serverTimestamp(),
      Nomor_Rekening: tentukanNomorRekening(),
      Status: statusInformasi,
    };

    try {
      await setDoc(doc(referensiInformasi), dataInformasi);
      toast.success("Informasi berhasil ditambahkan!");
      aturUlangFormulir();
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menambahkan Informasi: " + error.message
      );
    } finally {
      setSedangMemuatTambahInformasi(false);
    }
  };

  const aturUlangFormulir = () => {
    setNamaInformasi("");
    setHargaInformasi("");
    setPemilikInformasi("");
    setDeskripsiInformasi("");
    setStatusInformasi("Tersedia");
  };

  return {
    namaInformasi,
    hargaInformasi,
    statusInformasi,
    tambahInformasi,
    pemilikInformasi,
    setNamaInformasi,
    aturUlangFormulir,
    setHargaInformasi,
    deskripsiInformasi,
    setStatusInformasi,
    setPemilikInformasi,
    setDeskripsiInformasi,
    sedangMemuatTambahInformasi,
  };
};

export default useTambahInformasi;
