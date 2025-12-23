/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import {
  Check,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Upload,
  Send,
  IdCard,
  MapPinHouse,
  Briefcase,
  Building,
  Lock,
} from "lucide-react";
// Removed next/image as it requires Next.js environment
import Image from "next/image";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../lib/firebase";

const appId = process.env.NEXT_PUBLIC_APP_ID || "default-app-id";

const OrderForm = () => {
  // State untuk data form (String/Text)
  const initialFormData = {
    nama: "",
    email: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    pekerjaan: "",
    namaIbuKandung: "",
    statusDalamKK: "",
    nik: "",
    noWa: "",
    nokk: "",
    agama: "",
    paket: "",
    statusPerkawinan: "",
    kategori: "pribadi",
    fotoKtp: "", // Nanti akan diisi URL setelah upload
    fotoKK: "", // Nanti akan diisi URL setelah upload
  };

  const initialFormDataBadan = {
    nikNotaris: "",
    nikKoperasi: "",
    email: "",
    password: "",
    noWa: "",
    paket: "",
    kategori: "badan",
    namaBadanUsaha: "",
    jenisBadanUsaha: "",
    fotoSK: "", // Nanti akan diisi URL setelah upload
    fotoAkta: "", // Nanti akan diisi URL setelah upload
  };

  // State untuk menyimpan Objek File Asli (Blob) untuk diupload ke Storage
  const [fileObjects, setFileObjects] = useState<{
    fotoKtp?: File | null;
    fotoKK?: File | null;
    fotoSK?: File | null;
    fotoAkta?: File | null;
  }>({});

  const [user, setUser] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [isAggrementChecked, setIsAgreementChecked] = useState(false);
  const [showAggrementPopup, setShowAggrementPopup] = useState(false);
  const [showPersonalFields, setShowPersonalFields] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [formDataBadan, setFormDataBadan] = useState(initialFormDataBadan);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [previews, setPreviews] = useState<{
    fotoKtp?: string;
    fotoKK?: string;
    fotoSK?: string;
    fotoAkta?: string;
  }>({});

  // 1. Mengambil parameter dari URL
  useEffect(() => {
    const getParams = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const paketParam = params.get("paket");
        const waParam = params.get("wa");
        let kategoriOtomatis = "pribadi";
        let namaPaket = "";
        if (paketParam === "kilat") {
          kategoriOtomatis = "pribadi";
          namaPaket = "Paket Kilat (50rb)";
        } else if (paketParam === "badan") {
          kategoriOtomatis = "badan";
          namaPaket = "NPWP Badan Usaha (75rb)";
        } else {
          namaPaket = paketParam || "";
        }
        setFormData((prev) => ({
          ...prev,
          paket: namaPaket,
          kategori: kategoriOtomatis,
          noWa: waParam || "",
        }));
        setFormDataBadan((prev) => ({
          ...prev,
          paket: namaPaket,
          kategori: kategoriOtomatis,
          noWa: waParam || "",
        }));
      }
    };
    getParams();
  }, []);

  const updateUrlParam = (value: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      // Map value select ke param URL yang sesuai logika useEffect
      if (value.includes("Kilat")) {
        url.searchParams.set("paket", "kilat");
      } else if (value.includes("Badan")) {
        url.searchParams.set("paket", "badan");
      } else {
        url.searchParams.set("paket", value);
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "paket") {
      let kategoriBaru = "pribadi";
      if (value.includes("Badan")) kategoriBaru = "badan";

      // Update URL Param saat paket berubah
      updateUrlParam(value);

      // Jika ganti paket, reset agreement jika pindah kategori
      if (kategoriBaru !== formData.kategori) {
        setIsAgreementChecked(false);
      }
      setFormDataBadan((prev) => ({ ...prev, kategori: kategoriBaru }));
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        kategori: kategoriBaru,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChangeBadan = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "paket") {
      let kategoriBaru = "pribadi";
      if (value.includes("Badan")) kategoriBaru = "badan";

      // Update URL Param saat paket berubah
      updateUrlParam(value);

      // Jika ganti paket, reset agreement jika pindah kategori
      if (kategoriBaru !== formData.kategori) {
        setIsAgreementChecked(false);
      }
      setFormData((prev) => ({ ...prev, kategori: kategoriBaru }));
      setFormDataBadan((prev) => ({
        ...prev,
        [name]: value,
        kategori: kategoriBaru,
      }));
    } else {
      setFormDataBadan((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "fotoKtp" | "fotoKK",
  ) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    // 1. Simpan File Object (untuk upload nanti)
    setFileObjects((prev) => ({
      ...prev,
      [fieldName]: file,
    }));

    // 2. Simpan nama file sementara di formData (opsional, untuk UI statis)
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file.name,
    }));

    // 3. Preview Image
    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({
        ...prev,
        [fieldName]: previewUrl,
      }));
    }
  };

  const handleFileChangeBadan = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "fotoSK" | "fotoAkta",
  ) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    // 1. Simpan File Object
    setFileObjects((prev) => ({
      ...prev,
      [fieldName]: file,
    }));

    // 2. Simpan nama file
    setFormDataBadan((prev) => ({
      ...prev,
      [fieldName]: file.name,
    }));

    // 3. Preview
    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({
        ...prev,
        [fieldName]: previewUrl,
      }));
    }
  };

  // Helper function untuk upload file
  const uploadFileToStorage = async (file: File, path: string) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error(`Error uploading ${path}:`, error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const uniqueId = `${formData.noWa.replace(/\D/g, "")}_${Date.now()}`;

      let fotoKtpUrl = "-";
      let fotoKKUrl = "-";

      // 1. Upload Foto KTP jika ada
      if (fileObjects.fotoKtp) {
        const path = `artifacts/${appId}/public/images/${uniqueId}/ktp_${fileObjects.fotoKtp.name}`;
        fotoKtpUrl = await uploadFileToStorage(fileObjects.fotoKtp, path);
      }

      // 2. Upload Foto KK jika ada
      if (fileObjects.fotoKK) {
        const path = `artifacts/${appId}/public/images/${uniqueId}/kk_${fileObjects.fotoKK.name}`;
        fotoKKUrl = await uploadFileToStorage(fileObjects.fotoKK, path);
      }

      // 3. Submit Data ke Firestore dengan URL
      await addDoc(
        collection(db, "artifacts", appId, "public", "data", "orders"),
        {
          ...formData,
          appId: appId,
          fotoKtp: fotoKtpUrl, // Simpan URL hasil upload
          fotoKK: fotoKKUrl, // Simpan URL hasil upload
          createdAt: serverTimestamp(),
          uniqueId: uniqueId,
        },
      );

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setErrorMessage(
        "Gagal mengirim data. Silakan periksa koneksi internet Anda dan coba lagi.",
      );
      setIsSubmitting(false);
    }
  };

  const handleSubmitBadan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const uniqueId = `${formDataBadan.noWa.replace(/\D/g, "")}_${Date.now()}`;

      let fotoSKUrl = "-";
      let fotoAktaUrl = "-";

      // 1. Upload Foto SK jika ada
      if (fileObjects.fotoSK) {
        const path = `artifacts/${appId}/public/images/${uniqueId}/sk_${fileObjects.fotoSK.name}`;
        fotoSKUrl = await uploadFileToStorage(fileObjects.fotoSK, path);
      }

      // 2. Upload Foto Akta jika ada
      if (fileObjects.fotoAkta) {
        const path = `artifacts/${appId}/public/images/${uniqueId}/akta_${fileObjects.fotoAkta.name}`;
        fotoAktaUrl = await uploadFileToStorage(fileObjects.fotoAkta, path);
      }

      // 3. Submit Data ke Firestore dengan URL
      await addDoc(
        collection(db, "artifacts", appId, "public", "dataBadan", "orders"),
        {
          ...formDataBadan,
          appId: appId,
          fotoSK: fotoSKUrl, // Simpan URL
          fotoAkta: fotoAktaUrl, // Simpan URL
          createdAt: serverTimestamp(),
          uniqueId: uniqueId,
        },
      );

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setErrorMessage(
        "Gagal mengirim data. Silakan periksa koneksi internet Anda dan coba lagi.",
      );
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setShowAggrementPopup(false);
    setIsAgreementChecked(false);
    setShowPersonalFields(true);
  };

  const handleAgreeInPopup = () => {
    setIsAgreementChecked(true);
    setShowAggrementPopup(false);
  };

  // Render Sukses
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Data Diterima!
          </h2>
          <p className="text-slate-600 mb-6">
            Silakan konfirmasi data Anda melalui WhatsApp CS kami di{" "}
            <strong>
              <a href="https://wa.me/6285797946263">+6285797946263</a>
            </strong>
            . Kami akan menghubungi Anda segera.
          </p>
          <button
            onClick={() =>
              (window.location.href = "https://wa.me/6285797946263")
            }
            className="bg-[#2c4f40] text-white px-6 py-3 rounded-xl font-bold w-full hover:bg-[#223d32] transition"
          >
            Hubungi via WhatsApp
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
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <span className="font-bold text-lg text-[#2c4f40]">
            Formulir Data
          </span>
        </div>
      </div>

      <div className="pt-24 px-4 max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-[#2c4f40] p-6 text-white">
            <h1 className="text-xl font-bold mb-1">Lengkapi Data</h1>
            <p className="text-green-100 text-sm">
              {formData.kategori === "badan"
                ? "Formulir khusus pendaftaran NPWP Badan Usaha."
                : "Formulir pendaftaran NPWP Pribadi."}
            </p>
          </div>

          {formData.kategori === "pribadi" && (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                  {errorMessage}
                </div>
              )}

              {/* 1. Pilih Paket */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Paket Dipilih
                </label>
                <select
                  name="paket"
                  value={formData.paket}
                  onChange={handleChange}
                  className="w-full bg-transparent font-bold text-slate-800 border-none p-0 focus:ring-0 cursor-pointer"
                  required
                >
                  <option value="">-- Pilih Paket --</option>
                  <option value="Paket Kilat (50rb)">Paket Kilat (50rb)</option>
                  <option value="NPWP Badan Usaha (75rb)">
                    NPWP Badan Usaha (75rb)
                  </option>
                </select>
              </div>

              {/* 2. Form Umum */}
              {formData.kategori === "pribadi" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        name="noWa"
                        value={formData.noWa}
                        onChange={handleChange}
                        placeholder="08xxx"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Lengkap (Sesuai KTP)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Nama Lengkap"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Tambahan field lain sesuai kebutuhan */}
                  {showPersonalFields && formData.kategori === "pribadi" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          NIK
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <IdCard size={18} />
                          </div>
                          <input
                            type="text"
                            name="nik"
                            value={formData.nik}
                            onChange={handleChange}
                            placeholder="Nomor NIK"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Tempat Lahir
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <MapPinHouse size={18} />
                          </div>
                          <input
                            type="text"
                            name="tempatLahir"
                            value={formData.tempatLahir}
                            onChange={handleChange}
                            placeholder="Tempat Lahir"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Tanggal Lahir
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="tanggalLahir"
                            value={formData.tanggalLahir}
                            onChange={handleChange}
                            placeholder="Tanggal Lahir"
                            className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Jenis Kelamin
                        </label>
                        <select
                          name="jenisKelamin"
                          value={formData.jenisKelamin}
                          onChange={handleChange}
                          className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        >
                          <option value="">Pilih Jenis Kelamin</option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Agama
                        </label>
                        <select
                          name="agama"
                          value={formData.agama}
                          onChange={handleChange}
                          className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        >
                          <option value="">Pilih Agama</option>
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Pekerjaan
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Briefcase size={18} />
                          </div>
                          <input
                            type="text"
                            name="pekerjaan"
                            value={formData.pekerjaan}
                            onChange={handleChange}
                            placeholder="Pekerjaan"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Status Perkawinan
                        </label>
                        <select
                          name="statusPerkawinan"
                          value={formData.statusPerkawinan}
                          onChange={handleChange}
                          className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        >
                          <option value="">Pilih Status Perkawinan</option>
                          <option value="Belum Kawin">Belum Kawin</option>
                          <option value="Kawin">Kawin</option>
                          <option value="Cerai Hidup">Cerai Hidup</option>
                          <option value="Cerai Mati">Cerai Mati</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Nama Ibu Kandung
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <User size={18} />
                          </div>
                          <input
                            type="text"
                            name="namaIbuKandung"
                            value={formData.namaIbuKandung}
                            onChange={handleChange}
                            placeholder="Nama Ibu Kandung"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Status Dalam KK
                        </label>
                        <select
                          name="statusDalamKK"
                          value={formData.statusDalamKK}
                          onChange={handleChange}
                          className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        >
                          <option value="">Pilih Status Dalam KK</option>
                          <option value="Kepala Keluarga">
                            Kepala Keluarga
                          </option>
                          <option value="Istri">Istri</option>
                          <option value="Anak">Anak</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Logic conditional: Upload KTP & KK */}
              {formData.kategori === "pribadi" && showPersonalFields && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 mb-2">
                    Silakan unggah pas foto pendukung untuk melanjutkan.
                  </div>
                  {/* Upload KTP */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Pas Foto KTP
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition relative overflow-hidden">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "fotoKtp")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/png, image/jpeg, application/pdf"
                      />
                      {previews.fotoKtp ? (
                        <div className="relative w-full h-40">
                          {fileObjects.fotoKtp?.type === "application/pdf" ? (
                            <iframe
                              src={previews.fotoKtp}
                              className="w-full h-full rounded-lg"
                              title="Preview Pas Foto KTP"
                            />
                          ) : (
                            <Image
                              fill
                              src={previews.fotoKtp}
                              alt="Pas Foto KTP"
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="py-4">
                          <Upload className="mx-auto text-slate-400 mb-2" />
                          <p className="text-xs">Upload Pas Foto KTP</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Logic conditional: Upload KTP & KK (Agreement Check) */}
              {formData.kategori === "pribadi" && isAggrementChecked && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 mb-2">
                    Silakan unggah dokumen pendukung untuk melanjutkan.
                  </div>
                  {/* Upload KTP */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Foto KTP
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition relative overflow-hidden">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "fotoKtp")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/png, image/jpeg, application/pdf"
                      />
                      {previews.fotoKtp ? (
                        <div className="relative w-full h-40">
                          {fileObjects.fotoKtp?.type === "application/pdf" ? (
                            <iframe
                              src={previews.fotoKtp}
                              className="w-full h-full rounded-lg"
                              title="Preview Foto KTP"
                            />
                          ) : (
                            <Image
                              fill
                              src={previews.fotoKtp}
                              alt="KTP"
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="py-4">
                          <Upload className="mx-auto text-slate-400 mb-2" />
                          <p className="text-xs">Upload Foto KTP</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Upload KK */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Foto Kartu Keluarga
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition relative overflow-hidden">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "fotoKK")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/png, image/jpeg, application/pdf"
                      />
                      {previews.fotoKK ? (
                        <div className="relative w-full h-40">
                          {fileObjects.fotoKK?.type === "application/pdf" ? (
                            <iframe
                              src={previews.fotoKK}
                              className="w-full h-full rounded-lg"
                              title="Preview Foto KK"
                            />
                          ) : (
                            <Image
                              fill
                              src={previews.fotoKK}
                              alt="KK"
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="py-4">
                          <Upload className="mx-auto text-slate-400 mb-2" />
                          <p className="text-xs">Upload Foto KK</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Checkbox Agreement dan Baca syarat dan ketentuan */}
              <div className="pt-2">
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAgree}
                    onChange={(e) => setIsAgree(e.target.checked)}
                    className="w-4 h-4 border border-slate-300 rounded focus:ring-2 focus:ring-[#2c4f40]"
                  />
                  <span>
                    Saya setuju untuk mengirim data sesuai{" "}
                    <a
                      href="/syarat-ketentuan"
                      className="text-[#2c4f40] underline"
                    >
                      syarat dan ketentuan
                    </a>{" "}
                    yang berlaku.
                  </span>
                </label>
              </div>

              {/* 4. Tombol Action */}
              {formData.kategori === "pribadi" &&
              !isAggrementChecked &&
              !showPersonalFields ? (
                <button
                  type="button"
                  onClick={() => setShowAggrementPopup(true)}
                  className="w-full bg-[#2c4f40] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#223d32] transition shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  Lanjutkan <Send size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isAgree}
                  className="w-full bg-[#2c4f40] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#223d32] transition shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Mengirim..."
                  ) : (
                    <>
                      <Send size={20} /> Terbitkan NPWP Rp 50.000
                    </>
                  )}
                </button>
              )}
            </form>
          )}

          {formDataBadan.kategori === "badan" && (
            <form onSubmit={handleSubmitBadan} className="p-6 space-y-5">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                  {errorMessage}
                </div>
              )}
              {/* 1. Pilih Paket */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Paket Dipilih
                </label>
                <select
                  name="paket"
                  value={formDataBadan.paket}
                  onChange={handleChange}
                  className="w-full bg-transparent font-bold text-slate-800 border-none p-0 focus:ring-0 cursor-pointer"
                  required
                >
                  <option value="">-- Pilih Paket --</option>
                  <option value="Paket Kilat (50rb)">Paket Kilat (50rb)</option>
                  <option value="NPWP Badan Usaha (75rb)">
                    NPWP Badan Usaha (75rb)
                  </option>
                </select>
              </div>

              {/* 2. Form Umum */}
              {formDataBadan.kategori === "badan" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        name="noWa"
                        value={formDataBadan.noWa}
                        onChange={handleChangeBadan}
                        placeholder="08xxx"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formDataBadan.email}
                        onChange={handleChangeBadan}
                        placeholder="email@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formDataBadan.password}
                        onChange={handleChangeBadan}
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Tambahan field lain sesuai kebutuhan */}
                  <div className="space-y-5 border-t border-dashed pt-5 animate-in fade-in slide-in-from-bottom-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Badan Usaha
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Building size={18} />
                      </div>
                      <input
                        type="text"
                        name="namaBadanUsaha"
                        value={formDataBadan.namaBadanUsaha}
                        onChange={handleChangeBadan}
                        placeholder="Nama Badan Usaha"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Jenis Badan Usaha
                    </label>
                    <select
                      name="jenisBadanUsaha"
                      value={formDataBadan.jenisBadanUsaha}
                      onChange={handleChangeBadan}
                      className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                    >
                      <option value="">Pilih Jenis Badan Usaha</option>
                      <option value="CV">CV</option>
                      <option value="PT">PT</option>
                      <option value="PT Perseorangan">PT Perseorangan</option>
                      <option value="Firma">Firma</option>
                      <option value="Yayasan">Yayasan</option>
                      <option value="Koperasi">Koperasi</option>
                    </select>
                  </div>
                  <div>
                    <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 mb-2">
                      Silakan unggah dokumen pendukung untuk melanjutkan.
                    </div>
                    {/* Upload SK */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        File SK
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition relative overflow-hidden">
                        <input
                          type="file"
                          onChange={(e) => handleFileChangeBadan(e, "fotoSK")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/png, image/jpeg, application/pdf"
                        />
                        {previews.fotoSK ? (
                          <div className="relative w-full h-40">
                            {fileObjects.fotoSK?.type === "application/pdf" ? (
                              <iframe
                                src={previews.fotoSK}
                                className="w-full h-full rounded-lg"
                                title="Preview SK"
                              />
                            ) : (
                              <Image
                                fill
                                src={previews.fotoSK}
                                alt="SK"
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="py-4">
                            <Upload className="mx-auto text-slate-400 mb-2" />
                            <p className="text-xs">Upload File SK</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Upload Akta */}
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        File Akta
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 transition relative overflow-hidden">
                        <input
                          type="file"
                          onChange={(e) => handleFileChangeBadan(e, "fotoAkta")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/png, image/jpeg, application/pdf"
                        />
                        {previews.fotoAkta ? (
                          <div className="relative w-full h-40">
                            {fileObjects.fotoAkta?.type ===
                            "application/pdf" ? (
                              <iframe
                                src={previews.fotoAkta}
                                className="w-full h-full rounded-lg"
                                title="Preview Akta"
                              />
                            ) : (
                              <Image
                                fill
                                src={previews.fotoAkta}
                                alt="Akta"
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="py-4">
                            <Upload className="mx-auto text-slate-400 mb-2" />
                            <p className="text-xs">Upload File Akta</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      NIK Notaris
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <IdCard size={18} />
                      </div>
                      <input
                        type="text"
                        name="nikNotaris"
                        value={formDataBadan.nikNotaris}
                        onChange={handleChangeBadan}
                        placeholder="NIK Notaris"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      NIK Koperasi
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <IdCard size={18} />
                      </div>
                      <input
                        type="text"
                        name="nikKoperasi"
                        value={formDataBadan.nikKoperasi}
                        onChange={handleChangeBadan}
                        placeholder="NIK Koperasi"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#2c4f40] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Checkbox Agreement */}
              <div className="pt-2">
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAgree}
                    onChange={(e) => setIsAgree(e.target.checked)}
                    className="w-4 h-4 border border-slate-300 rounded focus:ring-2 focus:ring-[#2c4f40]"
                  />
                  <span>
                    Saya setuju untuk mengirim data sesuai{" "}
                    <a
                      href="/syarat-ketentuan"
                      className="text-[#2c4f40] underline"
                    >
                      syarat dan ketentuan
                    </a>{" "}
                    yang berlaku.
                  </span>
                </label>
              </div>

              {/* 4. Tombol Action */}
              {formDataBadan.kategori === "badan" && (
                <button
                  type="submit"
                  disabled={isSubmitting || !isAgree}
                  className="w-full bg-[#2c4f40] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#223d32] transition shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Mengirim..."
                  ) : (
                    <>
                      <Send size={20} /> Terbitkan NPWP Rp 75.000
                    </>
                  )}
                </button>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Aggrement Popup */}
      {showAggrementPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200 justify-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Butuh Dokumen Pendukung
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Untuk mendaftarkan NPWP Pribadi, sistem membutuhkan foto{" "}
              <strong>KTP & Kartu Keluarga</strong> yang jelas untuk proses
              validasi data ke Dirjen Pajak.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAgreeInPopup}
                className="w-full py-4 rounded-2xl bg-[#2c4f40] text-white font-bold hover:bg-[#223d32] transition"
              >
                Saya Mengerti & Siapkan Dokumen
              </button>
              <button
                onClick={handleClosePopup}
                className="w-full py-4 rounded-2xl border border-slate-200 text-slate-500 font-medium hover:bg-slate-50 transition"
              >
                Saya Tidak Bersedia, Gunakan Metode Lain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
