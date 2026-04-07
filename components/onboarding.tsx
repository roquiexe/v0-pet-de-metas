'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20do%20Pet%20de%20Metas-RrbP2Gm7Mq6ZhBAILOgS9S2poyNJIv.png"
                alt="Pet de Metas"
                width={240}
                height={120}
                className="mx-auto"
                priority
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              Complete metas diárias para evoluir seu pet mágico e construir hábitos imparáveis!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Defina metas diárias saudáveis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-primary" />
                <span>Construa sua sequência de fogo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Veja seu pet evoluir</span>
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
                Começar
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Escolha Seu Pet</h2>
            <p className="text-muted-foreground mb-8">
              Escolha um companheiro para sua jornada!
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
                <p className="font-semibold text-foreground">Cachorrinho</p>
                <p className="text-xs text-muted-foreground">Amigo leal</p>
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
                <p className="font-semibold text-foreground">Gatinho</p>
                <p className="text-xs text-muted-foreground">Alma curiosa</p>
              </motion.button>
            </div>
            
            <Button 
              onClick={handleStart} 
              disabled={!selectedPet}
              className="w-full py-6 text-lg font-semibold rounded-2xl shadow-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Iniciar Aventura
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
