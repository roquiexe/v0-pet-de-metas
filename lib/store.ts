import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PetType = 'dog' | 'cat'

export interface Goal {
  id: string
  title: string
  target: number
  unit: string
  completed: boolean
  createdAt: string
}

export interface DayRecord {
  date: string
  goalsCompleted: number
  totalGoals: number
  isPerfect: boolean
  streakIncremented: boolean
}

export interface AppState {
  // Onboarding
  hasOnboarded: boolean
  petType: PetType | null
  petName: string | null
  
  // Pet evolution
  petLevel: number
  petXP: number
  flameStreak: number
  perfectDays: number
  lastStreakDate: string | null
  
  // Goals
  goals: Goal[]
  dayRecords: DayRecord[]
  
  // Actions
  setOnboarded: (petType: PetType) => void
  changePet: (petType: PetType) => void
  setPetName: (name: string) => void
  addGoal: (goal: Omit<Goal, 'id' | 'completed' | 'createdAt'>) => void
  updateGoal: (id: string, updates: Partial<Omit<Goal, 'id' | 'createdAt'>>) => void
  deleteGoal: (id: string) => void
  toggleGoalComplete: (id: string) => void
  resetDailyGoals: () => void
}

// XP required for each level (cumulative days of effort)
const LEVEL_XP_REQUIREMENTS = [
  0,    // Level 1 (start)
  100,  // Level 2 (~1 day)
  600,  // Level 3 (~5 days total)
  1600, // Level 4 (~10 days total)
  4100, // Level 5 (~25 days total)
  8100, // Level 6 (~40 days total)
  13100, // Level 7 (~55 days total)
  19100, // Level 8 (~70 days total)
  26100, // Level 9 (~85 days total)
  35100, // Level 10 (~100 days total)
]

const getToday = () => new Date().toISOString().split('T')[0]

const calculateLevel = (xp: number): number => {
  for (let i = LEVEL_XP_REQUIREMENTS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_REQUIREMENTS[i]) {
      return i + 1
    }
  }
  return 1
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      hasOnboarded: false,
      petType: null,
      petName: null,
      petLevel: 1,
      petXP: 0,
      flameStreak: 0,
      perfectDays: 0,
      lastStreakDate: null,
      goals: [],
      dayRecords: [],
      
      setOnboarded: (petType) => set({ 
        hasOnboarded: true, 
        petType,
        // Add default suggested goals in Portuguese
        goals: [
          { id: '1', title: 'Ir para a academia', target: 1, unit: 'sessão', completed: false, createdAt: new Date().toISOString() },
          { id: '2', title: 'Estudar', target: 30, unit: 'minutos', completed: false, createdAt: new Date().toISOString() },
          { id: '3', title: 'Ler', target: 20, unit: 'páginas', completed: false, createdAt: new Date().toISOString() },
          { id: '4', title: 'Beber água', target: 8, unit: 'copos', completed: false, createdAt: new Date().toISOString() },
        ]
      }),
      
      changePet: (petType) => set({ petType }),
      
      setPetName: (name) => set({ petName: name }),
      
      addGoal: (goal) => set((state) => ({
        goals: [...state.goals, {
          ...goal,
          id: Date.now().toString(),
          completed: false,
          createdAt: new Date().toISOString()
        }]
      })),
      
      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, ...updates } : g)
      })),
      
      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(g => g.id !== id)
      })),
      
      toggleGoalComplete: (id) => set((state) => {
        const today = getToday()
        const goal = state.goals.find(g => g.id === id)
        if (!goal) return state
        
        const newCompleted = !goal.completed
        const updatedGoals = state.goals.map(g => 
          g.id === id ? { ...g, completed: newCompleted } : g
        )
        
        const completedCount = updatedGoals.filter(g => g.completed).length
        const totalCount = updatedGoals.length
        const isPerfect = completedCount === totalCount && totalCount > 0
        
        // Check if this is the first completion of the day for streak
        const todayRecord = state.dayRecords.find(r => r.date === today)
        const wasFirstCompletionToday = !todayRecord?.streakIncremented && 
          newCompleted && 
          state.lastStreakDate !== today
        
        let newStreak = state.flameStreak
        let newLastStreakDate = state.lastStreakDate
        let newXP = state.petXP
        
        if (wasFirstCompletionToday) {
          // Check if streak continues (completed yesterday or is first day)
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]
          
          if (state.lastStreakDate === yesterdayStr || state.lastStreakDate === null) {
            newStreak = state.flameStreak + 1
          } else {
            // Streak broken, start fresh
            newStreak = 1
          }
          newLastStreakDate = today
          // Award XP for completing a goal
          newXP = state.petXP + 100
        }
        
        // Extra XP for perfect day
        if (isPerfect && !state.dayRecords.find(r => r.date === today)?.isPerfect) {
          newXP += 200
        }
        
        const newLevel = calculateLevel(newXP)
        const newPerfectDays = isPerfect && !state.dayRecords.find(r => r.date === today && r.isPerfect)
          ? state.perfectDays + 1
          : state.perfectDays
        
        // Update or create today's record
        const existingRecordIndex = state.dayRecords.findIndex(r => r.date === today)
        const newDayRecords = [...state.dayRecords]
        
        const newRecord: DayRecord = {
          date: today,
          goalsCompleted: completedCount,
          totalGoals: totalCount,
          isPerfect,
          streakIncremented: wasFirstCompletionToday || todayRecord?.streakIncremented || false
        }
        
        if (existingRecordIndex >= 0) {
          newDayRecords[existingRecordIndex] = newRecord
        } else {
          newDayRecords.push(newRecord)
        }
        
        return {
          goals: updatedGoals,
          flameStreak: newStreak,
          lastStreakDate: newLastStreakDate,
          petXP: newXP,
          petLevel: newLevel,
          perfectDays: newPerfectDays,
          dayRecords: newDayRecords
        }
      }),
      
      resetDailyGoals: () => set((state) => ({
        goals: state.goals.map(g => ({ ...g, completed: false }))
      }))
    }),
    {
      name: 'pet-de-metas-storage'
    }
  )
)

// Helper functions
export const getXPForNextLevel = (currentLevel: number): number => {
  if (currentLevel >= 10) return LEVEL_XP_REQUIREMENTS[9]
  return LEVEL_XP_REQUIREMENTS[currentLevel]
}

export const getXPForCurrentLevel = (currentLevel: number): number => {
  if (currentLevel <= 1) return 0
  return LEVEL_XP_REQUIREMENTS[currentLevel - 1]
}

export const getProgressToNextLevel = (xp: number, level: number): number => {
  if (level >= 10) return 100
  const currentLevelXP = getXPForCurrentLevel(level)
  const nextLevelXP = getXPForNextLevel(level)
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
  return Math.min(100, Math.max(0, progress))
}
