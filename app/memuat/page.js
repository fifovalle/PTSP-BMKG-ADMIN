"use client";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const MemuatMasuk = () => {
  const memuat = require("@/assets/videos/memuat.gif");
  const sukses = require("@/assets/videos/sukses.gif");
  const DURASI_MEMUAT = 1000;
  const DURASI_MUNCUL = 0.3;
  const DURASI_KELUAR = 1;

  const [tampilkanSukses, setTampilkanSukses] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, DURASI_MEMUAT);

    const timer2 = setTimeout(() => {
      setTampilkanSukses(true);
    }, DURASI_MEMUAT + DURASI_KELUAR * 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="bg-[#eff0f3] h-screen w-full p-28 flex justify-center">
      <ToastContainer />
      <Card className="flex items-center justify-center w-full h-full bg-[#eff0f3] shadow-lg rounded-lg overflow-hidden relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 14 }}
          transition={{ duration: 0.5 }}
          className="absolute translate-y-[-50%] translate-x-[50%]"
        >
          <Card className="w-40 h-40 bg-[#0F67B1] rounded-full" />
        </motion.div>
        <Card className="flex w-full h-full items-center justify-center bg-transparent">
          <div className="items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: fadeOut ? 0 : 1,
              }}
              transition={{ duration: DURASI_MUNCUL, delay: 0.5 }}
            >
              {!tampilkanSukses && (
                <Image src={memuat} alt="memuat" className="w-40 h-40" />
              )}
            </motion.div>

            {tampilkanSukses && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURASI_MUNCUL }}
              >
                <Image src={sukses} alt="sukses" className="w-40 h-40" />
              </motion.div>
            )}
          </div>
          <div className="items-center justify-center">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: DURASI_MUNCUL }}
            >
              <Typography className="font-mono text-white text-xl">
                {!tampilkanSukses ? "Memuat..." : "Berhasil!"}
              </Typography>
            </motion.div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default MemuatMasuk;
