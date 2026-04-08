'use client'

import { motion } from 'framer-motion'
import { Target, Flame, Trophy } from 'lucide-react'

export type TabType = 'goals' | 'pet' | 'trophies'

interface BottomNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: 'goals' as const, label: 'Metas', icon: Target },
  { id: 'pet' as const, label: 'Pet', icon: Flame },
  { id: 'trophies' as const, label: 'Troféus', icon: Trophy },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-card/90 backdrop-blur-xl border-t border-primary/30" style={{ boxShadow: '0 -4px 20px rgba(168, 85, 247, 0.15)' }}>
        <div className="flex items-center justify-around max-w-md mx-auto px-4 py-2 safe-area-inset-bottom">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center py-2 px-6 min-w-[72px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl"
                    style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3), inset 0 0 10px rgba(168, 85, 247, 0.1)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative z-10"
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </motion.div>
                
                <motion.span
                  animate={{ 
                    opacity: isActive ? 1 : 0.7,
                    fontWeight: isActive ? 600 : 400
                  }}
                  className={`text-xs mt-1 relative z-10 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {tab.label}
                </motion.span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
