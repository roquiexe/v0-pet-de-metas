'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pet } from './pet'
import { useAppStore, getProgressToNextLevel, PetType } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Flame, Star, Trophy, Sparkles, ArrowRight, Pencil, Heart } from 'lucide-react'

export function PetTab() {
  const [showChangePet, setShowChangePet] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const { petType, petLevel, petXP, flameStreak, perfectDays, dogName, catName, changePet, setPetName } = useAppStore()
  
  const progress = getProgressToNextLevel(petXP, petLevel)
  
  // Get current pet name based on selected pet type
  const currentPetName = petType === 'dog' ? dogName : catName
  
  // Get display name for each pet (custom name or default)
  const getDogDisplayName = () => dogName || 'Cachorrinho'
  const getCatDisplayName = () => catName || 'Gatinho'

  const handleChangePet = (newType: PetType) => {
    changePet(newType)
    setShowChangePet(false)
  }

  const handleEditName = () => {
    setTempName(currentPetName || '')
    setIsEditingName(true)
  }

  const handleSaveName = () => {
    if (tempName.trim()) {
      setPetName(tempName.trim())
    }
    setIsEditingName(false)
  }

  if (!petType) return null

  return (
    <div className="flex flex-col h-full pb-20 overflow-y-auto overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background -z-10 pointer-events-none" />
      
      {/* Header stats */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-2xl shadow-sm border border-primary/30"
            style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)' }}
          >
            <Flame className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Sequência</p>
              <p className="font-bold text-foreground">{flameStreak}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-2xl shadow-sm border border-primary/30"
            style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)' }}
          >
            <Star className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Dias Perfeitos</p>
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
          className="relative z-0"
        >
          {/* Glow effect behind pet */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
              transform: 'scale(1.5)'
            }}
          />
          
          <Pet type={petType} level={petLevel} size="lg" animated />
        </motion.div>
        
        {/* Pet Name - Larger and more prominent */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 flex items-center gap-2 relative z-50"
        >
          {currentPetName ? (
            <Button
              variant="ghost"
              onClick={handleEditName}
              className="group flex items-center gap-3 px-5 py-3 h-auto bg-card/50 hover:bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all"
            >
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="font-bold text-xl text-foreground">{currentPetName}</span>
              <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={handleEditName}
              className="flex items-center gap-3 px-5 py-3 h-auto bg-card/50 hover:bg-card rounded-2xl border border-dashed border-border/50 hover:border-primary/30 transition-all"
            >
              <Heart className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Dê um nome ao seu pet</span>
              <Pencil className="w-4 h-4 text-muted-foreground" />
            </Button>
          )}
        </motion.div>
        
        {/* Level info - Just the level badge, no name/description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4 relative z-10"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-full" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)' }}>
              <span className="text-sm font-bold text-primary-foreground">Nível {petLevel}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Progress to next level */}
        {petLevel < 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xs mt-6 relative z-10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progresso para o Nível {petLevel + 1}</span>
              <span className="text-sm font-semibold text-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden border border-primary/20">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
                style={{
                  backgroundSize: '200% 100%',
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                }}
              />
            </div>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3" />
              <span>Complete metas para farmar aura</span>
            </div>
          </motion.div>
        )}
        
        {petLevel >= 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-2xl animate-neon-pulse relative z-10"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-white" />
              <span className="font-bold text-white">NÍVEL MÁXIMO ALCANÇADO!</span>
            </div>
          </motion.div>
        )}
        
        {/* Change pet button */}
        <Button
          variant="ghost"
          onClick={() => setShowChangePet(true)}
          className="mt-6 text-muted-foreground relative z-50"
        >
          Trocar Pet <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-card rounded-2xl border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Sequência Atual</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{flameStreak}</p>
            <p className="text-xs text-muted-foreground">dias seguidos</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-card rounded-2xl border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Dias Perfeitos</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{perfectDays}</p>
            <p className="text-xs text-muted-foreground">todas metas feitas</p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-3 p-4 bg-card rounded-2xl border border-primary/30 neon-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Aura Total Farmada</span>
          </div>
          <p className="text-3xl font-bold text-foreground neon-text">{petXP.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-muted-foreground">continue para subir de nível!</p>
        </motion.div>
      </div>
      
      {/* Change pet dialog - Shows custom names if available */}
      <Dialog open={showChangePet} onOpenChange={setShowChangePet}>
        <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Trocar Seu Pet</DialogTitle>
            <DialogDescription>
              Seu progresso será mantido! Apenas a aparência muda.
            </DialogDescription>
          </DialogHeader>
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
              <p className="font-semibold text-foreground">{getDogDisplayName()}</p>
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
              <p className="font-semibold text-foreground">{getCatDisplayName()}</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit pet name dialog */}
      <Dialog open={isEditingName} onOpenChange={setIsEditingName}>
        <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Dê um Nome ao Seu Pet
            </DialogTitle>
            <DialogDescription>
              Escolha um nome carinhoso para seu companheiro!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="ex: Bolinha, Foguinho, Mimi..."
              className="rounded-xl text-center text-lg"
              autoFocus
              maxLength={20}
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditingName(false)} 
                className="flex-1 rounded-xl"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveName}
                disabled={!tempName.trim()}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent neon-button"
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
