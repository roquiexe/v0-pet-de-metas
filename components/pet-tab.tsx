'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pet } from './pet'
import { useAppStore, getProgressToNextLevel, PetType } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Flame, Star, Trophy, Sparkles, ArrowRight } from 'lucide-react'

const LEVEL_NAMES = [
  'Spark',
  'Ember',
  'Flicker',
  'Blaze',
  'Inferno',
  'Phoenix',
  'Celestial',
  'Divine',
  'Eternal',
  'Legendary',
]

const LEVEL_DESCRIPTIONS = [
  'Your journey begins!',
  'The flame grows stronger',
  'Dancing with purpose',
  'Burning bright',
  'Unstoppable force',
  'Rising from every challenge',
  'Reaching for the stars',
  'Touched by greatness',
  'Beyond mortal limits',
  'The ultimate achievement',
]

export function PetTab() {
  const [showChangePet, setShowChangePet] = useState(false)
  const { petType, petLevel, petXP, flameStreak, perfectDays, changePet } = useAppStore()
  
  const progress = getProgressToNextLevel(petXP, petLevel)
  const levelName = LEVEL_NAMES[petLevel - 1] || LEVEL_NAMES[9]
  const levelDescription = LEVEL_DESCRIPTIONS[petLevel - 1] || LEVEL_DESCRIPTIONS[9]

  const handleChangePet = (newType: PetType) => {
    changePet(newType)
    setShowChangePet(false)
  }

  if (!petType) return null

  return (
    <div className="flex flex-col h-full pb-20 overflow-y-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background -z-10" />
      
      {/* Header stats */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-2xl shadow-sm border border-border"
          >
            <Flame className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="font-bold text-foreground">{flameStreak}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-2xl shadow-sm border border-border"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-xs text-muted-foreground">Perfect Days</p>
              <p className="font-bold text-foreground">{perfectDays}</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Pet display */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Glow effect behind pet */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-30"
            style={{
              background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
              transform: 'scale(1.5)'
            }}
          />
          
          <Pet type={petType} level={petLevel} size="lg" animated />
        </motion.div>
        
        {/* Level info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full">
              <span className="text-sm font-bold text-primary-foreground">Level {petLevel}</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-1">{levelName}</h2>
          <p className="text-muted-foreground">{levelDescription}</p>
        </motion.div>
        
        {/* Progress to next level */}
        {petLevel < 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xs mt-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progress to Level {petLevel + 1}</span>
              <span className="text-sm font-semibold text-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite',
                }}
              />
            </div>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3" />
              <span>Complete goals to earn XP</span>
            </div>
          </motion.div>
        )}
        
        {petLevel >= 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-white" />
              <span className="font-bold text-white">MAX LEVEL ACHIEVED!</span>
            </div>
          </motion.div>
        )}
        
        {/* Change pet button */}
        <Button
          variant="ghost"
          onClick={() => setShowChangePet(true)}
          className="mt-6 text-muted-foreground"
        >
          Change Pet <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-card rounded-2xl border border-border"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Current Streak</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{flameStreak}</p>
            <p className="text-xs text-muted-foreground">days in a row</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-card rounded-2xl border border-border"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-xl">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground">Perfect Days</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{perfectDays}</p>
            <p className="text-xs text-muted-foreground">all goals done</p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-3 p-4 bg-card rounded-2xl border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-accent/30 rounded-xl">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Total XP Earned</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{petXP.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">keep going to level up!</p>
        </motion.div>
      </div>
      
      {/* Change pet dialog */}
      <Dialog open={showChangePet} onOpenChange={setShowChangePet}>
        <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Your Pet</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Your progress will be kept! Only the appearance changes.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChangePet('dog')}
              className={`p-6 rounded-3xl border-2 transition-all ${
                petType === 'dog' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex justify-center mb-3">
                <Pet type="dog" level={petLevel} size="md" animated={petType === 'dog'} />
              </div>
              <p className="font-semibold text-foreground">Doggo</p>
            </button>
            
            <button
              onClick={() => handleChangePet('cat')}
              className={`p-6 rounded-3xl border-2 transition-all ${
                petType === 'cat' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex justify-center mb-3">
                <Pet type="cat" level={petLevel} size="md" animated={petType === 'cat'} />
              </div>
              <p className="font-semibold text-foreground">Kitty</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
