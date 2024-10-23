"use client";
import React from "react";
import { useRouter } from "next/navigation";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Napbar from "@/components/navbar";
import Konten from "@/app/dataInformasi/components/konten";

const DataInformasi = () => {
  const pengarah = useRouter();

  return (
    <section className="p-4 flex h-screen bg-[#eff0f3]">
      <Sidebar pengarah={pengarah} />
      <div className="flex flex-col flex-1 gap-4 mx-3">
        <Napbar />
        <Konten />
      </div>
    </section>
  );
};

export default DataInformasi;
