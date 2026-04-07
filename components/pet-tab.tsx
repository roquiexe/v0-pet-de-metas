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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Flame, Star, Trophy, Sparkles, ArrowRight, Pencil, Heart } from 'lucide-react'

const LEVEL_NAMES = [
  'Faísca',
  'Brasa',
  'Chama',
  'Fogueira',
  'Inferno',
  'Fênix',
  'Celestial',
  'Divino',
  'Eterno',
  'Lendário',
]

const LEVEL_DESCRIPTIONS = [
  'Sua jornada começa!',
  'A chama cresce mais forte',
  'Dançando com propósito',
  'Brilhando intensamente',
  'Força imparável',
  'Renascendo de cada desafio',
  'Alcançando as estrelas',
  'Tocado pela grandeza',
  'Além dos limites mortais',
  'A conquista suprema',
]

export function PetTab() {
  const [showChangePet, setShowChangePet] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const { petType, petLevel, petXP, flameStreak, perfectDays, petName, changePet, setPetName } = useAppStore()
  
  const progress = getProgressToNextLevel(petXP, petLevel)
  const levelName = LEVEL_NAMES[petLevel - 1] || LEVEL_NAMES[9]
  const levelDescription = LEVEL_DESCRIPTIONS[petLevel - 1] || LEVEL_DESCRIPTIONS[9]

  const handleChangePet = (newType: PetType) => {
    changePet(newType)
    setShowChangePet(false)
  }

  const handleEditName = () => {
    setTempName(petName || '')
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
    <div className="flex flex-col h-full pb-20 overflow-y-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background -z-10" />
      
      {/* Header stats */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-2xl shadow-sm border border-border"
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
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-2xl shadow-sm border border-border"
          >
            <Star className="w-5 h-5 text-yellow-500" />
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
        
        {/* Pet Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 flex items-center gap-2"
        >
          {petName ? (
            <button
              onClick={handleEditName}
              className="group flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all"
            >
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="font-semibold text-foreground">{petName}</span>
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ) : (
            <button
              onClick={handleEditName}
              className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card rounded-2xl border border-dashed border-border/50 hover:border-primary/30 transition-all"
            >
              <Heart className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">Dê um nome ao seu pet</span>
              <Pencil className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
        </motion.div>
        
        {/* Level info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full">
              <span className="text-sm font-bold text-primary-foreground">Nível {petLevel}</span>
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
              <span className="text-sm text-muted-foreground">Progresso para o Nível {petLevel + 1}</span>
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
              <span>Complete metas para ganhar XP</span>
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
              <span className="font-bold text-white">NÍVEL MÁXIMO ALCANÇADO!</span>
            </div>
          </motion.div>
        )}
        
        {/* Change pet button */}
        <Button
          variant="ghost"
          onClick={() => setShowChangePet(true)}
          className="mt-6 text-muted-foreground"
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
            className="p-4 bg-card rounded-2xl border border-border"
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
            className="p-4 bg-card rounded-2xl border border-border"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-xl">
                <Star className="w-5 h-5 text-yellow-500" />
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
          className="mt-3 p-4 bg-card rounded-2xl border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-accent/30 rounded-xl">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">XP Total Ganho</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{petXP.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-muted-foreground">continue para subir de nível!</p>
        </motion.div>
      </div>
      
      {/* Change pet dialog */}
      <Dialog open={showChangePet} onOpenChange={setShowChangePet}>
        <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Trocar Seu Pet</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Seu progresso será mantido! Apenas a aparência muda.
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
              <p className="font-semibold text-foreground">Cachorrinho</p>
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
              <p className="font-semibold text-foreground">Gatinho</p>
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
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Escolha um nome carinhoso para seu companheiro!
          </p>
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
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent"
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
