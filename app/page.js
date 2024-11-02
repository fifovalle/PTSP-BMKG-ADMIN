"use client";
import Image from "next/image";
import { Button, Card, Typography, Input } from "@material-tailwind/react";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { motion, useAnimation } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
// PENGAIT KAMI
import useMasukDenganEmailKataSandi from "@/hooks/backend/useMasukDenganEmailKataSandi";

export default function Masuk() {
  const logoMasuk = require("@/assets/images/logoMasuk.png");
  const partikel1 = require("@/assets/images/bumi.png");
  const partikel2 = require("@/assets/images/bintang.png");
  const partikel3 = require("@/assets/images/awan1.png");
  const partikel4 = require("@/assets/images/awan2.png");
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { masukDenganEmail, sedangMemuat } = useMasukDenganEmailKataSandi();
  const [tampilkanCardLupaKataSandi, setTampilkanCardLupaKataSandi] =
    useState(false);

  const handleLogin = () => {
    masukDenganEmail(email, password);
  };
  const munculBulan = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: -80,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const munculBintang = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, delay: 1.3 } },
  };

  const munculAwan1 = {
    hidden: { x: -44, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, delay: 0.9 } },
  };
  const munculAwan2 = {
    hidden: { x: 44, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7, delay: 0.7 } },
  };

  const ulangiBawahAtas = {
    y: [-80, -70, -80],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };
  const kontrol = useAnimation();
  useEffect(() => {
    const animate = async () => {
      await kontrol.start("visible");
      kontrol.start(ulangiBawahAtas);
    };

    animate();
  }, [kontrol]);

  return (
    <div className="bg-[#eff0f3] h-screen w-full p-28 flex justify-center">
      <ToastContainer />
      <Card className="w-full bg-[#0F67B1] rounded-br-none rounded-tr-none shadow-lg">
        <div className="justify-center items-center h-screen">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={munculBintang}
            className="relative"
          >
            <Image
              src={partikel2}
              alt="Masuk"
              className="w-8 h-8 object-cover rounded-full absolute top-36 right-[400px]"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={munculBintang}
            className="relative"
          >
            <Image
              src={partikel2}
              alt="Masuk"
              className="w-8 h-8 object-cover rounded-full absolute top-56 right-64"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={munculBintang}
            className="relative"
          >
            <Image
              src={partikel2}
              alt="Masuk"
              className="w-8 h-8 object-cover rounded-full absolute top-[345px] left-[200px]"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={munculBintang}
            className="relative"
          >
            <Image
              src={partikel2}
              alt="Masuk"
              className="w-8 h-8 object-cover rounded-full absolute top-[460px] left-64"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={munculBintang}
            className="relative"
          >
            <Image
              src={partikel2}
              alt="Masuk"
              className="w-8 h-8 object-cover rounded-full absolute top-[390px] right-[200px]"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={munculAwan1}
            className="relative"
          >
            <Image
              src={partikel3}
              alt="Masuk"
              className="w-48 h-24 object-cover rounded-full absolute top-40 left-44"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={munculAwan2}
            className="relative"
          >
            <Image
              src={partikel4}
              alt="Masuk"
              className="w-[400px] h-24 object-cover absolute top-[390px] right-44"
            />
          </motion.div>
          <div className="flex justify-center items-center mt-64 -z-50">
            <motion.div
              initial="hidden"
              animate={kontrol}
              variants={munculBulan}
              className="flex justify-center items-center w-72"
            >
              <Image src={partikel1} alt="Masuk" />
            </motion.div>
          </div>
        </div>
      </Card>
      <Card
        className={`w-full bg-white rounded-bl-none rounded-tl-none shadow-lg ${
          tampilkanCardLupaKataSandi ? "hidden" : ""
        }`}
      >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AtSymbolIcon className="h-6 w-6 absolute top-2 right-4 text-[#0F67B1]" />
        </div>
        <div className="w-[470px] self-center mt-8 relative">
          <Input
            className="hover:border-2 hover:border-[#0F67B1] focus:border-2 focus:border-[#0F67B1]"
            label="Kata Sandi"
            type={lihatKataSandi ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Typography
            onClick={() => setTampilkanCardLupaKataSandi(true)}
            className="text-[#0F67B1] hover:cursor-pointer hover:underline transition-all duration-200"
          >
            Lupa Sandi?
          </Typography>
        </div>
        <Button
          className="w-[470px] self-center text-center text-md font-body bg-[#0F67B1] rounded-lg p-3 mt-4 hover:scale-95 hover:bg-[#0F67B1] transition-all duration-200"
          onClick={handleLogin}
          disabled={sedangMemuat}
        >
          {sedangMemuat ? <Memuat /> : "Masuk"}{" "}
        </Button>
      </Card>
      <Card
        className={`w-full bg-white rounded-bl-none rounded-tl-none shadow-lg ${
          tampilkanCardLupaKataSandi ? "" : "hidden"
        }`}
      >
        <div className="flex justify-center items-center mt-20">
          <Image
            src={logoMasuk}
            alt="Masuk"
            className="w-28 h-28 object-cover bg-gray-200 rounded-full p-2"
          />
        </div>
        <div className="mt-2">
          <Typography className="text-center font-mono text-[40px]">
            Lupa Kata Sandi
          </Typography>
          <Typography className="text-center font-body text-md">
            Masukkan email Anda untuk menerima tautan reset kata sandi.
          </Typography>
        </div>
        <div className="w-[470px] self-center mt-8 mb-4 relative">
          <Input
            className="hover:border-2 hover:border-[#0F67B1] focus:border-2 focus:border-[#0F67B1]"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AtSymbolIcon className="h-6 w-6 absolute top-2 right-4 text-[#0F67B1]" />
        </div>
        <Button className="w-[470px] self-center text-center text-md font-body bg-[#0F67B1] rounded-lg p-3 mt-4 hover:scale-95 hover:bg-[#0F67B1] transition-all duration-200">
          {sedangMemuat ? <Memuat /> : "Kirim Tautan Reset"}
        </Button>
        <div className="flex justify-center items-center mt-14">
          <ArrowLeftCircleIcon
            className="h-12 w-12 text-[#0F67B1] cursor-pointer hover:text-blue-300 hover:scale-110 transition duration-200"
            onClick={() => setTampilkanCardLupaKataSandi(false)}
          />
        </div>
      </Card>
    </div>
  );
}
