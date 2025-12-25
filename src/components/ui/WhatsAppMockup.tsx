import { FileText, Send } from "lucide-react";
import ChatBubble from "./ChatBubble";

const WhatsAppMockup = () => (
  <div className="relative mx-auto w-full max-w-[300px] bg-slate-900 rounded-[30px] border-8 border-slate-900 shadow-2xl overflow-hidden">
    <div className="bg-[#075E54] p-3 flex items-center gap-3 text-white">
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <FileText size={16} />
      </div>
      <div>
        <p className="font-bold text-sm">Admin Pajak!Koe</p>
        <p className="text-[10px] text-green-100">Online</p>
      </div>
    </div>
    <div className="bg-[#e5ddd5] h-[400px] p-4 overflow-y-auto flex flex-col relative">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4a5568 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>
      <div className="z-10">
        <ChatBubble
          sender="user"
          text="Min, mau bikin NPWP dong. Mager bangun nih, bisa?"
          time="09:00"
          image={undefined}
        />
        <ChatBubble
          sender="admin"
          text="Bisa banget kak! Cuman 30 menit jadi kok. Santai aja."
          time="09:01"
          image={undefined}
        />
        <ChatBubble
          sender="user"
          text="Oke, tapi aku takut kirim foto KTP full.."
          time="09:02"
          image={undefined}
        />
        <ChatBubble
          sender="admin"
          text="Tenang kak, DISINI AMAN. Gak perlu kirim foto utuh dokumen pribadi kok."
          time="09:03"
          image={undefined}
        />
        <ChatBubble
          sender="admin"
          text="Nih kak, NPWP nya udah jadi ya! Silahkan dicek dulu."
          time="09:30"
          image={true}
        />
        <ChatBubble
          sender="user"
          text="Wih cepet banget! Oke aku transfer 100K nya ya."
          time="09:32"
          image={undefined}
        />
      </div>
    </div>
    <div className="bg-slate-100 p-2 flex items-center gap-2">
      <div className="bg-white grow rounded-full h-8 px-3 text-xs flex items-center text-slate-400">
        Ketik pesan...
      </div>
      <div className="w-8 h-8 bg-[#00897b] rounded-full flex items-center justify-center text-white">
        <Send size={16} />
      </div>
    </div>
  </div>
);

export default WhatsAppMockup;
