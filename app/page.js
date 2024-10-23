"use client";
import { useRouter } from "next/navigation";

export default function Masuk() {
  const pengarah = useRouter();

  return (
    <button onClick={() => pengarah.push("beranda")}>Klik Ke Beranda</button>
  );
}
