/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { sendAnalyticsEvent } from "@lib/utils";

interface ArticleAnalyticsProps {
  title: string;
  slug: string;
}

export default function ArticleAnalytics({
  title,
  slug,
}: ArticleAnalyticsProps) {
  useEffect(() => {
    if (title && slug) {
      sendAnalyticsEvent("read_article", {
        article_title: title,
        article_slug: slug,
      });
    }
  }, [title, slug]);

  return null;
}
