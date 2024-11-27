import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanAdminSesuaiID = () => {
  const pengarah = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [memuatTampilkanAdminSesuaiID, setMemuatTampilkanAdminSesuaiID] =
    useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const idAdmin = localStorage.getItem("ID_Admin");
      if (!idAdmin) {
        pengarah.push("/");
        return;
      }
      setId(idAdmin);
    }
  }, [pengarah]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setMemuatTampilkanAdminSesuaiID(true);

        if (!id) {
          throw new Error("ID Admin tidak ditemukan.");
        }

        const adminRef = doc(collection(database, "admin"), id);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
          setAdminData(adminSnap.data());
        } else {
          throw new Error("Admin tidak ditemukan.");
        }
      } catch (err) {
        console.error("Error fetching admin data:", err.message);
        toast.error(err.message);
      } finally {
        setMemuatTampilkanAdminSesuaiID(false);
      }
    };

    if (id) {
      fetchAdminData();
    }
  }, [id]);

  return { adminData, memuatTampilkanAdminSesuaiID };
};

export default useTampilkanAdminSesuaiID;
