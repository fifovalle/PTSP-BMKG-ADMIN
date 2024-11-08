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
  const { kirim, setKirimFile, sedangMemuatKirimFile } =
    useKirimFile(pembuatanYangDipilih);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setKirimFile(file);
  };

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

      <DialogHeader className="text-black">Sunting Pembuatan</DialogHeader>

      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <div className="w-full">
            <Typography className="mb-2" variant="h6">
              Berkas
            </Typography>
            <Input type="file" size="lg" onChange={handleFileChange} />
          </div>
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
    </Dialog>
  );
};

export default ModalSuntingPembuatan;
