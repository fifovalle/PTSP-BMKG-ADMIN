import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanBanyakData = () => {
  const [jumlahData, setJumlahData] = useState({
    admin: 0,
    perorangan: 0,
    perusahaan: 0,
    informasi: 0,
    jasa: 0,
    ikm: 0,
    pengajuan: 0,
    transaksi: 0,
  });
  const [sedangMemuatBanyakData, setSedangMemuatBanyakData] = useState(true);

  useEffect(() => {
    const ambilJumlahData = async () => {
      try {
        const koleksi = [
          "admin",
          "perorangan",
          "perusahaan",
          "informasi",
          "jasa",
          "ikm",
          "pengajuan",
          "transaksi",
        ];

        const jumlah = await Promise.all(
          koleksi.map(async (namaKoleksi) => {
            const snapshotJumlah = await getCountFromServer(
              collection(database, namaKoleksi)
            );
            return snapshotJumlah.data().count;
          })
        );

        setJumlahData({
          admin: jumlah[0],
          perorangan: jumlah[1],
          perusahaan: jumlah[2],
          informasi: jumlah[3],
          jasa: jumlah[4],
          ikm: jumlah[5],
          pengajuan: jumlah[6],
          transaksi: jumlah[7],
        });
      } catch (error) {
        console.error("Error fetching data counts:", error);
      } finally {
        setSedangMemuatBanyakData(false);
      }
    };

    ambilJumlahData();
  }, []);

  return { jumlahData, sedangMemuatBanyakData };
};

export default useTampilkanBanyakData;
