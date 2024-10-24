import { Timestamp } from "firebase/firestore";

export const formatTanggal = (timestamp) => {
  if (!(timestamp instanceof Timestamp)) {
    throw new Error("Parameter harus berupa objek Timestamp dari Firestore");
  }

  const tanggal = new Date(timestamp.toMillis());
  const pilihan = { day: "numeric", month: "long", year: "numeric" };
  return tanggal.toLocaleDateString("id-ID", pilihan);
};
