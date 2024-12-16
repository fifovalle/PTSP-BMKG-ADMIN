import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// PENGAIT KAMI
import useKirimFile from "@/hooks/backend/useKirimFile";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalSuntingPembuatan = ({ terbuka, tertutup, pembuatanYangDipilih }) => {
  const {
    kirim,
    kirimFile,
    nomorSurat,
    setKirimFile,
    setNomorSurat,
    sedangMemuatKirimFile,
    dataKeranjang,
  } = useKirimFile(pembuatanYangDipilih);

  const handleFileChange = (e, indeks) => {
    const file = e.target.files[0];
    const updatedFiles = [...kirimFile];
    updatedFiles[indeks] = file;
    setKirimFile(updatedFiles);
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

        <DialogHeader className="text-black">Sunting Pembuatan</DialogHeader>

        <DialogBody divider>
          <form className="flex flex-col gap-4">
            <div className="w-full mt-2">
              <Typography className="mb-2" variant="h6">
                Nomor Surat
              </Typography>
              <Input
                value={nomorSurat}
                onChange={(e) => setNomorSurat(e.target.value)}
                label="Nomor Surat"
                type="text"
                size="lg"
              />
            </div>

            {dataKeranjang.map((keranjang, indeks) => (
              <div key={indeks} className="keranjang-item mb-4">
                <div className="w-full mt-2">
                  <Typography className="mb-2" variant="h6">
                    Berkas Untuk {keranjang.Nama}
                  </Typography>
                  <Input
                    type="file"
                    size="lg"
                    onChange={(e) => handleFileChange(e, indeks)}
                    className="file-input"
                  />
                </div>
              </div>
            ))}
          </form>
        </DialogBody>

        <DialogFooter>
          <Button
            onClick={async () => {
              await kirim();
              tertutup(false);
            }}
            variant="gradient"
            color="black"
            disabled={sedangMemuatKirimFile}
            className={`${
              sedangMemuatKirimFile
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            {sedangMemuatKirimFile ? <Memuat /> : "Kirim Berkas"}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default ModalSuntingPembuatan;
