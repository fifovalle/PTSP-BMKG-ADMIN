import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const cekPeroranganAtauPerusahaan = async (id) => {
  const peroranganRef = doc(database, "perorangan", id);
  const peroranganDoc = await getDoc(peroranganRef);
  if (peroranganDoc.exists()) {
    return { type: "perorangan", data: peroranganDoc.data() };
  }

  const perusahaanRef = doc(database, "perusahaan", id);
  const perusahaanDoc = await getDoc(perusahaanRef);
  if (perusahaanDoc.exists()) {
    return { type: "perusahaan", data: perusahaanDoc.data() };
  }

  return null;
};
const getJenisProduk = async (ID_Pengguna) => {
  const pemesananRef = collection(database, "pemesanan");
  const snapshot = await getDocs(pemesananRef);

  for (const docSnapshot of snapshot.docs) {
    const pemesananData = docSnapshot.data();

    if (pemesananData.ID_Pengguna === ID_Pengguna) {
      // Periksa apakah Data_Keranjang ada dan apakah itu sebuah array
      if (
        pemesananData.Data_Keranjang &&
        Array.isArray(pemesananData.Data_Keranjang)
      ) {
        // Ambil Jenis_Produk dari item pertama dalam Data_Keranjang
        const jenisProduk = pemesananData.Data_Keranjang[0]?.Jenis_Produk;
        return jenisProduk || "Jenis Produk tidak tersedia";
      }
    }
  }

  return "Jenis Produk tidak ditemukan";
};

const useTampilkanIKM = (batasHalaman = 5) => {
  const [sedangMemuatIKM, setSedangMemuatIKM] = useState(false);
  const [daftarIKM, setDaftarIKM] = useState([]);
  const [totalIKM, setTotalIKM] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarIKM = useCallback(async () => {
    const referensiIKM = collection(database, "IKM");
    try {
      setSedangMemuatIKM(true);
      const snapshot = await getDocs(referensiIKM);
      const ikmDataList = [];

      const totalDocs = snapshot.docs.length;
      setTotalIKM(totalDocs);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;

      for (let i = startIndex; i < endIndex && i < totalDocs; i++) {
        const docSnapshot = snapshot.docs[i];
        const ikmRef = doc(database, "IKM", docSnapshot.id);
        const ikmDoc = await getDoc(ikmRef);

        if (ikmDoc.exists()) {
          const ikmData = {
            id: ikmDoc.id,
            ...ikmDoc.data(),
          };

          const referensiData = await cekPeroranganAtauPerusahaan(ikmData.id);
          ikmData.referensi = referensiData;

          if (ikmData.id) {
            const jenisProduk = await getJenisProduk(ikmData.id);
            ikmData.Jenis_Produk = jenisProduk;
          } else {
            ikmData.Jenis_Produk = "ID Pemesanan tidak tersedia";
          }

          ikmDataList.push(ikmData);
          console.log(ikmDataList);
        }
      }

      setDaftarIKM(ikmDataList);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil data IKM: " + error.message
      );
    } finally {
      setSedangMemuatIKM(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarIKM();
  }, [ambilDaftarIKM]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalIKM / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    halaman,
    totalIKM,
    daftarIKM,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatIKM,
  };
};

export default useTampilkanIKM;
