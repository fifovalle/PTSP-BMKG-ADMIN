import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
// PENGAIT KAMI
import useTampilkanPengajuan from "@/hooks/backend/useTampilkanPengajuan";

const ModalLihatPengajuan = ({ terbuka, tertutup, pengajuanYangTerpilih }) => {
  const { daftarPengajuan } = useTampilkanPengajuan();
  const gambarBawaan = require("@/assets/images/profil.jpg");

  const pengajuanTerpilih = daftarPengajuan.find(
    (pengajuan) => pengajuan.id === pengajuanYangTerpilih
  );

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
          <XMarkIcon className="h-6 w-6 " />
        </IconButton>
      </div>

      <DialogHeader className="text-black">Sunting Pengajuan</DialogHeader>

      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="white"
          onClick={() => tertutup(false)}
          className="text-white hover:bg-transparent"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-white text-lg font-semibold border-b-2 border-gray-300 pb-2">
        Pengajuan
      </DialogHeader>

      <DialogBody
        divider
        className="flex flex-col md:flex-row justify-evenly items-center p-6 bg-white rounded-b-lg"
      >
        {pengajuanTerpilih ? (
          <>
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <embed
                alt="Dokumen Pengajuan"
                className="w-80 h-64 border-4 border-gray-300 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg"
                src={pengajuanTerpilih.ajukan?.File_Ajukan}
              />
              <h3 className="text-center mt-3 font-semibold text-blue-700">
                {pengajuanTerpilih.ajukan?.Nama_Ajukan ||
                  "Nama ajukan tidak tersedia"}
              </h3>
            </div>

            <div className="flex flex-col items-center">
              <Image
                alt="Gambar Profil"
                className="w-24 h-24 border-4 border-blue-500 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                src={pengajuanTerpilih.pengguna?.Foto || gambarBawaan}
              />
              <div className="text-center mt-3">
                <h2 className="text-2xl font-bold text-blue-900">
                  {pengajuanTerpilih.pengguna?.Nama_Lengkap || "N/A"}
                </h2>
                <p className="text-blue-700">
                  {pengajuanTerpilih.pengguna?.Email || "Email tidak tersedia"}
                </p>
                <p className="text-blue-700">
                  {pengajuanTerpilih.pengguna?.Jenis_Kelamin ||
                    "Tidak diketahui"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            Data pengajuan tidak ditemukan.
          </p>
        )}
      </DialogBody>
    </Dialog>
  );
};

export default ModalLihatPengajuan;
