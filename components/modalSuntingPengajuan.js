import React from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Select,
  Input,
  Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// PENGAIT KAMI
import useSuntingPengajuan from "@/hooks/backend/useSuntingPengajuan";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalSuntingPengajuan = ({
  terbuka,
  tertutup,
  pengajuanYangTerpilih,
}) => {
  const {
    dataKeranjang,
    nomorVAs,
    setNomorVAs,
    keterangan,
    setKeterangan,
    suntingPengajuan,
    statusPengajuan,
    setStatusPengajuan,
    sedangMemuatSuntingPengajuan,
  } = useSuntingPengajuan(pengajuanYangTerpilih);

  const tanganiPerubahanNomorVA = (indeks, nilai) => {
    const updatedNomorVAs = [...nomorVAs];
    updatedNomorVAs[indeks] = nilai;
    setNomorVAs(updatedNomorVAs);
  };

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xl"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4"
    >
      <div className="overflow-scroll h-screen">
        <div className="absolute top-3 right-3">
          <IconButton
            variant="text"
            color="red"
            onClick={() => tertutup(false)}
            className="text-red-500 hover:bg-transparent"
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <DialogHeader className="text-black">Sunting Pengajuan</DialogHeader>

        <DialogBody divider>
          <form className="flex flex-col gap-4">
            <Typography className="-mb-2" variant="h6">
              Status
            </Typography>
            <Select
              label="Pilih Status Pengajuan"
              size="lg"
              value={statusPengajuan}
              onChange={(value) => setStatusPengajuan(value)}
            >
              <Option value="Sedang Ditinjau">Sedang Ditinjau</Option>
              <Option value="Diterima">Diterima</Option>
              <Option value="Ditolak">Ditolak</Option>
            </Select>

            {statusPengajuan === "Ditolak" && (
              <div className="flex flex-col gap-4">
                <Typography className="-mb-2" variant="h6">
                  keterangan
                </Typography>
                <Input
                  type="text"
                  label="Alasan Penolakan"
                  size="lg"
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>
            )}

            {statusPengajuan !== "Ditolak" &&
              dataKeranjang
                .filter((item) => item.hasOwnProperty("Nomor_VA"))
                .map((dataKeranjang, indeks) => (
                  <div key={indeks} className="mb-4">
                    <Typography variant="h6">
                      Virtual Akun - {dataKeranjang.Jenis_Produk} (
                      {dataKeranjang.Pemilik || "Tidak Tersedia"})
                    </Typography>
                    <Typography
                      className="mb-2 font-normal text-sm"
                      variant="h6"
                    >
                      {dataKeranjang.Nama || "Tidak Tersedia"}
                    </Typography>
                    <Input
                      type="number"
                      label="Masukan Virtual Akun"
                      size="lg"
                      defaultValue={dataKeranjang.Nomor_VA || ""}
                      onChange={(e) =>
                        tanganiPerubahanNomorVA(indeks, e.target.value)
                      }
                    />
                  </div>
                ))}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={async () => {
              await suntingPengajuan();
              tertutup(false);
            }}
            variant="gradient"
            color="black"
            disabled={sedangMemuatSuntingPengajuan}
            className={`${
              sedangMemuatSuntingPengajuan
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            {sedangMemuatSuntingPengajuan ? <Memuat /> : "Sunting Pengajuan"}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default ModalSuntingPengajuan;
