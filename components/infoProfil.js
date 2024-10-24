import React from "react";
import { Typography } from "@material-tailwind/react";

function InfoProfil() {
  return (
    <div className="bg-gray-100 w-full h-full p-6 rounded-xl">
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Depan
          </Typography>
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Belakang
          </Typography>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Pengguna
          </Typography>
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Jenis Kelamin
          </Typography>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Email
          </Typography>
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Peran
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default InfoProfil;
