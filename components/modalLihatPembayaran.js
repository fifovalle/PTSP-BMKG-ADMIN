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
import useTampilkanPembayaran from "@/hooks/backend/useTampilkanPembayaran";

const ModalLihatPembayaran = ({
  terbuka,
  tertutup,
  pembayaranYangTerpilih,
}) => {
  const { daftarPemesanan } = useTampilkanPembayaran();
  const gambarBawaan = require("@/assets/images/profil.jpg");

  const pembayaranTerpilih = daftarPemesanan.find(
    (pembayaran) => pembayaran.id === pembayaranYangTerpilih
  );

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
            <XMarkIcon className="h-6 w-6 " />
          </IconButton>
        </div>

        <DialogHeader className="text-black">Lihat Pembayaran</DialogHeader>

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
          {pembayaranTerpilih ? (
            <>
              <div className="flex flex-col items-center mb-4 md:mb-0">
                {pembayaranTerpilih.transaksi?.Bukti_Pembayaran?.length > 0 ? (
                  pembayaranTerpilih.transaksi.Bukti_Pembayaran.map(
                    (file, index) => (
                      <embed
                        key={index}
                        alt={`Dokumen Pengajuan ${index + 1}`}
                        className="w-80 h-64 border-4 border-gray-300 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg mb-2"
                        src={file}
                      />
                    )
                  )
                ) : (
                  <p className="text-gray-500">Dokumen ajukan tidak tersedia</p>
                )}
              </div>

              <div className="flex flex-col items-center">
                <Image
                  alt="Gambar Profil"
                  className="w-24 h-24 border-4 border-blue-500 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                  src={pembayaranTerpilih.pengguna?.Foto || gambarBawaan}
                />
                <div className="text-center mt-3">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {pembayaranTerpilih.pengguna?.Nama_Lengkap || "N/A"}
                  </h2>
                  <p className="text-blue-700">
                    {pembayaranTerpilih.pengguna?.Email ||
                      "Email tidak tersedia"}
                  </p>
                  <p className="text-blue-700">
                    {pembayaranTerpilih.pengguna?.Jenis_Kelamin ||
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
      </div>
    </Dialog>
  );
};

export default ModalLihatPembayaran;
