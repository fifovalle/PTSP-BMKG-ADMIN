import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
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
import Image from "next/image";
// PENGAIT KAMI
import useTampilkanPembuatan from "@/hooks/backend/useTampilkanPembuatan";
import useTampilkanDataPerTahun from "@/hooks/backend/useTampilkanDataPerTahun";
// KOMPONEN KAMI
import ModalSuntingPembuatan from "@/components/modalSuntingPembuatan";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";

const judulTabel = ["Pembeli", "Produk", "Tanggal Pemesanan", ""];

function Konten({ tahunDipilih }) {
  const gambarBawaan = require("@/assets/images/profil.jpg");
  const [bukaModalSuntingPengajuan, setBukaModalSuntingPengajuan] =
    useState(false);
  const [pembuatanTerpilih, setPembuatanTerpilih] = useState(null);
  const dataBulanTahun = useTampilkanDataPerTahun();
  const {
    sedangMemuatPemesanan,
    daftarPemesanan,
    totalPemesanan,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  } = useTampilkanPembuatan();

  const saringPemesanan = daftarPemesanan.filter((item) => {
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
            Daftar Pembuatan
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
            {saringPemesanan
              .filter((pemesanan) => pemesanan.Status_Pembayaran === "Lunas")
              .filter((pemesanan) => pemesanan.Status_Pesanan !== "Selesai")
              .filter(
                (pemesanan) =>
                  pemesanan.Status_Pembuatan !== "Selesai Pembuatan"
              ).length > 0 ? (
              saringPemesanan
                .filter(
                  (pemesanan) =>
                    pemesanan.Status_Pembayaran === "Lunas" &&
                    pemesanan.Status_Pesanan !== "Selesai" &&
                    pemesanan.Status_Pembuatan !== "Selesai Pembuatan"
                )
                .map(
                  (
                    { id, pengguna, Data_Keranjang, Tanggal_Pemesanan },
                    index
                  ) => {
                    const apakahTerakhir = index === saringPemesanan.length - 1;
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
                          {Data_Keranjang.map((keranjang, index) => (
                            <Typography
                              key={index}
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {keranjang.Nama}
                            </Typography>
                          ))}
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
                          <Tooltip content="Sunting">
                            <IconButton
                              onClick={() => {
                                setPembuatanTerpilih(id);
                                setBukaModalSuntingPengajuan(true);
                              }}
                              variant="text"
                            >
                              <AiOutlineUpload className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  Tidak Ada Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Halaman {halaman} dari {Math.ceil(totalPemesanan / 5)}
        </Typography>
        <div className="flex items-center gap-2">
          <Button
            onClick={ambilHalamanSebelumnya}
            variant="outlined"
            size="sm"
            disabled={sedangMemuatPemesanan || halaman === 1}
          >
            Sebelumnya
          </Button>
          <Button
            onClick={ambilHalamanSelanjutnya}
            variant="outlined"
            size="sm"
            disabled={
              sedangMemuatPemesanan || halaman === Math.ceil(totalPemesanan / 5)
            }
          >
            Selanjutnya
          </Button>
        </div>
      </CardFooter>

      <ModalSuntingPembuatan
        terbuka={bukaModalSuntingPengajuan}
        tertutup={setBukaModalSuntingPengajuan}
        pembuatanYangDipilih={pembuatanTerpilih}
      />
    </Card>
  );
}

export default Konten;
