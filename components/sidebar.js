"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  CircleStackIcon,
  InformationCircleIcon,
  UserGroupIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarSquareIcon,
  UserIcon,
  HomeIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Sidebar({ pengarah }) {
  const [bukaDropdown, setBukaDropdown] = useState(0);
  const [bukaDropdown2, setBukaDropdown2] = useState(0);
  const [bukaDropdown3, setBukaDropdown3] = useState(0);
  const [lokasiSaatIni, setLokasiSaatIni] = useState("");

  useEffect(() => {
    setLokasiSaatIni(window.location.pathname);
  }, []);

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-2">
        <Typography variant="h3" color="blue-gray">
          PTSP BMKG
        </Typography>
      </div>
      <hr className="border border-gray-300 w-72 self-center" />

      <List>
        <ListItem
          onClick={() => pengarah.push("/beranda")}
          className={
            lokasiSaatIni === "/beranda" ? "bg-[#0F67B1] text-white" : ""
          }
        >
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Beranda
        </ListItem>

        <ListItem className="cursor-default hover:bg-transparent hover:text-inherit pointer-events-none">
          Data
          <ListItemSuffix>
            <Chip
              value="1"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>

        <Accordion
          open={
            bukaDropdown === 1 ||
            lokasiSaatIni === "/dataAdmin" ||
            lokasiSaatIni === "/dataPengguna" ||
            lokasiSaatIni === "/dataPerusahaan"
          }
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                bukaDropdown === 1 ||
                lokasiSaatIni === "/dataAdmin" ||
                lokasiSaatIni === "/dataPengguna" ||
                lokasiSaatIni === "/dataPerusahaan"
                  ? "rotate-180"
                  : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={bukaDropdown === 1}>
            <AccordionHeader
              onClick={() => setBukaDropdown(bukaDropdown === 1 ? 0 : 1)}
              className="p-3 border-none"
            >
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Partisipan
              </Typography>
            </AccordionHeader>
          </ListItem>

          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => pengarah.push("/dataAdmin")}
                className={
                  lokasiSaatIni === "/dataAdmin"
                    ? "bg-[#0F67B1] text-white"
                    : ""
                }
              >
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Admin
              </ListItem>
              <ListItem
                onClick={() => pengarah.push("/dataPengguna")}
                className={
                  lokasiSaatIni === "/dataPengguna"
                    ? "bg-[#0F67B1] text-white"
                    : ""
                }
              >
                <ListItemPrefix>
                  <UserIcon className="h-5 w-5" />
                </ListItemPrefix>
                Pengguna
              </ListItem>
              <ListItem
                onClick={() => pengarah.push("/dataPerusahaan")}
                className={`${
                  lokasiSaatIni === "/dataPerusahaan"
                    ? "bg-[#0F67B1] text-white"
                    : ""
                }`}
              >
                <ListItemPrefix>
                  <BuildingOffice2Icon className="h-5 w-5" />
                </ListItemPrefix>
                Perusahaan
              </ListItem>
              <hr className="border border-gray-400 w-64 self-center" />
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={
            bukaDropdown2 === 2 ||
            lokasiSaatIni === "/dataInformasi" ||
            lokasiSaatIni === "/dataJasa"
          }
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                bukaDropdown2 === 2 ||
                lokasiSaatIni === "/dataInformasi" ||
                lokasiSaatIni === "/dataJasa"
                  ? "rotate-180"
                  : ""
              }`}
            />
          }
        >
          <ListItem className="p-0">
            <AccordionHeader
              onClick={() => setBukaDropdown2(bukaDropdown2 === 2 ? 0 : 2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Produk
              </Typography>
            </AccordionHeader>
          </ListItem>

          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => pengarah.push("/dataInformasi")}
                className={
                  lokasiSaatIni === "/dataInformasi"
                    ? "bg-[#0F67B1] text-white"
                    : ""
                }
              >
                <ListItemPrefix>
                  <InformationCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Informasi
              </ListItem>
              <ListItem
                onClick={() => pengarah.push("/dataJasa")}
                className={`${
                  lokasiSaatIni === "/dataJasa" ? "bg-[#0F67B1] text-white" : ""
                } `}
              >
                <ListItemPrefix>
                  <CircleStackIcon className="h-5 w-5" />
                </ListItemPrefix>
                Jasa
              </ListItem>
              <hr className="border border-gray-400 w-64 self-center" />
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem
          onClick={() => pengarah.push("/dataIKM")}
          className={
            lokasiSaatIni === "/dataIKM" ? "bg-[#0F67B1] text-white" : ""
          }
        >
          <ListItemPrefix>
            <ChartBarSquareIcon className="h-5 w-5" />
          </ListItemPrefix>
          IKM
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataPengajuan")}
          className={
            lokasiSaatIni === "/dataPengajuan" ? "bg-[#0F67B1] text-white" : ""
          }
        >
          <ListItemPrefix>
            <DocumentTextIcon className="h-5 w-5" />
          </ListItemPrefix>
          Pengajuan
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataTransaksi")}
          className={
            lokasiSaatIni === "/dataTransaksi" ? "bg-[#0F67B1] text-white" : ""
          }
        >
          <ListItemPrefix>
            <CreditCardIcon className="h-5 w-5" />
          </ListItemPrefix>
          Transaksi
        </ListItem>
        <hr className="border border-gray-400 w-64 self-center mt-1" />

        <Accordion
          open={
            bukaDropdown3 === 3 ||
            lokasiSaatIni === "/profilSaya" ||
            lokasiSaatIni === "/Keluar"
          }
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                bukaDropdown3 === 3 ||
                lokasiSaatIni === "/profilSaya" ||
                lokasiSaatIni === "/Keluar"
                  ? "rotate-180"
                  : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={bukaDropdown3 === 3}>
            <AccordionHeader
              onClick={() => setBukaDropdown3(bukaDropdown3 === 3 ? 0 : 3)}
              className="p-3 border-none"
            >
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Pengaturan
              </Typography>
            </AccordionHeader>
          </ListItem>

          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => pengarah.push("/profilSaya")}
                className={
                  lokasiSaatIni === "/profilSaya"
                    ? "bg-[#0F67B1] text-white"
                    : ""
                }
              >
                <ListItemPrefix>
                  <UserIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profil Saya
              </ListItem>
              <ListItem
                onClick={() => pengarah.push("/Keluar")}
                className={
                  lokasiSaatIni === "/Keluar" ? "bg-[#0F67B1] text-white" : ""
                }
              >
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Keluar
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>

      <div className="relative mt-20 mx-auto cursor-pointer">
        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <div className="absolute translate-x-[190%] translate-y-[170%] ">
            <div className="bg-green-500 w-3 h-3 rounded-full"></div>
          </div>
        </div>
        <div className="text-center font-bold">Nama Admin</div>
        <div className="text-center">Peran Admin</div>
      </div>
    </Card>
  );
}

export default Sidebar;
