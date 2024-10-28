import React from "react";
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
// PENGAIT KAMI
import useTambahAdmin from "@/hooks/backend/useTambahAdmin";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalTambahAdmin = ({ terbuka, tertutup }) => {
  const {
    email,
    instasi,
    setEmail,
    namaDepan,
    setInstasi,
    peranAdmin,
    tambahAdmin,
    setNamaDepan,
    namaBelakang,
    namaPengguna,
    jenisKelamin,
    setPeranAdmin,
    setNamaBelakang,
    setNamaPengguna,
    setJenisKelamin,
    sedangMemuatTambahAdmin,
  } = useTambahAdmin();

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
              <Input
                label="Masukkan Nama Depan"
                size="lg"
                value={namaDepan}
                onChange={(e) => setNamaDepan(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Nama Belakang
              </Typography>
              <Input
                label="Masukkan Nama Belakang"
                size="lg"
                value={namaBelakang}
                onChange={(e) => setNamaBelakang(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Nama Pengguna
              </Typography>
              <Input
                label="Masukkan Nama Pengguna"
                size="lg"
                value={namaPengguna}
                onChange={(e) => setNamaPengguna(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Email
              </Typography>
              <Input
                label="Masukkan Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Typography className="mb-2" variant="h6">
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
            </div>

            <div className="w-full">
              <Typography className="mb-2" variant="h6">
                Instansi
              </Typography>
              <Select
                label="Pilih Instansi"
                size="lg"
                value={instasi}
                onChange={(value) => setInstasi(value)}
              >
                <Option value="Klimatologi">Klimatologi</Option>
                <Option value="Meteorologi">Meteorologi</Option>
                <Option value="Geofisika">Geofisika</Option>
              </Select>
            </div>
          </div>

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
          disabled={sedangMemuatTambahAdmin}
          variant="gradient"
          color="dark"
          onClick={async () => {
            await tambahAdmin();
            tertutup(false);
          }}
          className={`${
            sedangMemuatTambahAdmin
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatTambahAdmin ? <Memuat /> : "Simpan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahAdmin;
