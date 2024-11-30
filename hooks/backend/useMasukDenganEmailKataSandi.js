import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

const useMasukDenganEmailKataSandi = () => {
  const pengarah = useRouter();
  const [sedangMemuat, setSedangMemuat] = useState(false);

  const masukDenganEmail = async (email, password) => {
    if (!email && !password) {
      toast.error("Email dan kata sandi tidak boleh kosong.");
      return;
    }

    if (!email) {
      toast.error("Email harus diisi.");
      return;
    }

    if (!password) {
      toast.error("Kata sandi harus diisi.");
      return;
    }

    setSedangMemuat(true);

    try {
      const kredentialsAdmin = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (kredentialsAdmin.user) {
        localStorage.setItem("ID_Admin", kredentialsAdmin.user.uid);
        toast.success("Berhasil masuk!");
        pengarah.push("/beranda");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("Email Salah. Silakan periksa email Anda.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Kata sandi salah. Silakan periksa kata sandi Anda.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Format email tidak valid.");
      } else {
        toast.error("Akun tidak ditemukan.");
      }
    } finally {
      setSedangMemuat(false);
    }
  };

  return {
    masukDenganEmail,
    sedangMemuat,
  };
};

export default useMasukDenganEmailKataSandi;
