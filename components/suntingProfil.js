import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function SuntingProfil() {
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const [lihatKonfirmasiKataSandi, setlihatKonfirmasiKataSandi] =
    useState(false);

  const tanganiTerlihat = () => {
    setLihatKataSandi((prev) => !prev);
  };

  const tanganiKonfirmasiTerlihat = () => {
    setlihatKonfirmasiKataSandi((prev) => !prev);
  };

  const opsiJenisKelamin = ["Laki-laki", "Perempuan"];
  const opsiPeran = ["Admin", "Super Admin"];

  return (
    <div className="bg-gray-100 w-full h-full p-6 rounded-xl">
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Depan
          </Typography>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Nama Depan"
          />
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Belakang
          </Typography>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Nama Belakang"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Pengguna
          </Typography>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Nama Pengguna"
          />
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Email
          </Typography>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Email"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Jenis Kelamin
          </Typography>
          <select className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none">
            {opsiJenisKelamin.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Peran
          </Typography>
          <select className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none">
            {opsiPeran.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Kata Sandi
          </Typography>
          <input
            type={lihatKataSandi ? "text" : "password"}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Kata Sandi"
          />
          <button
            type="button"
            onClick={tanganiTerlihat}
            className="absolute right-5 top-2/3 transform -translate-y-1/2 hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
          >
            {lihatKataSandi ? (
              <EyeSlashIcon className="h-5 w-5 text-black" />
            ) : (
              <EyeIcon className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
        <div className="flex-1 relative">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Konfirmasi Kata Sandi
          </Typography>
          <input
            type={lihatKonfirmasiKataSandi ? "text" : "password"}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Konfirmasi Kata Sandi"
          />
          <button
            type="button"
            onClick={tanganiKonfirmasiTerlihat}
            className="absolute right-5 top-2/3 transform -translate-y-1/2 hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
          >
            {lihatKonfirmasiKataSandi ? (
              <EyeSlashIcon className="h-5 w-5 text-black" />
            ) : (
              <EyeIcon className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-8">
        <button
          type="button"
          className="bg-[#0F67B1] hover:bg-blue-700 hover:text-gray-200 hover:scale-105 text-white font-bold text-lg py-2 px-4 rounded-lg w-64 transition-all duration-300 ease-in-out"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

export default SuntingProfil;
