import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

const useTampilkanGrafikPartisipan = () => {
  const [dataPartisipan, setDataPartisipan] = useState([]);
  const [sedangMemuatGrafik, setSedangMemuatGrafik] = useState(true);

  useEffect(() => {
    const ambilDataPartisipan = async () => {
      setSedangMemuatGrafik(true);
      try {
        const koleksi = ["admin", "perorangan", "perusahaan"];

        const data = await Promise.all(
          koleksi.map(async (namaKoleksi) => {
            const snapshot = await getDocs(collection(database, namaKoleksi));
            return snapshot.size;
          })
        );

        setDataPartisipan(data);
      } catch (error) {
        console.error("Error fetching participant data:", error);
      } finally {
        setSedangMemuatGrafik(false);
      }
    };

    ambilDataPartisipan();
  }, []);

  return { dataPartisipan, sedangMemuatGrafik };
};

export default useTampilkanGrafikPartisipan;
