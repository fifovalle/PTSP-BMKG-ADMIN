import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

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
import useTampilkanPerusahaan from "@/hooks/backend/useTampilkanPerusahaan";
import useTampilkanDataPerTahun from "@/hooks/backend/useTampilkanDataPerTahun";
import useHapusPerusahaan from "@/hooks/backend/useHapusPerusahaan";
// KOMPONEN KAMI
import MemuatRangkaTampilkanTabel from "@/components/memuatRangkaTabel";
import ModalKonfirmasiHapusPerusahaan from "@/components/modalKonfirmasiHapusPerusahaan";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";
import { bulan } from "@/constants/bulan";

const judulTabel = [
  "Perusahaan",
  "NPWP & Nomor Identitas",
  "Status",
  "Tanggal Pembuatan Akun",
  "",
];

function Konten({ tahunDipilih }) {
  const gambarBawaan = require("@/assets/images/profil.jpg");
  const dataBulanTahun = useTampilkanDataPerTahun();
  const [sedangMemuatHapusPerusahaan, setSedangMemuatHapusPerusahaan] =
    useState(false);
  const [bukaModalHapusPerusahaan, setBukaModalHapusPerusahaan] =
    useState(false);
  const [perusahaanYangTerpilih, setPerusahaanYangTerpilih] = useState(null);

  const { hapusPerusahaan } = useHapusPerusahaan();

  const konfirmasiHapus = (idPerusahaan) => {
    setPerusahaanYangTerpilih(idPerusahaan);
    setBukaModalHapusPerusahaan(true);
  };

  const hapus = async () => {
    if (perusahaanYangTerpilih) {
      setSedangMemuatHapusPerusahaan(true);
      await hapusPerusahaan(perusahaanYangTerpilih);
      setBukaModalHapusPerusahaan(false);
      setPerusahaanYangTerpilih(null);
      setSedangMemuatHapusPerusahaan(false);
    }
  };

  const {
    halaman,
    totalPerusahaan,
    daftarPerusahaan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatTampilkanPerusahaan,
  } = useTampilkanPerusahaan();

  const saringPerusahaan = daftarPerusahaan.filter((item) => {
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
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-1 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Daftar Perusahaan
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-hidden px-0">
          {sedangMemuatTampilkanPerusahaan ? (
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
                {saringPerusahaan.map(
                  (
                    {
                      id,
                      Foto,
                      Nama_Lengkap,
                      Email,
                      No_Identitas,
                      NPWP_Perusahaan,
                      aktif,
                      Tanggal_Pembuatan_Akun,
                    },
                    index
                  ) => {
                    const apakahTerakhir =
                      index === daftarPerusahaan.length - 1;
                    const kelas = apakahTerakhir
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={kelas}>
                          <div className="flex items-center gap-3">
                            <Image
                              src={Foto || gambarBawaan}
                              alt={Nama_Lengkap}
                              size="sm"
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
                              {No_Identitas}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {NPWP_Perusahaan}
                            </Typography>
                          </div>
                        </td>
                        <td className={kelas}>
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={aktif ? "Aktif" : "Tidak Aktif"}
                            color={aktif ? "green" : "blue-gray"}
                          />
                        </td>
                        <td className={kelas}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatTanggal(Tanggal_Pembuatan_Akun)}
                          </Typography>
                        </td>
                        <td className={kelas}>
                          <Tooltip content="Hapus Perusahaan">
                            <IconButton
                              variant="text"
                              onClick={() => konfirmasiHapus(id)}
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
            Halaman {halaman} dari {Math.ceil(totalPerusahaan / 5)}
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              onClick={ambilHalamanSebelumnya}
              variant="outlined"
              size="sm"
              disabled={sedangMemuatTampilkanPerusahaan || halaman === 1}
            >
              Sebelumnya
            </Button>
            <Button
              onClick={ambilHalamanSelanjutnya}
              variant="outlined"
              size="sm"
              disabled={sedangMemuatTampilkanPerusahaan || halaman === 2}
            >
              Selanjutnya
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ModalKonfirmasiHapusPerusahaan
        terbuka={bukaModalHapusPerusahaan}
        tertutup={setBukaModalHapusPerusahaan}
        perusahaanYangTerpilih={perusahaanYangTerpilih}
        konfirmasiHapusPerusahaan={hapus}
        sedangMemuatHapus={sedangMemuatHapusPerusahaan}
      />
    </>
  );
}

export default Konten;
