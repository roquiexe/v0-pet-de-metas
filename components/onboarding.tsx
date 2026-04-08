'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Pet } from './pet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PetType, useAppStore } from '@/lib/store'
import { Flame, Sparkles, Heart } from 'lucide-react'

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null)
  const [petName, setPetName] = useState('')
  const setOnboarded = useAppStore((state) => state.setOnboarded)

  const handleStart = () => {
    if (selectedPet) {
      setOnboarded(selectedPet, petName.trim() || undefined)
    }
  }

  const handlePetSelect = (pet: PetType) => {
    setSelectedPet(pet)
  }

  const handleContinueToNaming = () => {
    if (selectedPet) {
      setStep(2)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/10 to-background flex flex-col items-center justify-center p-6">
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
                src="/images/aura-pet-logo.png"
                alt="Aura Pet"
                width={280}
                height={140}
                className="mx-auto drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                priority
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              Complete metas diárias para evoluir seu pet, farmar aura e construir hábitos imparáveis!
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
                className="mt-8 w-full py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent neon-button hover:opacity-90 transition-opacity"
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
                onClick={() => handlePetSelect('dog')}
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
                onClick={() => handlePetSelect('cat')}
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
              onClick={handleContinueToNaming} 
              disabled={!selectedPet}
              className="w-full py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent neon-button hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Continuar
            </Button>
          </motion.div>
        )}

        {step === 2 && selectedPet && (
          <motion.div
            key="pet-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center w-full max-w-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              <Pet type={selectedPet} level={1} size="lg" animated />
            </motion.div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <h2 className="text-2xl font-bold text-foreground">Dê um Nome</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Como você quer chamar seu novo companheiro?
            </p>
            
            <div className="space-y-6">
              <Input
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder={selectedPet === 'dog' ? 'ex: Bolinha, Max, Toby...' : 'ex: Luna, Mimi, Felix...'}
                className="rounded-xl text-center text-lg py-6"
                autoFocus
                maxLength={20}
              />
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleStart} 
                  className="w-full py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent neon-button hover:opacity-90 transition-opacity"
                >
                  {petName.trim() ? 'Iniciar Aventura' : 'Pular e Começar'}
                </Button>
                
                {!petName.trim() && (
                  <p className="text-xs text-muted-foreground">
                    Você pode dar um nome depois, se preferir!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
