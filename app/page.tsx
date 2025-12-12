'use client';
import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Code, 
  ArrowRight 
} from 'lucide-react';

// Komponen Utama
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efek untuk navbar transparan saat di scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#06b6d4] selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-indigo-100 py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="w-8 h-8 bg-linear-to-br from-[#3730a3] to-[#4f46e5] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all">
              <span className="text-white font-bold text-xl">A</span>
              {/* <Logo className="w-10 h-10 text-cyan-500 relative z-10" /> */}
            </div>
            <span className="text-2xl font-bold tracking-tighter text-[#3730a3]">ALTERNATIVE</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['TENTANG', 'LAYANAN', 'KEUNGGULAN'].map((item, idx) => {
              const ids = ['about', 'services', 'why-us'];
              return (
                <button 
                  key={idx}
                  onClick={() => scrollToSection(ids[idx])} 
                  className="text-slate-600 hover:text-[#3730a3] transition-colors text-sm font-bold tracking-wide hover:bg-indigo-50 px-3 py-1 rounded-full"
                >
                  {item}
                </button>
              )
            })}
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-6 py-2.5 bg-[#3730a3] text-white rounded-lg hover:bg-[#312e81] hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 text-sm font-bold flex items-center gap-2"
            >
              HUBUNGI KAMI
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#3730a3] focus:outline-none p-2 hover:bg-indigo-50 rounded">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-indigo-100 py-6 px-6 flex flex-col space-y-4 shadow-2xl">
            <button onClick={() => scrollToSection('about')} className="text-left text-lg font-medium text-slate-700 hover:text-[#3730a3]">Tentang</button>
            <button onClick={() => scrollToSection('services')} className="text-left text-lg font-medium text-slate-700 hover:text-[#3730a3]">Layanan</button>
            <button onClick={() => scrollToSection('why-us')} className="text-left text-lg font-medium text-slate-700 hover:text-[#3730a3]">Keunggulan</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-lg text-[#06b6d4] font-bold">Hubungi Kami</button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-slate-50">
        {/* Modern Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-linear-to-b from-white to-transparent"></div>
        
        {/* Orbs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-multiply pointer-events-none translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-multiply pointer-events-none -translate-x-1/3"></div>

        <div className="container mx-auto px-6 z-10 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-indigo-100 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[#3730a3] text-xs font-bold tracking-widest uppercase">Next Gen Software House</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#1e293b] mb-8 leading-tight tracking-tight">
            Engineering <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3730a3] via-[#4f46e5] to-[#06b6d4]">
              Intelligent Future.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Membangun ekosistem digital otonom dengan <span className="text-[#3730a3] font-semibold">AI</span>, <span className="text-[#06b6d4] font-semibold">Automation</span>, dan Skalabilitas tanpa batas.
          </p>
          
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-[#3730a3] text-white font-bold rounded-xl shadow-xl shadow-indigo-500/20 hover:bg-[#312e81] hover:scale-105 transition-all flex items-center justify-center gap-2 group">
              Mulai Transformasi
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollToSection('services')} className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-[#3730a3] hover:text-[#3730a3] transition-all shadow-sm">
              Pelajari Solusi
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#06b6d4]"></div>
                <h2 className="text-[#06b6d4] font-bold tracking-widest uppercase text-sm">Tentang Kami</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-8 leading-tight">
                Beyond Code. <br/>
                <span className="text-[#3730a3]">We Build Intelligence.</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                <strong>Alternative</strong> bukan sekadar software house. Kami adalah mitra teknologi strategis yang lahir di era disrupsi digital.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                {'Kami menggabungkan presisi logika pemrograman dengan kemampuan adaptif Artificial Intelligence untuk menciptakan sistem yang tidak hanya bekerja, tapi juga "belajar" dan berkembang bersama bisnis Anda.'}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="border-l-2 border-cyan-500 pl-4">
                  <h4 className="text-xl font-bold text-[#1e293b] mb-2">Visi Kami</h4>
                  <p className="text-slate-500 text-sm">
                    Menjadi pionir dalam pengembangan solusi digital cerdas yang memberdayakan bisnis di seluruh dunia.
                  </p>
                </div>
                <div className="border-l-2 border-indigo-500 pl-4">
                  <h4 className="text-xl font-bold text-[#1e293b] mb-2">Misi Kami</h4>
                  <p className="text-slate-500 text-sm">
                    Mengintegrasikan AI dan otomasi ke dalam setiap aspek pengembangan perangkat lunak untuk hasil yang optimal.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <div>
                  <h4 className="text-4xl font-bold text-[#3730a3] mb-1">100+</h4>
                  <p className="text-slate-500 font-medium">Proyek Cerdas</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-[#06b6d4] mb-1">99.9%</h4>
                  <p className="text-slate-500 font-medium">System Uptime</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-indigo-500 mb-1">24/7</h4>
                  <p className="text-slate-500 font-medium">AI Monitoring</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-[#3730a3] to-[#06b6d4] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white border border-slate-100 p-8 rounded-2xl shadow-2xl">
                 {/* Decorative Code Block - Modern Light Theme */}
                 <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                       <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                       <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">core_logic.ts</div>
                 </div>
                 <div className="font-mono text-sm space-y-3">
                    <p className="text-slate-400">{'// Initializing AI Core'}</p>
                    <p>
                        <span className="text-purple-600">import</span> 
                        <span className="text-slate-800"> {'{ NeuralNet }'} </span> 
                        <span className="text-purple-600">from</span> 
                        <span className="text-green-600">{"'@alternative/brain'"}</span>;
                    </p>
                    <p>
                        <span className="text-blue-600">const</span> 
                        <span className="text-orange-600"> optimizeBusiness</span> 
                        <span className="text-slate-500">=</span> 
                        <span className="text-purple-600">async</span> 
                        <span className="text-slate-800"> (data)</span> 
                        <span className="text-blue-600"> ={'&gt;'}</span> 
                        <span className="text-slate-800"> {'{'}</span>
                    </p>
                    <div className="pl-6 border-l-2 border-slate-100 space-y-2">
                        <p>
                            <span className="text-blue-600">await </span> 
                            <span className="text-slate-800">NeuralNet.analyze(data);</span>
                        </p>
                        <p>
                            <span className="text-slate-800">return </span> 
                            <span className="text-green-600">{"'Efficiency Increased 300%'"}</span>;
                        </p>
                    </div>
                    <p className="text-slate-800">{'}'}</p>
                 </div>
                 
                 <div className="mt-6 flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Operational</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-[80px] opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#06b6d4] font-bold tracking-widest mb-3 uppercase text-sm">Layanan Kami</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#1e293b] mb-6">Teknologi End-to-End.</h3>
            <p className="text-slate-600 text-lg">Dari algoritma cerdas hingga antarmuka pengguna yang memukau, kami menangani seluruh spektrum digital.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#3730a3] transition-colors duration-300">
                <Cpu className="text-[#3730a3] group-hover:text-white transition-colors" size={32} />
              </div>
              <h4 className="text-xl font-bold text-[#1e293b] mb-4">AI & Machine Learning</h4>
              <p className="text-slate-500 leading-relaxed mb-6">
                Integrasi model prediktif, NLP, dan Computer Vision untuk mengotomatisasi pengambilan keputusan kompleks.
              </p>
              <a href="#" className="inline-flex items-center text-[#3730a3] font-bold text-sm group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} />
              </a>
            </div>

            {/* Service 2 */}
            <div className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 border border-slate-100">
              <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#06b6d4] transition-colors duration-300">
                <Zap className="text-[#06b6d4] group-hover:text-white transition-colors" size={32} />
              </div>
              <h4 className="text-xl font-bold text-[#1e293b] mb-4">Automation System</h4>
              <p className="text-slate-500 leading-relaxed mb-6">
                RPA & Workflow Automation untuk memangkas proses manual yang repetitif, meningkatkan efisiensi hingga 80%.
              </p>
              <a href="#" className="inline-flex items-center text-[#06b6d4] font-bold text-sm group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} />
              </a>
            </div>

            {/* Service 3 */}
            <div className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#3730a3] transition-colors duration-300">
                <Globe className="text-[#3730a3] group-hover:text-white transition-colors" size={32} />
              </div>
              <h4 className="text-xl font-bold text-[#1e293b] mb-4">Web Engineering</h4>
              <p className="text-slate-500 leading-relaxed mb-6">
                Pengembangan Web Apps berskala enterprise dengan arsitektur Microservices dan Cloud-Native.
              </p>
              <a href="#" className="inline-flex items-center text-[#3730a3] font-bold text-sm group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} />
              </a>
            </div>

            {/* Service 4 */}
            <div className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 border border-slate-100">
              <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#06b6d4] transition-colors duration-300">
                <Smartphone className="text-[#06b6d4] group-hover:text-white transition-colors" size={32} />
              </div>
              <h4 className="text-xl font-bold text-[#1e293b] mb-4">Mobile Tech</h4>
              <p className="text-slate-500 leading-relaxed mb-6">
                Aplikasi mobile high-performance (iOS/Android) yang terintegrasi dengan perangkat IoT dan sensor.
              </p>
              <a href="#" className="inline-flex items-center text-[#06b6d4] font-bold text-sm group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY US --- */}
      <section id="why-us" className="py-32 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Visual Element */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-linear-to-tr from-[#3730a3] to-[#06b6d4] rounded-4xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-[#1e293b] p-10 rounded-4xl shadow-2xl text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#06b6d4] opacity-20 rounded-full blur-[80px]"></div>
                
                <h4 className="text-2xl font-bold mb-8">The Alternative Standard</h4>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-[#06b6d4] font-bold">1</div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Analisis Data</h5>
                      <p className="text-slate-400 text-sm">Kami membedah masalah dengan pendekatan berbasis data, bukan asumsi.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-[#06b6d4] font-bold">2</div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Arsitektur Modular</h5>
                      <p className="text-slate-400 text-sm">Sistem yang dirancang untuk tumbuh. Tambah fitur kapan saja tanpa merombak ulang.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-[#06b6d4] font-bold">3</div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Keamanan Berlapis</h5>
                      <p className="text-slate-400 text-sm">Proteksi standar enterprise di setiap endpoint dan database.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-[#06b6d4] font-bold tracking-widest mb-3 uppercase text-sm">Kenapa Kami?</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#1e293b] mb-8">Teknologi yang Tidak Akan Usang.</h3>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="mt-1 bg-indigo-50 p-3 rounded-lg">
                    <Code className="text-[#3730a3]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1e293b]">Future-Proof Stack</h4>
                    <p className="text-slate-600 mt-2">
                      {'Kami menghindari teknologi "legacy". Tim kami selalu berada di garis depan evolusi framework dan bahasa pemrograman.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="mt-1 bg-cyan-50 p-3 rounded-lg">
                    <ShieldCheck className="text-[#06b6d4]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1e293b]">Security First</h4>
                    <p className="text-slate-600 mt-2">
                      Dalam dunia AI dan data, keamanan adalah segalanya. Kami menerapkan enkripsi dan protokol keamanan level militer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA / CONTACT --- */}
      <section id="contact" className="py-32 relative overflow-hidden bg-[#1e293b]">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3730a3] rounded-full blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#06b6d4] rounded-full blur-[100px] opacity-30 -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Siap Berinovasi?</h2>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12">
              Jangan biarkan kompetitor mendahului Anda. Diskusikan ide besar Anda dan biarkan kami mengeksekusinya dengan teknologi terbaik.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Masukkan email bisnis Anda" 
                className="grow px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/20 focus:border-[#06b6d4] transition-all" 
              />
              <button className="px-8 py-4 bg-[#06b6d4] text-white font-bold rounded-xl hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all whitespace-nowrap">
                Hubungi Kami
              </button>
            </div>
            
            <p className="mt-8 text-slate-400 text-sm">
              Atau kirim email langsung ke <a href="mailto:hello@alternative.tech" className="text-[#06b6d4] hover:text-white transition-colors underline">hello@alternative.tech</a>
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3730a3] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-[#1e293b] tracking-tight">ALTERNATIVE</span>
            </div>
            <div className="flex gap-8 text-slate-500 font-medium">
              <a href="#" className="hover:text-[#3730a3] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#3730a3] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#3730a3] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#3730a3] transition-colors">GitHub</a>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2025 Alternative Tech Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
