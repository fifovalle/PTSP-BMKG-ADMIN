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
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalTambahAdmin = ({ terbuka, tertutup }) => {
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [peranAdmin, setPeranAdmin] = useState("");

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
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

      <DialogHeader className="text-black">Tambah Admin Baru</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Nama Depan
              </Typography>
              <Input label="Masukkan Nama Depan" size="lg" />
            </div>

            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Nama Belakang
              </Typography>
              <Input label="Masukkan Nama Belakang" size="lg" />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Nama Pengguna
              </Typography>
              <Input label="Masukkan Nama Pengguna" size="lg" />
            </div>

            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Email
              </Typography>
              <Input label="Masukkan Email" size="lg" />
            </div>
          </div>

          <Typography className="-mb-2" variant="h6">
            Jenis Kelamin
          </Typography>
          <Select
            label="Pilih Jenis Kelamin"
            size="lg"
            value={jenisKelamin}
            onChange={(value) => setJenisKelamin(value)}
          >
            <Option value="Pria">Pria</Option>
            <Option value="Wanita">Wanita</Option>
          </Select>

          <Typography className="-mb-2" variant="h6">
            Peran Admin
          </Typography>
          <Select
            label="Pilih Peran"
            size="lg"
            value={peranAdmin}
            onChange={(value) => setPeranAdmin(value)}
          >
            <Option value="Super Admin">Super Admin</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="dark"
          onClick={() => tertutup(false)}
          className="font-[family-name:var(--font-geist-sans)]"
        >
          Tambah Admin
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahAdmin;
