"use client";

import { useEffect, useRef, useState } from "react";
import type { ContributionDay } from "@/lib/github";

// Geometry in SVG units. The SVG scales up to fill wide screens and scrolls on narrow ones.
const CELL = 11;
const STEP = 14; // cell + 3px gap
const LEFT = 30; // weekday labels
const TOP = 20; // month labels
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEVEL_FILL = ["var(--c-heat-0)", "var(--c-heat-1)", "var(--c-heat-2)", "var(--c-heat-3)", "var(--c-heat-4)"];

const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
const longDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
const plural = (n: number) => `${n.toLocaleString("en-US")} contribution${n === 1 ? "" : "s"}`;

export function ContributionCalendar({ days }: { days: ContributionDay[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{ index: number; x: number; y: number } | null>(null);
  const [showTable, setShowTable] = useState(false);

  // Weeks run Sunday to Saturday in columns, like GitHub's own calendar.
  const firstWeekday = parse(days[0].date).getUTCDay();
  const cells = days.map((day, i) => {
    const slot = i + firstWeekday;
    return { ...day, col: Math.floor(slot / 7), row: slot % 7 };
  });
  const weeks = cells[cells.length - 1].col + 1;
  const width = LEFT + weeks * STEP - (STEP - CELL);
  const height = TOP + 7 * STEP - (STEP - CELL);

  // A month label sits over the first column containing that month's 1st day; one
  // closer than three columns to the previous label is dropped so they never collide.
  const monthLabels: { x: number; label: string }[] = [];
  let lastCol = -Infinity;
  for (const cell of cells) {
    if (parse(cell.date).getUTCDate() !== 1) continue;
    const col = cell.row === 0 ? cell.col : cell.col + 1;
    if (col - lastCol < 3 || col >= weeks) continue;
    monthLabels.push({ x: LEFT + col * STEP, label: MONTHS[parse(cell.date).getUTCMonth()] });
    lastCol = col;
  }

  const monthly = Object.entries(
    days.reduce<Record<string, number>>((acc, d) => {
      const key = d.date.slice(0, 7);
      acc[key] = (acc[key] ?? 0) + d.count;
      return acc;
    }, {})
  );

  // Narrow screens scroll horizontally; start at the most recent weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const onPointerOver = (e: React.PointerEvent<SVGSVGElement>) => {
    const target = e.target as Element;
    const index = target.getAttribute("data-index");
    const wrap = wrapRef.current;
    if (index === null || !wrap) return setHovered(null);
    const cell = target.getBoundingClientRect();
    const box = wrap.getBoundingClientRect();
    setHovered({ index: Number(index), x: cell.left + cell.width / 2 - box.left, y: cell.top - box.top });
  };

  const active = hovered ? cells[hovered.index] : null;
  const first = days[0];
  const last = days[days.length - 1];

  return (
    <div className="mt-12">
      <div ref={wrapRef} className="relative">
        <div ref={scrollRef} className="overflow-x-auto pb-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`Commit activity calendar from ${longDate(first.date)} to ${longDate(last.date)}. Use the monthly totals table for exact numbers.`}
            className="block h-auto w-full"
            style={{ minWidth: width }}
            onPointerOver={onPointerOver}
            onPointerLeave={() => setHovered(null)}
          >
            {monthLabels.map((m) => (
              <text key={m.x} x={m.x} y={12} fontSize={10} fill="var(--c-muted)">
                {m.label}
              </text>
            ))}
            {[
              [1, "Mon"],
              [3, "Wed"],
              [5, "Fri"],
            ].map(([row, label]) => (
              <text key={label} x={0} y={TOP + Number(row) * STEP + 9} fontSize={10} fill="var(--c-muted)">
                {label}
              </text>
            ))}
            {cells.map((cell, i) => (
              <rect
                key={cell.date}
                data-index={i}
                x={LEFT + cell.col * STEP}
                y={TOP + cell.row * STEP}
                width={CELL}
                height={CELL}
                fill={LEVEL_FILL[cell.level]}
              />
            ))}
            {active && (
              <rect
                x={LEFT + active.col * STEP - 1}
                y={TOP + active.row * STEP - 1}
                width={CELL + 2}
                height={CELL + 2}
                fill="none"
                stroke="var(--c-ink)"
                strokeWidth={1.5}
                pointerEvents="none"
              />
            )}
          </svg>
        </div>

        {active && hovered && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full border border-rule bg-paper px-3 py-2 text-sm whitespace-nowrap"
            style={{ left: hovered.x, top: hovered.y - 8 }}
          >
            <p className="font-bold text-ink">{plural(active.count)}</p>
            <p className="text-muted">{longDate(active.date)}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          aria-expanded={showTable}
          aria-controls="activity-table"
          className="link cursor-pointer"
        >
          {showTable ? "Hide monthly totals" : "Show monthly totals"}
        </button>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="mr-1">Less</span>
          {LEVEL_FILL.map((fill) => (
            <span key={fill} className="size-3" style={{ background: fill }} />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>

      {showTable && (
        <table id="activity-table" className="mt-6 w-full max-w-md text-base">
          <caption className="sr-only">Contributions per month</caption>
          <thead>
            <tr className="border-b border-rule text-left text-muted">
              <th scope="col" className="py-2 font-normal">Month</th>
              <th scope="col" className="py-2 text-right font-normal">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {monthly.map(([month, total]) => (
              <tr key={month} className="border-b border-rule">
                <th scope="row" className="py-2 text-left font-normal text-ink">
                  {parse(`${month}-01`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}
                </th>
                <td className="py-2 text-right text-ink tabular-nums">{total.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
