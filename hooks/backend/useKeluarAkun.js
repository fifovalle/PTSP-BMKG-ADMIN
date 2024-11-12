import { useState } from "react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

const useKeluarAkun = () => {
  const [memuat, setMemuat] = useState(false);
  const router = useRouter();

  const keluar = async () => {
    setMemuat(true);
    try {
      localStorage.removeItem("ID_Admin");

      await signOut(auth);

      sessionStorage.clear();
      localStorage.clear();

      toast.success("Anda telah keluar dari akun.");
      router.push("/");
    } catch (error) {
      toast.error("Terjadi kesalahan saat keluar: " + error.message);
    } finally {
      setMemuat(false);
    }
  };

  return { keluar, memuat };
};

export default useKeluarAkun;
