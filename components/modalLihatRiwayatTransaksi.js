import React from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AiOutlineDownload } from "react-icons/ai";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";
// PENGAIT KAMI
import useTampilkanRiwayatTransaksi from "@/hooks/backend/useTampilkanRiwayatTransaksi";
// KONSTANTA KAMI
import { formatTanggal } from "@/constants/formatTanggal";
import { formatRupiah } from "@/constants/formatRupiah";

const judulTabel = ["Pembeli", "NIK & Koresponden", "Tanggal Ajukan", ""];
const judulTabel2 = ["Pembeli", "Bukti Pembayaran", ""];
const judulTabel3 = ["Pembeli", "Surat Penerimaan", ""];
const judulTabel4 = [
  "Pembeli",
  "Produk",
  "Nama Instansi",
  "Kuantitas",
  "Harga",
  "Total",
  "",
];

const ModalLihatRiwayatTransaksi = ({
  terbuka,
  tertutup,
  riyawatTransaksiYangDipilih,
}) => {
  const gambarBawaan = require("@/assets/images/profil.jpg");

  const { daftarTransaksi } = useTampilkanRiwayatTransaksi();

  const transaksiTerpilih = daftarTransaksi.find(
    (transaksi) => transaksi.id === riyawatTransaksiYangDipilih
  );

  const filesToDownload = Array.isArray(transaksiTerpilih?.ajukan?.File_Ajukan)
    ? transaksiTerpilih.ajukan.File_Ajukan
    : [transaksiTerpilih?.ajukan?.File_Ajukan].filter(Boolean);

  const downloadZip = async () => {
    const zip = new JSZip();

    for (let i = 0; i < filesToDownload.length; i++) {
      const filePath = filesToDownload[i];
      const fileRef = ref(storage, filePath);

      try {
        const fileUrl = await getDownloadURL(fileRef);

        const response = await fetch(fileUrl);

        const blob = await response.blob();

        let fileName = filePath.split("/").pop();

        fileName = fileName.split("?")[0];

        const mimeType = blob.type;
        if (mimeType === "application/pdf") {
          fileName = fileName.endsWith(".pdf") ? fileName : fileName + ".pdf";
        } else if (
          mimeType === "application/msword" ||
          mimeType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          fileName = fileName.endsWith(".docx") ? fileName : fileName + ".docx";
        }

        zip.file(fileName, blob);
        console.log("File ditambahkan ke ZIP:", fileName);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil file:", error);
      }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      console.log("ZIP siap untuk diunduh:", content);
      saveAs(content, `Pengajuan Transaksi ${transaksiTerpilih.id}.zip`);
    });
  };

  const unduhSemuaBukti = async (buktiPembayaran = []) => {
    if (!buktiPembayaran || buktiPembayaran.length === 0) {
      alert("Tidak ada bukti pembayaran untuk diunduh.");
      return;
    }

    const zip = new JSZip();

    try {
      for (const [index, url] of buktiPembayaran.entries()) {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = `bukti_pembayaran_${index + 1}.jpg`;
        zip.file(fileName, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "bukti_pembayaran.zip");
    } catch (error) {
      console.error("Gagal mengunduh bukti pembayaran:", error);
      alert("Terjadi kesalahan saat mengunduh bukti pembayaran.");
    }
  };

  const unduhSemuaPenerimaan = async (filePenerimaan) => {
    const daftarFile = Array.isArray(filePenerimaan)
      ? filePenerimaan
      : filePenerimaan
      ? [filePenerimaan]
      : [];

    if (daftarFile.length === 0) {
      alert("Tidak ada file penerimaan untuk diunduh.");
      return;
    }

    const zip = new JSZip();

    try {
      for (const [index, url] of daftarFile.entries()) {
        const response = await fetch(url);

        if (!response.ok) {
          console.warn(`Gagal mengunduh file dari URL: ${url}`);
          continue;
        }

        const blob = await response.blob();
        const contentType = blob.type;

        const ekstensi = (() => {
          switch (contentType) {
            case "application/pdf":
              return "pdf";
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              return "docx";
            default:
              return "bin";
          }
        })();

        const fileName = `file_penerimaan_${index + 1}.${ekstensi}`;
        zip.file(fileName, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "file_penerimaan.zip");
    } catch (error) {
      console.error("Gagal mengunduh file penerimaan:", error);
      alert("Terjadi kesalahan saat mengunduh file penerimaan.");
    }
  };

  const unduhFaktur = async (dataKeranjang = [], pemesanan, userData) => {
    if (!dataKeranjang || dataKeranjang.length === 0) {
      alert("Tidak ada data faktur untuk diunduh.");
      return;
    }

    const doc = new jsPDF();

    const imageUrl = "/faktur.jpg";
    const imageWidth = 840;
    const imageHeight = 150;
    const offsetX = 0;
    const offsetY = 0;

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64data = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    doc.addImage(
      base64data,
      "JPEG",
      offsetX,
      offsetY,
      imageWidth / 4,
      imageHeight / 4
    );

    const imageEndY = offsetY + imageHeight / 4;

    const gap = 2;
    const lineY = imageEndY + gap;

    doc.setLineWidth(0.5);

    const tanggal = new Date().toLocaleDateString("id-ID");

    const textStartY = lineY + 10;
    doc.setLineWidth(0.5);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nomor Invoice: ${pemesanan.id}`, 14, textStartY);
    doc.text(`Tanggal: ${tanggal}`, 14, textStartY + 6);
    doc.text(
      `Status Pembayaran: ${pemesanan.Status_Pembayaran || "Belum Dibayar"}`,
      14,
      textStartY + 12
    );

    doc.text("Detail Pelanggan:", 14, textStartY + 22);
    doc.setFont("helvetica", "italic");
    doc.text(
      `Nama: ${userData.Nama_Lengkap || "Tidak diketahui"}`,
      14,
      textStartY + 28
    );
    doc.text(
      `Email: ${userData.Email || "Tidak diketahui"}`,
      14,
      textStartY + 34
    );
    doc.text(
      `Alamat: ${userData.Alamat || "Tidak tersedia"}`,
      14,
      textStartY + 40
    );
    doc.setFont("helvetica", "normal");

    const gapBeforeTable = 10;

    const tableHeaders = [
      [
        "No",
        "Nama Produk",
        "Pemilik",
        "Kuantitas",
        "Harga Satuan",
        "Total Harga",
      ],
    ];
    const tableData = dataKeranjang.map((item, index) => [
      index + 1,
      item.Nama || "Nama tidak tersedia",
      item.Pemilik || "Pemilik tidak diketahui",
      `${item.Kuantitas}x`,
      formatRupiah(item.Harga),
      formatRupiah(item.Harga * item.Kuantitas),
    ]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 100,
      styles: {
        fontSize: 10,
        cellPadding: 5,
        lineWidth: 0.3,
        lineColor: [41, 128, 185],
        font: "helvetica",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "left" },
        2: { halign: "left" },
        3: { halign: "center" },
        4: { halign: "right" },
        5: { halign: "right" },
      },
    });

    // Total Harga
    const totalHarga = dataKeranjang.reduce(
      (total, item) => total + item.Harga * item.Kuantitas,
      0
    );
    const akhirY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Pesanan: ${formatRupiah(totalHarga)}`, 14, akhirY);

    // Catatan
    doc.setFontSize(10);
    doc.text(
      "Catatan: Harap simpan invoice ini untuk referensi.",
      14,
      akhirY + 10
    );

    doc.line(14, akhirY + 18, 196, akhirY + 18);

    // Pesan Penutup
    doc.setFontSize(10);
    doc.setTextColor(41, 128, 185);
    doc.text("Terima kasih atas pembelian Anda!", 14, akhirY + 30);

    // Kontak
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Hubungi kami di: +62 123 456 7890 atau email@company.com",
      14,
      akhirY + 40
    );
    doc.text(
      "Alamat Perusahaan: Jl. Raya No. 123, Jakarta, Indonesia",
      14,
      akhirY + 45
    );

    doc.save(`faktur_${tanggal.replace(/\//g, "-")}.pdf`);
  };

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xl"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4 rounded-lg shadow-2xl"
    >
      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="red"
          onClick={() => tertutup(false)}
          className="text-red-500 hover:bg-red-100 transition duration-200 rounded-full"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black font-bold text-xl border-b border-gray-200">
        Riwayat Transaksi
      </DialogHeader>
      <DialogBody divider className="p-6 space-y-4 overflow-auto max-h-[80vh]">
        <Typography className="text-black font-bold text-lg">
          Pengajuan
        </Typography>

        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {judulTabel.map((konten) => (
                <th
                  key={konten}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {konten}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transaksiTerpilih ? (
              <>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={transaksiTerpilih.pengguna?.Foto || gambarBawaan}
                        alt={
                          transaksiTerpilih.pengguna?.Nama_Lengkap ||
                          "Tidak ada nama"
                        }
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {transaksiTerpilih.pengguna?.Nama_Lengkap ||
                            "Tidak ada nama"}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {transaksiTerpilih.pengguna?.Email ||
                            "Tidak ada email"}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {transaksiTerpilih.pengguna?.NPWP || "Tidak ada NPWP"}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {transaksiTerpilih.ajukan?.Nama_Ajukan ||
                        "Tidak ada nama ajukan"}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatTanggal(
                        transaksiTerpilih.ajukan?.Tanggal_Pembuatan_Ajukan
                      ) || "Tidak ada tanggal ajukan"}
                    </Typography>
                  </td>

                  <td className="p-4 text-end">
                    <Tooltip content="Unduh Pengajuan">
                      <IconButton
                        variant="outlined"
                        color="green"
                        onClick={downloadZip}
                      >
                        <AiOutlineDownload className="h-4 w-4 text-green-800" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={judulTabel.length} className="text-center py-4">
                  Tidak ada data pengajuan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Typography className="text-black font-bold text-lg">
          Bukti Pembayaran
        </Typography>

        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {judulTabel2.map((konten) => (
                <th
                  key={konten}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {konten}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transaksiTerpilih ? (
              <>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={transaksiTerpilih.pengguna?.Foto || gambarBawaan}
                        alt={
                          transaksiTerpilih.pengguna?.Nama_Lengkap ||
                          "Tidak ada nama"
                        }
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {transaksiTerpilih.pengguna?.Nama_Lengkap ||
                            "Tidak ada nama"}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {transaksiTerpilih.pengguna?.Email ||
                            "Tidak ada email"}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {transaksiTerpilih.transaksi?.Bukti_Pembayaran.map(
                      (bukti, indeks) => (
                        <div key={indeks} className="flex items-center gap-3">
                          <Image
                            src={bukti || gambarBawaan}
                            alt={"Tidak ada nama"}
                            className="cursor-pointer m-5 hover:scale-105 duration-300"
                            onClick={() => window.open(bukti, "_blank")}
                            width={100}
                            height={100}
                          />
                        </div>
                      )
                    )}
                  </td>

                  <td className="p-4 text-end">
                    <Tooltip content="Unduh Bukti Pembayaran">
                      <IconButton
                        variant="outlined"
                        color="green"
                        onClick={() =>
                          unduhSemuaBukti(
                            transaksiTerpilih.transaksi?.Bukti_Pembayaran
                          )
                        }
                      >
                        <AiOutlineDownload className="h-4 w-4 text-green-800" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={judulTabel.length} className="text-center py-4">
                  Tidak ada data pengajuan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Typography className="text-black font-bold text-lg">
          Surat Penerimaan
        </Typography>

        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {judulTabel3.map((konten) => (
                <th
                  key={konten}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {konten}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transaksiTerpilih ? (
              <>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={transaksiTerpilih.pengguna?.Foto || gambarBawaan}
                        alt={
                          transaksiTerpilih.pengguna?.Nama_Lengkap ||
                          "Tidak ada nama"
                        }
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {transaksiTerpilih.pengguna?.Nama_Lengkap ||
                            "Tidak ada nama"}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {transaksiTerpilih.pengguna?.Email ||
                            "Tidak ada email"}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {(Array.isArray(transaksiTerpilih.penerimaan?.File)
                      ? transaksiTerpilih.penerimaan?.File
                      : [transaksiTerpilih.penerimaan?.File || gambarBawaan]
                    ).map((penerimaan, indeks) => (
                      <div key={indeks} className="flex items-center gap-3">
                        <embed
                          onClick={() => window.open(penerimaan, "_blank")}
                          className="cursor-pointer m-5 hover:scale-105 duration-300"
                          src={penerimaan || gambarBawaan}
                        />
                      </div>
                    ))}
                  </td>

                  <td className="p-4 text-end">
                    <Tooltip content="Unduh File Penerimaan">
                      <IconButton
                        variant="outlined"
                        color="green"
                        onClick={() =>
                          unduhSemuaPenerimaan(
                            transaksiTerpilih.penerimaan?.File
                          )
                        }
                      >
                        <AiOutlineDownload className="h-4 w-4 text-green-800" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={judulTabel.length} className="text-center py-4">
                  Tidak ada data pengajuan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Typography className="text-black font-bold text-lg">Faktur</Typography>

        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {judulTabel4.map((konten) => (
                <th
                  key={konten}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {konten}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transaksiTerpilih ? (
              <>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={transaksiTerpilih.pengguna?.Foto || gambarBawaan}
                        alt={
                          transaksiTerpilih.pengguna?.Nama_Lengkap ||
                          "Tidak ada nama"
                        }
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {transaksiTerpilih.pengguna?.Nama_Lengkap ||
                            "Tidak ada nama"}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {transaksiTerpilih.pengguna?.Email ||
                            "Tidak ada email"}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {transaksiTerpilih.Data_Keranjang?.length > 0 ? (
                      transaksiTerpilih.Data_Keranjang.map((item, idx) => (
                        <div key={idx} className="flex flex-col mb-2">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.Nama || "Nama produk tidak tersedia"}
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Produk tidak tersedia
                      </Typography>
                    )}
                  </td>

                  <td className="p-4">
                    {transaksiTerpilih.Data_Keranjang?.length > 0 ? (
                      transaksiTerpilih.Data_Keranjang.map((item, idx) => (
                        <div key={idx} className="flex flex-col mb-2">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.Pemilik}
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Pemilik produk tidak tersedia
                      </Typography>
                    )}
                  </td>

                  <td className="p-4">
                    {transaksiTerpilih.Data_Keranjang?.length > 0 ? (
                      transaksiTerpilih.Data_Keranjang.map((item, idx) => (
                        <div key={idx} className="flex flex-col mb-2">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.Kuantitas} x
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Kuantitas produk tidak tersedia
                      </Typography>
                    )}
                  </td>

                  <td className="p-4">
                    {transaksiTerpilih.Data_Keranjang?.length > 0 ? (
                      transaksiTerpilih.Data_Keranjang.map((item, idx) => (
                        <div key={idx} className="flex flex-col mb-2">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatRupiah(item.Harga)}
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Harga produk tidak tersedia
                      </Typography>
                    )}
                  </td>

                  <td className="p-4">
                    {transaksiTerpilih.Data_Keranjang?.length > 0 ? (
                      transaksiTerpilih.Data_Keranjang.map((item, idx) => (
                        <div key={idx} className="flex flex-col mb-2">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatRupiah(item.Harga * item.Kuantitas)}
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Total produk tidak tersedia
                      </Typography>
                    )}
                  </td>

                  <td className="p-4 text-end">
                    <Tooltip content="Unduh Faktur">
                      <IconButton
                        variant="outlined"
                        color="green"
                        onClick={() =>
                          unduhFaktur(
                            transaksiTerpilih.Data_Keranjang,
                            transaksiTerpilih,
                            transaksiTerpilih.pengguna
                          )
                        }
                      >
                        <AiOutlineDownload className="h-4 w-4 text-green-800" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={judulTabel.length} className="text-center py-4">
                  Tidak ada data pengajuan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </DialogBody>
    </Dialog>
  );
};

export default ModalLihatRiwayatTransaksi;
