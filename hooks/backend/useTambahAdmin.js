import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database, auth } from "@/lib/firebaseConfig";
// Import DOMPurify untuk menghindari XSS
import DOMPurify from "dompurify";

const useTambahAdmin = () => {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [instasi, setInstasi] = useState("");
  const [peranAdmin, setPeranAdmin] = useState("");
  const [sedangMemuatTambahAdmin, setSedangMemuatTambahAdmin] = useState(false);

  // Fungsi untuk membersihkan input dari XSS
  const bersihkanInput = (input) => {
    return DOMPurify.sanitize(input);
  };

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
      // Bersihkan semua input dari XSS sebelum disimpan
      const namaDepanBersih = bersihkanInput(namaDepan);
      const namaBelakangBersih = bersihkanInput(namaBelakang);
      const namaPenggunaBersih = bersihkanInput(namaPengguna);
      const emailBersih = bersihkanInput(email);
      const instasiBersih = bersihkanInput(instasi);
      const jenisKelaminBersih = bersihkanInput(jenisKelamin);
      const peranAdminBersih = bersihkanInput(peranAdmin);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailBersih,
        "123456"
      );
      const user = userCredential.user;

      const referensiAdmin = collection(database, "admin");
      const dataAdmin = {
        Nama_Depan: namaDepanBersih,
        Nama_Belakang: namaBelakangBersih,
        Nama_Pengguna: namaPenggunaBersih,
        Email: emailBersih,
        Jenis_Kelamin: jenisKelaminBersih,
        Instansi: instasiBersih,
        Kata_Sandi: "123456",
        Peran: peranAdminBersih,
        Tanggal_Pembuatan_Akun: serverTimestamp(),
        createdBy: auth.currentUser.uid,
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
