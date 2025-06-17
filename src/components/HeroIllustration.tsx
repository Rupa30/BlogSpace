
const HeroIllustration = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Main Book Shape */}
        <rect
          x="150"
          y="120"
          width="100"
          height="140"
          rx="8"
          fill="none"
          stroke="#000"
          strokeWidth="2"
        />
        
        {/* Book Pages */}
        <line x1="170" y1="140" x2="230" y2="140" stroke="#ccc" strokeWidth="1" />
        <line x1="170" y1="160" x2="230" y2="160" stroke="#ccc" strokeWidth="1" />
        <line x1="170" y1="180" x2="220" y2="180" stroke="#ccc" strokeWidth="1" />
        <line x1="170" y1="200" x2="230" y2="200" stroke="#ccc" strokeWidth="1" />
        <line x1="170" y1="220" x2="210" y2="220" stroke="#ccc" strokeWidth="1" />
        
        {/* Floating Elements */}
        <circle cx="120" cy="160" r="4" fill="#000" className="animate-bounce" style={{animationDelay: '0s'}} />
        <circle cx="300" cy="180" r="6" fill="#ccc" className="animate-bounce" style={{animationDelay: '0.5s'}} />
        <circle cx="100" cy="250" r="3" fill="#666" className="animate-bounce" style={{animationDelay: '1s'}} />
        <circle cx="320" cy="240" r="5" fill="#000" className="animate-bounce" style={{animationDelay: '1.5s'}} />
        
        {/* Geometric Shapes */}
        <polygon
          points="80,100 100,80 120,100 100,120"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        <rect
          x="290"
          y="300"
          width="20"
          height="20"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          transform="rotate(45 300 310)"
          className="animate-pulse"
          style={{animationDelay: '0.7s'}}
        />
        
        {/* Reading Lines Effect */}
        <path
          d="M 50 320 Q 200 300 350 320"
          fill="none"
          stroke="#ddd"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        <path
          d="M 60 340 Q 200 320 340 340"
          fill="none"
          stroke="#eee"
          strokeWidth="2"
          className="animate-pulse"
          style={{animationDelay: '0.3s'}}
        />
      </svg>
    </div>
  );
};

export default HeroIllustration;
