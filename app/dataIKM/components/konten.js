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
import useTampilkanDataIKM from "@/hooks/backend/useTampilkanDataIKM";
import useTampilkanDataPerTahun from "@/hooks/backend/useTampilkanDataPerTahun";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
import ModalLihatIKM from "@/components/modalLihatIKM";

const judulTabel = [
  "Pembeli",
  "Jenis Layanan",
  "Tanggal Pengisian IKM",
  "Aksi",
];

function Konten({ tahunDipilih }) {
  const gambarBawaan = require("@/assets/images/profil.jpg");
  const [bukaModalLihatIKM, setBukaModalLihatIKM] = useState(false);
  const [bukaModalHapusIKM, setBukaModalHapusIKM] = useState(false);
  const [ikmYangTerpilih, setIkmYangTerpilih] = useState(null);
  const dataBulanTahun = useTampilkanDataPerTahun();
  const {
    halaman,
    totalIkm,
    daftarIkm,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatIkm,
  } = useTampilkanDataIKM();
  const { unduhPdf } = useKonversiDataIKMKePdf();

  const saringIkm = daftarIkm.filter((item) => {
    const tanggal =
      item.Tanggal_Pembuatan_Akun ||
      item.Tanggal_Pembuatan ||
      item.Tanggal_Pemesanan;
    if (!tanggal) return false;
    const dateObj =
      tanggal instanceof Date ? tanggal : new Date(tanggal.seconds * 1000);
    const tahun = dateObj.getFullYear();
    const bulanIndex = dateObj.getMonth();
    if (tahunDipilih === "Pilih Tahun") {
      return true;
    }
    if (!dataBulanTahun || dataBulanTahun.length === 0) {
      return false;
    }
    if (bulanIndex < 0 || bulanIndex >= 12) {
      return false;
    }
    const bulanNama = bulan[bulanIndex];
    const bulanTahunDipilih = `${bulanNama} ${tahun}`;
    return bulanTahunDipilih === tahunDipilih;
  });

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
            {saringIkm
              .filter(
                (pemesanan) => pemesanan.Status_Pengisian_IKM === "Telah Diisi"
              )
              .map(
                (
                  { id, pengguna, Tanggal_Pemesanan, Data_Keranjang },
                  index
                ) => {
                  const apakahTerakhir = index === daftarIkm.length - 1;
                  const kelas = apakahTerakhir
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={kelas}>
                        <div className="flex items-center gap-3">
                          <Image
                            src={pengguna.Foto || gambarBawaan}
                            alt={pengguna.Nama_Lengkap}
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
                              {pengguna.Nama_Lengkap}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {pengguna.Email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={kelas}>
                        {Data_Keranjang && Data_Keranjang.length > 0 ? (
                          Data_Keranjang.map((dataKeranjang, idx) => (
                            <div key={idx} className="flex flex-col mb-2">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {dataKeranjang.Jenis_Produk}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {dataKeranjang.Nama}
                              </Typography>
                            </div>
                          ))
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Tidak ada jenis produk
                          </Typography>
                        )}
                      </td>

                      <td className={kelas}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatTanggal(Tanggal_Pemesanan)}
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
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Halaman {halaman} dari {Math.ceil(totalIkm / 5)}
        </Typography>
        <div className="flex items-center gap-2">
          <Button
            onClick={ambilHalamanSebelumnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatIkm || halaman === 1}
          >
            Sebelumnya
          </Button>
          <Button
            onClick={ambilHalamanSelanjutnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatIkm || halaman === Math.ceil(totalIkm / 5)}
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalLihatIKM
        terbuka={bukaModalLihatIKM}
        tertutup={setBukaModalLihatIKM}
        ikmYangTerpilihId={ikmYangTerpilih}
      />
    </Card>
  );
}

export default Konten;
