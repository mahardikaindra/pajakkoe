import { FileText } from "lucide-react";

const ChatBubble = ({
  sender,
  text,
  time,
  image,
}: {
  sender: string;
  text: string;
  time: string;
  image?: boolean;
}) => {
  const isUser = sender === "user";
  return (
    <div
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${isUser ? "bg-[#E7FFDB] rounded-tr-none" : "bg-white rounded-tl-none"}`}
      >
        {image && (
          <div className="mb-2 bg-slate-200 rounded-lg h-24 w-full flex items-center justify-center text-slate-400 text-xs overflow-hidden">
            <div className="bg-brand-blue/10 w-full h-full flex flex-col items-center justify-center">
              <FileText className="w-8 h-8 text-brand-blue mb-1" />
              <span className="font-bold text-slate-700">NPWP_DIGITAL.pdf</span>
            </div>
          </div>
        )}
        <p className="text-sm text-slate-800 leading-snug">{text}</p>
        <span className="text-[10px] text-slate-400 block text-right mt-1">
          {time}
        </span>
      </div>
    </div>
  );
};
export default ChatBubble;
