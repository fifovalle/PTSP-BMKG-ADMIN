import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database, auth } from "@/lib/firebaseConfig";

const useTambahAdmin = () => {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [instasi, setInstasi] = useState("");
  const [peranAdmin, setPeranAdmin] = useState("");
  const [sedangMemuatTambahAdmin, setSedangMemuatTambahAdmin] = useState(false);

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    !namaDepan
      ? ((sesuai = false), (pesanKesalahan += "Nama Depan harus diisi. "))
      : null;
    !namaBelakang
      ? ((sesuai = false), (pesanKesalahan += "Nama Belakang harus diisi. "))
      : null;
    !namaPengguna
      ? ((sesuai = false), (pesanKesalahan += "Nama Pengguna harus diisi. "))
      : null;
    !email
      ? ((sesuai = false), (pesanKesalahan += "Email harus diisi. "))
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ((sesuai = false), (pesanKesalahan += "Format email tidak sesuai. "))
      : null;
    !jenisKelamin
      ? ((sesuai = false), (pesanKesalahan += "Jenis Kelamin harus dipilih. "))
      : null;
    !instasi
      ? ((sesuai = false), (pesanKesalahan += "Instansi harus diisi. "))
      : null;
    !peranAdmin
      ? ((sesuai = false), (pesanKesalahan += "Peran Admin harus dipilih. "))
      : null;

    if (!sesuai) {
      toast.error(pesanKesalahan.trim());
    }

    return sesuai;
  };

  const tambahAdmin = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahAdmin(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        "123456"
      );
      const user = userCredential.user;

      const referensiAdmin = collection(database, "admin");
      const dataAdmin = {
        Nama_Depan: namaDepan,
        Nama_Belakang: namaBelakang,
        Nama_Pengguna: namaPengguna,
        Email: email,
        Jenis_Kelamin: jenisKelamin,
        Instansi: instasi,
        Kata_Sandi: "123456",
        Peran: peranAdmin,
        Tanggal_Pembuatan_Akun: serverTimestamp(),
      };

      await setDoc(doc(referensiAdmin, user.uid), dataAdmin);
      toast.success("Admin berhasil ditambahkan!");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan admin: " + error.message);
    } finally {
      setSedangMemuatTambahAdmin(false);
    }
  };

  const aturUlangFormulir = () => {
    setNamaDepan("");
    setNamaBelakang("");
    setNamaPengguna("");
    setEmail("");
    setJenisKelamin("");
    setPeranAdmin("");
  };

  return {
    email,
    instasi,
    setEmail,
    namaDepan,
    setInstasi,
    peranAdmin,
    tambahAdmin,
    setNamaDepan,
    namaBelakang,
    namaPengguna,
    jenisKelamin,
    setPeranAdmin,
    setNamaBelakang,
    setNamaPengguna,
    setJenisKelamin,
    aturUlangFormulir,
    sedangMemuatTambahAdmin,
  };
};

export default useTambahAdmin;
