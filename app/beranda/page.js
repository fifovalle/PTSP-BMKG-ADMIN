"use client";
import React from "react";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Napbar from "@/components/navbar";

const Beranda = () => {
  return (
    <section className="p-4 flex h-screen bg-[#eff0f3]">
      <Sidebar />
      <div className="flex flex-col flex-1 pr-10">
        <Napbar />
        <div className="flex items-center justify-center flex-1">
          <div>ANJAY</div>
        </div>
      </div>
    </section>
  );
};

export default Beranda;
