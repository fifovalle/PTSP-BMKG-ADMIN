import React, { useState } from "react";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import useTampilkanAdmin from "@/hooks/backend/useTampilkanAdmin";
import useHapusAdmin from "@/hooks/backend/useHapusAdmin";
import Memuat from "@/components/memuat";
// KOMPONEN KAMI
import ModalTambahAdmin from "@/components/modalTambahAdmin";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";
const judulTabel = ["Admin", "Fungsi", "Status", "Tanggal Pembuatan Akun", ""];

const Konten = () => {
  const { hapusAdmin, sedangMemuatHapus } = useHapusAdmin();
  const [bukaModalTambahAdmin, setBukaModalTambahAdmin] = useState(false);
  const {
    halaman,
    totalAdmin,
    daftarAdmin,
    sedangMemuatTampilkan,
    ambilAdminSebelumnya,
    ambilAdminSelanjutnya,
  } = useTampilkanAdmin();

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Daftar Admin
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => setBukaModalTambahAdmin(true)}
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              Tambah Admin
            </Button>
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
            {daftarAdmin
              .sort((a, b) => {
                return (
                  new Date(b.Tanggal_Pembuatan_Akun.seconds * 1000) -
                  new Date(a.Tanggal_Pembuatan_Akun.seconds * 1000)
                );
              })
              .map(
                (
                  {
                    id,
                    Nama_Depan,
                    Nama_Belakang,
                    Email,
                    Peran,
                    Jenis_Kelamin,
                    Tanggal_Pembuatan_Akun,
                  },
                  indeks
                ) => {
                  const apakahTerakhir = indeks === daftarAdmin.length - 1;
                  const kelas = apakahTerakhir
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={kelas}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src="https://via.placeholder.com/150"
                            alt={Nama_Depan}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Nama_Depan} {Nama_Belakang}
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
                            {Peran}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {Jenis_Kelamin}
                          </Typography>
                        </div>
                      </td>
                      <td className={kelas}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value="Aktif"
                            color="green"
                          />
                        </div>
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
                        <Tooltip content="Hapus Admin">
                          <IconButton
                            variant="text"
                            onClick={() => hapusAdmin(id)}
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
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Halaman {halaman} dari {Math.ceil(totalAdmin / 5)}
        </Typography>
        <div className="flex items-center gap-2">
          <Button
            onClick={ambilAdminSebelumnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatTampilkan || halaman === 1}
          >
            Sebelumnya
          </Button>
          <Button
            onClick={ambilAdminSelanjutnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatTampilkan || halaman === 2}
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalTambahAdmin
        terbuka={bukaModalTambahAdmin}
        tertutup={setBukaModalTambahAdmin}
      />
    </Card>
  );
};

export default Konten;
