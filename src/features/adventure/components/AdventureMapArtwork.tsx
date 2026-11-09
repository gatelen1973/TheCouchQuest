type MapLayout = 'fen' | 'cavern' | 'keep' | 'orchard';

interface MapArtworkProps {
  layout: MapLayout;
  title: string;
}

const paths: Record<MapLayout, string> = {
  fen: 'M-30 210C55 180 72 102 161 118S264 211 335 164 422 81 590 55',
  cavern: 'M-20 240C65 223 96 186 121 144S173 63 237 86 302 203 365 189 427 103 590 92',
  keep: 'M-20 170C62 170 76 72 172 72S270 170 360 170 443 76 590 76',
  orchard: 'M-20 72C82 72 92 197 187 197S282 72 377 72 475 197 590 197',
};

const colors: Record<MapLayout, { ground: string; accent: string; route: string }> = {
  fen: { ground: '#34483d', accent: '#a3a875', route: '#d8bd79' },
  cavern: { ground: '#343b3c', accent: '#829a96', route: '#d6b878' },
  keep: { ground: '#4b4338', accent: '#b59a6b', route: '#e0c47e' },
  orchard: { ground: '#394a38', accent: '#a9a56d', route: '#e1c47b' },
};

export function AdventureMapArtwork({ layout, title }: MapArtworkProps) {
  const palette = colors[layout];

  return (
    <svg
      className="adventure-map-art"
      viewBox="0 0 560 260"
      role="img"
      aria-label={`Illustrated map of ${title}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`map-grid-${layout}`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#f1e7c7" strokeOpacity=".09" strokeWidth="1" />
        </pattern>
        <linearGradient id={`map-shade-${layout}`} x2="0" y2="1">
          <stop stopColor="#111a16" stopOpacity=".05" />
          <stop offset="1" stopColor="#111a16" stopOpacity=".62" />
        </linearGradient>
      </defs>
      <rect width="560" height="260" fill={palette.ground} />
      <rect width="560" height="260" fill={`url(#map-grid-${layout})`} />
      <g fill="none" stroke={palette.accent} strokeOpacity=".3" strokeWidth="2">
        <path d="M-25 43C57 7 119 27 161 52S244 84 292 44 407 4 474 40 548 52 585 27" />
        <path d="M-25 54C57 18 119 38 161 63S244 95 292 55 407 15 474 51 548 63 585 38" />
        <path d="M-25 205C60 169 111 186 155 211S245 244 299 205 404 166 469 200 550 220 585 189" />
        <path d="M-25 216C60 180 111 197 155 222S245 255 299 216 404 177 469 211 550 231 585 200" />
      </g>
      {layout === 'fen' && (
        <g fill={palette.accent} fillOpacity=".42">
          <path d="m75 120 18-21 17 21-17 19ZM119 175l14-17 15 17-15 17ZM407 92l17-21 18 21-18 20ZM472 160l14-18 16 18-16 17Z" />
          <path d="m190 71 8-16 8 16-8 15ZM334 210l9-18 9 18-9 16Z" />
        </g>
      )}
      {layout === 'cavern' && (
        <g fill={palette.accent} fillOpacity=".38">
          <path d="M46 35h78l-19 25H64ZM407 32h94l-24 23h-50ZM381 209h111l-23 20h-64Z" />
          <circle cx="158" cy="180" r="13" /><circle cx="300" cy="61" r="10" />
        </g>
      )}
      {layout === 'keep' && (
        <g fill={palette.accent} fillOpacity=".52">
          <path d="M80 47h38v38H80zM433 52h38v38h-38zM253 151h50v40h-50z" />
          <path d="m74 47 25-18 25 18ZM427 52l25-18 25 18Z" />
        </g>
      )}
      {layout === 'orchard' && (
        <g fill={palette.accent} fillOpacity=".54">
          {[[74, 103], [143, 157], [218, 91], [289, 164], [365, 101], [438, 157], [500, 94]].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="15" />
              <circle cx={x} cy={y} r="7" fill="#d9c387" fillOpacity=".7" />
            </g>
          ))}
        </g>
      )}
      <path d={paths[layout]} fill="none" stroke="#17231c" strokeOpacity=".72" strokeWidth="12" strokeLinecap="round" />
      <path d={paths[layout]} fill="none" stroke={palette.route} strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
      <circle cx={layout === 'keep' ? 172 : layout === 'orchard' ? 187 : layout === 'cavern' ? 237 : 161} cy={layout === 'keep' ? 72 : layout === 'orchard' ? 197 : layout === 'cavern' ? 86 : 118} r="10" fill={palette.route} stroke="#f3e7c4" strokeWidth="3" />
      <rect width="560" height="260" fill={`url(#map-shade-${layout})`} />
      <text x="22" y="235" fill="#f3e7c4" fillOpacity=".62" fontFamily="Georgia, serif" fontSize="12" letterSpacing="2">
        FIELD NOTES · {layout.toUpperCase()}
      </text>
      <path d="M516 40v28m-8-20 8-8 8 8" fill="none" stroke="#f3e7c4" strokeOpacity=".7" strokeWidth="2" />
      <text x="512" y="82" fill="#f3e7c4" fillOpacity=".7" fontFamily="Arial, sans-serif" fontSize="9">N</text>
    </svg>
  );
}
