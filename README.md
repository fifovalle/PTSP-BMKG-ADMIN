# Selamat Datang di **"PTSP BMKG ADMIN"** 🌐

Jelajahi karya terbaru kami dalam mengembangkan sistem administrasi berbasis aplikasi web. Dari pengelolaan data hingga pembuatan laporan PDF, temukan berbagai fitur unggulan yang kami tawarkan.

---

## 🚧 **Status Proyek**

- **Status:** Selesai
- **Tanggal Rilis Diharapkan:** Desember 2024

---

## 🚀 **Fitur Utama**

### **1. CRUD Informasi Jasa**

- **Backend:** Menggunakan Firestore untuk penyimpanan dan pengelolaan data jasa.
- **API:**
  - `POST /services` untuk menambahkan informasi jasa baru.
  - `GET /services` untuk mengambil daftar informasi jasa.
  - `PUT /services/{serviceId}` untuk memperbarui informasi jasa.
  - `DELETE /services/{serviceId}` untuk menghapus informasi jasa.

### **2. Checkout**

- **Backend:** Mendukung proses checkout untuk layanan.
- **API:**
  - `POST /checkout` untuk memproses pesanan layanan.

### **3. Cek Pengajuan**

- **Backend:** Mengelola data pengajuan layanan oleh pengguna.
- **API:**
  - `GET /submissions` untuk mengambil daftar pengajuan.
  - `PUT /submissions/{submissionId}` untuk memperbarui status pengajuan.

### **4. Cek Bukti Pembayaran**

- **Backend:** Memvalidasi dan menyimpan bukti pembayaran pengguna.
- **API:**
  - `POST /payments` untuk mengunggah bukti pembayaran.
  - `GET /payments/{paymentId}` untuk memeriksa detail pembayaran.

### **5. Kirim File Penerimaan**

- **Backend:** Mengelola dokumen penerimaan layanan.
- **API:**
  - `POST /receipts` untuk mengirim file penerimaan.
  - `GET /receipts/{receiptId}` untuk mengunduh dokumen penerimaan.

### **6. Cek IKM (Indeks Kepuasan Masyarakat)**

- **Backend:** Menyediakan data terkait kepuasan masyarakat.
- **API:**
  - `GET /ikm` untuk mengambil data indeks kepuasan masyarakat.
  - `POST /ikm` untuk mencatat feedback pengguna.

### **7. Laporan ke PDF**

- **Backend:** Menggunakan jsPDF untuk menghasilkan laporan dalam format PDF.
- **API:**
  - `GET /reports` untuk menghasilkan laporan PDF berdasarkan data layanan, pengajuan, atau kepuasan masyarakat.

---

## 🛠️ **Teknologi yang Digunakan**

- **Bahasa Pemrograman:** JavaScript
- **Alat Pengembangan:** Visual Studio Code, Git
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Firebase (Authentication, Firestore)
- **Database:** Firestore untuk menyimpan data pengguna, jasa, pengajuan, dan lainnya
- **Pembuatan Laporan:** jsPDF

---

## 📷 Preview Halaman

Berikut adalah beberapa tampilan halaman PTSP BMKG Admin:

![proyek90](https://github.com/user-attachments/assets/0de40d37-5a61-4b5e-b267-c38ae6c4449c)

---

## 📬 **Kontak**

Ingin berkolaborasi atau berdiskusi? Jangan ragu untuk menghubungi kami:

- **Email:** [fifanaufal10@gmail.com](mailto:fifanaufal10@gmail.com)
- **WhatsApp:** [Klik di sini](https://wa.me/+6282318334287)

---

## 👨‍💻 **Cara Menjalankan Proyek**

1. Clone repositori ini ke direktori web server Anda:

   ```bash
   git clone https://github.com/fifovalle/PTSP-BMKG-ADMIN.git
   ```

2. Jalankan instalasi dependensi:

   ```bash
   cd PTSP-BMKG-ADMIN
   npm install
   ```

3. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

4. Akses aplikasi melalui browser di `http://localhost:3000`.

---

<div align="center">
  &copy; 2024 [Naufal FIFA]
</div>
