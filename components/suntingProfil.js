import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// PENGAIT KAMI
import useSuntingProfilAdmin from "@/hooks/backend/useSuntingProfilAdmin";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

function SuntingProfil({ adminData }) {
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const { data, memuat, tanganiPerubahan, tanganiPengiriman } =
    useSuntingProfilAdmin(adminData);

  const tanganiTerlihat = () => {
    setLihatKataSandi((prev) => !prev);
  };

  const opsiJenisKelamin = ["Pria", "Wanita"];

  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Depan
          </Typography>
          <input
            type="text"
            name="Nama_Depan"
            value={data.Nama_Depan}
            onChange={tanganiPerubahan}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Nama Depan"
          />
        </div>
        <div className="flex flex-col">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Belakang
          </Typography>
          <input
            type="text"
            name="Nama_Belakang"
            value={data.Nama_Belakang}
            onChange={tanganiPerubahan}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Nama Belakang"
          />
        </div>
        <div className="flex flex-col">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Pengguna
          </Typography>
          <input
            type="text"
            name="Nama_Pengguna"
            value={data.Nama_Pengguna}
            onChange={tanganiPerubahan}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Nama Pengguna"
          />
        </div>
        <div className="flex flex-col">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Email
          </Typography>
          <input
            type="email"
            name="Email"
            value={data.Email}
            onChange={tanganiPerubahan}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-105 hover:border-[#0F67B1] transition-all duration-200"
            placeholder="Masukkan Email"
          />
        </div>
        <div className="flex flex-col">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Jenis Kelamin
          </Typography>
          <select
            name="Jenis_Kelamin"
            value={data.Jenis_Kelamin}
            onChange={tanganiPerubahan}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Pilih Jenis Kelamin</option>
            {opsiJenisKelamin.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col relative">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Kata Sandi
          </Typography>
          <input
            type={lihatKataSandi ? "text" : "password"}
            name="Kata_Sandi"
            value={data.Kata_Sandi}
            onChange={tanganiPerubahan}
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
      </div>

      <div className="flex items-center justify-center w-full mt-8">
        <button
          type="button"
          onClick={tanganiPengiriman}
          disabled={memuat}
          className={`bg-[#0F67B1] ${
            memuat
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 hover:text-gray-200 hover:scale-105 opacity-100"
          } text-white font-bold text-lg py-2 px-4 rounded-lg w-64 transition-all duration-300 ease-in-out`}
        >
          {memuat ? <Memuat /> : "Simpan"}
        </button>
      </div>
    </div>
  );
}

export default SuntingProfil;
