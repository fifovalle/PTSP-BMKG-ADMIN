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
    statusPengajuan,
    setStatusPengajuan,
    suntingPengajuan,
    sedangMemuatSuntingPengajuan,
  } = useSuntingPengajuan(pengajuanYangTerpilih);

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
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
          {sedangMemuatSuntingPengajuan ? <Memuat /> : "Sunting Jasa"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingPengajuan;
