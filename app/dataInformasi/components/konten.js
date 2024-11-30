import React, { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
// PENGAIT KAMI
import useTampilkanInformasi from "@/hooks/backend/useTampilkanInformasi";
import useHapusInformasi from "@/hooks/backend/useHapusInformasi";
import useTampilkanDataPerTahun from "@/hooks/backend/useTampilkanDataPerTahun";
// KOMPONEN KAMI
import ModalTambahInformasi from "@/components/modalTambahInformasi";
import MemuatRangkaTampilkanTabel from "@/components/memuatRangkaTabel";
import ModalSuntingInformasi from "@/components/modalSuntingInformasi";
import ModalKonfirmasiHapusInformasi from "@/components/modalKonfirmasiHapusInformasi";
import ModalLihatInformasi from "@/components/modalLihatInformasi";
import Memuat from "@/components/memuat";
// KONSTANTA KAMI
import { formatRupiah } from "@/constants/formatRupiah";
import { formatTanggal } from "@/constants/formatTanggal";
import { bulan } from "@/constants/bulan";

const judulTabel = [
  "Informasi",
  "Harga & Kepemilikan",
  "Status",
  "Tanggal Pembuatan Informasi",
  "",
];

function Konten({ tahunDipilih }) {
  const [bukaModalTambahInformasi, setBukaModalTambahInformasi] =
    useState(false);
  const [bukaModalSuntingInformasi, setBukaModalSuntingInformasi] =
    useState(false);
  const [bukaModalLihatInformasi, setBukaModalLihatInformasi] = useState(false);
  const [bukaModalHapusInformasi, setBukaModalHapusInformasi] = useState(false);
  const [informasiYangTerpilih, setInformasiYangTerpilih] = useState(null);
  const { hapusInformasi, sedangMemuatHapus } = useHapusInformasi();
  const dataBulanTahun = useTampilkanDataPerTahun();
  const {
    halaman,
    daftarInformasi,
    totalInformasi,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTampilkanInformasi,
  } = useTampilkanInformasi();
  const konfirmasiHapus = (idInformasi) => {
    setInformasiYangTerpilih(idInformasi);
    setBukaModalHapusInformasi(true);
  };
  const hapus = async () => {
    if (informasiYangTerpilih) {
      await hapusInformasi(informasiYangTerpilih);
      setBukaModalHapusInformasi(false);
      setInformasiYangTerpilih(null);
    }
  };
  const saringInformasi = daftarInformasi.filter((item) => {
    const tanggal = item.Tanggal_Pembuatan_Akun || item.Tanggal_Pembuatan;
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
            Daftar Informasi
          </Typography>
          <Button
            onClick={() => setBukaModalTambahInformasi(true)}
            className="flex items-center gap-3"
            size="sm"
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
            Tambah Informasi
          </Button>
        </div>
      </CardHeader>

      <CardBody className="overflow-hidden px-0">
        {sedangMemuatTampilkanInformasi ? (
          <MemuatRangkaTampilkanTabel />
        ) : (
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {judulTabel.map((judul) => (
                  <th
                    key={judul}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {judul}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {saringInformasi
                .sort(
                  (a, b) =>
                    new Date(b.Tanggal_Pembuatan.seconds * 1000) -
                    new Date(a.Tanggal_Pembuatan.seconds * 1000)
                )
                .map(
                  (
                    {
                      id,
                      Nama,
                      Harga,
                      Status,
                      Pemilik,
                      Deskripsi,
                      Tanggal_Pembuatan,
                    },
                    indeks
                  ) => (
                    <tr
                      key={id}
                      className={
                        indeks === daftarInformasi.length - 1
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50"
                      }
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src="https://via.placeholder.com/150"
                            alt={Nama}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Nama.length > 10
                                ? Nama.slice(0, 10) + "..."
                                : Nama}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {Deskripsi}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatRupiah(Harga)}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {Pemilik}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={Status ? "Tersedia" : "Tidak Tersedia"}
                            color={Status ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatTanggal(Tanggal_Pembuatan)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Tooltip content="Lihat Selengkapnya">
                          <IconButton
                            onClick={() => {
                              setInformasiYangTerpilih(id);
                              setBukaModalLihatInformasi(true);
                            }}
                            variant="text"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Sunting Informasi">
                          <IconButton
                            onClick={() => {
                              setInformasiYangTerpilih(id);
                              setBukaModalSuntingInformasi(true);
                            }}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Hapus Informasi">
                          <IconButton
                            variant="text"
                            onClick={() => konfirmasiHapus(id)}
                          >
                            {sedangMemuatHapus ? (
                              <Memuat />
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        )}
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Halaman {halaman} dari {Math.ceil(totalInformasi / 5)}
        </Typography>
        <div className="flex items-center gap-2">
          <Button
            onClick={ambilHalamanSebelumnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatTampilkanInformasi || halaman === 1}
          >
            Sebelumnya
          </Button>
          <Button
            onClick={ambilHalamanSelanjutnya}
            variant="outlined"
            size="sm"
            disabled={
              sedangMemuatTampilkanInformasi ||
              halaman === Math.ceil(totalInformasi / 5)
            }
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalLihatInformasi
        terbuka={bukaModalLihatInformasi}
        tertutup={setBukaModalLihatInformasi}
        informasiYangTerpilih={informasiYangTerpilih}
      />

      <ModalTambahInformasi
        terbuka={bukaModalTambahInformasi}
        tertutup={setBukaModalTambahInformasi}
      />

      <ModalSuntingInformasi
        terbuka={bukaModalSuntingInformasi}
        tertutup={setBukaModalSuntingInformasi}
        informasiYangTerpilih={informasiYangTerpilih}
      />

      <ModalKonfirmasiHapusInformasi
        terbuka={bukaModalHapusInformasi}
        tertutup={setBukaModalHapusInformasi}
        informasiYangTerpilih={informasiYangTerpilih}
        konfirmasiHapusInformasi={hapus}
        sedangMemuatHapusInformasi={sedangMemuatTampilkanInformasi}
      />
    </Card>
  );
}

export default Konten;
