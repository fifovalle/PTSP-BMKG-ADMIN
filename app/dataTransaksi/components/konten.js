import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/solid";
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
  "Pembeli",
  "Produk",
  "Kuantitas & Total",
  "Status",
  "Tanggal Pengisian Transaksi",
  "",
];

const kontenTabel = [
  {
    foto: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    nama: "Pengguna",
    email: "pengguna@gmail.com",
    produk: "INFORMASI METEOROLOGI...",
    kuantitas: "2",
    total: "Rp 20.000",
    status: true,
    tanggalTransasi: "23 Februari 2024",
  },
];

function Konten() {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-1 flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Daftar Transaksi
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
            {kontenTabel.map(
              (
                {
                  foto,
                  nama,
                  email,
                  produk,
                  kuantitas,
                  total,
                  status,
                  tanggalTransasi,
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
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={kelas}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {produk}
                      </Typography>
                    </td>
                    <td className={kelas}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {kuantitas}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {total}
                        </Typography>
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
                        {tanggalTransasi}
                      </Typography>
                    </td>
                    <td className={kelas}>
                      <Tooltip content="Unduh Transaksi">
                        <IconButton variant="text">
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Hapus Transaksi">
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
