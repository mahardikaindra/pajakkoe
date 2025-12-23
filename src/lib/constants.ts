// src/lib/constants.ts

export const APP_NAME = "Pajak!Koe";
export const PACKAGES = [
  {
    id: "karyawan",
    name: "Paket Kilat",
    target: "Cocok untuk Pelamar Kerja & Karyawan",
    price: "50.000",
    unit: "/npwp",
    features: [
      "30 Menit Jadi (Prioritas)",
      "Termasuk Email Resmi",
      "Termasuk Aktivasi Akun",
      "Termasuk Kartu Digital",
      "Bayar Setelah Dokumen Jadi",
    ],
    cta: "Paket Kilat 50rb",
    popular: true,
    borderColor: "border-brand-blue",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-brand-blue",
  },
  {
    id: "badan",
    name: "Paket UMKM / Badan",
    target: "Untuk CV, PT, atau PT Perorangan",
    price: "75.000",
    unit: "/badan",
    features: [
      "Pembuatan NPWP Badan",
      "SKT (Surat Keterangan Terdaftar)",
      "Aktivasi EFIN Badan",
      "Syarat Pengajuan Kredit/Tender",
      "Konsultasi Gratis",
    ],
    cta: "Paket UMKM Badan",
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
    iconColor: "text-slate-800",
  },
  // {
  //     id: 'pkp',
  //     name: 'Jasa Pengukuhan PKP',
  //     target: 'Omzet > 4.8M / Tender',
  //     price: '1.500.000',
  //     unit: '/pkp',
  //     features: ['Terbit Faktur Pajak', 'Kredit PPN Masukan', 'Sertifikat Elektronik', 'Legalitas Tender', 'Pendampingan'],
  //     popular: false,
  //     borderColor: 'border-slate-100',
  //     buttonStyle: "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
  //     iconColor: 'text-slate-800',
  //     cta: 'Jasa Pengukuhan PKP',
  //   },
  //   {
  //     id: 'spt_pribadi_tahunan',
  //     name: 'SPT Pribadi Tahunan',
  //     target: 'Wajib Pajak Orang Pribadi',
  //     price: '100.000',
  //     unit: '/tahun',
  //     features: ['Lapor SPT 1770/1770S/SS', 'Bukti Lapor Resmi', 'Hitung Akurat', 'Konsultasi'],
  //     popular: false,
  //     borderColor: 'border-slate-100',
  //     buttonStyle: "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
  //     iconColor: 'text-slate-800',
  //     cta: 'SPT Pribadi Tahunan',
  //   },
  //   {
  //     id: 'spt_pribadi_bulanan',
  //     name: 'SPT Pribadi Bulanan',
  //     target: 'Wajib Pajak Orang Pribadi',
  //     price: '75.000',
  //     unit: '/bulan',
  //     features: ['Lapor PPh 21/25', 'Hitung Setoran', 'Bukti Lapor Resmi', 'Reminder Jadwal'],
  //     popular: false,
  //     borderColor: 'border-slate-100',
  //     buttonStyle: "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
  //     iconColor: 'text-slate-800',
  //     cta: 'SPT Pribadi Bulanan',
  //   },
  //   {
  //     id: 'spt_badan_tahunan',
  //     name: 'SPT Badan Tahunan',
  //     target: 'CV, PT, Yayasan',
  //     price: '250.000',
  //     unit: '/tahun',
  //     features: ['Lapor SPT 1771', 'Lampiran Lap. Keuangan', 'Bukti Lapor Resmi', 'Analisa Fiskal'],
  //     popular: false,
  //     borderColor: 'border-slate-100',
  //     buttonStyle: "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
  //     iconColor: 'text-slate-800',
  //     cta: 'SPT Badan Tahunan',
  //   },
  //   {
  //     id: 'spt_badan_bulanan',
  //     name: 'SPT Badan Bulanan',
  //     target: 'CV, PT, Yayasan',
  //     price: '150.000',
  //     unit: '/bulan',
  //     features: ['Lapor PPh 21/25/23/Final', 'Lapor PPN (Jika PKP)', 'Bukti Lapor Resmi', 'Rekapitulasi'],
  //     popular: false,
  //     borderColor: 'border-slate-100',
  //     buttonStyle: "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
  //     iconColor: 'text-slate-800',
  //     cta: 'SPT Badan Bulanan',
  //   }
];
export const PACKAGES_SPT = [
  {
    id: "spt_pribadi_bulanan",
    name: "SPT Pribadi Bulanan",
    target: "Wajib Pajak Orang Pribadi",
    price: "75.000",
    unit: "/bulan",
    features: [
      "Lapor PPh 21/25",
      "Hitung Setoran",
      "Bukti Lapor Resmi",
      "Reminder Jadwal",
    ],
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
    iconColor: "text-slate-800",
    cta: "SPT Pribadi Bulanan",
  },
  {
    id: "spt_pribadi_tahunan",
    name: "SPT Pribadi Tahunan",
    target: "Wajib Pajak Orang Pribadi",
    price: "100.000",
    unit: "/tahun",
    features: [
      "Lapor SPT 1770/1770S/SS",
      "Bukti Lapor Resmi",
      "Hitung Akurat",
      "Konsultasi",
    ],
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
    iconColor: "text-slate-800",
    cta: "SPT Pribadi Tahunan",
  },
  {
    id: "spt_badan_bulanan",
    name: "SPT Badan Bulanan",
    target: "CV, PT, Yayasan",
    price: "150.000",
    unit: "/bulan",
    features: [
      "Lapor PPh 21/25/23/Final",
      "Lapor PPN (Jika PKP)",
      "Bukti Lapor Resmi",
      "Rekapitulasi",
    ],
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
    iconColor: "text-slate-800",
    cta: "SPT Badan Bulanan",
  },
  {
    id: "spt_badan_tahunan",
    name: "SPT Badan Tahunan",
    target: "CV, PT, Yayasan",
    price: "250.000",
    unit: "/tahun",
    features: [
      "Lapor SPT 1771",
      "Lampiran Lap. Keuangan",
      "Bukti Lapor Resmi",
      "Analisa Fiskal",
    ],
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
    iconColor: "text-slate-800",
    cta: "SPT Badan Tahunan",
  },
];
export const PACKAGES_PKP = [
  {
    id: "sukarela",
    name: "PKP Sukarela",
    target: "",
    price: "2.000.000",
    unit: "/pkp sukarela",
    features: [
      "Untuk Omzet < Rp4,8 M",
      "Aktivasi Akun E-Faktur",
      "Sertifikat Elektronik",
      "Konsultasi Strategi Pajak",
    ],
    cta: "paket pkp sukarela",
    popular: false,
    borderColor: "border-brand-blue",
    buttonStyle:
      "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
    iconColor: "text-brand-blue",
  },
  {
    id: "wajib",
    name: "PKP Wajib",
    target: "",
    price: "3.500.000",
    unit: "/pkp wajib",
    features: [
      "Untuk Omzet > Rp4,8 M",
      "Pendampingan Verifikasi",
      "E-Faktur & Sertifikat",
      "Training Penggunaan Aplikasi",
    ],
    cta: "paket pkp wajib",
    popular: true,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-green-500 border-2 border-green-600 text-white hover:bg-brand-blue hover:text-white]",
    iconColor: "text-slate-800",
  },
  {
    id: "ekspor",
    name: "PKP Ekspor/Impor",
    target: "",
    price: "5.000.000",
    unit: "/pkp ekspor",
    features: [
      "Aktivasi PKP Khusus",
      "NIB Importir/Eksportir",
      "Pendampingan Penuh",
      "Laporan Pajak 1 Bulan",
    ],
    cta: "paket pkp ekspor",
    popular: false,
    borderColor: "border-slate-100",
    buttonStyle:
      "bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-[#2c4f40]",
    iconColor: "text-slate-800",
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
    question: "Apakah benar bayar setelah jadi?",
    answer:
      "Benar! Kami mengutamakan kepercayaan. Kami akan proses NPWP Anda sampai terbit dan mengirimkan buktinya. Setelah Anda cek keasliannya, baru Anda lakukan pembayaran.",
  },
  {
    question: "Apakah aman tanpa foto dokumen utuh?",
    answer:
      "Sangat aman. Kami memiliki metode khusus di mana Anda tidak perlu mengirimkan foto dokumen pribadi secara utuh (full) untuk menjaga privasi dan mencegah penyalahgunaan data, namun tetap memenuhi syarat validasi DJP.",
  },
  {
    question: "Berapa lama prosesnya?",
    answer:
      "Untuk paket kilat perseorangan, rata-rata proses hanya memakan waktu 30 menit pada jam kerja setelah data kami terima.",
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
