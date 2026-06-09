'use client';
// charts.tsx — Biểu đồ SVG thuần, không thư viện ngoài.
// AreaChart, BarChart, DonutChart, Sparkline, HBars, GroupedBars, RadialGauge.
import { useId } from 'react';

const LINE = 'var(--color-border)';
const MUTED = 'var(--color-muted-foreground)';

type Pt = [number, number];
const path = (pts: Pt[]) =>
  pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');

export function AreaChart({
  series,
  labels,
  height = 240,
  color = 'var(--color-navy)',
  color2,
  yFmt,
}: {
  series: number[][];
  labels?: string[];
  height?: number;
  color?: string;
  color2?: string;
  yFmt?: (v: number) => string;
}) {
  const W = 600,
    H = height,
    padL = 44,
    padB = 26,
    padT = 14,
    padR = 8;
  const peak = Math.max(...series.flat()) * 1.15;
  const iw = W - padL - padR,
    ih = H - padB - padT;
  const xy = (arr: number[]): Pt[] =>
    arr.map((v, i) => [padL + (i / (arr.length - 1)) * iw, padT + ih - (v / peak) * ih]);
  const p1 = xy(series[0]);
  const area = path(p1) + ` L${p1[p1.length - 1][0]} ${padT + ih} L${p1[0][0]} ${padT + ih} Z`;
  const gid = useId();
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height, display: 'block' }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 5 }).map((_, i) => {
        const y = padT + (i / 4) * ih;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={LINE} strokeWidth="1" />
            <text x={padL - 8} y={y + 3.5} textAnchor="end" fontSize="9.5" fill={MUTED}>
              {yFmt ? yFmt(peak * (1 - i / 4)) : Math.round(peak * (1 - i / 4))}
            </text>
          </g>
        );
      })}
      {series[1] && (
        <path
          d={path(xy(series[1]))}
          fill="none"
          stroke={color2 || 'var(--color-orange)'}
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.8"
        />
      )}
      <path d={area} fill={`url(#${gid})`} />
      <path d={path(p1)} fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
      <circle
        cx={p1[p1.length - 1][0]}
        cy={p1[p1.length - 1][1]}
        r="4"
        fill="#fff"
        stroke={color}
        strokeWidth="2.4"
      />
      {labels &&
        labels.map((l, i) => (
          <text
            key={i}
            x={padL + (i / (labels.length - 1)) * iw}
            y={H - 8}
            textAnchor="middle"
            fontSize="9.5"
            fill={MUTED}
          >
            {l}
          </text>
        ))}
    </svg>
  );
}

export function BarChart({
  data,
  labels,
  height = 240,
  color = 'var(--color-navy)',
  highlight,
  yFmt,
}: {
  data: number[];
  labels?: string[];
  height?: number;
  color?: string;
  highlight?: number;
  yFmt?: (v: number) => string;
}) {
  const W = 600,
    H = height,
    padL = 44,
    padB = 26,
    padT = 14,
    padR = 8;
  const peak = Math.max(...data) * 1.15;
  const iw = W - padL - padR,
    ih = H - padB - padT;
  const bw = iw / data.length;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height, display: 'block' }}
      preserveAspectRatio="none"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const y = padT + (i / 4) * ih;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={LINE} strokeWidth="1" />
            <text x={padL - 8} y={y + 3.5} textAnchor="end" fontSize="9.5" fill={MUTED}>
              {yFmt ? yFmt(peak * (1 - i / 4)) : Math.round(peak * (1 - i / 4))}
            </text>
          </g>
        );
      })}
      {data.map((v, i) => {
        const h = (v / peak) * ih;
        return (
          <rect
            key={i}
            x={padL + i * bw + bw * 0.2}
            y={padT + ih - h}
            width={bw * 0.6}
            height={h}
            rx="3"
            fill={highlight === i ? 'var(--color-orange)' : color}
            opacity={highlight === i ? 1 : 0.85}
          />
        );
      })}
      {labels &&
        labels.map((l, i) => (
          <text
            key={i}
            x={padL + i * bw + bw / 2}
            y={H - 8}
            textAnchor="middle"
            fontSize="9.5"
            fill={MUTED}
          >
            {l}
          </text>
        ))}
    </svg>
  );
}

export function DonutChart({
  segments,
  size = 180,
  thickness = 26,
  centerLabel,
  centerSub,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = (size - thickness) / 2,
    cx = size / 2,
    cy = size / 2,
    circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth={thickness}
        />
        {segments.map((s, i) => {
          const dash = (s.value / total) * circ;
          const el = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      {centerLabel != null && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: size * 0.17,
                fontWeight: 800,
                color: 'var(--color-foreground)',
                letterSpacing: '-.02em',
                lineHeight: 1,
              }}
            >
              {centerLabel}
            </div>
            {centerSub && (
              <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>{centerSub}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Sparkline({
  data,
  color = 'var(--color-navy)',
  width = 90,
  height = 30,
  fill = true,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}) {
  const min = Math.min(...data),
    max = Math.max(...data),
    range = max - min || 1;
  const pts: Pt[] = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * (height - 4) - 2,
  ]);
  const gid = useId();
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {fill && (
        <>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path(pts)} L${width} ${height} L0 ${height} Z`} fill={`url(#${gid})`} />
        </>
      )}
      <path
        d={path(pts)}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GroupedBars({
  groups,
  labels,
  colors,
  height = 240,
  max,
  yFmt,
}: {
  groups: number[][];
  labels: string[];
  colors: string[];
  height?: number;
  max?: number;
  yFmt?: (v: number) => string;
}) {
  const W = 600,
    H = height,
    padL = 44,
    padB = 26,
    padT = 14,
    padR = 8;
  const peak = max || Math.max(...groups.flat()) * 1.15;
  const iw = W - padL - padR,
    ih = H - padB - padT;
  const n = labels.length,
    series = groups.length,
    gw = iw / n;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height, display: 'block' }}
      preserveAspectRatio="none"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const y = padT + (i / 4) * ih;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={LINE} strokeWidth="1" />
            <text x={padL - 8} y={y + 3.5} textAnchor="end" fontSize="9.5" fill={MUTED}>
              {yFmt ? yFmt(peak * (1 - i / 4)) : Math.round(peak * (1 - i / 4))}
            </text>
          </g>
        );
      })}
      {labels.map((l, gi) => {
        const bw = (gw * 0.66) / series;
        return (
          <g key={gi}>
            {groups.map((g, si) => {
              const h = (g[gi] / peak) * ih;
              return (
                <rect
                  key={si}
                  x={padL + gi * gw + gw * 0.17 + si * bw}
                  y={padT + ih - h}
                  width={bw * 0.86}
                  height={h}
                  rx="2"
                  fill={colors[si]}
                />
              );
            })}
            <text
              x={padL + gi * gw + gw / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize="9.5"
              fill={MUTED}
            >
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function RadialGauge({
  value,
  size = 130,
  color = 'var(--color-navy)',
  label,
  sub,
}: {
  value: number;
  size?: number;
  color?: string;
  label?: string;
  sub?: string;
}) {
  const r = size / 2 - 12,
    cy = size / 2,
    circ = Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size / 2 + 16 }}>
      <svg width={size} height={size / 2 + 16}>
        <path
          d={`M12 ${cy} A ${r} ${r} 0 0 1 ${size - 12} ${cy}`}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d={`M12 ${cy} A ${r} ${r} 0 0 1 ${size - 12} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <div
          style={{
            fontSize: size * 0.2,
            fontWeight: 800,
            color: 'var(--color-foreground)',
            letterSpacing: '-.02em',
            lineHeight: 1,
          }}
        >
          {label}
        </div>
        {sub && <div style={{ fontSize: 10.5, color: MUTED, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

/** HBars — danh sách thanh ngang. items: [{label, value, color}] */
export function HBars({
  items,
  fmt,
}: {
  items: { label: string; value: number; color?: string }[];
  fmt?: (v: number) => string;
}) {
  const peak = Math.max(...items.map((i) => i.value));
  return (
    <div className="flex flex-col gap-4">
      {items.map((it, i) => (
        <div key={i}>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground inline-flex items-center gap-2 font-semibold">
              {it.color && (
                <span className="h-[9px] w-[9px] rounded-[3px]" style={{ background: it.color }} />
              )}
              {it.label}
            </span>
            <span className="text-foreground font-bold">{fmt ? fmt(it.value) : it.value}</span>
          </div>
          <div className="bg-border h-2 w-full overflow-hidden rounded-full">
            <div
              className="h-full rounded-full"
              style={{
                width: (it.value / peak) * 100 + '%',
                background: it.color || 'var(--color-navy)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
