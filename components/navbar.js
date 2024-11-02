import React, { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
// KOMPONEN KAMI
import ModalTambahAdmin from "@/components/modalTambahAdmin";
import ModalTambahInformasi from "@/components/modalTambahInformasi";
import ModalTambahJasa from "@/components/modalTambahJasa";
import useTampilkanDataPerTahun from "@/hooks/backend/useTampilkanDataPerTahun";

function Napbar({ tahunDipilih, setTahunDipilih }) {
  const [masukan, setMasukan] = useState("");
  const [bukaData, setBukaData] = useState(false);
  const [bukaTahun, setBukaTahun] = useState(false);
  const [bukaModalTambahAdmin, setBukaModalTambahAdmin] = useState(false);
  const [bukaModalTambahInformasi, setBukaModalTambahInformasi] =
    useState(false);
  const [bukaModalTambahJasa, setBukaModalTambahJasa] = useState(false);
  const dataBulanTahun = useTampilkanDataPerTahun();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth >= 960) {
          setBukaTahun(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <Navbar className="max-w-screen-2xl bg-white shadow-md">
      <div className="flex justify-between text-blue-gray-900">
        <div className="items-center gap-x-2 lg:flex w-full">
          <div className="relative flex gap-2 md:w-max">
            <input
              type="search"
              placeholder="Silahkan Cari..."
              value={masukan}
              onChange={(e) => setMasukan(e.target.value)}
              className={`min-w-[288px] border border-gray-400 p-2 px-4 text-black placeholder-gray-500 rounded-full ${
                masukan ? "text-black" : "text-gray-500"
              }`}
            />
            {masukan === "" && (
              <div className="absolute right-3 top-[10px]">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-black"
                  strokeWidth={3}
                />
              </div>
            )}
          </div>

          <div className="w-full flex justify-between">
            <Menu open={bukaTahun} handler={setBukaTahun}>
              <MenuHandler>
                <Button
                  size="sm"
                  className="hidden items-center gap-2 lg:flex focus:ring-0 bg-[#0F67B1]"
                >
                  <p className="text-white mx-auto">{tahunDipilih}</p>
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform text-white ${
                      bukaTahun ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="hidden max-h-72 w-52 lg:block">
                {dataBulanTahun.map((data, indeks) => (
                  <MenuItem
                    key={indeks}
                    className="flex gap-2"
                    onClick={() => setTahunDipilih(data)}
                  >
                    {data}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Menu open={bukaData} handler={setBukaData}>
              <MenuHandler>
                <Button
                  size="sm"
                  className="hidden items-center gap-2 lg:flex focus:ring-0 bg-[#0F67B1]"
                >
                  <p>Tambah Data</p>
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${
                      bukaData ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="hidden max-h-72 w-20 lg:block">
                <MenuItem
                  onClick={() => setBukaModalTambahAdmin(true)}
                  className="flex items-center gap-2"
                >
                  Tambah Admin
                </MenuItem>

                <MenuItem
                  onClick={() => setBukaModalTambahInformasi(true)}
                  className="flex items-center gap-2"
                >
                  Tambah Informasi
                </MenuItem>

                <MenuItem
                  onClick={() => setBukaModalTambahJasa(true)}
                  className="flex items-center gap-2"
                >
                  Tambah Jasa
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      <ModalTambahAdmin
        terbuka={bukaModalTambahAdmin}
        tertutup={setBukaModalTambahAdmin}
      />

      <ModalTambahInformasi
        terbuka={bukaModalTambahInformasi}
        tertutup={setBukaModalTambahInformasi}
      />

      <ModalTambahJasa
        terbuka={bukaModalTambahJasa}
        tertutup={setBukaModalTambahJasa}
      />
    </Navbar>
  );
}

export default Napbar;
