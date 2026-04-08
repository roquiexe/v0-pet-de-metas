'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Onboarding } from './onboarding'
import { Header } from './header'
import { GoalsTab } from './goals-tab'
import { PetTab } from './pet-tab'
import { TrophiesTab } from './trophies-tab'
import { BottomNavigation, TabType } from './bottom-navigation'

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabType>('goals')
  const [mounted, setMounted] = useState(false)
  const hasOnboarded = useAppStore((state) => state.hasOnboarded)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary/20 rounded-full" />
        </div>
      </div>
    )
  }

  if (!hasOnboarded) {
    return <Onboarding />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <GoalsTab />
            </motion.div>
          )}
          
          {activeTab === 'pet' && (
            <motion.div
              key="pet"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <PetTab />
            </motion.div>
          )}
          
          {activeTab === 'trophies' && (
            <motion.div
              key="trophies"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <TrophiesTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
