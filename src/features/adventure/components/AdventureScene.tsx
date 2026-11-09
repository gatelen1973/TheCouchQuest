const forestRows = [
  { y: 590, scale: 0.38, opacity: 0.68 },
  { y: 628, scale: 0.51, opacity: 0.78 },
  { y: 670, scale: 0.67, opacity: 0.92 },
  { y: 718, scale: 0.84, opacity: 1 },
  { y: 778, scale: 1.04, opacity: 1 },
];

const rocks = [
  { x: 70, y: 790, scale: 0.8 },
  { x: 260, y: 812, scale: 1.2 },
  { x: 490, y: 784, scale: 0.7 },
  { x: 720, y: 824, scale: 1.1 },
  { x: 940, y: 792, scale: 0.9 },
  { x: 1180, y: 816, scale: 0.75 },
  { x: 1410, y: 785, scale: 1.15 },
];

function renderForestTile(offset: number) {
  return (
    <g key={offset} transform={`translate(${offset} 0)`}>
      {forestRows.map((row, rowIndex) => (
        <g key={row.y} opacity={row.opacity}>
          {Array.from({ length: 11 }, (_, index) => {
            const x = -80 + index * 164 + ((index * 47 + rowIndex * 63) % 70);
            const height = 270 + ((index * 79 + rowIndex * 43) % 180);
            const treeScale = row.scale * (0.72 + ((index * 17 + rowIndex * 9) % 55) / 100);
            return (
              <g key={x} transform={`translate(${x} ${row.y}) scale(${treeScale})`}>
                <path d={`M-8 0 0-${height} 9 0Z`} fill="#241f18" />
                <path
                  d={`M0-${height + 30} -${height * 0.27}-${height * 0.55} -${height * 0.14}-${height * 0.58} -${height * 0.31}-${height * 0.23} -${height * 0.12}-${height * 0.29} -${height * 0.2}-20 0-48 ${height * 0.2}-20 ${height * 0.12}-${height * 0.29} ${height * 0.31}-${height * 0.23} ${height * 0.14}-${height * 0.58} ${height * 0.27}-${height * 0.55}Z`}
                  fill="url(#journey-tree)"
                />
                <path
                  d={`M0-${height * 0.91} -${height * 0.21}-${height * 0.56} -${height * 0.09}-${height * 0.6} -${height * 0.23}-${height * 0.29} 0-${height * 0.38} ${height * 0.23}-${height * 0.29} ${height * 0.09}-${height * 0.6} ${height * 0.21}-${height * 0.56}Z`}
                  fill="#3c573b"
                  opacity=".44"
                />
              </g>
            );
          })}
        </g>
      ))}
      {rocks.map((rock) => (
        <g key={rock.x} transform={`translate(${rock.x} ${rock.y}) scale(${rock.scale})`}>
          <path d="m-17 0 5-10 12-6 13 8 7 8Z" fill="#746b50" opacity=".58" />
          <path d="m-17 0 9-5 10 2 11-5 7 8Z" fill="#aaa07b" opacity=".24" />
        </g>
      ))}
    </g>
  );
}

export function AdventureScene() {
  return (
    <div className="adventure-scene" aria-hidden="true">
      <svg
        className="adventure-scene__art"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="journey-sky" x2="0" y2="1">
            <stop stopColor="#17251f" />
            <stop offset=".62" stopColor="#435b48" />
            <stop offset="1" stopColor="#899077" />
          </linearGradient>
          <linearGradient id="journey-haze" x2="0" y2="1">
            <stop stopColor="#c0b995" stopOpacity="0" />
            <stop offset="1" stopColor="#d2c99e" stopOpacity=".3" />
          </linearGradient>
          <linearGradient id="journey-path" x2="0" y2="1">
            <stop stopColor="#8b8060" />
            <stop offset=".5" stopColor="#71684d" />
            <stop offset="1" stopColor="#4a4937" />
          </linearGradient>
          <linearGradient id="journey-tree" x2="1" y2="1">
            <stop stopColor="#36513a" />
            <stop offset="1" stopColor="#101d17" />
          </linearGradient>
          <linearGradient id="journey-cave-rock" x2="1" y2="1">
            <stop stopColor="#655c49" />
            <stop offset=".48" stopColor="#38382f" />
            <stop offset="1" stopColor="#1c211d" />
          </linearGradient>
          <linearGradient id="journey-cave-depth" x2="0" y2="1">
            <stop stopColor="#090c0a" />
            <stop offset=".72" stopColor="#030504" />
            <stop offset="1" stopColor="#171814" />
          </linearGradient>
        </defs>

        <g className="adventure-scene__stage">
          <rect width="1600" height="900" fill="url(#journey-sky)" />
          <path d="M0 526 165 473 290 514 450 447 610 517 790 460 966 520 1124 456 1300 514 1450 462 1600 516V680H0Z" fill="#53634d" opacity=".42" />
          <path d="M0 577 180 514 350 564 520 502 690 572 860 515 1035 572 1210 506 1390 567 1520 518 1600 548V900H0Z" fill="#26372b" />
          <rect y="470" width="1600" height="205" fill="url(#journey-haze)" />

          <g className="adventure-scene__forest">
            {renderForestTile(0)}
            {renderForestTile(1600)}
          </g>
        </g>

        <g className="adventure-scene__stage">
          <path d="M0 655 Q200 630 380 655 T760 646 T1140 654 T1520 642 L1600 649V900H0Z" fill="#19251c" />
          <path
            d="M0 705 Q195 682 390 708 T780 699 T1170 706 T1560 691 L1600 694V900H0Z"
            fill="url(#journey-path)"
          />
          <path d="M0 702 Q195 679 390 705 T780 696 T1170 703 T1560 688" fill="none" stroke="#b1a177" strokeOpacity=".24" strokeWidth="7" />
          <path d="M0 818 Q195 791 390 817 T780 807 T1170 814 T1560 799" fill="none" stroke="#322f24" strokeOpacity=".74" strokeWidth="18" />

        </g>

        <g transform="translate(1210 510)">
          <g className="adventure-scene__cave">
            <path
              d="M-94 270  -84 142Q-78 85-36 37Q8-13 79-31 152-53 218-14 283 24 316 98L346 270Z"
              fill="url(#journey-cave-rock)"
            />
            <path
              d="M-47 270Q-42 190-22 124  -2 58 47 23  94-11 149 14 204 39 231 111 258 181 267 270Z"
              fill="url(#journey-cave-depth)"
            />
            <path d="M-85 154Q-70 68-18 17M235 71Q270 137 284 219" fill="none" stroke="#82745a" strokeOpacity=".4" strokeWidth="12" />
            <path d="M-68 265Q65 243 275 265" fill="none" stroke="#a18b60" strokeOpacity=".28" strokeWidth="8" />
            <path d="m-60 105 27-16 20 9-12 30-28 4ZM210 45l25 19-9 24-31-7ZM-76 192l25-13 17 20-9 29-34-4ZM248 177l27-9 20 24-10 22-30-8Z" fill="#77705b" opacity=".62" />
            <path d="M-2 268Q80 258 159 267" fill="none" stroke="#c0a66f" strokeOpacity=".22" strokeWidth="4" />
          </g>
        </g>

        <g className="adventure-scene__party">
          <ellipse cx="706" cy="774" rx="31" ry="7" fill="#131b14" opacity=".52" />
          <g transform="translate(706 765)">
            <g className="adventure-scene__party-member adventure-scene__wizard">
            <path d="M-17-12 0-22 17-12 12 0H-12Z" fill="#c0a866" />
            <g className="adventure-scene__walk-leg adventure-scene__walk-leg--back">
              <path d="M-8-16-12 0-18 5" fill="none" stroke="#293d4b" strokeWidth="8" strokeLinecap="round" />
            </g>
            <g className="adventure-scene__walk-leg">
              <path d="M7-16 11 0 17 5" fill="none" stroke="#354d5e" strokeWidth="8" strokeLinecap="round" />
            </g>
            <path d="M-19-62Q0-72 19-62L15-20Q0-12-15-20Z" fill="#354d5e" stroke="#cfb876" strokeWidth="2" />
            <path d="M-10-60Q0-67 10-60L9-46H-9Z" fill="#d9b66f" />
            <circle cx="2" cy="-55" r="11" fill="#d7b58b" />
            <path d="M-14-62-4-91 8-63Z" fill="#344b5c" stroke="#cfb876" strokeWidth="2" strokeLinejoin="round" />
            <path d="M-14-62Q-1-68 13-61L16-57-17-57Z" fill="#c9aa68" />
            <path d="M-17-48Q-29-39-22-29" fill="none" stroke="#354d5e" strokeWidth="8" strokeLinecap="round" />
            <path d="M-22-29 1-30" fill="none" stroke="#d7b58b" strokeWidth="6" strokeLinecap="round" />
            <path d="M22-85V3" fill="none" stroke="#6b4c32" strokeWidth="4" strokeLinecap="round" />
            <path d="M22-87 18-79H26Z" fill="#d6bd78" />
              <circle cx="2" cy="-54" r="1.5" fill="#171c18" />
            </g>
          </g>

          <ellipse cx="800" cy="774" rx="34" ry="8" fill="#131b14" opacity=".58" />
          <g transform="translate(800 765)">
            <g className="adventure-scene__party-member adventure-scene__warrior">
            <g className="adventure-scene__walk-leg adventure-scene__walk-leg--back">
              <path d="M-9-18-14-1-20 5" fill="none" stroke="#49382a" strokeWidth="10" strokeLinecap="round" />
            </g>
            <g className="adventure-scene__walk-leg">
              <path d="M8-18 12-1 19 5" fill="none" stroke="#58422e" strokeWidth="10" strokeLinecap="round" />
            </g>
            <path d="M-21-60Q-1-70 20-59L17-25Q0-15-18-25Z" fill="#8d593a" stroke="#d0ae68" strokeWidth="2" />
            <path d="M-16-56-9-62 0-55 9-62 16-55 13-34H-14Z" fill="#8b8b76" stroke="#d4c49b" strokeWidth="2" />
            <path d="M-11-55H11M-12-47H12M-11-39H11" stroke="#505d54" strokeWidth="2" />
            <circle cx="1" cy="-75" r="12" fill="#d4b08a" />
            <path d="M-14-78Q-12-96 2-94 17-94 16-76L8-72 5-81-8-73Z" fill="#91927f" stroke="#d4c49b" strokeWidth="2" />
            <path d="M-2-75H14L10-69H-2Z" fill="#282d29" />
            <path d="M-18-52Q-33-42-25-30" fill="none" stroke="#8d593a" strokeWidth="9" strokeLinecap="round" />
            <path d="M-28-33Q-43-42-45-55" fill="none" stroke="#7e8a7a" strokeWidth="3" />
            <path d="M-51-57  -43-65 -31-61 -28-46 -38-39 -50-45Z" fill="#687668" stroke="#d0ae68" strokeWidth="2" />
            <path d="M21-54Q34-45 26-31" fill="none" stroke="#8d593a" strokeWidth="9" strokeLinecap="round" />
            <path d="M28-31 42-83" fill="none" stroke="#c7c9bd" strokeWidth="4" strokeLinecap="round" />
              <path d="M39-84 42-95 45-83Z" fill="#d7d1bb" />
            </g>
          </g>

          <ellipse cx="894" cy="774" rx="30" ry="7" fill="#131b14" opacity=".52" />
          <g transform="translate(894 765)">
            <g className="adventure-scene__party-member adventure-scene__priest">
            <g className="adventure-scene__walk-leg adventure-scene__walk-leg--back">
              <path d="M-8-16-12 0-18 5" fill="none" stroke="#76674e" strokeWidth="8" strokeLinecap="round" />
            </g>
            <g className="adventure-scene__walk-leg">
              <path d="M8-16 12 0 18 5" fill="none" stroke="#877657" strokeWidth="8" strokeLinecap="round" />
            </g>
            <path d="M-18-61Q0-70 18-61L14-19Q0-12-14-19Z" fill="#ded3b6" stroke="#ad945d" strokeWidth="2" />
            <path d="M-13-57Q-12-75 1-77 14-74 15-57L9-52H-9Z" fill="#c9c1a8" stroke="#9e8a5e" strokeWidth="2" />
            <circle cx="2" cy="-57" r="9" fill="#d7b58b" />
            <path d="M-8-55Q0-61 10-55L8-48H-7Z" fill="#574538" />
            <path d="M-15-45Q-28-38-22-27" fill="none" stroke="#ded3b6" strokeWidth="8" strokeLinecap="round" />
            <path d="M-22-27 2-30" fill="none" stroke="#d7b58b" strokeWidth="6" strokeLinecap="round" />
            <path d="M-25-87V4" fill="none" stroke="#765638" strokeWidth="4" strokeLinecap="round" />
            <path d="M-32-82H-18M-25-89V-75" stroke="#d3b86e" strokeWidth="3" strokeLinecap="round" />
            <path d="M20-53Q30-43 25-32" fill="none" stroke="#ded3b6" strokeWidth="8" strokeLinecap="round" />
            <path d="M24-31 31-29" fill="none" stroke="#d7b58b" strokeWidth="6" strokeLinecap="round" />
              <path d="M0-42V-31M-5-37H5" stroke="#ad945d" strokeWidth="2" />
            </g>
          </g>
          </g>

        <rect className="adventure-scene__fade" width="1600" height="900" fill="#020403" />
      </svg>
      <div className="adventure-scene__rain" />
    </div>
  );
}
