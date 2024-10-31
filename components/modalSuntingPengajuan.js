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

const ModalSuntingPengajuan = ({
  terbuka,
  tertutup,
  pengajuanYangTerpilih,
}) => {
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
          <Select label="Pilih Status Pengajuan" size="lg">
            <Option value="Diterima">Diterima</Option>
            <Option value="Ditolak">Ditolak</Option>
          </Select>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="black">
          Sunting Pengajuan
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingPengajuan;
