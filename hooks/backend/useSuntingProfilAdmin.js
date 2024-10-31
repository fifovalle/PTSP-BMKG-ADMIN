import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { database, auth } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
export default function useSuntingProfilAdmin(adminId) {
  const [data, setData] = useState({
    Nama_Depan: "",
    Nama_Belakang: "",
    Nama_Pengguna: "",
    Email: "",
    Jenis_Kelamin: "",
    Kata_Sandi: "",
  });

  const [memuat, setMemuat] = useState(false);

  useEffect(() => {
    const ambilDataAdmin = async () => {
      setMemuat(true);
      try {
        const adminRef = doc(database, "admin", adminId);
        const docSnap = await getDoc(adminRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          toast.error("Admin tidak ditemukan");
        }
      } catch (error) {
        console.error("Kesalahan saat mengambil data:", error);
        toast.error("Terjadi kesalahan saat mengambil data admin");
      } finally {
        setMemuat(false);
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
    setMemuat(true);

    try {
      const adminRef = doc(database, "admin", adminId);

      await updateDoc(adminRef, {
        Nama_Depan: data.Nama_Depan,
        Nama_Belakang: data.Nama_Belakang,
        Nama_Pengguna: data.Nama_Pengguna,
        Email: data.Email,
        Kata_Sandi: data.Kata_Sandi,
        Jenis_Kelamin: data.Jenis_Kelamin,
      });

      const user = auth.currentUser;
      if (user && data.Kata_Sandi) {
        await updatePassword(user, data.Kata_Sandi);
      }

      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      console.error("Kesalahan saat memperbarui profil:", error);
      toast.error("Terjadi kesalahan saat memperbarui profil");
    } finally {
      setMemuat(false);
    }
  };

  return {
    data,
    memuat,
    tanganiPerubahan,
    tanganiPengiriman,
  };
}
