"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Napbar from "@/components/navbar";
import Konten from "@/app/dataPerusahaan/components/konten";

const DataPerusahaan = () => {
  const pengarah = useRouter();
  const [tahunDipilih, setTahunDipilih] = useState("Pilih Tahun");

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

export default DataPerusahaan;
