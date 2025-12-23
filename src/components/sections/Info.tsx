import { FolderOpen, Route, Clock } from "lucide-react";
const Info = () => {
  return (
    <section id="informasi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Informasi Penting Lapor SPT
          </h2>
          <p className="text-slate-500">
            Segala hal yang perlu Anda ketahui sebelum melaporkan pajak Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              Persiapan Dokumen
            </h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                <span>
                  <strong>E-FIN:</strong> Nomor identitas elektronik untuk lapor
                  online.
                </span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                <span>
                  <strong>Bukti Potong:</strong> Formulir 1721-A1/A2 dari
                  kantor/pemberi kerja.
                </span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                <span>
                  <strong>Daftar Aset:</strong> Rekap harta (kendaraan,
                  tabungan, rumah) & hutang.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              Batas Waktu Resmi
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-orange-500">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                  SPT Orang Pribadi
                </p>
                <p className="text-lg font-bold">Paling Lambat 31 Maret</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-500">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  SPT Badan Usaha
                </p>
                <p className="text-lg font-bold">Paling Lambat 30 April</p>
              </div>
              <p className="text-sm text-slate-500 italic">
                Lapor lebih awal membantu Anda menghindari antrean sistem DJP
                yang sering sibuk di akhir bulan.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl">
              <Route className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              Alur Jasa Kami
            </h3>
            <div className="relative space-y-6 pl-10 step-line">
              <div className="relative z-10">
                <div className="absolute -left-10 w-8 h-8 bg-[#A8C3B1] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <p className="font-bold text-slate-800">
                  Konsultasi & Kirim Data
                </p>
                <p className="text-xs text-slate-500">
                  Kirimkan scan/foto dokumen via WhatsApp.
                </p>
              </div>
              <div className="relative z-10">
                <div className="absolute -left-10 w-8 h-8 bg-[#A8C3B1] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <p className="font-bold text-slate-800">Proses Perhitungan</p>
                <p className="text-xs text-slate-500">
                  Tim kami memverifikasi dan menghitung nominal pajak.
                </p>
              </div>
              <div className="relative z-10">
                <div className="absolute -left-10 w-8 h-8 bg-[#2C4F40] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <p className="font-bold text-slate-800">Terima Bukti Lapor</p>
                <p className="text-xs text-slate-500">
                  BPE (Bukti Penerimaan Elektronik) resmi kami kirimkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
