"use client";
import React from "react";
import { useRouter } from "next/navigation";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Napbar from "@/components/navbar";

const DataAdmin = () => {
  const pengarah = useRouter();

  return (
    <section className="p-4 flex h-screen bg-[#eff0f3]">
      <Sidebar pengarah={pengarah} />
      <div className="flex flex-col flex-1 pr-10">
        <Napbar />
        <div className="flex items-center justify-center flex-1">
          <div>ANJAY</div>
        </div>
      </div>
    </section>
  );
};

export default DataAdmin;
