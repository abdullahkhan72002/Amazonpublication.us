"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureTrackingFromUrl } from "@/lib/tracking";

export default function TrackingCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureTrackingFromUrl();
  }, [pathname, searchParams]);

  return null;
}
