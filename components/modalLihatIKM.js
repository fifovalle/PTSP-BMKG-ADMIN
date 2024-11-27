import React from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// PENGAIT KAMI
import useTampilkanDataIKM from "@/hooks/backend/useTampilkanDataIKM";

const ModalLihatIKM = ({ terbuka, tertutup, ikmYangTerpilihId }) => {
  const { daftarIkm } = useTampilkanDataIKM();

  const ikmYangTerpilih = daftarIkm.find((ikm) => ikm.id === ikmYangTerpilihId);

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xl"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4 rounded-lg shadow-2xl"
    >
      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="red"
          onClick={() => tertutup(false)}
          className="text-red-500 hover:bg-red-100 transition duration-200 rounded-full"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black font-bold text-xl border-b border-gray-200">
        IKM
      </DialogHeader>
      <DialogBody divider className="p-6 space-y-4 overflow-auto max-h-[80vh]">
        {ikmYangTerpilih ? (
          <div className="space-y-4">
            {ikmYangTerpilih?.Data_Keranjang?.map((dataKeranjang, index) => (
              <div key={index} className="flex justify-between items-center">
                <Typography className="text-gray-600">
                  <span className="font-semibold">Jenis Produk:</span>{" "}
                  {dataKeranjang?.Nama}
                </Typography>
                <Typography className="text-gray-600">
                  <span className="font-semibold">Pemilik:</span>{" "}
                  {dataKeranjang?.Pemilik}
                </Typography>
              </div>
            ))}

            <div>
              <Typography className="text-gray-600 font-semibold">
                Opsi yang Dipilih:
              </Typography>
              <ul className="list-disc pl-6 text-gray-600">
                {ikmYangTerpilih?.ikm.Opsi_Yang_Dipilih?.map((opsi, index) => (
                  <li key={index}>{opsi}</li>
                ))}
              </ul>
            </div>

            <div>
              <Typography className="text-gray-600 font-semibold">
                Respon IKM:
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ikmYangTerpilih?.ikm.ikmResponses?.map((response, index) => (
                  <div key={index} className="space-y-1">
                    <Typography className="font-semibold">
                      {response.NamaPertanyaan}
                    </Typography>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex space-x-2">
                        <span className="font-medium">Kualitas Layanan:</span>
                        <span>
                          {response.KualitasLayanan === "Sangat Setuju"
                            ? "Sangat Setuju"
                            : response.KualitasLayanan === "Setuju"
                            ? "Setuju"
                            : response.KualitasLayanan === "Kurang Setuju"
                            ? "Kurang Setuju"
                            : response.KualitasLayanan === "Tidak Setuju"
                            ? "Tidak Setuju"
                            : "-"}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <span className="font-medium">Harapan Konsumen:</span>
                        <span>
                          {response.HarapanKonsumen === "Sangat Penting"
                            ? "Sangat Penting"
                            : response.HarapanKonsumen === "Penting"
                            ? "Penting"
                            : response.HarapanKonsumen === "Kurang Penting"
                            ? "Kurang Penting"
                            : response.HarapanKonsumen === "Tidak Penting"
                            ? "Tidak Penting"
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Data IKM tidak ditemukan.</p>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="outlined"
          color="gray"
          onClick={() => tertutup(false)}
          className="hover:bg-gray-200 transition duration-200"
        >
          Tutup
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalLihatIKM;
