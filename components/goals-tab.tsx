'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, Goal } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Flame, 
  Target, 
  Pencil, 
  Trash2,
  Dumbbell,
  BookOpen,
  GraduationCap,
  Droplets,
  Footprints,
} from 'lucide-react'

const UNITS = [
  { value: 'minutos', label: 'minutos' },
  { value: 'horas', label: 'horas' },
  { value: 'páginas', label: 'páginas' },
  { value: 'repetições', label: 'repetições' },
  { value: 'copos', label: 'copos' },
  { value: 'litros', label: 'litros' },
  { value: 'sessões', label: 'sessões' },
  { value: 'sessão', label: 'sessão' },
  { value: 'passos', label: 'passos' },
  { value: 'km', label: 'km' },
]

const SUGGESTED_GOALS = [
  { title: 'Ir para a academia', target: 1, unit: 'sessão', icon: Dumbbell },
  { title: 'Estudar', target: 30, unit: 'minutos', icon: GraduationCap },
  { title: 'Ler', target: 20, unit: 'páginas', icon: BookOpen },
  { title: 'Beber água', target: 8, unit: 'copos', icon: Droplets },
  { title: 'Caminhar', target: 5000, unit: 'passos', icon: Footprints },
]

const getGoalIcon = (title: string) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes('academia') || lowerTitle.includes('exercício') || lowerTitle.includes('treino') || lowerTitle.includes('gym')) return Dumbbell
  if (lowerTitle.includes('estudar') || lowerTitle.includes('aprender') || lowerTitle.includes('study')) return GraduationCap
  if (lowerTitle.includes('ler') || lowerTitle.includes('read')) return BookOpen
  if (lowerTitle.includes('água') || lowerTitle.includes('beber') || lowerTitle.includes('water')) return Droplets
  if (lowerTitle.includes('caminhar') || lowerTitle.includes('andar') || lowerTitle.includes('walk') || lowerTitle.includes('passo')) return Footprints
  return Target
}

interface GoalFormData {
  title: string
  target: number
  unit: string
}

function GoalForm({ 
  initialData, 
  onSubmit, 
  onClose,
  submitLabel 
}: { 
  initialData?: GoalFormData
  onSubmit: (data: GoalFormData) => void
  onClose: () => void
  submitLabel: string
}) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [target, setTarget] = useState(initialData?.target?.toString() || '')
  const [unit, setUnit] = useState(initialData?.unit || 'minutos')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && target) {
      onSubmit({ title: title.trim(), target: parseInt(target), unit })
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Título da Meta</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ex: Ler, Meditar, Exercitar..."
          className="rounded-xl"
          autoFocus
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Objetivo</label>
          <Input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="30"
            min="1"
            className="rounded-xl"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Unidade</label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => (
                <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

function GoalCard({ goal }: { goal: Goal }) {
  const [isEditing, setIsEditing] = useState(false)
  const { toggleGoalComplete, updateGoal, deleteGoal } = useAppStore()
  const Icon = getGoalIcon(goal.title)

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className={`p-4 rounded-2xl border-2 transition-all ${
          goal.completed 
            ? 'bg-success/10 border-success/30' 
            : 'bg-card border-border hover:border-primary/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex-shrink-0"
          >
            <Checkbox
              checked={goal.completed}
              onCheckedChange={() => toggleGoalComplete(goal.id)}
              className={`w-6 h-6 rounded-full border-2 ${
                goal.completed 
                  ? 'bg-success border-success data-[state=checked]:bg-success' 
                  : 'border-muted-foreground'
              }`}
            />
          </motion.div>
          
          <div className={`p-2 rounded-xl ${goal.completed ? 'bg-success/20' : 'bg-accent/30'}`}>
            <Icon className={`w-5 h-5 ${goal.completed ? 'text-success' : 'text-primary'}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={`font-semibold truncate ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {goal.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {goal.target} {goal.unit}
            </p>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteGoal(goal.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {goal.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-1 -top-1"
          >
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Meta</DialogTitle>
          </DialogHeader>
          <GoalForm
            initialData={{ title: goal.title, target: goal.target, unit: goal.unit }}
            onSubmit={(data) => updateGoal(goal.id, data)}
            onClose={() => setIsEditing(false)}
            submitLabel="Salvar"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export function GoalsTab() {
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { goals, addGoal, flameStreak } = useAppStore()
  
  const completedCount = goals.filter(g => g.completed).length
  const totalCount = goals.length

  const handleAddSuggested = (suggestion: typeof SUGGESTED_GOALS[0]) => {
    addGoal({ title: suggestion.title, target: suggestion.target, unit: suggestion.unit })
    setShowSuggestions(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Metas de Hoje</h1>
            <p className="text-muted-foreground">
              {completedCount} / {totalCount} concluídas
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl">
            <Flame className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">{flameStreak}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        </div>
        
        {completedCount === totalCount && totalCount > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-success font-semibold mt-2"
          >
            Dia Perfeito! Todas as metas concluídas!
          </motion.p>
        )}
      </div>
      
      {/* Goals list - with extra bottom padding for fixed buttons */}
      <div className="flex-1 overflow-y-auto px-4 pb-48">
        <AnimatePresence mode="popLayout">
          {goals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Target className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-2">Nenhuma meta ainda</p>
              <p className="text-sm text-muted-foreground">Adicione metas para começar!</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Add goal button - fixed at bottom */}
      <div className="fixed bottom-24 left-0 right-0 px-4 z-30">
        <div className="flex gap-2 max-w-md mx-auto">
          <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1 py-6 rounded-2xl border-2 border-dashed bg-background/80 backdrop-blur-sm"
              >
                <Target className="w-5 h-5 mr-2" />
                Sugestões
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Metas Sugeridas</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {SUGGESTED_GOALS.map((suggestion, i) => {
                  const Icon = suggestion.icon
                  const exists = goals.some(g => g.title.toLowerCase() === suggestion.title.toLowerCase())
                  return (
                    <button
                      key={i}
                      onClick={() => !exists && handleAddSuggested(suggestion)}
                      disabled={exists}
                      className={`w-full p-4 rounded-xl flex items-center gap-3 text-left transition-all ${
                        exists 
                          ? 'bg-muted/50 opacity-50 cursor-not-allowed' 
                          : 'bg-card border border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-accent/30">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{suggestion.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.target} {suggestion.unit}
                        </p>
                      </div>
                      {exists && (
                        <span className="text-xs text-muted-foreground">Adicionada</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
            <DialogTrigger asChild>
              <Button className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Meta
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Nova Meta</DialogTitle>
              </DialogHeader>
              <GoalForm
                onSubmit={(data) => addGoal(data)}
                onClose={() => setIsAddingGoal(false)}
                submitLabel="Criar Meta"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
