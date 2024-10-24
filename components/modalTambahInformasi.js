import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Button,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalTambahInformasi = ({ terbuka, tertutup }) => {
  const [pemilikInformasi, setPemilikInformasi] = useState("");

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

      <DialogHeader className="text-black">Tambah Informasi Baru</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="-mb-2" variant="h6">
            Nama
          </Typography>
          <Input label="Masukkan Nama Informasi" size="lg" />

          <Typography className="-mb-2" variant="h6">
            Harga
          </Typography>
          <Input type="number" label="Masukkan Harga Informasi" size="lg" />

          <Typography className="-mb-2" variant="h6">
            Pemilik Informasi
          </Typography>
          <Select
            label="Pilih Pemilik Informasi"
            size="lg"
            value={pemilikInformasi}
            onChange={(value) => setPemilikInformasi(value)}
          >
            <Option value="Meteorologi">Meteorologi</Option>
            <Option value="Klimatologi">Klimatologi</Option>
            <Option value="Geofisika">Geofisika</Option>
          </Select>

          <Typography className="-mb-2" variant="h6">
            Deskripsi
          </Typography>
          <Textarea label="Masukkan Deskripsi Informasi" size="lg" />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="dark"
          onClick={() => tertutup(false)}
          className="font-[family-name:var(--font-geist-sans)]"
        >
          Tambah Informasi
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahInformasi;
