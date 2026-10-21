"use client";

import { useEffect, useState } from "react";

// The current time in Balayan (Asia/Manila), e.g. "2:14 PM". Until it mounts it shows
// the time zone instead, so the server-rendered HTML never carries a stale time.
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return <>{time ?? "UTC+8"}</>;
}
