import React from 'react'

/* ─── Inline API Network Graph Visual ─────────────────────────────────────── */
function ApiNetworkVisual() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="c1-network-img w-full h-full max-h-[180px] drop-shadow-sm select-none"
    >
      <defs>
        {/* Gradients */}
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E5A1F5" stopOpacity="0.2" />
        </radialGradient>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#E5A1F5" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5A1F5" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Background connecting tracks */}
      <path
        d="M 140 90 Q 80 50 48 45"
        stroke="url(#lineGrad1)"
        strokeWidth="2.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 140 90 Q 200 45 235 48"
        stroke="url(#lineGrad2)"
        strokeWidth="2.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 140 90 Q 85 130 55 142"
        stroke="url(#lineGrad1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M 140 90 Q 195 135 228 140"
        stroke="url(#lineGrad2)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Orbit Rings around center */}
      <circle cx="140" cy="90" r="42" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 3" />
      <circle cx="140" cy="90" r="30" fill="url(#centerGlow)" />

      {/* Node 1: Top-Left (Endpoint / 200 OK) */}
      <g filter="url(#softShadow)">
        <rect x="18" y="28" width="62" height="32" rx="16" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1.2" />
        <circle cx="33" cy="44" r="4.5" fill="#10B981" />
        <text x="43" y="47" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          200 OK
        </text>
      </g>

      {/* Node 2: Top-Right (AI Latency / 14ms) */}
      <g filter="url(#softShadow)">
        <rect x="202" y="32" width="64" height="32" rx="16" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1.2" />
        <path d="M216 48 L218 41 L222 41 L219 45 L223 45 L217 51 Z" fill="#F59E0B" />
        <text x="227" y="48" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          14ms
        </text>
      </g>

      {/* Node 3: Bottom-Left (SDK / Client) */}
      <g filter="url(#softShadow)">
        <rect x="24" y="126" width="68" height="32" rx="16" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1.2" />
        <circle cx="39" cy="142" r="4" fill="#3B82F6" />
        <text x="49" y="145" fill="#0f172a" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
          REST API
        </text>
      </g>

      {/* Node 4: Bottom-Right (GraphQL / Stream) */}
      <g filter="url(#softShadow)">
        <rect x="195" y="124" width="68" height="32" rx="16" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1.2" />
        <circle cx="210" cy="140" r="4" fill="#8B5CF6" />
        <text x="219" y="143" fill="#0f172a" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
          SSE Stream
        </text>
      </g>

      {/* Central Hub Node */}
      <g filter="url(#softShadow)">
        {/* Outer Ring */}
        <circle cx="140" cy="90" r="23" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1.5" />
        <circle cx="140" cy="90" r="18" fill="url(#coreGrad)" />
        {/* Code Brackets / Terminal Icon inside core */}
        <path
          d="M 134 86 L 130 90 L 134 94 M 146 86 L 150 90 L 146 94"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Traveling Data Packets */}
      <circle cx="94" cy="68" r="3.5" fill="#FFB347" />
      <circle cx="186" cy="69" r="3.5" fill="#60A5FA" />
      <circle cx="98" cy="116" r="3" fill="#3B82F6" />
      <circle cx="184" cy="115" r="3" fill="#8B5CF6" />
    </svg>
  )
}

/* ─── Inline 3D Project Library Folder Visual ──────────────────────────────── */
function ProjectLibraryFolderVisual() {
  return (
    <svg
      viewBox="0 0 170 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="c1-folder w-[170px] select-none"
    >
      <defs>
        {/* Folder gradients */}
        <linearGradient id="folderBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="folderFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="docHeader1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <linearGradient id="docHeader2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <filter id="folderShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000000" floodOpacity="0.10" />
        </filter>
      </defs>

      <g filter="url(#folderShadow)">
        {/* Back Folder Flap */}
        <path
          d="M 18 38 C 18 32 22 28 28 28 L 56 28 C 61 28 65 31 68 35 L 75 42 C 78 45 82 46 87 46 L 144 46 C 150 46 154 50 154 56 L 154 116 C 154 122 150 126 144 126 L 28 126 C 22 126 18 122 18 116 Z"
          fill="url(#folderBack)"
        />

        {/* Document 1 (Back left, tilted -6deg) */}
        <g transform="rotate(-6 55 50)">
          <rect x="25" y="18" width="62" height="74" rx="8" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
          <rect x="31" y="24" width="50" height="28" rx="5" fill="url(#docHeader1)" opacity="0.85" />
          <circle cx="44" cy="38" r="5" fill="#ffffff" opacity="0.8" />
          <path d="M 34 50 L 48 40 L 62 48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <rect x="31" y="60" width="38" height="4" rx="2" fill="#E2E8F0" />
          <rect x="31" y="68" width="24" height="4" rx="2" fill="#CBD5E1" />
        </g>

        {/* Document 2 (Middle right, tilted +4deg) */}
        <g transform="rotate(4 110 50)">
          <rect x="80" y="16" width="64" height="76" rx="8" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
          <rect x="86" y="22" width="52" height="28" rx="5" fill="url(#docHeader2)" opacity="0.85" />
          <rect x="86" y="58" width="42" height="4" rx="2" fill="#E2E8F0" />
          <rect x="86" y="66" width="30" height="4" rx="2" fill="#CBD5E1" />
          <rect x="86" y="74" width="48" height="3" rx="1.5" fill="#E2E8F0" />
        </g>

        {/* Front Folder Flap (Isometric Tilted Open) */}
        <path
          d="M 12 60 C 12 56 16 53 20 53 L 152 53 C 156 53 160 56 160 60 L 154 118 C 153 124 148 128 142 128 L 30 128 C 24 128 19 124 18 118 Z"
          fill="url(#folderFront)"
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* Front Folder Clasp / Sparkle Badge */}
        <circle cx="86" cy="88" r="9" fill="#ffffff" stroke="#FDE68A" strokeWidth="1.5" />
        <path
          d="M 86 82 L 87.5 85.5 L 91 86 L 88.5 88.5 L 89 92 L 86 90 L 83 92 L 83.5 88.5 L 81 86 L 84.5 85.5 Z"
          fill="#F59E0B"
        />
      </g>
    </svg>
  )
}

/* ─── CoreFeatures Section ─────────────────────────────────────────────────── */
export function CoreFeatures() {
  return (
    <div className="c1-wrapper">
      <div className="c1-container">
        {/* Header block */}
        <div className="c1-badge">Core Features</div>
        <h2 className="c1-title">Built for Speed &amp; Quality</h2>
        <p className="c1-subtitle">
          Everything you need to go<br />
          from idea to image
        </p>

        {/* Grid */}
        <div className="c1-grid">
          {/* Card 1 — Smart Prompt Suggestions */}
          <div className="c1-card c1-card-1">
            <div className="c1-prompt-box">
              A bright, high-resolution 3D illustration of a{' '}
              <span className="c1-blur-text">cheerful cartoon</span> of a{' '}
              <span className="c1-blur-text">girl character</span>{' '}
              <span className="c1-blur-text">centred against a</span> smooth blue background
            </div>
            <div className="c1-pill-btn">
              <span className="c1-sparkle">✦</span> Add more details
            </div>
            <svg
              className="c1-cursor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#0f172a"
              stroke="#ffffff"
              strokeWidth="1"
            >
              <path d="M4 2L20 11L11 13L9 22L4 2Z" />
            </svg>
            <h3>Smart Prompt Suggestions</h3>
          </div>

          {/* Card 2 — API Access (Replaced broken external img with vector API Network visual) */}
          <div className="c1-card c1-card-2">
            <div className="c1-api-visual">
              <ApiNetworkVisual />
            </div>
            <h3>API Access</h3>
          </div>

          {/* Card 3 — Project Library (Replaced broken external img with 3D Library Folder visual) */}
          <div className="c1-card c1-card-3">
            <div className="c1-mesh" />
            <ProjectLibraryFolderVisual />
            <div className="c1-search">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search in library</span>
            </div>
            <h3>Project Library</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
