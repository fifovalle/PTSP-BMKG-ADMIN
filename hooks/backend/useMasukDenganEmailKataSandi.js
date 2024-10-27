import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

const useMasukDenganEmailKataSandi = () => {
  const pengarah = useRouter();
  const [sedangMemuat, setSedangMemuat] = useState(false);

  const masukDenganEmail = async (email, password) => {
    setSedangMemuat(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        localStorage.setItem("ID_Admin", userCredential.user.uid);

        toast.success("Berhasil masuk!");
        pengarah.push("/beranda");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("Email tidak ditemukan. Silakan daftar terlebih dahulu.");
          break;
        case "auth/wrong-password":
          toast.error("Kata sandi salah. Coba lagi.");
          break;
        case "auth/invalid-email":
          toast.error("Email tidak valid. Silakan periksa kembali.");
          break;
        default:
          toast.error("Gagal masuk: " + error.message);
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
