import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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

const judulTabel = [
  "Informasi",
  "Harga & Kepemilikan",
  "Status",
  "Tanggal Pembuatan Informasi",
  "",
];

const kontenTabel = [
  {
    foto: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    nama: "Informasi",
    deskripsi: "ini Dekripsinya",
    harga: "Rp 10.000",
    intansi: "Klimatologi BMKG",
    aktif: true,
    tanggalPembuatanInformasi: "23 Februari 2024",
  },
];

function Konten() {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Daftar Informasi
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              Tambah Informasi
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
            {kontenTabel.map(
              (
                {
                  foto,
                  nama,
                  deskripsi,
                  harga,
                  intansi,
                  aktif,
                  tanggalPembuatanInformasi,
                },
                index
              ) => {
                const apakahTerakhir = index === kontenTabel.length - 1;
                const kelas = apakahTerakhir
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={nama}>
                    <td className={kelas}>
                      <div className="flex items-center gap-3">
                        <Avatar src={foto} alt={nama} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {nama}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {deskripsi}
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
                          {harga}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {intansi}
                        </Typography>
                      </div>
                    </td>
                    <td className={kelas}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={aktif ? "Tersedia" : "Tidak Tersedia"}
                          color={aktif ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={kelas}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {tanggalPembuatanInformasi}
                      </Typography>
                    </td>
                    <td className={kelas}>
                      <Tooltip content="Sunting Informasi">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Hapus Informasi">
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
          Halaman 1 dari 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Sebelumnya
          </Button>
          <Button variant="outlined" size="sm">
            Selanjutnya
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Konten;
