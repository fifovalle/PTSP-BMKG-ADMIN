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
// PENGAIT KAMI
import useTambahInformasi from "@/hooks/backend/useTambahInformasi";
import useTampilkanAdminSesuaiID from "@/hooks/backend/useTampilkanAdminSesuaiID";

// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalTambahInformasi = ({ terbuka, tertutup }) => {
  const {
    namaInformasi,
    hargaInformasi,
    tambahInformasi,
    pemilikInformasi,
    setNamaInformasi,
    setHargaInformasi,
    deskripsiInformasi,
    setPemilikInformasi,
    setDeskripsiInformasi,
    sedangMemuatTambahInformasi,
  } = useTambahInformasi();

  const { adminData, memuatTampilkanAdminSesuaiID } =
    useTampilkanAdminSesuaiID();
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

      <DialogHeader className="text-black">Tambah Informasi Baru</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="-mb-2" variant="h6">
            Nama
          </Typography>
          <Input
            label="Masukkan Nama Informasi"
            size="lg"
            value={namaInformasi}
            onChange={(e) => setNamaInformasi(e.target.value)}
            required
          />

          <Typography className="-mb-2" variant="h6">
            Harga
          </Typography>
          <Input
            type="number"
            label="Masukkan Harga Jasa"
            size="lg"
            value={hargaInformasi}
            onChange={(e) => setHargaInformasi(e.target.value)}
            required
          />

          <Typography className="-mb-2" variant="h6">
            Pemilik Informasi
          </Typography>
          <Select
            label="Pilih Pemilik Informasi"
            size="lg"
            value={pemilikInformasi}
            onChange={(value) => setPemilikInformasi(value)}
          >
            {memuatTampilkanAdminSesuaiID ? (
              <Option>Memuat...</Option>
            ) : adminData?.Peran === "Super Admin" ? (
              [
                <Option key="1" value="Meteorologi">
                  Meteorologi
                </Option>,
                <Option key="2" value="Klimatologi">
                  Klimatologi
                </Option>,
                <Option key="3" value="Geofisika">
                  Geofisika
                </Option>,
              ]
            ) : adminData?.Instansi ? (
              <Option value={adminData.Instansi}>{adminData.Instansi}</Option>
            ) : null}
          </Select>

          <Typography className="-mb-2" variant="h6">
            Deskripsi
          </Typography>
          <Textarea
            label="Masukkan Deskripsi Informasi"
            size="lg"
            value={deskripsiInformasi}
            onChange={(e) => setDeskripsiInformasi(e.target.value)}
            required
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          disabled={sedangMemuatTambahInformasi}
          variant="gradient"
          color="dark"
          onClick={async () => {
            await tambahInformasi();
            tertutup(false);
          }}
          className={`${
            sedangMemuatTambahInformasi
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatTambahInformasi ? <Memuat /> : "Simpan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahInformasi;
