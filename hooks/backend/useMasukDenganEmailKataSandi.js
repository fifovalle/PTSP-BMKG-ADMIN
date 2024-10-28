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
      if (error.code === "auth/invalid-credential") {
        toast.error(
          "Email Atau Kata Sandi Salah. Silakan periksa email dan kata sandi Anda."
        );
      } else {
        toast.error("Terjadi kesalahan saat masuk. Silakan coba lagi.");
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
