import {
  AlertTriangle,
  Check,
  CheckCircle,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
  X,
  XCircle,
} from "lucide-react";

interface EducationsProps {
  type?: "npwp" | "pkp" | "spt";
}
const Educations = ({ type = "npwp" }: EducationsProps) => {
  if (type == "npwp") {
    return (
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#2c4f40] font-bold tracking-wider uppercase text-sm bg-[#2c4f40]/10 px-3 py-1 rounded-full">
              INFO PENTING
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-4 mb-4">
              Pentingnya Memiliki NPWP
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Jangan sampai terhambat urusan finansial dan bisnis hanya karena
              belum punya NPWP. Simak risiko dan manfaatnya berikut ini.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Risiko Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-6 border-b border-red-50 pb-4">
                <div className="p-3 bg-red-100 rounded-full text-red-600 shadow-sm">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Risiko Tidak Punya NPWP
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 min-w-[24px]">
                    <X size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      Sanksi & Denda Lebih Mahal
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Penghasilan Anda akan dipotong pajak{" "}
                      <strong>20% lebih tinggi</strong> dari tarif normal. Ada
                      juga risiko sanksi administrasi hingga pidana jika sengaja
                      tidak mendaftar.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 min-w-[24px]">
                    <X size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      Hambatan Perbankan
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Sulit membuka rekening bank baru dan hampir mustahil
                      mengajukan pinjaman seperti KPR, KTA, atau kredit modal
                      usaha.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 min-w-[24px]">
                    <X size={20} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      Terhambat Bisnis & Aset
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Tidak bisa mengurus izin usaha (SIUP), ikut tender
                      pemerintah, hingga kendala saat jual beli properti atau
                      kendaraan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Manfaat Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-6 border-b border-green-50 pb-4">
                <div className="p-3 bg-green-100 rounded-full text-green-600 shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Manfaat Memiliki NPWP
                </h3>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1 bg-green-50 p-1 rounded text-green-600 h-fit shadow-sm">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      Kemudahan Administrasi Bank
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Syarat wajib buka rekening, pengajuan kredit, dan cetak
                      rekening koran menjadi lancar.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-green-50 p-1 rounded text-green-600 h-fit shadow-sm">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      Legalitas Bisnis Terjamin
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Bisa mengurus SIUP, TDP, dan dokumen legal lainnya untuk
                      pengembangan usaha Anda.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-green-50 p-1 rounded text-green-600 h-fit shadow-sm">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      Akses Investasi
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Syarat utama untuk mulai investasi saham, reksa dana, dan
                      obligasi negara.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 bg-green-50 p-1 rounded text-green-600 h-fit shadow-sm">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      Potongan Pajak Normal
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Menghindari potongan pajak penghasilan yang membengkak
                      (kenaikan 20%).
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (type == "spt") {
    return (
      <div>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gainst:wght@300;400;600;700&display=swap');
        
        body { font-family: 'Gainst', sans-serif; }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .pulse-ring {
          animation: pulse-ring 2s infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
        <section
          id="manfaat & resiko"
          className="py-20 bg-[#2C4F40]/90 text-white"
        >
          {/* Animated Orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse delay-700"></div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kenapa Harus Patuh Pajak?
              </h2>
              <p className="text-slate-400">
                Pahami konsekuensi dan manfaat demi keamanan finansial jangka
                panjang.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl p-8 border border-slate-700 shadow-sm">
                <div className="flex items-center gap-4 mb-6 text-black">
                  <i className="fas fa-smile-beam text-3xl"></i>
                  <h3 className="text-2xl font-bold">Keuntungan</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-green-500 mt-1" />
                    <div>
                      <p className="font-bold text-black">
                        Akses Kredit Perbankan
                      </p>
                      <p className="text-sm text-slate-400">
                        SPT adalah syarat wajib pengajuan KPR, Kredit Usaha,
                        atau Kartu Kredit.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-green-500 mt-1" />
                    <div>
                      <p className="font-bold text-black">
                        Bebas Denda Administrasi
                      </p>
                      <p className="text-sm text-slate-400">
                        Hemat hingga Rp 100.000 dengan melapor tepat waktu
                        sebelum tenggat.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-700 shadow-sm">
                <div className="flex items-center gap-4 mb-6 text-black">
                  <i className="fas fa-exclamation-triangle text-3xl"></i>
                  <h3 className="text-2xl font-bold">Risiko Kelalaian</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <XCircle className="text-red-500 mt-1" />
                    <div>
                      <p className="font-bold text-black">
                        Sanksi Bunga & Denda
                      </p>
                      <p className="text-sm text-slate-400">
                        Denda mulai dari Rp 100rb - Rp 1jt plus bunga bulanan
                        jika terlambat bayar.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <XCircle className="text-red-500 mt-1" />
                    <div>
                      <p className="font-bold text-black">
                        Pemeriksaan & Penyitaan
                      </p>
                      <p className="text-sm text-slate-400">
                        Kelalaian berulang memicu audit pajak dan risiko
                        pemblokiran rekening.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default Educations;
