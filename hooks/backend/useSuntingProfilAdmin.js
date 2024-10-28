import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { database, auth } from "@/lib/firebaseConfig";

export default function useSuntingProfilAdmin(adminId) {
  const [data, setData] = useState({
    Nama_Depan: "",
    Nama_Belakang: "",
    Nama_Pengguna: "",
    Email: "",
    Jenis_Kelamin: "",
    Kata_Sandi: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ambilDataAdmin = async () => {
      setLoading(true);
      try {
        const adminRef = database.collection("admin").doc(adminId);
        const doc = await adminRef.get();
        if (doc.exists) {
          setData(doc.data());
        } else {
          toast.error("Admin tidak ditemukan");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat mengambil data admin");
      } finally {
        setLoading(false);
      }
    };

    ambilDataAdmin();
  }, [adminId]);

  const tanganiPerubahan = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const tanganiPengiriman = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (data.Kata_Sandi !== data.Konfirmasi_Kata_Sandi) {
      toast.error("Kata sandi dan konfirmasi kata sandi tidak cocok");
      setLoading(false);
      return;
    }

    try {
      const adminRef = database.collection("pengguna").doc(adminId);
      await adminRef.update({
        Nama_Depan: data.Nama_Depan,
        Nama_Belakang: data.Nama_Belakang,
        Nama_Pengguna: data.Nama_Pengguna,
        Email: data.Email,
        Jenis_Kelamin: data.Jenis_Kelamin,
        Peran: data.Peran,
      });

      if (data.Kata_Sandi) {
        const user = auth.currentUser;
        await user.updatePassword(data.Kata_Sandi);
      }

      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    tanganiPerubahan,
    tanganiPengiriman,
  };
}
