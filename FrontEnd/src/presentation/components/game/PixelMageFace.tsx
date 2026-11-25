import React from 'react';

export type FaceExpression = 'sad' | 'worried' | 'happy' | 'neutral';

interface PixelMageFaceProps {
  expression?: FaceExpression;
  /** px per pixel unit. Default: 6 → face ≈ 84×132px */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

/* ── Palette ─────────────────────────────────────────────── */
const P = {
  H:   '#104d88', /* hat blue           */
  Hd:  '#0a2d55', /* hat dark edge       */
  Hl:  '#2888cc', /* hat light highlight */
  S:   '#e3a471', /* skin                */
  Ss:  '#c48050', /* skin shadow         */
  Sl:  '#f0bc8a', /* skin light          */
  Ep:  '#1a1a2e', /* eye pupil           */
  Ew:  '#f4f0ea', /* eye white           */
  Br:  '#5c3410', /* eyebrow             */
  Mo:  '#7a2010', /* mouth outline       */
  Rd:  '#a22531', /* scarf dark          */
  R:   '#e43943', /* scarf red           */
  Rl:  '#f07080', /* scarf light         */
  Sw:  '#9adff4', /* sweat drop light    */
  Swm: '#3ab8e0', /* sweat drop mid      */
  Swd: '#1a90c0', /* sweat drop dark     */
} as const;

/* ── Rect helper type: [x, y, w, h, fill] ─────────────────── */
type R5 = readonly [number, number, number, number, string];

/* ═══════════════════════════════════════════════
   PARTS — ordered so later rects paint over earlier
   Grid: 14 wide × 22 tall (each unit = `scale` px)
   ═══════════════════════════════════════════════ */

/* Hat (rows 0–4) */
const HAT: R5[] = [
  /* tip */
  [6, 0, 2, 1, P.H],
  /* upper body */
  [5, 1, 4, 1, P.H], [5, 1, 1, 1, P.Hl],
  /* mid body */
  [4, 2, 6, 1, P.H], [4, 2, 1, 1, P.Hl],
  /* lower body */
  [3, 3, 8, 1, P.H], [3, 3, 1, 1, P.Hl],
  /* brim */
  [1, 4, 1, 1, P.Hd], [2, 4, 10, 1, P.H], [12, 4, 1, 1, P.Hd],
  [2, 4, 1, 1, P.Hl],
];

/* Face skin base (rows 5–17) */
const FACE_BG: R5[] = [
  [2, 5, 10, 13, P.S],  /* forehead → chin           */
  [3, 18, 8, 1, P.S],   /* chin lower                */
  [5, 19, 4, 1, P.S],   /* neck                      */
  /* side shadows for depth */
  [2, 10, 1, 4, P.Ss],
  [11, 10, 1, 4, P.Ss],
];

/* Eyes — pupils shifted LEFT so the face looks toward the NPC */
const EYES: R5[] = [
  /* left socket (viewer-left): pupil at col 3, white at col 4 */
  [3, 10, 1, 1, P.Ep],
  [4, 10, 1, 1, P.Ew],
  /* right socket (viewer-right): pupil at col 8, white at 9-10 */
  [8, 10, 1, 1, P.Ep],
  [9, 10, 2, 1, P.Ew],
  /* skin between eyes */
  [5, 10, 3, 1, P.S],
  [11, 10, 1, 1, P.S],
  [2, 10, 1, 1, P.S],
  /* tiny upper-lid shadow */
  [3, 9, 1, 1, P.Ss],
  [8, 9, 1, 1, P.Ss],
];

/* Eyebrows — sad: inner corners raised toward nose */
const BROWS_SAD: R5[] = [
  /* L brow — inner high (col 5, row 7), outer low (cols 2-3, row 8) */
  [5, 7, 1, 1, P.Br],
  [2, 8, 3, 1, P.Br],
  /* R brow — inner high (col 8, row 7), outer low (cols 9-11, row 8) */
  [8, 7, 1, 1, P.Br],
  [9, 8, 3, 1, P.Br],
];

/* Eyebrows — happy: outer corners raised */
const BROWS_HAPPY: R5[] = [
  /* L brow — outer high (cols 2-3, row 7), inner low (col 5, row 8) */
  [2, 7, 3, 1, P.Br],
  [5, 8, 1, 1, P.Br],
  /* R brow — outer high (cols 9-11, row 7), inner low (col 8, row 8) */
  [9, 7, 3, 1, P.Br],
  [8, 8, 1, 1, P.Br],
];

/* Eyebrows — neutral */
const BROWS_NEUTRAL: R5[] = [
  [2, 8, 3, 1, P.Br],
  [9, 8, 3, 1, P.Br],
];

/* Nose — subtle shadow */
const NOSE: R5[] = [
  [6, 13, 2, 1, P.Ss],
];

/*
  Mouth shapes:
  Sad frown → top-line at row 14, corners drop to row 15
  Happy smile → corners up at row 14, bottom-line at row 15
*/
const MOUTH_SAD: R5[] = [
  [4, 14, 5, 1, P.Mo],     /* top of frown            */
  [3, 15, 1, 1, P.Mo],     /* left corner drops down  */
  [9, 15, 1, 1, P.Mo],     /* right corner drops down */
];

const MOUTH_WORRIED: R5[] = [
  /* wider, slightly open worried mouth */
  [4, 14, 5, 1, P.Mo],
  [3, 15, 1, 1, P.Mo],
  [4, 15, 1, 1, '#1a1a1a'], /* open gap left           */
  [8, 15, 1, 1, '#1a1a1a'], /* open gap right          */
  [9, 15, 1, 1, P.Mo],
];

const MOUTH_HAPPY: R5[] = [
  [3, 14, 1, 1, P.Mo],     /* left corner up          */
  [9, 14, 1, 1, P.Mo],     /* right corner up         */
  [4, 15, 5, 1, P.Mo],     /* bottom of smile         */
];

const MOUTH_NEUTRAL: R5[] = [
  [4, 14, 5, 1, P.Mo],
];

/* Sweat drop — shown for sad/worried */
const SWEAT_DROP: R5[] = [
  [11, 7, 1, 1, P.Sw],
  [11, 8, 1, 1, P.Swm],
  [11, 9, 1, 1, P.Swd],
];

/* Blush cheeks — rosy spots for expressiveness */
const BLUSH_SAD: R5[] = [
  [2, 12, 2, 1, '#f0a09080'],
  [10, 12, 2, 1, '#f0a09080'],
];

/* Scarf (rows 20–21) */
const SCARF: R5[] = [
  [1, 20, 12, 1, P.R],  [2, 20, 1, 1, P.Rl],
  [1, 21, 12, 1, P.Rd], [2, 21, 8, 1, P.R],
];

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */
export const PixelMageFace: React.FC<PixelMageFaceProps> = ({
  expression = 'sad',
  scale = 6,
  className,
  style,
}) => {
  const brows =
    expression === 'happy'   ? BROWS_HAPPY   :
    expression === 'neutral' ? BROWS_NEUTRAL :
    BROWS_SAD;

  const mouth =
    expression === 'happy'   ? MOUTH_HAPPY   :
    expression === 'worried' ? MOUTH_WORRIED :
    expression === 'neutral' ? MOUTH_NEUTRAL :
    MOUTH_SAD;

  const extras: R5[] = [
    ...(expression === 'sad' || expression === 'worried' ? SWEAT_DROP : []),
    ...(expression === 'sad' || expression === 'worried' ? BLUSH_SAD  : []),
  ];

  const rects: R5[] = [
    ...HAT,
    ...FACE_BG,
    ...EYES,
    ...brows,
    ...NOSE,
    ...mouth,
    ...extras,
    ...SCARF,
  ];

  const GW = 14; /* grid cols */
  const GH = 22; /* grid rows */

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        ...style,
      }}
    >
      <svg
        width={GW * scale}
        height={GH * scale}
        viewBox={`0 0 ${GW} ${GH}`}
        shapeRendering="crispEdges"
        style={{ display: 'block', imageRendering: 'pixelated' }}
        aria-label={`Mago Aprendiz (${expression})`}
        role="img"
      >
        {rects.map(([x, y, w, h, fill], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
        ))}
      </svg>

      {/* Ground shadow */}
      <div
        style={{
          width: GW * scale * 0.55,
          height: 6,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 70%)',
          marginTop: 1,
        }}
      />
    </div>
  );
};
