'use client'

import { PetType } from '@/lib/store'

interface PetProps {
  type: PetType
  level: number
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

// Pet colors evolve with level
const getLevelColors = (level: number) => {
  const colors = [
    { primary: '#FFB347', secondary: '#FFCC80', glow: '#FFA726', accent: '#FF9800' }, // Level 1 - Warm orange
    { primary: '#FF8A65', secondary: '#FFAB91', glow: '#FF7043', accent: '#FF5722' }, // Level 2 - Coral
    { primary: '#F06292', secondary: '#F48FB1', glow: '#EC407A', accent: '#E91E63' }, // Level 3 - Pink
    { primary: '#BA68C8', secondary: '#CE93D8', glow: '#AB47BC', accent: '#9C27B0' }, // Level 4 - Purple
    { primary: '#7986CB', secondary: '#9FA8DA', glow: '#5C6BC0', accent: '#3F51B5' }, // Level 5 - Indigo
    { primary: '#4FC3F7', secondary: '#81D4FA', glow: '#29B6F6', accent: '#03A9F4' }, // Level 6 - Sky blue
    { primary: '#4DB6AC', secondary: '#80CBC4', glow: '#26A69A', accent: '#009688' }, // Level 7 - Teal
    { primary: '#81C784', secondary: '#A5D6A7', glow: '#66BB6A', accent: '#4CAF50' }, // Level 8 - Green
    { primary: '#FFD54F', secondary: '#FFE082', glow: '#FFCA28', accent: '#FFC107' }, // Level 9 - Gold
    { primary: '#FFB74D', secondary: '#FFCC80', glow: '#FF9800', accent: '#FF6F00', rainbow: true }, // Level 10 - Rainbow gold
  ]
  return colors[Math.min(level - 1, 9)]
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return { width: 80, height: 80 }
    case 'md': return { width: 120, height: 120 }
    case 'lg': return { width: 200, height: 200 }
  }
}

export function Pet({ type, level, size = 'md', animated = true }: PetProps) {
  const colors = getLevelColors(level)
  const dimensions = getSizeClasses(size)
  
  const glowIntensity = Math.min(level * 2, 20)
  const hasAura = level >= 3
  const hasSparkles = level >= 5
  const hasCrown = level >= 8
  const hasWings = level >= 10
  
  return (
    <div 
      className={`relative ${animated ? 'animate-float' : ''}`}
      style={{ 
        filter: `drop-shadow(0 0 ${glowIntensity}px ${colors.glow})`,
        width: dimensions.width,
        height: dimensions.height
      }}
    >
      {/* Aura effect */}
      {hasAura && (
        <div 
          className="absolute inset-0 rounded-full animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, ${colors.glow}40 0%, transparent 70%)`,
            transform: 'scale(1.5)'
          }}
        />
      )}
      
      {/* Sparkles */}
      {hasSparkles && (
        <>
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
          <div className="absolute -top-1 -right-3 w-2 h-2 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </>
      )}
      
      <svg
        viewBox="0 0 100 100"
        width={dimensions.width}
        height={dimensions.height}
        className={animated ? 'animate-pulse-glow' : ''}
      >
        <defs>
          <radialGradient id={`petGradient-${level}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Wings for level 10 */}
        {hasWings && (
          <>
            <ellipse cx="20" cy="50" rx="15" ry="25" fill={colors.glow} opacity="0.6" className="animate-pulse" />
            <ellipse cx="80" cy="50" rx="15" ry="25" fill={colors.glow} opacity="0.6" className="animate-pulse" />
          </>
        )}
        
        {type === 'dog' ? (
          // Cute Dog
          <g filter="url(#glow)">
            {/* Body */}
            <ellipse cx="50" cy="60" rx="28" ry="25" fill={`url(#petGradient-${level})`} />
            
            {/* Head */}
            <circle cx="50" cy="38" r="22" fill={`url(#petGradient-${level})`} />
            
            {/* Ears */}
            <ellipse cx="32" cy="22" rx="10" ry="15" fill={colors.primary} transform="rotate(-20, 32, 22)" />
            <ellipse cx="68" cy="22" rx="10" ry="15" fill={colors.primary} transform="rotate(20, 68, 22)" />
            <ellipse cx="32" cy="24" rx="6" ry="10" fill={colors.secondary} transform="rotate(-20, 32, 24)" />
            <ellipse cx="68" cy="24" rx="6" ry="10" fill={colors.secondary} transform="rotate(20, 68, 24)" />
            
            {/* Snout */}
            <ellipse cx="50" cy="45" rx="10" ry="8" fill={colors.secondary} />
            
            {/* Eyes */}
            <ellipse cx="42" cy="35" rx="5" ry="6" fill="white" />
            <ellipse cx="58" cy="35" rx="5" ry="6" fill="white" />
            <circle cx="43" cy="36" r="3" fill="#2D1B0E" />
            <circle cx="59" cy="36" r="3" fill="#2D1B0E" />
            <circle cx="44" cy="35" r="1.5" fill="white" />
            <circle cx="60" cy="35" r="1.5" fill="white" />
            
            {/* Nose */}
            <ellipse cx="50" cy="43" rx="4" ry="3" fill="#2D1B0E" />
            <ellipse cx="49" cy="42" rx="1.5" ry="1" fill="#5D4037" />
            
            {/* Mouth */}
            <path d="M 46 47 Q 50 51 54 47" stroke="#2D1B0E" strokeWidth="1.5" fill="none" />
            
            {/* Cheeks (blush) */}
            <circle cx="35" cy="42" r="4" fill="#FF8A80" opacity="0.5" />
            <circle cx="65" cy="42" r="4" fill="#FF8A80" opacity="0.5" />
            
            {/* Paws */}
            <ellipse cx="35" cy="80" rx="8" ry="6" fill={colors.primary} />
            <ellipse cx="65" cy="80" rx="8" ry="6" fill={colors.primary} />
            
            {/* Tail */}
            <path d="M 75 65 Q 90 55 85 45" stroke={colors.primary} strokeWidth="8" strokeLinecap="round" fill="none" className={animated ? 'origin-[75px_65px] animate-[wiggle_0.5s_ease-in-out_infinite]' : ''} />
          </g>
        ) : (
          // Cute Cat
          <g filter="url(#glow)">
            {/* Body */}
            <ellipse cx="50" cy="62" rx="25" ry="23" fill={`url(#petGradient-${level})`} />
            
            {/* Head */}
            <circle cx="50" cy="38" r="23" fill={`url(#petGradient-${level})`} />
            
            {/* Ears (pointed) */}
            <polygon points="28,30 35,8 42,28" fill={colors.primary} />
            <polygon points="72,30 65,8 58,28" fill={colors.primary} />
            <polygon points="31,28 35,14 39,26" fill={colors.secondary} />
            <polygon points="69,28 65,14 61,26" fill={colors.secondary} />
            
            {/* Face markings */}
            <ellipse cx="50" cy="42" rx="12" ry="10" fill={colors.secondary} />
            
            {/* Eyes */}
            <ellipse cx="42" cy="35" rx="6" ry="7" fill="white" />
            <ellipse cx="58" cy="35" rx="6" ry="7" fill="white" />
            <ellipse cx="43" cy="36" rx="3.5" ry="4.5" fill="#2D1B0E" />
            <ellipse cx="59" cy="36" rx="3.5" ry="4.5" fill="#2D1B0E" />
            <circle cx="44" cy="34" r="1.5" fill="white" />
            <circle cx="60" cy="34" r="1.5" fill="white" />
            
            {/* Nose */}
            <polygon points="50,41 47,44 53,44" fill="#FF8A80" />
            
            {/* Mouth */}
            <path d="M 47 46 Q 50 49 53 46" stroke="#2D1B0E" strokeWidth="1.5" fill="none" />
            <path d="M 50 44 L 50 46" stroke="#2D1B0E" strokeWidth="1" />
            
            {/* Whiskers */}
            <line x1="25" y1="40" x2="38" y2="42" stroke="#2D1B0E" strokeWidth="0.8" />
            <line x1="25" y1="44" x2="38" y2="44" stroke="#2D1B0E" strokeWidth="0.8" />
            <line x1="25" y1="48" x2="38" y2="46" stroke="#2D1B0E" strokeWidth="0.8" />
            <line x1="75" y1="40" x2="62" y2="42" stroke="#2D1B0E" strokeWidth="0.8" />
            <line x1="75" y1="44" x2="62" y2="44" stroke="#2D1B0E" strokeWidth="0.8" />
            <line x1="75" y1="48" x2="62" y2="46" stroke="#2D1B0E" strokeWidth="0.8" />
            
            {/* Cheeks (blush) */}
            <circle cx="34" cy="42" r="4" fill="#FF8A80" opacity="0.5" />
            <circle cx="66" cy="42" r="4" fill="#FF8A80" opacity="0.5" />
            
            {/* Paws */}
            <ellipse cx="35" cy="82" rx="7" ry="5" fill={colors.primary} />
            <ellipse cx="65" cy="82" rx="7" ry="5" fill={colors.primary} />
            
            {/* Tail */}
            <path d="M 72 70 Q 88 65 90 50 Q 92 40 85 35" stroke={colors.primary} strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        )}
        
        {/* Crown for high levels */}
        {hasCrown && (
          <g transform="translate(50, 8)">
            <polygon points="0,-5 -12,5 -8,5 -6,-1 -3,5 0,0 3,5 6,-1 8,5 12,5" fill="#FFD700" stroke="#FFA000" strokeWidth="0.5" />
            <circle cx="-6" cy="-2" r="2" fill="#E91E63" />
            <circle cx="0" cy="-4" r="2.5" fill="#2196F3" />
            <circle cx="6" cy="-2" r="2" fill="#4CAF50" />
          </g>
        )}
      </svg>
      
      {/* Flame aura for streaks */}
      <div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-flame-flicker"
        style={{
          width: dimensions.width * 0.4,
          height: dimensions.width * 0.3,
        }}
      >
        <svg viewBox="0 0 40 30" fill="none" className="w-full h-full">
          <path
            d="M20 0 C25 8, 35 12, 35 20 C35 28, 28 30, 20 30 C12 30, 5 28, 5 20 C5 12, 15 8, 20 0"
            fill={`url(#flameGradient-${level})`}
          />
          <defs>
            <linearGradient id={`flameGradient-${level}`} x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor={colors.accent} />
              <stop offset="50%" stopColor={colors.glow} />
              <stop offset="100%" stopColor="#FFEB3B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
