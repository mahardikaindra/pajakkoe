/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Check, ArrowLeft, User, Phone, 
  Upload, Send, Briefcase, Building2, ImageIcon 
} from 'lucide-react';

import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
// import { 
//   ref, 
//   uploadBytes, 
//   getDownloadURL 
// } from "firebase/storage";
import { db } from '../../firebase';

const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id';

const OrderForm = () => {
  // State untuk data form
  const [formData, setFormData] = useState({
    nama: '',
    namaBadan: '', 
    bentukBadan: 'PT', 
    jabatan: '', 
    pekerjaan: '', 
    nik: '',
    noWa: '',
    nokk: '',
    alamat: '',
    paket: '',
    kategori: 'pribadi', // 'pribadi', 'freelance', 'badan'
    fotoKtp: null,
    fotoKK: null,
    fotoAkta: null 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previews, setPreviews] = useState({
    fotoKtp: null,
    fotoAkta: null
  });

  // 1. Mengambil parameter dari URL
  useEffect(() => {
    const getParams = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const paketParam = params.get('paket'); 
        const waParam = params.get('wa');
        
        let kategoriOtomatis = 'pribadi';
        let namaPaket = '';

        if (paketParam === 'kilat') {
            kategoriOtomatis = 'pribadi';
            namaPaket = 'Paket Kilat (50rb)';
        }
        // else if (paketParam === 'freelancer') {
        //     kategoriOtomatis = 'freelance';
        //     namaPaket = 'Paket Freelancer (75rb)';
        // } 
        else if (paketParam === 'badan') {
            kategoriOtomatis = 'badan';
            namaPaket = 'Paket UMKM / Badan (75rb)';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'paket') {
        let kategoriBaru = 'pribadi';
        // if (value.includes('Freelancer')) kategoriBaru = 'freelance';
        if (value.includes('Badan')) kategoriBaru = 'badan';
        setFormData(prev => ({ ...prev, [name]: value, kategori: kategoriBaru }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, [fieldName]: file }));

      // Buat URL preview
      if (file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          setPreviews(prev => ({ ...prev, [fieldName]: url }));
      } else {
          // Jika bukan gambar (misal PDF), kosongkan preview visual
          setPreviews(prev => ({ ...prev, [fieldName]: null }));
      }
    }
  };

  // 2. Handle Submit ke Firebase (Tanpa Auth)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
        // let ktpUrl = null;
        // let kkUrl = null;
        // let aktaUrl = null;
        
        // Buat ID unik sementara untuk folder karena tidak ada User ID
        // Kita gunakan Nomor WA + Timestamp agar unik
        const uniqueId = `${formData.noWa.replace(/\D/g,'')}_${Date.now()}`;

        // A. Upload KTP ke Firebase Storage
        if (formData.fotoKtp) {
            // Path: uploads/{uniqueId}/ktp_{namafile}
            // const ktpRef = ref(storage, `uploads/${uniqueId}/ktp_${(formData.fotoKtp as File).name}`);
            // await uploadBytes(ktpRef, formData.fotoKtp);
            // ktpUrl = await getDownloadURL(ktpRef);
        }

        if (formData.fotoKK) {
            // const kkRef = ref(storage, `uploads/${uniqueId}/kk_${(formData.fotoKK as File).name}`);
            // await uploadBytes(kkRef, formData.fotoKK);
            // kkUrl = await getDownloadURL(kkRef);
        }

        // B. Upload Akta ke Firebase Storage (Jika ada)
        if (formData.fotoAkta) {
            // const aktaRef = ref(storage, `uploads/${uniqueId}/akta_${(formData.fotoAkta as File).name}`);
            // await uploadBytes(aktaRef, formData.fotoAkta);
            // aktaUrl = await getDownloadURL(aktaRef);
        }

        // C. Simpan Data Pesanan ke Firestore
        // UNTUK LOKAL: Gunakan collection(db, 'orders')
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'orders'), {
            submissionId: uniqueId, // Pengganti User ID
            nama: formData.nama,
            noWa: formData.noWa,
            paket: formData.paket,
            kategori: formData.kategori,
            nik: formData.nik,
            nokk: formData.nokk,
            alamat: formData.alamat,
            pekerjaan: formData.pekerjaan || '-',
            namaBadan: formData.namaBadan || '-',
            bentukBadan: formData.bentukBadan || '-',
            jabatan: formData.jabatan || '-',
            fotoKtpUrl: 'Tidak ada', //ktpUrl || 'Tidak ada',
            fotoKKUrl: 'Tidak ada', //kkUrl || 'Tidak ada',
            fotoAktaUrl: 'Tidak ada', //aktaUrl || 'Tidak ada',
            createdAt: serverTimestamp(),
            status: 'Baru'
        });

        setIsSuccess(true);
        setIsSubmitting(false);

    } catch (error) {
        console.error("Error submitting form:", error);
        let msg = (error as Error)?.message;
        if (msg.includes("permission-denied")) {
            msg = "Izin ditolak. Pastikan Security Rules Firestore & Storage diatur ke 'allow read, write: if true;'";
        }
        setErrorMessage("Gagal mengirim data: " + msg);
        setIsSubmitting(false);
    }
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
            Terima kasih. Data & Dokumen untuk <strong>{formData.paket}</strong> telah tersimpan aman. Tim kami akan segera menghubungi Anda di <strong>{formData.noWa}</strong>.
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
                    : 'Formulir pendaftaran NPWP Pribadi.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            
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
                <option value="Paket UMKM / Badan (75rb)">Paket UMKM / Badan (75rb)</option>
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
                                <input type="file" onChange={(e) => handleFileChange(e, 'fotoAkta')} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*,application/pdf"/>
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

                {/* Upload KTP */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Foto KTP</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition relative">
                         <input type="file" onChange={(e) => handleFileChange(e, 'fotoKtp')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" required={formData.kategori !== 'badan'} />
                         {previews.fotoKtp ? (
                            <div className="relative w-full h-48">
                                <Image src={previews.fotoKtp} alt="Preview KTP" fill className="object-contain" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2">
                                        <ImageIcon size={16} /> Ganti Foto
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-4">
                                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                <p className="text-sm font-medium text-slate-600">Klik untuk upload foto KTP</p>
                                <p className="text-xs text-slate-400 mt-1">Format JPG/PNG, Max 2MB</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload KK */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Foto Kartu Keluarga</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition relative">
                         <input type="file" onChange={(e) => handleFileChange(e, 'fotoKK')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                         {previews.fotoKtp ? (
                            <div className="relative w-full h-48">
                                <Image src={previews.fotoKtp} alt="Preview KK" fill className="object-contain" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2">
                                        <ImageIcon size={16} /> Ganti Foto
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-4">
                                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                <p className="text-sm font-medium text-slate-600">Klik untuk upload foto Kartu Keluarga</p>
                                <p className="text-xs text-slate-400 mt-1">Format JPG/PNG, Max 2MB</p>
                            </div>
                        )}
                    </div>
                </div>

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
                    <input type="number" name="nik" maxLength={16} value={formData.nik} onChange={handleChange} placeholder="Nomor Induk Kependudukan" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
                </div>

                {/* NO KK */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor KK (16 Digit)</label>
                    <input type="number" name="noKk" maxLength={16} value={formData.nik} onChange={handleChange} placeholder="Nomor Kartu Keluarga" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none" required />
                </div>

                 {/* Alamat */}
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Lengkap</label>
                    <textarea name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan" rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none resize-none" required></textarea>
                </div>

                
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#2c4f40] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#223d32] transition shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <span>Mengirim...</span>
              ) : (
                <><Send size={20} /> Kirim Data</>
              )}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;