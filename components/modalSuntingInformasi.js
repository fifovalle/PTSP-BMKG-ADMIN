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
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
// PENGAIT KAMI
import useSuntingInformasi from "@/hooks/backend/useSuntingInformasi";

const ModalSuntingInformasi = ({
  terbuka,
  tertutup,
  informasiYangTerpilih,
}) => {
  const {
    namaInformasi,
    hargaInformasi,
    suntingInformasi,
    pemilikInformasi,
    setNamaInformasi,
    setHargaInformasi,
    deskripsiInformasi,
    setPemilikInformasi,
    setDeskripsiInformasi,
    sedangMemuatSuntingInformasi,
  } = useSuntingInformasi(informasiYangTerpilih);

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

      <DialogHeader className="text-black">Sunting Informasi Baru</DialogHeader>
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
          />

          <Typography className="-mb-2" variant="h6">
            Harga
          </Typography>
          <Input
            type="number"
            label="Masukkan Harga Informasi"
            size="lg"
            value={hargaInformasi}
            onChange={(e) => setHargaInformasi(e.target.value)}
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
            <Option value="Meteorologi">Meteorologi</Option>
            <Option value="Klimatologi">Klimatologi</Option>
            <Option value="Geofisika">Geofisika</Option>
          </Select>

          <Typography className="-mb-2" variant="h6">
            Deskripsi
          </Typography>
          <Textarea
            label="Masukkan Deskripsi Informasi"
            size="lg"
            value={deskripsiInformasi}
            onChange={(e) => setDeskripsiInformasi(e.target.value)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={async () => {
            await suntingInformasi();
            tertutup(false);
          }}
          variant="gradient"
          color="black"
          disabled={sedangMemuatSuntingInformasi}
          className={`${
            sedangMemuatSuntingInformasi
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatSuntingInformasi ? <Memuat /> : "Sunting Informasi"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingInformasi;
