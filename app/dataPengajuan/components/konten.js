import React, { useState } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Image from "next/image";
// PENGAIT KAMI
import useTampilkanPengajuan from "@/hooks/backend/useTampilkanPengajuan";
import useHapusPengajuan from "@/hooks/backend/useHapusPengajuan";
import ModalKonfirmasiHapusPengajuan from "@/components/modalKonfirmasiHapusPengajuan";
import useTampilkanDataPerTahun from "@/hooks/backend/useTampilkanDataPerTahun";
// KOMPONEN KAMI
import ModalSuntingPengajuan from "@/components/modalSuntingPengajuan";
import ModalLihatPengajuan from "@/components/modalLihatPengajuan";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";

const judulTabel = [
  "Pembeli",
  "Produk",
  "Status",
  "Jenis",
  "Tanggal Pengajuan",
  "",
];

function Konten({ tahunDipilih }) {
  const gambarBawaan = require("@/assets/images/profil.jpg");
  const [bukaModalSuntingPengajuan, setBukaModalSuntingPengajuan] =
    useState(false);
  const [bukaModalLihatPengajuan, setBukaModalLihatPengajuan] = useState(false);
  const [pengajuanTerpilih, setPengajuanTerpilih] = useState(null);
  const { hapusPengajuan, sedangMemuatHapus } = useHapusPengajuan();
  const [bukaModalKonfirmasiHapus, setBukaModalKonfirmasiHapus] =
    useState(false);
  const dataBulanTahun = useTampilkanDataPerTahun();
  const {
    halaman,
    totalPengajuan,
    daftarPengajuan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatPengajuan,
  } = useTampilkanPengajuan();

  const konfirmasiHapusPengajuan = () => {
    if (pengajuanTerpilih) {
      hapusPengajuan(pengajuanTerpilih);
      setBukaModalKonfirmasiHapus(false);
    } else {
      toast.error("Tidak ada pengajuan yang dipilih untuk dihapus.");
    }
  };

  const saringPengajuan = daftarPengajuan.filter((item) => {
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
            Daftar Pengajuan
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
            {saringPengajuan.filter(
              ({ ajukan }) => ajukan.Status_Ajuan !== "Diterima"
            ).length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-blue-gray-500">
                  Tidak Ada Data
                </td>
              </tr>
            ) : (
              daftarPengajuan
                .filter(({ ajukan }) => ajukan.Status_Ajuan !== "Diterima")
                .map(({ id, pengguna, Data_Keranjang, ajukan }, index) => {
                  const apakahTerakhir = index === daftarPengajuan.length - 1;
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
                        {Data_Keranjang.map((Data_Keranjang, indeks) => (
                          <Typography
                            key={indeks}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Data_Keranjang.Nama}
                          </Typography>
                        ))}
                      </td>
                      <td className={kelas}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={ajukan.Status_Ajuan || "Belum ada status"}
                            color={
                              ajukan.Status_Ajuan === "Diterima"
                                ? "green"
                                : ajukan.Status_Ajuan === "Ditolak"
                                ? "red"
                                : ajukan.Status_Ajuan === "Sedang Ditinjau"
                                ? "yellow"
                                : "default"
                            }
                          />
                        </div>
                      </td>
                      <td className={kelas}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={ajukan.Jenis_Ajukan || "Belum ada jenis"}
                            color={
                              ajukan.Jenis_Ajukan === "Gratis"
                                ? "green"
                                : ajukan.Jenis_Ajukan === "Berbayar"
                                ? "red"
                                : "default"
                            }
                          />
                        </div>
                      </td>
                      <td className={kelas}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatTanggal(ajukan.Tanggal_Pembuatan_Ajukan)}
                        </Typography>
                      </td>
                      <td className={kelas}>
                        <Tooltip content="Lihat Selengkapnya">
                          <IconButton
                            onClick={() => {
                              setPengajuanTerpilih(id);
                              setBukaModalLihatPengajuan(true);
                            }}
                            variant="text"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Sunting">
                          <IconButton
                            onClick={() => {
                              setPengajuanTerpilih(id);
                              setBukaModalSuntingPengajuan(true);
                            }}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Hapus">
                          <IconButton
                            onClick={() => {
                              setPengajuanTerpilih(id);
                              setBukaModalKonfirmasiHapus(true);
                            }}
                            variant="text"
                            disabled={sedangMemuatHapus}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Halaman {halaman} dari {Math.ceil(totalPengajuan / 5)}
        </Typography>
        <div className="flex items-center gap-2">
          <Button
            onClick={ambilHalamanSebelumnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatPengajuan || halaman === 1}
          >
            Sebelumnya
          </Button>
          <Button
            onClick={ambilHalamanSelanjutnya}
            variant="outlined"
            size="sm"
            disabled={
              sedangMemuatPengajuan || halaman === Math.ceil(totalPengajuan / 5)
            }
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalSuntingPengajuan
        terbuka={bukaModalSuntingPengajuan}
        tertutup={setBukaModalSuntingPengajuan}
        pengajuanYangTerpilih={pengajuanTerpilih}
      />

      <ModalKonfirmasiHapusPengajuan
        terbuka={bukaModalKonfirmasiHapus}
        tertutup={() => setBukaModalKonfirmasiHapus(false)}
        pengajuanYangTerpilih={pengajuanTerpilih}
        konfirmasi={konfirmasiHapusPengajuan}
        sedangMemuatHapusPengajuan={sedangMemuatHapus}
      />

      <ModalLihatPengajuan
        terbuka={bukaModalLihatPengajuan}
        tertutup={setBukaModalLihatPengajuan}
        pengajuanYangTerpilih={pengajuanTerpilih}
      />
    </Card>
  );
}

export default Konten;
