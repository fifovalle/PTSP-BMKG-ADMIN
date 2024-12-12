"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// KOMPONEN KAMI
const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: false });
const Napbar = dynamic(() => import("@/components/navbar"), { ssr: false });
const Konten = dynamic(() => import("@/app/beranda/components/konten"), {
  ssr: false,
});

const Beranda = () => {
  const pengarah = useRouter();
  const [tahunDipilih, setTahunDipilih] = useState("Pilih Tahun");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section className="p-4 flex h-screen bg-[#eff0f3]">
      <ToastContainer />
      <Sidebar pengarah={pengarah} />
      <div className="flex flex-col flex-1 gap-4 mx-3">
        <Napbar tahunDipilih={tahunDipilih} setTahunDipilih={setTahunDipilih} />
        <Konten tahunDipilih={tahunDipilih} />
      </div>
    </section>
  );
};

export default Beranda;
