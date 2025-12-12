/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Check, 
  Star, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail,
  Clock,
  Wallet,
  Lock
} from 'lucide-react';

// --- Data Constants ---

const PACKAGES = [
  {
    id: 'karyawan',
    name: 'Paket Kilat',
    target: 'Cocok untuk Pelamar Kerja & Karyawan',
    price: '50.000',
    unit: '/npwp',
    features: [
      '30 Menit Jadi (Prioritas)',
      'Termasuk Email Resmi',
      'Termasuk Aktivasi Akun',
      'Termasuk Kartu Digital',
      'Bayar Setelah Dokumen Jadi'
    ],
    cta: 'Paket Kilat 50rb',
    popular: true,
    borderColor: 'border-brand-blue',
    buttonStyle: 'bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
    iconColor: 'text-brand-blue'
  },
  {
    id: 'freelancer',
    name: 'Paket Freelancer',
    target: 'Content Creator, Dokter, Notaris, dll',
    price: '75.000',
    unit: '/npwp',
    features: [
      'Semua fitur Paket Kilat',
      'Konsultasi KLU (Lapangan Usaha)',
      'Tips Pajak Freelancer',
      'Aktivasi EFIN (Opsional)',
      'Bayar Setelah Dokumen Jadi'
    ],
    cta: 'Paket Freelancer',
    popular: false,
    borderColor: 'border-slate-100',
    buttonStyle: 'bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
    iconColor: 'text-brand-blue'
  },
  {
    id: 'badan',
    name: 'Paket UMKM / Badan',
    target: 'Untuk CV, PT, atau PT Perorangan',
    price: '80.000',
    unit: '/badan',
    features: [
      'Pembuatan NPWP Badan',
      'SKT (Surat Keterangan Terdaftar)',
      'Aktivasi EFIN Badan',
      'Syarat Pengajuan Kredit/Tender',
      'Konsultasi Gratis'
    ],
    cta: 'Paket UMKM Badan',
    popular: false,
    borderColor: 'border-slate-100',
    buttonStyle: 'bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
    iconColor: 'text-slate-800'
  }
];

const TESTIMONIALS = [
  {
    name: 'Rina',
    role: 'Pelamar Kerja',
    content: '"Beneran gak nyangka 30 menit beres. Mana bayarnya belakangan lagi pas kartu digitalnya udah dikirim. Aman banget rasanya."'
  },
  {
    name: 'Sarah',
    role: 'Content Creator',
    content: '"Suka banget karena gak perlu kirim foto KTP utuh, jadi ngerasa privacy terjaga. Adminnya gercep, sambil rebahan tau-tau jadi."'
  },
  {
    name: 'Budi',
    role: 'Pemilik Coffee Shop',
    content: '"Urus NPWP PT Perorangan di sini praktis. Gak perlu ke kantor pajak, semua via WA. Recommended buat UMKM."'
  }
];

const FAQS = [
  {
    question: 'Apakah benar bayar setelah jadi?',
    answer: 'Benar! Kami mengutamakan kepercayaan. Kami akan proses NPWP Anda sampai terbit dan mengirimkan buktinya. Setelah Anda cek keasliannya, baru Anda lakukan pembayaran.'
  },
  {
    question: 'Apakah aman tanpa foto dokumen utuh?',
    answer: 'Sangat aman. Kami memiliki metode khusus di mana Anda tidak perlu mengirimkan foto dokumen pribadi secara utuh (full) untuk menjaga privasi dan mencegah penyalahgunaan data, namun tetap memenuhi syarat validasi DJP.'
  },
  {
    question: 'Berapa lama prosesnya?',
    answer: 'Untuk paket kilat perseorangan, rata-rata proses hanya memakan waktu 30 menit pada jam kerja setelah data kami terima.'
  }
];

// --- Sub-Components ---

const WhatsAppIcon = ({ className }: any) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Navbar = ({ onConsult }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: any) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <FileText className="text-brand-blue w-8 h-8" />
            <span className="font-bold text-xl text-slate-800">Pajak!Koe</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Keunggulan', 'Paket', 'FAQ'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-slate-600 hover:text-brand-blue transition font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onConsult('Umum')}
              className="hidden md:block bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg text-sm"
            >
              Konsultasi Gratis
            </button>
            <button className="md:hidden text-slate-700" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['Keunggulan', 'Paket', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left px-3 py-3 text-slate-600 hover:bg-blue-50 hover:text-brand-blue rounded-md font-medium"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => { setIsOpen(false); onConsult('Umum'); }}
              className="w-full mt-4 bg-brand-blue text-white px-5 py-3 rounded-lg font-semibold text-center"
            >
              Konsultasi Gratis
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Mockup Components ---

const ChatBubble = ({ sender, text, time, image }: { sender: string; text: string; time: string; image?: boolean }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${isUser ? 'bg-[#E7FFDB] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
        {image && (
          <div className="mb-2 bg-slate-200 rounded-lg h-24 w-full flex items-center justify-center text-slate-400 text-xs overflow-hidden">
             <div className="bg-brand-blue/10 w-full h-full flex flex-col items-center justify-center">
                <FileText className="w-8 h-8 text-brand-blue mb-1" />
                <span className="font-bold text-slate-700">NPWP_DIGITAL.pdf</span>
             </div>
          </div>
        )}
        <p className="text-sm text-slate-800 leading-snug">{text}</p>
        <span className="text-[10px] text-slate-400 block text-right mt-1">{time}</span>
      </div>
    </div>
  );
};

const WhatsAppMockup = () => (
  <div className="relative mx-auto w-full max-w-[320px] bg-slate-900 rounded-[35px] border-8 border-slate-900 shadow-2xl overflow-hidden">
    {/* Screen Header */}
    <div className="bg-[#075E54] p-3 flex items-center gap-3 text-white">
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <FileText size={16} />
      </div>
      <div>
        <p className="font-bold text-sm">Admin Pajak!Koe</p>
        <p className="text-[10px] text-green-100">Online</p>
      </div>
    </div>
    
    {/* Chat Area */}
    <div className="bg-[#e5ddd5] h-[500px] p-4 overflow-y-auto flex flex-col relative">
      {/* Background Pattern Mock */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
      </div>
      
      <div className="z-10">
        <ChatBubble sender="user" text="Min, mau bikin NPWP dong. Mager bangun nih, bisa?" time="09:00" image={undefined} />
        <ChatBubble sender="admin" text="Bisa banget kak! Cuman 30 menit jadi kok. Santai aja." time="09:01" image={undefined} />
        <ChatBubble sender="user" text="Oke, tapi aku takut kirim foto KTP full.." time="09:02" image={undefined} />
        <ChatBubble sender="admin" text="Tenang kak, DISINI AMAN. Gak perlu kirim foto utuh dokumen pribadi kok." time="09:03" image={undefined} />
        <ChatBubble sender="admin" text="Nih kak, NPWP nya udah jadi ya! Silahkan dicek dulu." time="09:30" image={true} />
        <ChatBubble sender="user" text="Wih cepet banget! Oke aku transfer 50rb nya ya." time="09:32" image={undefined} />
      </div>
    </div>
    
    {/* Input Area Mock */}
    <div className="bg-slate-100 p-2 flex items-center gap-2">
      <div className="bg-white grow rounded-full h-8 px-3 text-xs flex items-center text-slate-400">Ketik pesan...</div>
      <div className="w-8 h-8 bg-[#00897b] rounded-full flex items-center justify-center text-white">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
      </div>
    </div>
  </div>
);


// --- Main App Component ---

const App = () => {
  
  const handlePesanWA = (paket: string) => {
    const nomorWA = "6285600811256";
    let pesan = "";
    
    if (paket === 'Tanya-tanya' || paket === 'Umum') {
      pesan = "Halo Admin, saya mau bikin NPWP 30 menit jadi. Bayar setelah jadi kan?";
    } else {
      pesan = `Halo Admin, saya mau ambil *${paket}*. Apa benar bayar setelah dokumen jadi?`;
    }
    
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="font-sans text-slate-700 selection:bg-brand-blue selection:text-white">
      {/* --- Injected Styles for Custom Animations --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        body { font-family: 'Poppins', sans-serif; }
        
        .gradient-bg {
          background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%);
        }
        
        .hero-pattern {
          background-image: radial-gradient(#2563EB 0.5px, transparent 0.5px);
          background-size: 20px 20px;
          opacity: 0.1;
        }
        
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

      <Navbar onConsult={handlePesanWA} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-bg relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 hero-pattern pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-green-200">
                <Check size={14} /> Bayar Setelah Dokumen Jadi
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Bikin NPWP Cuma <span className="text-brand-blue">30 Menit.</span> <br/>
                Tanpa Bangun, <br/>
                <span className="relative inline-block">
                  Tanpa Ribet.
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                     <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6"/>
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                Hanya <strong>Rp 50.000</strong> sudah termasuk email resmi, aktivasi akun, dan kartu digital. Data aman tanpa perlu kirim foto dokumen utuh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => handlePesanWA('Paket Kilat 50rb')}
                  className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-5 h-5" /> Pesan Sekarang (50rb)
                </button>
                <button 
                  onClick={() => document.getElementById('keunggulan')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition"
                >
                  Lihat Info
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5"><Clock className="text-orange-500 w-4 h-4" /> 30 Menit Jadi</div>
                <div className="flex items-center gap-1.5"><ShieldCheck className="text-green-500 w-4 h-4" /> Privasi Aman</div>
                <div className="flex items-center gap-1.5"><Wallet className="text-blue-500 w-4 h-4" /> Bayar Belakangan</div>
              </div>
            </div>

            {/* Right Visual (Interactive WA Mockup) */}
            <div className="order-1 md:order-2 relative flex justify-center items-center">
              <div className="relative z-10 animate-float">
                <WhatsAppMockup />
                
                {/* Float Badge 1 */}
                <div className="absolute -right-4 top-20 bg-white p-3 rounded-xl shadow-xl border border-slate-100 items-center gap-3 animate-bounce hidden md:flex">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Status</p>
                    <p className="text-sm font-bold text-slate-800">Aktif & Resmi!</p>
                  </div>
                </div>

                {/* Float Badge 2 */}
                 <div className="absolute -left-4 bottom-20 bg-white p-3 rounded-xl shadow-xl border border-slate-100 items-center gap-3 hidden md:flex">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Privasi</p>
                    <p className="text-sm font-bold text-slate-800">Tanpa Foto Utuh</p>
                  </div>
                </div>

              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-blue rounded-full blur-[100px] opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="keunggulan" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Kenapa Harus Kami?</h2>
            <p className="text-slate-600 text-lg">Solusi paling aman dan nyaman buat kamu yang mager birokrasi.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Wallet className="w-8 h-8 text-brand-blue" />}
              bgIcon="bg-blue-100"
              title="Bayar Setelah Jadi"
              desc="Gak perlu takut ketipu. Dokumen kami urus dulu sampai beres, kamu cek validasinya, baru kamu bayar. Fair kan?"
            />
            <FeatureCard 
              icon={<Lock className="w-8 h-8 text-yellow-600" />}
              bgIcon="bg-yellow-100"
              title="Data Lebih Aman"
              desc="Kami menjamin privasi. Kamu TIDAK PERLU menyerahkan foto dokumen pribadi secara utuh. Cukup data yang diperlukan saja."
            />
            <FeatureCard 
              icon={<Clock className="w-8 h-8 text-green-600" />}
              bgIcon="bg-green-100"
              title="30 Menit Beres"
              desc="Lagi butuh urgent buat lamar kerja? Tinggal chat, tunggu sebentar sambil scroll TikTok, tau-tau NPWP udah jadi."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="paket" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-blue font-bold tracking-wider uppercase text-sm bg-blue-100 px-3 py-1 rounded-full">Pilihan Paket</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">Harga Pas Dikantong</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PACKAGES.map((pkg) => (
              <PricingCard key={pkg.id} data={pkg} onSelect={handlePesanWA} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">Kata Mereka</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300">
                <div className="flex text-yellow-400 mb-4 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">{testi.content}</p>
                <div className="border-t border-slate-200 pt-4">
                  <div className="font-bold text-slate-800">{testi.name}</div>
                  <div className="text-sm text-brand-blue">{testi.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Pertanyaan Sering Diajukan</h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-brand-blue w-6 h-6" />
              <span className="font-bold text-2xl text-white">Pajak!Koe</span>
            </div>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              Solusi NPWP instan 30 menit. Bayar setelah jadi, privasi aman.
            </p>
            <div className="flex space-x-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-white transition-colors"><Icon size={24} /></a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Layanan</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-brand-blue transition">Paket Kilat (30 Menit)</a></li>
              <li><a href="#" className="hover:text-brand-blue transition">NPWP Badan</a></li>
              <li><a href="#" className="hover:text-brand-blue transition">Lapor SPT Tahunan</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Kontak</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3"><WhatsAppIcon className="w-5 h-5" /> 0856-0081-1256</li>
              <li className="flex items-center gap-3"><Mail className="w-5 h-5" /> halo@pajakkoe.id</li>
              <li className="flex items-center gap-3"><Clock className="w-5 h-5" /> Senin - Sabtu, 09.00 - 17.00</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Pajak!Koe All rights reserved.
        </div>
      </footer>

      {/* Floating Action Button */}
      <button 
        onClick={() => handlePesanWA('Tanya-tanya')}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition duration-300 pulse-ring flex items-center justify-center"
        aria-label="Chat WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </button>

    </div>
  );
};

// --- Helper Components ---

const FeatureCard = ({ icon, bgIcon, title, desc }: { icon: React.ReactNode; bgIcon: string; title: string; desc: string }) => (
  <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition duration-300 border border-slate-100 group">
    <div className={`w-14 h-14 ${bgIcon} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const PricingCard = ({ data, onSelect }: { data: typeof PACKAGES[number]; onSelect: (cta: string) => void }) => (
  <div className={`bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col border relative ${data.borderColor} ${data.popular ? 'border-2 md:-translate-y-4' : 'border border-slate-100'}`}>
    {data.popular && (
      <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm z-10">
        PALING LARIS
      </div>
    )}
    <div className="p-8 grow">
      <h3 className="text-xl font-bold text-slate-800">{data.name}</h3>
      <p className="text-sm text-slate-500 mt-2 min-h-10">{data.target}</p>
      <div className="my-8">
        <span className="text-3xl font-bold text-slate-900">Rp {data.price}</span>
        <span className="text-slate-400 text-sm">{data.unit}</span>
      </div>
      <ul className="space-y-4 text-slate-600 text-sm mb-8">
        {data.features.map((feat: any, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="text-green-500 w-5 h-5 shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-4 bg-slate-50 border-t border-slate-100">
      <button 
        onClick={() => onSelect(data.cta)}
        className={`w-full py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm ${data.buttonStyle}`}
      >
        <WhatsAppIcon className="w-5 h-5" /> Pesan Sekarang
      </button>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-bold text-lg text-slate-800">{question}</span>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

// Tailwind Config Injection (Normally in tailwind.config.js)
const themeConfig = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          dark: '#1E293B',
        }
      }
    }
  }
};

export default App;