import { site } from "@/lib/site";

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionSummary = {
  days: ContributionDay[];
  total: number;
  longestStreak: number;
  busiestDay: ContributionDay | null;
};

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

// GitHub's public contributions calendar (the same HTML its profile page loads), so no
// API token is needed. Refetched at most every 6 hours; returns null if GitHub is
// unreachable or the markup changes, and the section falls back to a profile link.
export async function getContributions(): Promise<ContributionSummary | null> {
  try {
    const res = await fetch(`https://github.com/users/${site.github.user}/contributions`, {
      headers: { "User-Agent": "linux-adona-portfolio" },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Each day is a <td data-date data-level id>; its exact count lives in a <tool-tip for=id>.
    const counts = new Map<string, number>();
    for (const [, id, label] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const n = label.match(/^([\d,]+) contribution/);
      counts.set(id, n ? Number(n[1].replace(/,/g, "")) : 0);
    }

    const days: ContributionDay[] = [];
    for (const [tag] of html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
      const date = attr(tag, "data-date");
      const id = attr(tag, "id");
      const level = Number(attr(tag, "data-level") ?? 0);
      if (!date || !id) continue;
      days.push({
        date,
        count: counts.get(id) ?? 0,
        level: Math.min(4, Math.max(0, level)) as ContributionDay["level"],
      });
    }
    if (days.length === 0) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));

    let longestStreak = 0;
    let streak = 0;
    let busiestDay: ContributionDay | null = null;
    for (const day of days) {
      streak = day.count > 0 ? streak + 1 : 0;
      longestStreak = Math.max(longestStreak, streak);
      if (day.count > (busiestDay?.count ?? 0)) busiestDay = day;
    }

    return {
      days,
      total: days.reduce((sum, d) => sum + d.count, 0),
      longestStreak,
      busiestDay,
    };
  } catch {
    return null;
  }
}
