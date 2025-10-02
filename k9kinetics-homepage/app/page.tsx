import Image from 'next/image'

export default function Home() {
  return (
    <main className="logo-container">
      <div className="logo-icon">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle for glow effect */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="url(#glowGradient)"
            opacity="0.1"
          />
          
          {/* Dog silhouette */}
          <g transform="translate(50, 60)">
            {/* Dog body */}
            <ellipse
              cx="30"
              cy="45"
              rx="25"
              ry="20"
              fill="#8b5cf6"
              filter="drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))"
            />
            
            {/* Dog head */}
            <circle
              cx="30"
              cy="25"
              r="18"
              fill="#8b5cf6"
              filter="drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))"
            />
            
            {/* Dog snout */}
            <ellipse
              cx="30"
              cy="25"
              rx="8"
              ry="6"
              fill="#8b5cf6"
            />
            
            {/* Dog ears */}
            <ellipse
              cx="20"
              cy="15"
              rx="6"
              ry="12"
              fill="#8b5cf6"
              transform="rotate(-20 20 15)"
            />
            <ellipse
              cx="40"
              cy="15"
              rx="6"
              ry="12"
              fill="#8b5cf6"
              transform="rotate(20 40 15)"
            />
            
            {/* Dog tail */}
            <path
              d="M 55 45 Q 70 35 75 50 Q 70 65 55 55"
              fill="#8b5cf6"
              filter="drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))"
            />
            
            {/* Dog legs */}
            <rect x="20" y="60" width="6" height="15" fill="#8b5cf6" rx="3" />
            <rect x="34" y="60" width="6" height="15" fill="#8b5cf6" rx="3" />
          </g>
          
          {/* Treat dispenser */}
          <g transform="translate(120, 80)">
            {/* Dispenser body */}
            <rect
              x="0"
              y="0"
              width="40"
              height="60"
              rx="8"
              fill="#8b5cf6"
              filter="drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))"
            />
            
            {/* Dispenser opening */}
            <circle
              cx="20"
              cy="15"
              r="8"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
            />
            
            {/* Treat being dispensed */}
            <circle
              cx="20"
              cy="25"
              r="4"
              fill="#8b5cf6"
              filter="drop-shadow(0 1px 2px rgba(139, 92, 246, 0.3))"
            />
            
            {/* Dispenser base */}
            <rect
              x="5"
              y="55"
              width="30"
              height="8"
              rx="4"
              fill="#8b5cf6"
            />
          </g>
          
          {/* Glow gradient definition */}
          <defs>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      <h1 className="brand-name">K9Kinetics</h1>
      <p className="tagline">Helping dogs stay healthy, one treat at a time.</p>
    </main>
  )
}



