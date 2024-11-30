import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

const useHapusAdmin = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);
  const router = useRouter();

  const hapusAdmin = async (id) => {
    try {
      setSedangMemuatHapusAdmin(true);
      const auth = getAuth();
      const penggunaSaatIni = auth.currentUser;

      const response = await fetch("/api/hapus-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);

        if (penggunaSaatIni && penggunaSaatIni.uid === id) {
          setTimeout(async () => {
            await signOut(auth);
            router.push("/");
          }, 3000);
        }
      } else {
        toast.error(data.error || "Terjadi kesalahan saat menghapus admin.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus admin: " + error.message);
    } finally {
      setSedangMemuatHapusAdmin(false);
    }
  };

  return {
    hapusAdmin,
    sedangMemuatHapusAdmin,
  };
};

export default useHapusAdmin;
