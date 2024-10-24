export const formatRupiah = (angka) => {
  const formatAngka = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatAngka.format(angka);
};
