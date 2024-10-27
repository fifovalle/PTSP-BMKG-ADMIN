import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Import useRouter
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanAdminSesuaiID = (id = localStorage.getItem("ID_Admin")) => {
  const [adminData, setAdminData] = useState(null);
  const [memuatTampilkanAdminSesuaiID, setMemuatTampilkanAdminSesuaiID] =
    useState(true);
  const router = useRouter(); // Inisialisasi useRouter

  useEffect(() => {
    const idAdmin = localStorage.getItem("ID_Admin");
    if (!idAdmin) {
      router.push("/");
      return;
    }

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
        toast.error(err.message);
      } finally {
        setMemuatTampilkanAdminSesuaiID(false);
      }
    };

    fetchAdminData();
  }, [id, router]);

  return { adminData, memuatTampilkanAdminSesuaiID };
};

export default useTampilkanAdminSesuaiID;
