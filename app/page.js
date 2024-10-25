"use client";
import Image from "next/image";
import { Button, Card, Typography, Input } from "@material-tailwind/react";
import { AtSymbolIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Masuk() {
  const logoMasuk = require("@/assets/images/logoMasuk.png");
  const partikel1 = require("@/assets/images/bintang.png");
  const partikel2 = require("@/assets/images/bumi1.png");
  const partikel3 = require("@/assets/images/bumi2.png");
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const popUpAnimasi = {
    hidden: { scale: 0, y: 0 },
    visible: {
      scale: 1,
      y: -100,
      transition: { duration: 5 },
    },
  };
  const animasiTanpaBatas = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
    },
  };
  const popUpAnimasiBumi = {
    hidden: { scale: 0, y: 0 },
    visible: {
      scale: 1,
      y: -100,
      transition: { duration: 3 },
    },
  };
  const animasiBumiTanpaBatas = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
    },
  };

  return (
    <div className="bg-[#eff0f3] h-screen w-full p-28 flex justify-center">
      <Card className="w-full bg-[#0F67B1] rounded-br-none rounded-tr-none shadow-lg">
        <div className="flex justify-center items-center h-screen  mt-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={popUpAnimasi}
            whileHover={animasiTanpaBatas}
            className="flex justify-center items-center"
          >
            <Image
              src={partikel3}
              alt="Masuk"
              className="w-10 h-10 object-cover rounded-full p-2 relative"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={popUpAnimasiBumi}
            whileHover={animasiBumiTanpaBatas}
            className="flex justify-center items-center"
          >
            <Image src={partikel2} alt="Masuk" className="" />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={popUpAnimasi}
            whileHover={animasiTanpaBatas}
            className="flex justify-center items-center"
          >
            <Image
              src={partikel1}
              alt="Masuk"
              className="w-10 h-10 object-cover rounded-full p-2  relative"
            />
          </motion.div>
        </div>
      </Card>
      <Card className="w-full bg-white rounded-bl-none rounded-tl-none shadow-lg">
        <div className="flex justify-center items-center mt-20">
          <Image
            src={logoMasuk}
            alt="Masuk"
            className="w-28 h-28 object-cover bg-gray-200 rounded-full p-2"
          />
        </div>
        <div className="mt-2">
          <Typography className="text-center font-mono text-[40px]">
            Masuk
          </Typography>
          <Typography className="text-center font-body text-md">
            Masukan email dan kata sandi untuk melanjutkan akses.
          </Typography>
        </div>
        <div className="w-[470px] self-center mt-8 relative">
          <Input
            className="hover:border-2 hover:border-[#0F67B1] focus:border-2 focus:border-[#0F67B1]"
            label="Email"
            type="email"
          />
          <AtSymbolIcon className="h-6 w-6 absolute top-2 right-4 text-[#0F67B1] " />
        </div>
        <div className="w-[470px] self-center mt-8 relative">
          <Input
            className="hover:border-2 hover:border-[#0F67B1] focus:border-2 focus:border-[#0F67B1]"
            label="Kata Sandi"
            type={lihatKataSandi ? "text" : "password"}
          />
          {lihatKataSandi ? (
            <EyeSlashIcon
              className="h-6 w-6 absolute top-2 right-4 text-[#0F67B1] cursor-pointer"
              onClick={() => setLihatKataSandi(false)}
            />
          ) : (
            <EyeIcon
              className="h-6 w-6 absolute top-2 right-4 text-[#0F67B1] cursor-pointer"
              onClick={() => setLihatKataSandi(true)}
            />
          )}
        </div>
        <div className="w-[470px] self-center text-end mr-3 mt-2 font-body">
          <Typography className="text-[#0F67B1] hover:cursor-pointer hover:underline transition-all duration-200">
            Lupa Sandi?
          </Typography>
        </div>
        <Button className="w-[470px] self-center text-center text-md font-body bg-[#0F67B1] rounded-lg p-3 mt-4 hover:scale-95 hover:bg-[#0F67B1] transition-all duration-200">
          Masuk
        </Button>
      </Card>
    </div>
  );
}
