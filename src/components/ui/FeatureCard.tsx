const FeatureCard = ({
  icon,
  bgIcon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  bgIcon: string;
  title: string;
  desc: string;
}) => (
  <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition duration-300 border border-slate-100 group">
    <div
      className={`w-14 h-14 ${bgIcon} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default FeatureCard;
