/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/utils.ts

import { WA_PHONE_NUMBER } from "./constants";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

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

const sendAnalyticsEvent = (
  eventName: string,
  eventParams?: { [key: string]: any },
) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

const handlePesanWA = (paket: string) => {
  const nomorWA = WA_PHONE_NUMBER;

  sendAnalyticsEvent("click_consultation", {
    package: paket,
  });

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

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const encodeSlug = (slug: string) => encodeURIComponent(slug);

export {
  formatCurrency,
  safeJsonParse,
  handlePesanWA,
  slugify,
  encodeSlug,
  sendAnalyticsEvent,
};
