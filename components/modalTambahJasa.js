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
// PENGAIT KAMI
import useTambahJasa from "@/hooks/backend/useTambahJasa";
import useTampilkanAdminSesuaiID from "@/hooks/backend/useTampilkanAdminSesuaiID";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalTambahJasa = ({ terbuka, tertutup }) => {
  const {
    namaJasa,
    hargaJasa,
    tambahJasa,
    pemilikJasa,
    setNamaJasa,
    setHargaJasa,
    deskripsiJasa,
    setPemilikJasa,
    setDeskripsiJasa,
    sedangMemuatTambahJasa,
  } = useTambahJasa();

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

      <DialogHeader className="text-black">Tambah Jasa Baru</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="mb-2" variant="h6">
            Nama Jasa
          </Typography>
          <Input
            label="Masukkan Nama Jasa"
            size="lg"
            value={namaJasa}
            onChange={(e) => setNamaJasa(e.target.value)}
            required
          />

          <Typography className="mb-2" variant="h6">
            Harga
          </Typography>
          <Input
            type="number"
            label="Masukkan Harga Jasa"
            size="lg"
            value={hargaJasa}
            onChange={(e) => setHargaJasa(e.target.value)}
            required
          />

          <Typography className="mb-2" variant="h6">
            Pemilik Jasa
          </Typography>
          <Select
            label="Pilih Pemilik Jasa"
            size="lg"
            value={pemilikJasa}
            onChange={(value) => setPemilikJasa(value)}
            required
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

          <Typography className="mb-2" variant="h6">
            Deskripsi
          </Typography>
          <Textarea
            label="Masukkan Deskripsi Jasa"
            size="lg"
            value={deskripsiJasa}
            onChange={(e) => setDeskripsiJasa(e.target.value)}
            required
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          disabled={sedangMemuatTambahJasa}
          variant="gradient"
          color="dark"
          onClick={async () => {
            await tambahJasa();
            tertutup(false);
          }}
          className={`${
            sedangMemuatTambahJasa
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatTambahJasa ? <Memuat /> : "Simpan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahJasa;
