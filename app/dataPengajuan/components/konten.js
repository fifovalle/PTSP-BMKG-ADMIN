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
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
// PENGAIT KAMI
import useTampilkanPengajuan from "@/hooks/backend/useTampilkanPengajuan";
// KOMPONEN KAMI
import ModalSuntingPengajuan from "@/components/modalSuntingPengajuan";
import ModalLihatPengajuan from "@/components/modalLihatPengajuan";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";

const judulTabel = ["Pembeli", "Status", "Tanggal Pengajuan", ""];

function Konten() {
  const [bukaModalSuntingPengajuan, setBukaModalSuntingPengajuan] =
    useState(false);
  const [bukaModalLihatPengajuan, setBukaModalLihatPengajuan] = useState(false);
  const {
    halaman,
    totalPengajuan,
    daftarPengajuan,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatPengajuan,
  } = useTampilkanPengajuan();

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Daftar Pengajuan
            </Typography>
          </div>
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
            {daftarPengajuan.map(
              ({ id, foto, ID_Pengguna, status, Tanggal_Pemesanan }, index) => {
                const apakahTerakhir = index === daftarPengajuan.length - 1;
                const kelas = apakahTerakhir
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                const pengguna =
                  daftarPengajuan.find((p) => p.id === ID_Pengguna) || {};
                const { Nama_Lengkap = "Tidak ada", Email = "Tidak ada" } =
                  pengguna;

                return (
                  <tr key={id}>
                    <td className={kelas}>
                      <div className="flex items-center gap-3">
                        <Avatar src={foto} alt={Nama_Lengkap} size="sm" />
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
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status ? "Diterima" : "Ditolak"}
                          color={status ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={kelas}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Tanggal_Pemesanan}
                      </Typography>
                    </td>
                    <td className={kelas}>
                      <Tooltip content="Lihat Selengkapnya">
                        <IconButton
                          onClick={() => setBukaModalLihatPengajuan(true)}
                          variant="text"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Sunting Pengajuan">
                        <IconButton
                          onClick={() => setBukaModalSuntingPengajuan(true)}
                          variant="text"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Hapus Pengajuan">
                        <IconButton variant="text">
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
            disabled={sedangMemuatPengajuan || halaman === 2}
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalSuntingPengajuan
        terbuka={bukaModalSuntingPengajuan}
        tertutup={setBukaModalSuntingPengajuan}
      />

      <ModalLihatPengajuan
        terbuka={bukaModalLihatPengajuan}
        tertutup={setBukaModalLihatPengajuan}
      />
    </Card>
  );
}

export default Konten;
