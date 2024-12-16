import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalKonfirmasiHapusIKM = ({
  terbuka,
  tutupModal,
  ikmYangTerpilih,
  konfirmasiHapusIKM,
  sedangMemuatHapusIKM,
}) => {
  return (
    <Dialog
      open={terbuka}
      handler={tutupModal}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xl"
      className="bg-[#fff] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <div className="absolute top-3 right-3">
        <IconButton variant="text" color="red" onClick={tutupModal}>
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black">Konfirmasi Hapus IKM</DialogHeader>
      <DialogBody className="text-black">
        <p>
          Apakah Anda yakin ingin menghapus ikm
          <strong className="font-bold">{ikmYangTerpilih}</strong>? Tindakan ini
          tidak dapat dibatalkan.
        </p>
      </DialogBody>

      <DialogFooter className="space-x-4">
        <Button
          onClick={konfirmasiHapusIKM}
          variant="gradient"
          color="red"
          disabled={sedangMemuatHapusIKM}
          className={`${
            sedangMemuatHapusIKM
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatHapusIKM ? <Memuat /> : "Hapus IKM"}{" "}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalKonfirmasiHapusIKM;
