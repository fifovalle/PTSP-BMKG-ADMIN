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
import useSuntingPembayaran from "@/hooks/backend/useSuntingPembayaran";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalSuntingPembayaran = ({
  terbuka,
  tertutup,
  pembayaranYangTerpilih,
}) => {
  const {
    statusPembayaran,
    setStatusPembayaran,
    keterangan,
    setKeterangan,
    suntingPembayaran,
    sedangMemuatSuntingPembayaran,
  } = useSuntingPembayaran(pembayaranYangTerpilih);

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

      <DialogHeader className="text-black">Sunting Pembayaran</DialogHeader>

      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="-mb-2" variant="h6">
            Status
          </Typography>
          <Select
            label="Pilih Status Pembayaran"
            size="lg"
            value={statusPembayaran}
            onChange={(value) => {
              setStatusPembayaran(value);
              if (value !== "Ditolak") {
                setKeterangan(""); // Reset keterangan jika status bukan "Ditolak"
              }
            }}
          >
            <Option value="Sedang Ditinjau">Sedang Ditinjau</Option>
            <Option value="Lunas">Lunas</Option>
            <Option value="Ditolak">Ditolak</Option>
          </Select>

          {statusPembayaran === "Ditolak" && (
            <>
              <Typography className="-mb-2 mt-4" variant="h6">
                Keterangan
              </Typography>
              <Input
                type="text"
                size="lg"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Masukkan keterangan untuk penolakan"
              />
            </>
          )}
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={async () => {
            await suntingPembayaran();
            tertutup(false);
          }}
          variant="gradient"
          color="black"
          disabled={sedangMemuatSuntingPembayaran}
          className={`${
            sedangMemuatSuntingPembayaran
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatSuntingPembayaran ? <Memuat /> : "Sunting Pembayaran"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingPembayaran;
