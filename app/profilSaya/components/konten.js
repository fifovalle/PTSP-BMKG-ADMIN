import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";
// KOMPONEN KAMI
import InfoProfil from "@/components/infoProfil";
import SuntingProfil from "@/components/suntingProfil";

function Konten() {
  const gambarProfil = require("@/assets/images/profil.jpg");
  const [tampilkanInfo, setTampilkanInfo] = useState(true);
  const [tampilkanSunting, setTampilkanSunting] = useState(false);

  const tanganiTampilkanInfo = () => {
    setTampilkanInfo(true);
    setTampilkanSunting(false);
  };

  const tanganiTampilkanSunting = () => {
    setTampilkanInfo(false);
    setTampilkanSunting(true);
  };

  return (
    <Card className="h-full w-full p-16">
      <div className="mb-1 flex gap-x-4 items-center">
        <Image
          src={gambarProfil}
          className="w-36 h-36 rounded-lg border-2 border-gray-300"
          alt="Profil"
        />
        <div className="py-4 px-2">
          <Typography className="font-[family-name:var(--font-geist-sans)] font-bold text-2xl">
            Sayyid Gibran
          </Typography>
          <div className="flex gap-2 py-1">
            <Typography className="font-[family-name:var(--font-geist-sans)] font-medium text-xl text-[#0F67B1]">
              sayyid.gibran@gmail.com
            </Typography>
            <Typography className="font-[family-name:var(--font-geist-sans)] font-medium text-xl">
              -
            </Typography>
            <Typography className="font-[family-name:var(--font-geist-sans)] font-semibold text-xl">
              Stasiun Klimatologi
            </Typography>
          </div>
          <Typography className="font-[family-name:var(--font-geist-sans)] font-medium text-xl">
            Super Admin
          </Typography>
        </div>
      </div>
      <div className="mt-12 mb-4 flex justify-evenly">
        <Typography
          onClick={tanganiTampilkanInfo}
          className={`font-[family-name:var(--font-geist-sans)] font-bold text-xl cursor-pointer py-1 px-4 rounded-tl-lg rounded-bl-lg w-full text-center transition-all duration-300 ease-in-out ${
            tampilkanInfo
              ? "bg-[#0f68b1c6] text-white"
              : "text-black border border-gray-800 bg-gray-100 hover:bg-gray-300 hover:text-blue-700"
          }`}
        >
          Informasi
        </Typography>
        <Typography
          onClick={tanganiTampilkanSunting}
          className={`font-[family-name:var(--font-geist-sans)] font-semibold text-xl py-1 px-4 cursor-pointer w-full text-center rounded-tr-lg rounded-br-lg transition-all duration-300 ease-in-out ${
            tampilkanSunting
              ? "bg-[#0f68b1c6] text-white"
              : "text-black border border-gray-800 bg-gray-100 hover:bg-gray-300 hover:text-blue-700"
          }`}
        >
          Sunting
        </Typography>
      </div>

      {tampilkanInfo && <InfoProfil />}
      {tampilkanSunting && <SuntingProfil />}
    </Card>
  );
}

export default Konten;
