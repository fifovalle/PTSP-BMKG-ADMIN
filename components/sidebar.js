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
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Sidebar({ pengarah }) {
  const [bukaDropdown, setBukaDropdown] = useState(0);
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
      <hr className="border border-gray-400" />

      <List>
        <ListItem
          onClick={() => pengarah.push("/beranda")}
          className={lokasiSaatIni === "/beranda" ? "bg-blue-200" : ""}
        >
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Beranda
        </ListItem>

        <ListItem className="cursor-default">
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
          open={bukaDropdown === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                bukaDropdown === 1 ? "rotate-180" : ""
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
                className={lokasiSaatIni === "/dataAdmin" ? "bg-blue-200" : ""}
              >
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Admin
              </ListItem>
              <ListItem
                className={lokasiSaatIni === "/pengguna" ? "bg-blue-200" : ""}
              >
                <ListItemPrefix>
                  <UserIcon className="h-5 w-5" />
                </ListItemPrefix>
                Pengguna
              </ListItem>
              <ListItem
                className={`${
                  lokasiSaatIni === "/perusahaan" ? "bg-blue-200" : ""
                } border-b-2 border-gray-400`}
              >
                <ListItemPrefix>
                  <BuildingOffice2Icon className="h-5 w-5" />
                </ListItemPrefix>
                Perusahaan
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={bukaDropdown === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                bukaDropdown === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={bukaDropdown === 2}>
            <AccordionHeader
              onClick={() => setBukaDropdown(bukaDropdown === 2 ? 0 : 2)}
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
                className={lokasiSaatIni === "/informasi" ? "bg-blue-200" : ""}
              >
                <ListItemPrefix>
                  <InformationCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Informasi
              </ListItem>
              <ListItem
                className={`${
                  lokasiSaatIni === "/jasa" ? "bg-blue-200" : ""
                } border-b-2 border-gray-400`}
              >
                <ListItemPrefix>
                  <CircleStackIcon className="h-5 w-5" />
                </ListItemPrefix>
                Jasa
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem className={lokasiSaatIni === "/ikm" ? "bg-blue-200" : ""}>
          <ListItemPrefix>
            <ChartBarSquareIcon className="h-5 w-5" />
          </ListItemPrefix>
          IKM
        </ListItem>

        <ListItem
          className={lokasiSaatIni === "/pengajuan" ? "bg-blue-200" : ""}
        >
          <ListItemPrefix>
            <DocumentTextIcon className="h-5 w-5" />
          </ListItemPrefix>
          Pengajuan
        </ListItem>

        <ListItem
          className={lokasiSaatIni === "/transaksi" ? "bg-blue-200" : ""}
        >
          <ListItemPrefix>
            <CreditCardIcon className="h-5 w-5" />
          </ListItemPrefix>
          Transaksi
        </ListItem>
      </List>

      <div className="mt-auto mx-auto cursor-pointer">
        <img
          src="https://via.placeholder.com/150"
          alt="Foto Admin"
          className="w-16 h-16 rounded-full mx-auto mb-2"
        />
        <div className="text-center">Admin</div>
        <div className="text-center">Peran Admin</div>
      </div>
    </Card>
  );
}

export default Sidebar;
