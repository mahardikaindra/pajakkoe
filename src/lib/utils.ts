// src/lib/utils.ts

// format currency
const formatCurrency = (amount: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// parse JSON safely
const safeJsonParse = <T>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return defaultValue;
  }
};

const handlePesanWA = (paket: string) => {
  const nomorWA = "6285797946263";
  let pesan = "";

  if (paket === "Tanya-tanya" || paket === "Umum") {
    pesan =
      "Halo Admin, saya mau bikin NPWP 30 menit jadi. Bayar setelah jadi kan?";
  } else {
    pesan = `Halo Admin, saya mau ambil *${paket}*. Apa benar bayar setelah dokumen jadi?`;
  }

  const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
};

export { formatCurrency, safeJsonParse, handlePesanWA };
