'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Trophy, Star, Flame, Lock, Sparkles } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: 'trophy' | 'star' | 'flame'
  requirement: number
  type: 'perfectDays' | 'level' | 'streak'
}

const ACHIEVEMENTS: Achievement[] = [
  // Perfect Days achievements
  { id: 'perfect-3', title: 'Começando Bem', description: '3 Dias Perfeitos', icon: 'star', requirement: 3, type: 'perfectDays' },
  { id: 'perfect-10', title: 'Consistente', description: '10 Dias Perfeitos', icon: 'star', requirement: 10, type: 'perfectDays' },
  { id: 'perfect-25', title: 'Dedicado', description: '25 Dias Perfeitos', icon: 'star', requirement: 25, type: 'perfectDays' },
  { id: 'perfect-50', title: 'Comprometido', description: '50 Dias Perfeitos', icon: 'star', requirement: 50, type: 'perfectDays' },
  { id: 'perfect-100', title: 'Imparável', description: '100 Dias Perfeitos', icon: 'star', requirement: 100, type: 'perfectDays' },
  
  // Level achievements
  { id: 'level-2', title: 'Primeira Evolução', description: 'Alcance o Nível 2', icon: 'trophy', requirement: 2, type: 'level' },
  { id: 'level-3', title: 'Estrela em Ascensão', description: 'Alcance o Nível 3', icon: 'trophy', requirement: 3, type: 'level' },
  { id: 'level-4', title: 'Espírito Ardente', description: 'Alcance o Nível 4', icon: 'trophy', requirement: 4, type: 'level' },
  { id: 'level-5', title: 'Mestre do Inferno', description: 'Alcance o Nível 5', icon: 'trophy', requirement: 5, type: 'level' },
  { id: 'level-6', title: 'Fênix Renascida', description: 'Alcance o Nível 6', icon: 'trophy', requirement: 6, type: 'level' },
  { id: 'level-7', title: 'Ser Celestial', description: 'Alcance o Nível 7', icon: 'trophy', requirement: 7, type: 'level' },
  { id: 'level-8', title: 'Chama Divina', description: 'Alcance o Nível 8', icon: 'trophy', requirement: 8, type: 'level' },
  { id: 'level-9', title: 'Guardião Eterno', description: 'Alcance o Nível 9', icon: 'trophy', requirement: 9, type: 'level' },
  { id: 'level-10', title: 'Mestre Lendário', description: 'Alcance o Nível 10', icon: 'trophy', requirement: 10, type: 'level' },
  
  // Streak achievements
  { id: 'streak-7', title: 'Uma Semana Incrível', description: 'Sequência de 7 Dias', icon: 'flame', requirement: 7, type: 'streak' },
  { id: 'streak-14', title: 'Guerreiro Quinzenal', description: 'Sequência de 14 Dias', icon: 'flame', requirement: 14, type: 'streak' },
  { id: 'streak-30', title: 'Mestre do Mês', description: 'Sequência de 30 Dias', icon: 'flame', requirement: 30, type: 'streak' },
  { id: 'streak-60', title: 'Titã de Dois Meses', description: 'Sequência de 60 Dias', icon: 'flame', requirement: 60, type: 'streak' },
  { id: 'streak-100', title: 'Campeão do Século', description: 'Sequência de 100 Dias', icon: 'flame', requirement: 100, type: 'streak' },
]

const getIcon = (icon: Achievement['icon'], unlocked: boolean) => {
  const className = `w-6 h-6 ${unlocked ? '' : 'text-muted-foreground/50'}`
  switch (icon) {
    case 'trophy': return <Trophy className={className} style={{ color: unlocked ? '#FFD700' : undefined }} />
    case 'star': return <Star className={className} style={{ color: unlocked ? '#FFAB00' : undefined }} />
    case 'flame': return <Flame className={className} style={{ color: unlocked ? '#FF6B35' : undefined }} />
  }
}

function AchievementCard({ achievement, unlocked, progress }: { achievement: Achievement; unlocked: boolean; progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: unlocked ? 1.02 : 1 }}
      className={`relative p-4 rounded-2xl border-2 transition-all ${
        unlocked 
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700 shadow-lg' 
          : 'bg-card border-border opacity-70'
      }`}
    >
      {/* Lock overlay for locked achievements */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/50 backdrop-blur-[1px]">
          <Lock className="w-8 h-8 text-muted-foreground/30" />
        </div>
      )}
      
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-xl ${
          unlocked 
            ? 'bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-yellow-800 dark:to-orange-800' 
            : 'bg-muted'
        }`}>
          {getIcon(achievement.icon, unlocked)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold truncate ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
            {achievement.title}
          </h3>
          <p className={`text-sm ${unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
            {achievement.description}
          </p>
          
          {!unlocked && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progresso</span>
                <span>{progress} / {achievement.requirement}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{ width: `${Math.min(100, (progress / achievement.requirement) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        {unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export function TrophiesTab() {
  const { perfectDays, petLevel, flameStreak } = useAppStore()
  
  const getProgress = (achievement: Achievement): number => {
    switch (achievement.type) {
      case 'perfectDays': return perfectDays
      case 'level': return petLevel
      case 'streak': return flameStreak
      default: return 0
    }
  }
  
  const isUnlocked = (achievement: Achievement): boolean => {
    return getProgress(achievement) >= achievement.requirement
  }
  
  const unlockedCount = ACHIEVEMENTS.filter(isUnlocked).length
  const totalCount = ACHIEVEMENTS.length
  
  // Group achievements by type
  const levelAchievements = ACHIEVEMENTS.filter(a => a.type === 'level')
  const perfectDaysAchievements = ACHIEVEMENTS.filter(a => a.type === 'perfectDays')
  const streakAchievements = ACHIEVEMENTS.filter(a => a.type === 'streak')

  return (
    <div className="flex flex-col h-full pb-20 overflow-y-auto">
      {/* Header */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Troféus</h1>
            <p className="text-muted-foreground">
              {unlockedCount} / {totalCount} desbloqueados
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl">
            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="font-bold text-yellow-700 dark:text-yellow-300">{unlockedCount}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>
      </div>
      
      {/* Achievements list */}
      <div className="flex-1 px-4">
        {/* Level achievements */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="font-bold text-foreground">Nível do Pet</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {levelAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <AchievementCard 
                  achievement={achievement} 
                  unlocked={isUnlocked(achievement)} 
                  progress={getProgress(achievement)}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Perfect Days achievements */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="font-bold text-foreground">Dias Perfeitos</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {perfectDaysAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.3 }}
              >
                <AchievementCard 
                  achievement={achievement} 
                  unlocked={isUnlocked(achievement)} 
                  progress={getProgress(achievement)}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Streak achievements */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Sequência de Fogo</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {streakAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.6 }}
              >
                <AchievementCard 
                  achievement={achievement} 
                  unlocked={isUnlocked(achievement)} 
                  progress={getProgress(achievement)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
