
const HeroIllustration = () => {
  return (
    <div className="w-full max-w-md mx-auto relative">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Glow */}
        <defs>
          <radialGradient id="backgroundGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.05)" />
          </radialGradient>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#F9FAFB" />
          </linearGradient>
        </defs>
        
        {/* Background Circle with Glow */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="url(#backgroundGlow)"
          className="animate-pulse"
        />
        
        {/* Outer Ring */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="url(#bookGradient)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-spin"
          style={{animationDuration: '20s'}}
        />
        
        {/* Main Book Shape with Gradient */}
        <rect
          x="150"
          y="120"
          width="100"
          height="140"
          rx="12"
          fill="url(#bookGradient)"
          stroke="none"
          className="drop-shadow-lg"
        />
        
        {/* Book Spine */}
        <rect
          x="150"
          y="120"
          width="8"
          height="140"
          rx="4"
          fill="rgba(59, 130, 246, 0.8)"
        />
        
        {/* Book Pages with Gradient */}
        <rect
          x="158"
          y="130"
          width="84"
          height="120"
          rx="6"
          fill="url(#pageGradient)"
          stroke="rgba(156, 163, 175, 0.3)"
          strokeWidth="1"
        />
        
        {/* Page Lines with Better Styling */}
        <line x1="170" y1="150" x2="230" y2="150" stroke="rgba(107, 114, 128, 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="170" y1="165" x2="225" y2="165" stroke="rgba(107, 114, 128, 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="170" y1="180" x2="230" y2="180" stroke="rgba(107, 114, 128, 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="170" y1="195" x2="220" y2="195" stroke="rgba(107, 114, 128, 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="170" y1="210" x2="230" y2="210" stroke="rgba(107, 114, 128, 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="170" y1="225" x2="215" y2="225" stroke="rgba(107, 114, 128, 0.4)" strokeWidth="2" strokeLinecap="round" />
        
        {/* Enhanced Floating Elements */}
        <circle cx="120" cy="160" r="6" fill="#3B82F6" className="animate-bounce drop-shadow-md" style={{animationDelay: '0s'}} />
        <circle cx="300" cy="180" r="8" fill="#8B5CF6" className="animate-bounce drop-shadow-md" style={{animationDelay: '0.5s'}} />
        <circle cx="100" cy="250" r="4" fill="#EC4899" className="animate-bounce drop-shadow-md" style={{animationDelay: '1s'}} />
        <circle cx="320" cy="240" r="7" fill="#10B981" className="animate-bounce drop-shadow-md" style={{animationDelay: '1.5s'}} />
        
        {/* Modern Geometric Shapes */}
        <polygon
          points="80,100 100,80 120,100 100,120"
          fill="none"
          stroke="url(#bookGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse drop-shadow-md"
        />
        
        <rect
          x="290"
          y="300"
          width="24"
          height="24"
          rx="4"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="3"
          transform="rotate(45 300 310)"
          className="animate-pulse drop-shadow-md"
          style={{animationDelay: '0.7s'}}
        />
        
        {/* Enhanced Reading Lines Effect */}
        <path
          d="M 50 320 Q 200 300 350 320"
          fill="none"
          stroke="url(#bookGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-pulse drop-shadow-sm"
          opacity="0.6"
        />
        
        <path
          d="M 60 340 Q 200 320 340 340"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse drop-shadow-sm"
          style={{animationDelay: '0.3s'}}
          opacity="0.4"
        />
        
        {/* Sparkle Effects */}
        <g className="animate-pulse" style={{animationDelay: '2s'}}>
          <polygon points="70,70 72,75 77,75 73,78 75,83 70,80 65,83 67,78 63,75 68,75" fill="#FCD34D" />
          <polygon points="330,120 332,125 337,125 333,128 335,133 330,130 325,133 327,128 323,125 328,125" fill="#F59E0B" />
          <polygon points="90,330 92,335 97,335 93,338 95,343 90,340 85,343 87,338 83,335 88,335" fill="#EF4444" />
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
