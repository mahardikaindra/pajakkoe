/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Twitter,
  Linkedin,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { auth } from "@/src/lib/firebase";

const ARTICLES_DATA = [
  {
    id: 1,
    title: "10 Kendala Daftar NPWP di Coretax System dan Solusinya",
    date: "29 Des 2025",
    category: "Kesulitan Pendaftaran",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&h=400&fit=crop",
    author: "Admin Pajak!Koe",
    readTime: "5 menit",
    tags: ["Coretax", "NPWP", "Pendaftaran"],
    content:
      "Transisi ke Coretax System memang menantang. Pelajari 10 hambatan utama mulai dari validasi NIK hingga masalah teknis sistem terbaru yang sering dihadapi wajib pajak.",
  },
  {
    id: 2,
    title: "5 Manfaat Coretax System: Revolusi Administrasi Pajak Indonesia",
    date: "27 Des 2025",
    category: "Edukasi",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=250&fit=crop",
    author: "Admin Pajak!Koe",
    readTime: "4 menit",
    tags: ["Coretax", "Sistem Pajak", "Inovasi"],
    content:
      "Coretax bukan sekadar sistem baru, tapi evolusi layanan digital. Dari integrasi data hingga kemudahan pelaporan dalam satu dasbor terpadu.",
  },
  {
    id: 3,
    title: "Dampak Fatal Jika Tidak Melakukan Update Data Coretax",
    date: "25 Des 2025",
    category: "Edukasi",
    tags: ["Coretax", "Update Data", "Sanksi Pajak"],
    image:
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=400&h=250&fit=crop",
    author: "Admin Pajak!Koe",
    readTime: "6 menit",
    content:
      "Ketahui risiko sanksi administratif dan hambatan transaksi bisnis jika Anda mengabaikan pembaruan profil di sistem Coretax terbaru.",
  },
];
// Mock blog data for demonstration purposes
const BlogDetail = () => {
  const router = useRouter();
  const params = useParams();

  const [claps, setClaps] = useState(100); // Initial claps
  const handlePostClick = (post: any) => {
    // setSelectedPost(post);
    setClaps(Math.floor(100) + 50); // Mock claps
    // setCurrentView('detail');
  };

  const postId = parseInt(params.id as string, 10);
  const postData = ARTICLES_DATA.find((p) => p.id === postId);

  useEffect(() => {
    if (!postData) {
      // If post not found, navigate back or show 404
      router.back();
    }
  }, [postData, router]);
  if (!postData) {
    return null; // Or a loading state / 404 component
  }
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 pt-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-900 transition-colors group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Kembali
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-950 digitale-heading leading-[1.1] mb-8 italic">
          {postData.title}
        </h1>

        {/* Author Bio Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-y border-gray-100 mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-linear-to-br from-emerald-200 to-emerald-900/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900">{postData.author}</h4>
                <span className="text-emerald-600 font-bold text-xs hover:underline cursor-pointer">
                  Ikuti
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{postData.readTime} baca</span>
                <span>•</span>
                <span>{postData.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
              <Twitter
                size={18}
                className="text-gray-400 hover:text-black cursor-pointer"
              />
              <Linkedin
                size={18}
                className="text-gray-400 hover:text-black cursor-pointer"
              />
              <Share2
                size={18}
                className="text-gray-400 hover:text-black cursor-pointer"
              />
            </div>
            <Bookmark
              size={20}
              className="text-gray-400 hover:text-emerald-900 cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <figure className="max-w-5xl mx-auto mb-16 px-6 lg:px-0">
        <Image
          src={postData.image}
          alt={postData.title}
          className="w-full h-auto rounded-3xl shadow-xl"
          width={800}
          height={400}
        />
        <figcaption className="text-center text-sm text-gray-400 mt-4 italic font-medium">
          Ilustrasi implementasi Coretax System - Dokumen Pajakkoe
        </figcaption>
      </figure>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="medium-serif text-lg md:text-xl text-gray-800 leading-relaxed space-y-8 prose prose-emerald prose-lg"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-16 pb-12 border-b border-gray-100">
          {postData.tags.map((tag: any) => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interaction Bar (Bottom) */}
        <div className="flex items-center justify-between py-12">
          <div className="flex items-center gap-8 text-gray-500">
            <button
              className="flex items-center gap-2 group hover:text-emerald-900 transition-colors"
              onClick={() => setClaps(claps + 1)}
            >
              <ThumbsUp
                size={24}
                className="group-active:scale-125 transition-transform"
              />
              <span className="font-bold text-sm">{claps}</span>
            </button>
            <button className="flex items-center gap-2 group hover:text-emerald-900 transition-colors">
              <MessageCircle size={24} />
              <span className="font-bold text-sm">12</span>
            </button>
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <Share2 size={20} className="hover:text-black cursor-pointer" />
            <Bookmark
              size={20}
              className="hover:text-emerald-900 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <section className="bg-gray-50 mt-12 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-black text-emerald-950 mb-12 digitale-heading italic">
            Baca Juga
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES_DATA.filter((p) => p.id !== postData.id)
              .slice(0, 3)
              .map((rec) => (
                <div
                  key={rec.id}
                  className="group cursor-pointer"
                  onClick={() => handlePostClick(rec)}
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      width={400}
                      height={250}
                    />
                  </div>
                  <h4 className="font-black text-emerald-950 group-hover:text-emerald-700 leading-tight mb-2">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    {rec.date}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
