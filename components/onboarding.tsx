'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pet } from './pet'
import { Button } from '@/components/ui/button'
import { PetType, useAppStore } from '@/lib/store'
import { Flame, Sparkles } from 'lucide-react'

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null)
  const setOnboarded = useAppStore((state) => state.setOnboarded)

  const handleStart = () => {
    if (selectedPet) {
      setOnboarded(selectedPet)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-secondary/30 flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                <Flame className="w-12 h-12 text-primary-foreground" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-foreground mb-3"
            >
              Pet de Metas
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              Complete daily goals to evolve your magical flame pet and build unstoppable habits!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Set daily healthy goals</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-primary" />
                <span>Build your flame streak</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Watch your pet evolve</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                onClick={() => setStep(1)} 
                className="mt-8 w-full py-6 text-lg font-semibold rounded-2xl shadow-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="pet-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Pet</h2>
            <p className="text-muted-foreground mb-8">
              Pick a companion for your journey!
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPet('dog')}
                className={`p-6 rounded-3xl border-2 transition-all ${
                  selectedPet === 'dog' 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex justify-center mb-3">
                  <Pet type="dog" level={1} size="md" animated={selectedPet === 'dog'} />
                </div>
                <p className="font-semibold text-foreground">Doggo</p>
                <p className="text-xs text-muted-foreground">Loyal friend</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPet('cat')}
                className={`p-6 rounded-3xl border-2 transition-all ${
                  selectedPet === 'cat' 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex justify-center mb-3">
                  <Pet type="cat" level={1} size="md" animated={selectedPet === 'cat'} />
                </div>
                <p className="font-semibold text-foreground">Kitty</p>
                <p className="text-xs text-muted-foreground">Curious soul</p>
              </motion.button>
            </div>
            
            <Button 
              onClick={handleStart} 
              disabled={!selectedPet}
              className="w-full py-6 text-lg font-semibold rounded-2xl shadow-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Begin Adventure
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
