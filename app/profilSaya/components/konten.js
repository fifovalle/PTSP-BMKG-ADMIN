import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";
// KOMPONEN KAMI
import InfoProfil from "@/components/infoProfil";
import SuntingProfil from "@/components/suntingProfil";
// PENGAIT KAMI
import useTampilkanAdminSesuaiID from "@/hooks/backend/useTampilkanAdminSesuaiID";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

function Konten() {
  const gambarBawaan = require("@/assets/images/profil.jpg");
  const [tampilkanInfo, setTampilkanInfo] = useState(true);
  const [tampilkanSunting, setTampilkanSunting] = useState(false);
  const [idAdmin, setIdAdmin] = useState(null);
  const { adminData, memuatTampilkanAdminSesuaiID } =
    useTampilkanAdminSesuaiID();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIdAdmin = localStorage.getItem("ID_Admin");
      setIdAdmin(storedIdAdmin);
    }
  }, []);

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
      {memuatTampilkanAdminSesuaiID ? (
        <Memuat />
      ) : (
        <>
          <div className="mb-1 flex gap-x-4 items-center">
            <Image
              src={adminData && adminData.Foto ? adminData.Foto : gambarBawaan}
              className="w-36 h-36 rounded-lg border-2 border-gray-300"
              alt="Profil"
            />
            <div className="py-4 px-2">
              <Typography className="font-[family-name:var(--font-geist-sans)] font-bold text-2xl">
                {adminData ? adminData.Nama_Pengguna : ""}
              </Typography>
              <div className="flex gap-2 py-1">
                <Typography className="font-[family-name:var(--font-geist-sans)] font-medium text-xl text-[#0F67B1]">
                  {adminData ? adminData.Email : ""}
                </Typography>
                <Typography className="font-[family-name:var(--font-geist-sans)] font-medium text-xl">
                  -
                </Typography>
                <Typography className="font-[family-name:var(--font-geist-sans)] font-semibold text-xl">
                  {adminData ? adminData.Instansi : ""}
                </Typography>
              </div>
              <Typography className="font-[family-name:var(--font-geist-sans)] font-medium text-xl">
                {adminData ? adminData.Peran : ""}
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
              className={`font-semibold text-xl py-1 px-4 cursor-pointer w-full text-center rounded-tr-lg rounded-br-lg transition-all duration-300 ease-in-out ${
                tampilkanSunting
                  ? "bg-[#0f68b1c6] text-white"
                  : "text-black border border-gray-800 bg-gray-100 hover:bg-gray-300 hover:text-blue-700"
              }`}
            >
              Sunting
            </Typography>
          </div>
          {tampilkanInfo && <InfoProfil adminData={adminData} />}
          {tampilkanSunting && <SuntingProfil adminData={idAdmin} />}
        </>
      )}
    </Card>
  );
}

export default Konten;
