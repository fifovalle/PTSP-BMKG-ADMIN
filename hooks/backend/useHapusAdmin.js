import { useState } from "react";
import { toast } from "react-toastify";

const useHapusAdmin = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);

  const hapusAdmin = async (id) => {
    try {
      setSedangMemuatHapusAdmin(true);

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
