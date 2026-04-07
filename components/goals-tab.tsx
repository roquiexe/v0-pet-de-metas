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
  X
} from 'lucide-react'

const UNITS = [
  'minutes',
  'hours',
  'pages',
  'repetitions',
  'glasses',
  'liters',
  'sessions',
  'steps',
  'km',
]

const SUGGESTED_GOALS = [
  { title: 'Go to the gym', target: 1, unit: 'session', icon: Dumbbell },
  { title: 'Study', target: 30, unit: 'minutes', icon: GraduationCap },
  { title: 'Read', target: 20, unit: 'pages', icon: BookOpen },
  { title: 'Drink water', target: 8, unit: 'glasses', icon: Droplets },
  { title: 'Walk', target: 5000, unit: 'steps', icon: Footprints },
]

const getGoalIcon = (title: string) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes('gym') || lowerTitle.includes('exercise') || lowerTitle.includes('workout')) return Dumbbell
  if (lowerTitle.includes('study') || lowerTitle.includes('learn')) return GraduationCap
  if (lowerTitle.includes('read')) return BookOpen
  if (lowerTitle.includes('water') || lowerTitle.includes('drink')) return Droplets
  if (lowerTitle.includes('walk') || lowerTitle.includes('step')) return Footprints
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
  const [unit, setUnit] = useState(initialData?.unit || 'minutes')

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
        <label className="text-sm font-medium text-foreground mb-2 block">Goal Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Read, Meditate, Exercise..."
          className="rounded-xl"
          autoFocus
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Target</label>
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
          <label className="text-sm font-medium text-foreground mb-2 block">Unit</label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => (
                <SelectItem key={u} value={u}>{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
          Cancel
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
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          <GoalForm
            initialData={{ title: goal.title, target: goal.target, unit: goal.unit }}
            onSubmit={(data) => updateGoal(goal.id, data)}
            onClose={() => setIsEditing(false)}
            submitLabel="Save Changes"
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
    <div className="flex flex-col h-full pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Today&apos;s Goals</h1>
            <p className="text-muted-foreground">
              {completedCount} / {totalCount} completed
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
            Perfect Day! All goals completed!
          </motion.p>
        )}
      </div>
      
      {/* Goals list */}
      <div className="flex-1 overflow-y-auto px-4">
        <AnimatePresence mode="popLayout">
          {goals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Target className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-2">No goals yet</p>
              <p className="text-sm text-muted-foreground">Add some goals to get started!</p>
            </motion.div>
          ) : (
            <div className="space-y-3 pb-4">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Add goal button */}
      <div className="fixed bottom-24 left-0 right-0 px-4">
        <div className="flex gap-2 max-w-md mx-auto">
          <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1 py-6 rounded-2xl border-2 border-dashed"
              >
                <Target className="w-5 h-5 mr-2" />
                Suggestions
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Suggested Goals</DialogTitle>
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
                        <span className="text-xs text-muted-foreground">Added</span>
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
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl max-w-[90%] sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <GoalForm
                onSubmit={(data) => addGoal(data)}
                onClose={() => setIsAddingGoal(false)}
                submitLabel="Create Goal"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
