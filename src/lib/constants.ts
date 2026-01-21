// src/lib/constants.ts

export const APP_NAME = "Pajak!Koe";
export const PHONE_NUMBER = "085797946263";
export const WA_PHONE_NUMBER = "6285797946263";
export const PACKAGES = [
  {
    id: "pribadi",
    name: "Penerbitan NPWP Pribadi",
    target: "Via Coretax",
    price: "95.000",
    unit: "/berkas",
    features: [
      "Kartu Digital Coretax",
      "Surat Keterangan Terdaftar",
      "Aktivasi Aplikasi Coretax",
      "Email Gratis (Opsi)",
      "Passphrase Setting",
    ],
    cta: "Paket NPWP 95rb",
    popular: true,
    borderColor: "border-brand-blue",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-brand-blue",
  },
  {
    id: "badan",
    name: "Penerbitan NPWP Badan Usaha",
    target: "Via Coretax",
    price: "145.000",
    unit: "/berkas",
    features: [
      "Kartu Digital Coretax",
      "Surat Keterangan Terdaftar",
      "Aktivasi Aplikasi Coretax",
      "Email Gratis (Opsi)",
      "Passphrase Setting",
    ],
    cta: "Paket NPWP 145rb",
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-slate-800",
  },
];
export const PACKAGES_SPT = [
  {
    id: "spt_pribadi_bulanan",
    name: "SPT Pribadi Bulanan",
    target: "Wajib Pajak Orang Pribadi",
    price: "150.000",
    unit: "/berkas",
    features: [
      "Lapor PPh 21/25",
      "Hitung Setoran",
      "Bukti Lapor Resmi",
      "Reminder Jadwal",
    ],
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "bg-[#2c4f40]",
    cta: "SPT Pribadi Bulanan",
  },
  {
    id: "spt_pribadi_tahunan",
    name: "SPT Pribadi Tahunan",
    target: "Wajib Pajak Orang Pribadi",
    price: "100.000",
    unit: "/berkas",
    features: [
      "Lapor SPT 1770/1770S/SS",
      "Bukti Lapor Resmi",
      "Hitung Akurat",
      "Konsultasi",
    ],
    popular: true,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-slate-800",
    cta: "SPT Pribadi Tahunan",
  },
  {
    id: "spt_badan_bulanan",
    name: "SPT Badan Bulanan",
    target: "CV, PT, Yayasan",
    price: "1.100.000",
    unit: "/berkas",
    features: [
      "Lapor PPh 21/25/23/Final",
      "Lapor PPN (Jika PKP)",
      "Bukti Lapor Resmi",
      "Rekapitulasi",
    ],
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-slate-800",
    cta: "SPT Badan Bulanan",
  },
  {
    id: "spt_badan_tahunan",
    name: "SPT Badan Tahunan",
    target: "CV, PT, Yayasan",
    price: "2.100.000",
    unit: "/berkas",
    features: [
      "Lapor SPT 1771",
      "Lampiran Lap. Keuangan",
      "Bukti Lapor Resmi",
      "Analisa Fiskal",
    ],
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-slate-800",
    cta: "SPT Badan Tahunan",
  },
];
export const PACKAGES_PKP = [
  {
    id: "pribadi",
    name: "PKP Pribadi",
    target: "Layanan pengukuhan PKP untuk Wajib Pajak Orang Pribadi.",
    price: "1.000.000",
    price2: "8.100.000",
    unit: "/berkas jawa",
    unit2: "/luar pulau jawa",
    features: [
      "Pembuatan Permohonan, Denah & Pernyataan",
      "Aktivasi Coretax (Update Terbaru)",
      "Penjadwalan Survey Lokasi Kantor",
      "Proses Cepat & Administrasi Rapi",
    ],
    cta: "paket pkp wajib",
    popular: true,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-slate-800",
  },
  {
    id: "badan",
    name: "PKP Badan Usaha",
    target: "Solusi lengkap pengukuhan PKP untuk Perusahaan (PT/CV).",
    price: "1.500.000",
    price2: "1.800.000",
    unit: "/berkas jawa",
    unit2: "/luar pulau jawa",
    features: [
      "Pembuatan Permohonan, Denah & Pernyataan",
      "Aktivasi Coretax (Update Terbaru)",
      "Penjadwalan Survey Lokasi Kantor",
      "Pendampingan Hingga Terbit SPPKP",
    ],
    cta: "paket pkp badan",
    popular: false,
    borderColor: "border-brand-blue",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-brand-blue",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rina",
    role: "Pelamar Kerja",
    content:
      '"Beneran gak nyangka 30 menit beres. Mana bayarnya belakangan lagi pas kartu digitalnya udah dikirim. Aman banget rasanya."',
  },
  {
    name: "Sarah",
    role: "Content Creator",
    content:
      '"Suka banget karena gak perlu kirim foto KTP utuh, jadi ngerasa privacy terjaga. Adminnya gercep, sambil rebahan tau-tau jadi."',
  },
  {
    name: "Budi",
    role: "Pemilik Coffee Shop",
    content:
      '"Urus NPWP PT Perorangan di sini praktis. Gak perlu ke kantor pajak, semua via WA. Recommended buat UMKM."',
  },
];

export const FAQS = [
  {
    question: "Apakah benar tanpa DP?",
    answer:
      "Ya, benar. Kami memproses dokumen Anda terlebih dahulu. Setelah dokumen terbit dan Anda cek validitasnya, baru Anda melakukan pembayaran.",
  },
  {
    question: "Apa itu Pemulihan Akun Coretax?",
    answer:
      "Layanan untuk memulihkan akses akun pajak Anda di sistem Coretax terbaru agar bisa kembali melakukan pelaporan rutin.",
  },
  {
    question: "Berapa lama proses NPWP?",
    answer:
      "Rata-rata selesai dalam 15-30 menit setelah data kami terima dengan lengkap.",
  },
  {
    question: "Apakah melayani seluruh Indonesia?",
    answer:
      "Ya, layanan kami berbasis online dan mencakup seluruh wilayah kerja DJP di Indonesia.",
  },
];

export const FAQS_PKP = [
  {
    question: "Apa itu PKP (Pengukuhan Pengusaha Kena Pajak)?",
    answer:
      "Status yang diberikan kepada Wajib Pajak yang memiliki omzet usaha di atas batas tertentu. Dengan status ini, Anda dapat menerbitkan Faktur Pajak dan memungut PPN atas penjualan barang/jasa.",
  },
  {
    question: "Siapa saja yang wajib mengajukan PKP?",
    answer:
      "Pengusaha dengan omzet di atas Rp4,8 Miliar per tahun, serta pengusaha yang melakukan kegiatan impor atau ekspor barang/jasa kena pajak.",
  },
  {
    question: "Apa itu PKP Sukarela?",
    answer:
      "Status PKP yang diberikan kepada Wajib Pajak yang omzetnya belum mencapai Rp4,8 Miliar, namun ingin menjadi PKP untuk keperluan kredibilitas bisnis atau mengikuti tender.",
  },
  {
    question: "Apa risikonya jika omzet sudah >Rp4,8 M tapi tidak PKP?",
    answer:
      "Wajib Pajak dapat dikenakan sanksi administrasi hingga sanksi pidana perpajakan sesuai dengan ketentuan yang berlaku.",
  },
  {
    question: "Apakah status PKP bisa dibatalkan?",
    answer:
      "Ya, PKP dapat dibatalkan jika Wajib Pajak tidak lagi memenuhi syarat atau mengajukan permohonan pembatalan secara resmi.",
  },
];
