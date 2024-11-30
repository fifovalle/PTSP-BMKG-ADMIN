import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

const useTampilkanGrafikPartisipan = () => {
  const [dataPartisipan, setDataPartisipan] = useState([]);
  const [sedangMemuatGrafik, setSedangMemuatGrafik] = useState(true);

  useEffect(() => {
    const koleksi = ["admin", "perorangan", "perusahaan"];
    const unsubscribers = [];

    setSedangMemuatGrafik(true);

    try {
      const dataAwal = new Array(koleksi.length).fill(0);
      setDataPartisipan(dataAwal);

      koleksi.forEach((namaKoleksi, index) => {
        const unsubscribe = onSnapshot(
          collection(database, namaKoleksi),
          (snapshot) => {
            setDataPartisipan((dataSebelumnya) => {
              const dataBaru = [...dataSebelumnya];
              dataBaru[index] = snapshot.size;
              return dataBaru;
            });
          }
        );

        unsubscribers.push(unsubscribe);
      });
    } catch (error) {
      console.error("Error fetching participant data:", error);
    } finally {
      setSedangMemuatGrafik(false);
    }

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return { dataPartisipan, sedangMemuatGrafik };
};

export default useTampilkanGrafikPartisipan;
