import React, { useState } from "react";
import {
  ArrowDownTrayIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
// PENGAIT KAMI
import useKonversiDataIKMKePdf from "@/hooks/backend/useKonversiDataIKMKePdf";
import useTampilkanIKM from "@/hooks/backend/useTampilkanDataIKM";
import useHapusIKM from "@/hooks/backend/useHapusDataIKM";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
import ModalLihatIKM from "@/components/modalLihatIKM";
import ModalKonfirmasiHapusIKM from "@/components/modalKonfirmasiHapusIKM";

const judulTabel = [
  "Pembeli",
  "NIK & Koresponden",
  "Jenis Layanan",
  "Tanggal Pengisian IKM",
  "Aksi",
];

function Konten() {
  const gambarBawaan = require("@/assets/images/profil.jpg");
  const [bukaModalLihatIKM, setBukaModalLihatIKM] = useState(false);
  const [bukaModalHapusIKM, setBukaModalHapusIKM] = useState(false);
  const [ikmYangTerpilih, setIkmYangTerpilih] = useState(null);
  const {
    daftarIKM,
    sedangMemuatIKM,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    halaman,
    totalIKM,
  } = useTampilkanIKM();
  const { unduhPdf } = useKonversiDataIKMKePdf();
  const { hapusIKM } = useHapusIKM(); // Pastikan Anda memiliki fungsi ini
  const [sedangMemuatHapusIKM, setSedangMemuatHapusIKM] = useState(false);

  const konfirmasiHapusIKM = () => {
    setSedangMemuatHapusIKM(true);
    hapusIKM(ikmYangTerpilih)
      .then(() => {
        setBukaModalHapusIKM(false);
      })
      .finally(() => {
        setSedangMemuatHapusIKM(false);
      });
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-1 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Daftar IKM
          </Typography>
        </div>
      </CardHeader>

      <CardBody className="overflow-hidden px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {judulTabel.map((konten) => (
                <th
                  key={konten}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {konten}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sedangMemuatIKM ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Memuat data...
                </td>
              </tr>
            ) : (
              daftarIKM.map(
                (
                  { id, referensi, Jenis_Produk, Tanggal_Pembuatan_IKM },
                  index
                ) => {
                  const { data } = referensi || {};
                  const Nama_Lengkap =
                    data?.Nama_Lengkap || "Nama tidak tersedia";
                  const Email = data?.Email || "Email tidak tersedia";
                  const foto = data?.foto || gambarBawaan;
                  const NIK = data?.No_Identitas || "NIK tidak tersedia";
                  const apakahTerakhir = index === daftarIKM.length - 1;
                  const kelas = apakahTerakhir
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  const instansi = referensi
                    ? referensi.type === "perorangan"
                      ? "Masyarakat Umum"
                      : "Instansi"
                    : "Tidak Diketahui";

                  const jenisLayanan = Jenis_Produk || "Tidak diketahui";

                  return (
                    <tr key={id}>
                      <td className={kelas}>
                        <div className="flex items-center gap-3">
                          <Image
                            src={foto || gambarBawaan}
                            alt={Nama_Lengkap}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Nama_Lengkap}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {Email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={kelas}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {instansi}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {NIK}
                          </Typography>
                        </div>
                      </td>

                      <td className={kelas}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {jenisLayanan}
                          </Typography>
                        </div>
                      </td>

                      <td className={kelas}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatTanggal(Tanggal_Pembuatan_IKM)}
                        </Typography>
                      </td>

                      <td className={kelas}>
                        <Tooltip content="Unduh IKM">
                          <IconButton
                            variant="text"
                            onClick={() => unduhPdf(id)}
                          >
                            <ArrowDownTrayIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="Selengkapnya">
                          <IconButton
                            onClick={() => {
                              setIkmYangTerpilih(id);
                              setBukaModalLihatIKM(true);
                            }}
                            variant="text"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="Hapus IKM">
                          <IconButton
                            variant="text"
                            onClick={() => {
                              setIkmYangTerpilih(id);
                              setBukaModalHapusIKM(true);
                            }}
                          >
                            {sedangMemuatHapusIKM ? (
                              <Memuat />
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Halaman {halaman} dari {Math.ceil(totalIKM / 5)}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={ambilHalamanSebelumnya}>
            Sebelumnya
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={ambilHalamanSelanjutnya}
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalKonfirmasiHapusIKM
        terbuka={bukaModalHapusIKM}
        tutupModal={setBukaModalHapusIKM}
        ikmYangTerpilih={ikmYangTerpilih}
        konfirmasiHapusIKM={konfirmasiHapusIKM}
        sedangMemuatHapusIKM={sedangMemuatHapusIKM}
      />
      <ModalLihatIKM
        terbuka={bukaModalLihatIKM}
        tutupModal={setBukaModalLihatIKM}
        idIKM={ikmYangTerpilih}
      />
    </Card>
  );
}

export default Konten;
