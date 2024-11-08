import { useEffect, useState } from "react";
import { database } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
// KONSTANTA KAMI
import { bulan } from "@/constants/bulan";

const useTampilkanDataPerTahun = () => {
  const [dataBulanTahun, setDataBulanTahun] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bulanTahunSet = new Set();
      const koleksi = [
        "admin",
        "informasi",
        "jasa",
        "perorangan",
        "perusahaan",
        "pemesanan",
      ];

      for (const koleksiNama of koleksi) {
        const querySnapshot = await getDocs(collection(database, koleksiNama));

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const tanggal =
            (koleksiNama === "admin" ||
              koleksiNama === "perorangan" ||
              koleksiNama === "perusahaan") &&
            data.Tanggal_Pembuatan_Akun
              ? data.Tanggal_Pembuatan_Akun.toDate()
              : (koleksiNama === "informasi" || koleksiNama === "jasa") &&
                data.Tanggal_Pembuatan
              ? data.Tanggal_Pembuatan.toDate()
              : koleksiNama === "pemesanan" && data.Tanggal_Pemesanan
              ? data.Tanggal_Pemesanan.toDate()
              : null;

          if (tanggal) {
            const tahun = tanggal.getFullYear();
            const bulanIndex = tanggal.getMonth();
            const bulanNama = bulan[bulanIndex];
            bulanTahunSet.add(`${bulanNama} ${tahun}`);
          }
        });
      }

      setDataBulanTahun(Array.from(bulanTahunSet));
    };

    fetchData();
  }, []);

  return dataBulanTahun;
};

export default useTampilkanDataPerTahun;
