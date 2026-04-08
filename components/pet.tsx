'use client'

import { PetType } from '@/lib/store'

interface PetProps {
  type: PetType
  level: number
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

// Pet colors evolve with level - Yellow to Gold to Red to Blue to Purple progression
const getLevelColors = (level: number) => {
  const colors = [
    // Level 1 - Light yellow
    { primary: '#FEF08A', secondary: '#FEF9C3', glow: '#FACC15', accent: '#EAB308', aura: '#FACC15' },
    // Level 2 - Stronger yellow / gold
    { primary: '#FCD34D', secondary: '#FEF08A', glow: '#F59E0B', accent: '#D97706', aura: '#F59E0B' },
    // Level 3 - Warm tones / dark red
    { primary: '#FB923C', secondary: '#FDBA74', glow: '#EA580C', accent: '#DC2626', aura: '#DC2626' },
    // Level 4 - Light blue tint
    { primary: '#93C5FD', secondary: '#BFDBFE', glow: '#60A5FA', accent: '#3B82F6', aura: '#60A5FA' },
    // Level 5 - Medium blue
    { primary: '#60A5FA', secondary: '#93C5FD', glow: '#3B82F6', accent: '#2563EB', aura: '#3B82F6' },
    // Level 6 - Dark blue
    { primary: '#3B82F6', secondary: '#60A5FA', glow: '#2563EB', accent: '#1D4ED8', aura: '#2563EB' },
    // Level 7 - Lilac
    { primary: '#C4B5FD', secondary: '#DDD6FE', glow: '#A78BFA', accent: '#8B5CF6', aura: '#A78BFA' },
    // Level 8 - Purple
    { primary: '#A855F7', secondary: '#C4B5FD', glow: '#9333EA', accent: '#7C3AED', aura: '#9333EA' },
    // Level 9 - Intense purple with strong glow
    { primary: '#9333EA', secondary: '#A855F7', glow: '#7C3AED', accent: '#6D28D9', aura: '#7C3AED' },
    // Level 10 - Premium final version with very intense aura
    { primary: '#7C3AED', secondary: '#A855F7', glow: '#6D28D9', accent: '#5B21B6', aura: '#8B5CF6', rainbow: true },
  ]
  return colors[Math.min(level - 1, 9)]
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return { width: 80, height: 80, auraScale: 1.8 }
    case 'md': return { width: 120, height: 120, auraScale: 2 }
    case 'lg': return { width: 200, height: 200, auraScale: 2.2 }
  }
}

export function Pet({ type, level, size = 'md', animated = true }: PetProps) {
  const colors = getLevelColors(level)
  const dimensions = getSizeClasses(size)
  
  const glowIntensity = Math.min(level * 4, 40)
  const hasAura = true // Always show aura
  const hasSparkles = level >= 2
  const hasEnergyParticles = level >= 4
  const hasCrown = level >= 8
  const hasWings = level >= 10
  const auraLayers = Math.min(level, 5) // More layers = more intense aura
  
  return (
    <div 
      className={`relative ${animated ? 'animate-float' : ''}`}
      style={{ 
        width: dimensions.width * dimensions.auraScale,
        height: dimensions.height * dimensions.auraScale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer energy waves - pointer-events none to not block clicks */}
      {hasEnergyParticles && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-energy-wave"
            style={{
              width: dimensions.width * 0.8,
              height: dimensions.height * 0.8,
              border: `2px solid ${colors.aura}40`,
              animationDelay: '0s',
            }}
          />
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-energy-wave"
            style={{
              width: dimensions.width * 0.8,
              height: dimensions.height * 0.8,
              border: `2px solid ${colors.aura}30`,
              animationDelay: '0.7s',
            }}
          />
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-energy-wave"
            style={{
              width: dimensions.width * 0.8,
              height: dimensions.height * 0.8,
              border: `2px solid ${colors.aura}20`,
              animationDelay: '1.4s',
            }}
          />
        </div>
      )}
      
      {/* Main aura effect - Clean circular glow - pointer-events none */}
      {hasAura && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Base aura glow - circular */}
          <div 
            className="absolute rounded-full animate-aura-breathe"
            style={{
              width: dimensions.width * 1.6,
              height: dimensions.height * 1.6,
              background: `radial-gradient(circle at center, ${colors.aura}50 0%, ${colors.glow}30 40%, transparent 70%)`,
              filter: `blur(${8 + level * 2}px)`,
            }}
          />
          
          {/* Multiple circular aura layers for intensity */}
          {Array.from({ length: auraLayers }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-aura-breathe"
              style={{
                width: dimensions.width * (1.2 + i * 0.12),
                height: dimensions.height * (1.2 + i * 0.12),
                background: `radial-gradient(circle at center, transparent 30%, ${colors.aura}${30 - i * 5} 60%, ${colors.glow}${20 - i * 3} 80%, transparent 100%)`,
                animationDelay: `${i * 0.2}s`,
                filter: `blur(${4 + i * 2}px)`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Bright sparkles/particles - pointer-events none */}
      {hasSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-3 h-3 rounded-full animate-particle-float"
            style={{ 
              background: `radial-gradient(circle, white 0%, ${colors.aura} 100%)`,
              boxShadow: `0 0 10px ${colors.aura}, 0 0 20px ${colors.glow}`,
              top: '10%',
              left: '20%',
              animationDelay: '0s',
            }} 
          />
          <div 
            className="absolute w-2 h-2 rounded-full animate-particle-float"
            style={{ 
              background: `radial-gradient(circle, white 0%, ${colors.aura} 100%)`,
              boxShadow: `0 0 8px ${colors.aura}, 0 0 16px ${colors.glow}`,
              top: '15%',
              right: '15%',
              animationDelay: '0.5s',
            }} 
          />
          <div 
            className="absolute w-2 h-2 rounded-full animate-particle-float"
            style={{ 
              background: `radial-gradient(circle, white 0%, ${colors.aura} 100%)`,
              boxShadow: `0 0 8px ${colors.aura}, 0 0 16px ${colors.glow}`,
              bottom: '25%',
              left: '15%',
              animationDelay: '1s',
            }} 
          />
          <div 
            className="absolute w-2.5 h-2.5 rounded-full animate-particle-float"
            style={{ 
              background: `radial-gradient(circle, white 0%, ${colors.aura} 100%)`,
              boxShadow: `0 0 8px ${colors.aura}, 0 0 16px ${colors.glow}`,
              bottom: '30%',
              right: '20%',
              animationDelay: '1.5s',
            }} 
          />
          {level >= 6 && (
            <>
              <div 
                className="absolute w-1.5 h-1.5 rounded-full animate-particle-float"
                style={{ 
                  background: `radial-gradient(circle, white 0%, ${colors.aura} 100%)`,
                  boxShadow: `0 0 6px ${colors.aura}`,
                  top: '25%',
                  left: '10%',
                  animationDelay: '0.3s',
                }} 
              />
              <div 
                className="absolute w-1.5 h-1.5 rounded-full animate-particle-float"
                style={{ 
                  background: `radial-gradient(circle, white 0%, ${colors.aura} 100%)`,
                  boxShadow: `0 0 6px ${colors.aura}`,
                  top: '20%',
                  right: '10%',
                  animationDelay: '0.8s',
                }} 
              />
            </>
          )}
        </div>
      )}
      
      {/* The pet SVG */}
      <div
        className={animated ? 'animate-pulse-glow' : ''}
        style={{ 
          filter: `drop-shadow(0 0 ${glowIntensity}px ${colors.glow})`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={dimensions.width}
          height={dimensions.height}
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
              <ellipse cx="15" cy="50" rx="18" ry="28" fill={colors.glow} opacity="0.7" className="animate-pulse" />
              <ellipse cx="85" cy="50" rx="18" ry="28" fill={colors.glow} opacity="0.7" className="animate-pulse" />
              <ellipse cx="18" cy="50" rx="12" ry="20" fill={colors.aura} opacity="0.5" />
              <ellipse cx="82" cy="50" rx="12" ry="20" fill={colors.aura} opacity="0.5" />
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
              <circle cx="35" cy="42" r="4" fill="#F0ABFC" opacity="0.6" />
              <circle cx="65" cy="42" r="4" fill="#F0ABFC" opacity="0.6" />
              
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
              <polygon points="50,41 47,44 53,44" fill="#F0ABFC" />
              
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
              <circle cx="34" cy="42" r="4" fill="#F0ABFC" opacity="0.6" />
              <circle cx="66" cy="42" r="4" fill="#F0ABFC" opacity="0.6" />
              
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
              <polygon points="0,-5 -12,5 -8,5 -6,-1 -3,5 0,0 3,5 6,-1 8,5 12,5" fill={colors.aura} stroke={colors.glow} strokeWidth="0.5" />
              <circle cx="-6" cy="-2" r="2" fill={colors.secondary} />
              <circle cx="0" cy="-4" r="2.5" fill={colors.primary} />
              <circle cx="6" cy="-2" r="2" fill={colors.accent} />
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
