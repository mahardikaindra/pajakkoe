/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowLeft,
  User,
  Phone,
  Send,
  Briefcase,
  Building2
} from 'lucide-react';

const OrderForm = () => {
  // State untuk data form
  const [formData, setFormData] = useState({
    nama: '',
    namaBadan: '', // Khusus Badan Usaha
    bentukBadan: 'PT', // Khusus Badan Usaha
    jabatan: '', // Khusus Badan Usaha
    pekerjaan: '', // Khusus Freelancer
    nik: '',
    noWa: '',
    alamat: '',
    paket: '',
    kategori: 'pribadi', // 'pribadi', 'freelance', 'badan'
    fotoKtp: null,
    fotoAkta: null // Khusus Badan Usaha
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mengambil parameter dari URL
  useEffect(() => {
    const getParams = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const paketParam = params.get('paket'); 
        const waParam = params.get('wa');
        
        // Tentukan Kategori berdasarkan Paket
        let kategoriOtomatis = 'pribadi';
        let namaPaket = '';

        if (paketParam === 'kilat') {
            kategoriOtomatis = 'pribadi';
            namaPaket = 'Paket Kilat (50rb)';
        } else if (paketParam === 'freelancer') {
            kategoriOtomatis = 'freelance';
            namaPaket = 'Paket Freelancer (75rb)';
        } else if (paketParam === 'badan') {
            kategoriOtomatis = 'badan';
            namaPaket = 'Paket UMKM / Badan (80rb)';
        } else {
            namaPaket = paketParam || '';
        }
        
        setFormData(prev => ({
          ...prev,
          paket: namaPaket,
          kategori: kategoriOtomatis,
          noWa: waParam || ''
        }));
      }
    };

    getParams();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Logika khusus jika user mengganti paket secara manual di dropdown
    if (name === 'paket') {
        let kategoriBaru = 'pribadi';
        if (value.includes('Freelancer')) kategoriBaru = 'freelance';
        if (value.includes('Badan')) kategoriBaru = 'badan';
        
        setFormData(prev => ({ ...prev, [name]: value, kategori: kategoriBaru }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulasi kirim data
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Data Diterima!</h2>
          <p className="text-slate-600 mb-6">
            Terima kasih. Data untuk <strong>{formData.paket}</strong> telah kami terima. Tim kami akan segera menghubungi Anda di <strong>{formData.noWa}</strong>.
          </p>
          <button onClick={() => window.location.href = '/'} className="bg-[#2c4f40] text-white px-6 py-3 rounded-xl font-bold w-full hover:bg-[#223d32] transition">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f7f4] font-sans text-slate-700 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <span className="font-bold text-lg text-[#2c4f40]">Formulir Data</span>
        </div>
      </div>

      <div className="pt-24 px-4 max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="bg-[#2c4f40] p-6 text-white relative">
            <h1 className="text-xl font-bold mb-1">Lengkapi Data</h1>
            <p className="text-green-100 text-sm">
                {formData.kategori === 'badan' 
                    ? 'Formulir khusus pendaftaran NPWP Badan Usaha.' 
                    : 'Formulir pendaftaran NPWP Pribadi/Freelance.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* 1. Pilih Paket */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <label className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Paket Dipilih</label>
              <select 
                name="paket"
                value={formData.paket} 
                onChange={handleChange}
                className="w-full bg-transparent font-bold text-slate-800 border-none p-0 focus:ring-0 cursor-pointer"
                required
              >
                <option value="">-- Pilih Paket --</option>
                <option value="Paket Kilat (50rb)">Paket Kilat (50rb)</option>
                <option value="Paket Freelancer (75rb)">Paket Freelancer (75rb)</option>
                <option value="Paket UMKM / Badan (80rb)">Paket UMKM / Badan (80rb)</option>
              </select>
            </div>

            {/* 2. Nomor WA (Semua Paket) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Phone size={18} /></div>
                <input type="tel" name="noWa" value={formData.noWa} onChange={handleChange} placeholder="08xxx" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
              </div>
            </div>

            {/* --- FORM KHUSUS BADAN USAHA --- */}
            {formData.kategori === 'badan' && (
                <div className="space-y-5 border-t border-dashed pt-5 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 border border-yellow-200">
                        <span className="font-bold">Info:</span> Data di bawah untuk keperluan NPWP Badan.
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Badan Usaha</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Building2 size={18} /></div>
                            <input type="text" name="namaBadan" value={formData.namaBadan} onChange={handleChange} placeholder="Contoh: Maju Jaya Sejahtera" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Bentuk Badan</label>
                            <select name="bentukBadan" value={formData.bentukBadan} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none">
                                <option value="PT">PT</option>
                                <option value="CV">CV</option>
                                <option value="Yayasan">Yayasan</option>
                                <option value="Koperasi">Koperasi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Akta (Opsional)</label>
                            <div className="relative">
                                <input type="file" onChange={(e) => handleFileChange(e, 'fotoAkta')} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DATA PRIBADI / PENANGGUNG JAWAB --- */}
            <div className="space-y-5 border-t border-dashed pt-5">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    {formData.kategori === 'badan' ? 'Data Penanggung Jawab' : 'Data Pribadi'}
                </h3>

                {/* Nama Lengkap */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {formData.kategori === 'badan' ? 'Nama Pengurus / Direktur' : 'Nama Lengkap (Sesuai KTP)'}
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><User size={18} /></div>
                        <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Lengkap" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
                    </div>
                </div>

                 {/* Jabatan (Khusus Badan) */}
                 {formData.kategori === 'badan' && (
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Jabatan</label>
                        <input type="text" name="jabatan" value={formData.jabatan} onChange={handleChange} placeholder="Contoh: Direktur Utama" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
                    </div>
                 )}

                {/* Pekerjaan (Khusus Freelancer) */}
                {formData.kategori === 'freelance' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Jenis Pekerjaan / Usaha</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Briefcase size={18} /></div>
                            <input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} placeholder="Contoh: Content Creator / Dokter / Pedagang Online" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Kami akan bantu sesuaikan KLU (Klasifikasi Lapangan Usaha) yang tepat.</p>
                    </div>
                )}

                {/* NIK */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">NIK (16 Digit)</label>
                    <input type="number" name="nik" value={formData.nik} onChange={handleChange} placeholder="Nomor Induk Kependudukan" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
                </div>

                 {/* Alamat */}
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Lengkap</label>
                    <textarea name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan" rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none resize-none" required></textarea>
                </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#2c4f40] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#223d32] transition shadow-lg flex items-center justify-center gap-2 mt-4">
              {isSubmitting ? 'Memproses...' : <><Send size={20} /> Kirim Data</>}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;