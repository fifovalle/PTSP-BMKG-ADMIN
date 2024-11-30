import React, { useState } from "react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
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
// KOMPONEN KAMI
import ModalTambahJasa from "@/components/modalTambahJasa";
import ModalSuntingJasa from "@/components/modalSuntingJasa";
import ModalKonfirmasiHapusJasa from "@/components/modalKonfirmasiHapusJasa";
import MemuatRangkaTampilkanTabel from "@/components/memuatRangkaTabel";
import ModalLihatJasa from "@/components/modalLihatJasa";
// PENGAIT KAMI
import useTampilkanJasa from "@/hooks/backend/useTampilkanJasa";
import useHapusJasa from "@/hooks/backend/useHapusJasa";
import useTampilkanDataPerTahun from "@/hooks/backend/useTampilkanDataPerTahun";
// KONSTANTA KAMI
import { formatRupiah } from "@/constants/formatRupiah";
import { formatTanggal } from "@/constants/formatTanggal";
import { bulan } from "@/constants/bulan";

const judulTabel = [
  "Jasa",
  "Harga & Kepemilikan",
  "Status",
  "Tanggal Pembuatan Jasa",
  "",
];

function Konten({ tahunDipilih }) {
  const [bukaModalTambahJasa, setBukaModalTambahJasa] = useState(false);
  const [bukaModalSuntingJasa, setBukaModalSuntingJasa] = useState(false);
  const [bukaModalLihatJasa, setBukaModalLihatJasa] = useState(false);
  const [bukaModalHapusJasa, setBukaModalHapusJasa] = useState(false);
  const [jasaYangTerpilih, setJasaYangTerpilih] = useState(null);
  const { hapusJasa, sedangMemuatHapusJasa } = useHapusJasa();
  const dataBulanTahun = useTampilkanDataPerTahun();
  const {
    halaman,
    totalJasa,
    daftarJasa,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTampilkanJasa,
  } = useTampilkanJasa();
  const konfirmasiHapus = (idJasa) => {
    setJasaYangTerpilih(idJasa);
    setBukaModalHapusJasa(true);
  };
  const hapus = async () => {
    if (jasaYangTerpilih) {
      await hapusJasa(jasaYangTerpilih);
      setBukaModalHapusJasa(false);
      setJasaYangTerpilih(null);
    }
  };

  const saringJasa = daftarJasa.filter((item) => {
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
          <div>
            <Typography variant="h5" color="blue-gray">
              Daftar Jasa
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => setBukaModalTambahJasa(true)}
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              Tambah Jasa
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-hidden px-0">
        {sedangMemuatTampilkanJasa ? (
          <MemuatRangkaTampilkanTabel />
        ) : (
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
              {saringJasa.map(
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
                  index
                ) => {
                  const apakahTerakhir = index === daftarJasa.length - 1;
                  const kelas = apakahTerakhir
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={kelas}>
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
                      <td className={kelas}>
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
                      <td className={kelas}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={
                              Status === "Tersedia"
                                ? "Tersedia"
                                : "Tidak Tersedia"
                            }
                            color={
                              Status === "Tersedia" ? "green" : "blue-gray"
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
                          {formatTanggal(Tanggal_Pembuatan)}{" "}
                        </Typography>
                      </td>
                      <td className={kelas}>
                        <Tooltip content="Lihat Selengkapnya">
                          <IconButton
                            onClick={() => {
                              setJasaYangTerpilih(id);
                              setBukaModalLihatJasa(true);
                            }}
                            variant="text"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Sunting Jasa">
                          <IconButton
                            onClick={() => {
                              setJasaYangTerpilih(id);
                              setBukaModalLihatJasa(true);
                            }}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Hapus Jasa">
                          <IconButton
                            onClick={() => konfirmasiHapus(id)}
                            variant="text"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Halaman {halaman} dari {Math.ceil(totalJasa / 5)}
        </Typography>
        <div className="flex items-center gap-2">
          <Button
            onClick={ambilHalamanSebelumnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatTampilkanJasa || halaman === 1}
          >
            Sebelumnya
          </Button>
          <Button
            onClick={ambilHalamanSelanjutnya}
            variant="outlined"
            size="sm"
            disabled={
              sedangMemuatTampilkanJasa || halaman === Math.ceil(totalJasa / 5)
            }
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalTambahJasa
        terbuka={bukaModalTambahJasa}
        tertutup={setBukaModalTambahJasa}
      />

      <ModalSuntingJasa
        terbuka={bukaModalSuntingJasa}
        tertutup={setBukaModalSuntingJasa}
        jasaYangTerpilih={jasaYangTerpilih}
      />

      <ModalKonfirmasiHapusJasa
        terbuka={bukaModalHapusJasa}
        tutupModal={setBukaModalHapusJasa}
        jasaYangTerpilih={jasaYangTerpilih}
        konfirmasiHapusJasa={hapus}
        sedangMemuatHapusJasa={sedangMemuatHapusJasa}
      />

      <ModalLihatJasa
        terbuka={bukaModalLihatJasa}
        tertutup={setBukaModalLihatJasa}
        jasaYangTerpilih={jasaYangTerpilih}
      />
    </Card>
  );
}

export default Konten;
