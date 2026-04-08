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
  auraReward: number // How much aura this goal gives when completed (default 100)
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
  
  // Separate names for each pet
  dogName: string | null
  catName: string | null
  
  // Pet evolution
  petLevel: number
  petXP: number
  flameStreak: number
  perfectDays: number
  lastStreakDate: string | null
  
  // Track which dates have been counted as perfect days
  perfectDayDates: string[]
  
  // Goals
  goals: Goal[]
  dayRecords: DayRecord[]
  
  // Actions
  setOnboarded: (petType: PetType, petName?: string) => void
  changePet: (petType: PetType) => void
  setPetName: (name: string) => void
  addGoal: (goal: Omit<Goal, 'id' | 'completed' | 'createdAt'>) => void
  updateGoal: (id: string, updates: Partial<Omit<Goal, 'id' | 'createdAt'>>) => void
  deleteGoal: (id: string) => void
  toggleGoalComplete: (id: string) => void
  resetDailyGoals: () => void
  
  // Helpers
  getCurrentPetName: () => string | null
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
      dogName: null,
      catName: null,
      petLevel: 1,
      petXP: 0,
      flameStreak: 0,
      perfectDays: 0,
      lastStreakDate: null,
      perfectDayDates: [],
      goals: [],
      dayRecords: [],
      
      setOnboarded: (petType, petName) => set({ 
        hasOnboarded: true, 
        petType,
        // Set the name for the selected pet type
        ...(petType === 'dog' ? { dogName: petName || null } : { catName: petName || null }),
        // Add default suggested goals in Portuguese
        goals: [
          { id: '1', title: 'Ir para a academia', target: 1, unit: 'sessão', completed: false, createdAt: new Date().toISOString(), auraReward: 100 },
          { id: '2', title: 'Estudar', target: 30, unit: 'minutos', completed: false, createdAt: new Date().toISOString(), auraReward: 100 },
          { id: '3', title: 'Ler', target: 20, unit: 'páginas', completed: false, createdAt: new Date().toISOString(), auraReward: 100 },
          { id: '4', title: 'Beber água', target: 8, unit: 'copos', completed: false, createdAt: new Date().toISOString(), auraReward: 100 },
        ]
      }),
      
      changePet: (petType) => set({ petType }),
      
      setPetName: (name) => set((state) => {
        // Set name for current pet type
        if (state.petType === 'dog') {
          return { dogName: name }
        } else if (state.petType === 'cat') {
          return { catName: name }
        }
        return {}
      }),
      
      getCurrentPetName: () => {
        const state = get()
        if (state.petType === 'dog') return state.dogName
        if (state.petType === 'cat') return state.catName
        return null
      },
      
      addGoal: (goal) => set((state) => {
        const today = getToday()
        const wasPerfectToday = state.perfectDayDates.includes(today)
        
        // Adding a new uncompleted goal breaks perfect day status
        let newPerfectDays = state.perfectDays
        let newPerfectDayDates = [...state.perfectDayDates]
        
        if (wasPerfectToday) {
          // Remove today from perfect days since we now have an uncompleted goal
          newPerfectDays = Math.max(0, state.perfectDays - 1)
          newPerfectDayDates = newPerfectDayDates.filter(d => d !== today)
        }
        
        return {
          goals: [...state.goals, {
            ...goal,
            id: Date.now().toString(),
            completed: false,
            createdAt: new Date().toISOString(),
            auraReward: 100 // Default reward for each goal
          }],
          perfectDays: newPerfectDays,
          perfectDayDates: newPerfectDayDates
        }
      }),
      
      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, ...updates } : g)
      })),
      
      deleteGoal: (id) => set((state) => {
        const today = getToday()
        const goalToDelete = state.goals.find(g => g.id === id)
        const updatedGoals = state.goals.filter(g => g.id !== id)
        
        // If the deleted goal was completed, subtract its aura
        let newXP = state.petXP
        if (goalToDelete?.completed) {
          newXP = Math.max(0, state.petXP - goalToDelete.auraReward)
        }
        const newLevel = calculateLevel(newXP)
        
        // Check if deleting makes the day perfect
        const completedCount = updatedGoals.filter(g => g.completed).length
        const totalCount = updatedGoals.length
        const isPerfectNow = completedCount === totalCount && totalCount > 0
        const wasPerfectToday = state.perfectDayDates.includes(today)
        
        let newPerfectDays = state.perfectDays
        let newPerfectDayDates = [...state.perfectDayDates]
        
        // If deleting a goal makes it perfect and today wasn't already counted
        if (isPerfectNow && !wasPerfectToday) {
          newPerfectDays = state.perfectDays + 1
          newPerfectDayDates.push(today)
        }
        
        return {
          goals: updatedGoals,
          petXP: newXP,
          petLevel: newLevel,
          perfectDays: newPerfectDays,
          perfectDayDates: newPerfectDayDates
        }
      }),
      
      toggleGoalComplete: (id) => set((state) => {
        const today = getToday()
        const goal = state.goals.find(g => g.id === id)
        if (!goal) return state
        
        const newCompleted = !goal.completed
        const auraChange = newCompleted ? goal.auraReward : -goal.auraReward
        
        // Update the goal's completed status
        const updatedGoals = state.goals.map(g => 
          g.id === id ? { ...g, completed: newCompleted } : g
        )
        
        // Calculate new XP (ensure it never goes below 0)
        const newXP = Math.max(0, state.petXP + auraChange)
        
        // Calculate level based on current XP (can go up or down)
        const newLevel = calculateLevel(newXP)
        
        // Perfect day and streak logic
        const completedCount = updatedGoals.filter(g => g.completed).length
        const totalCount = updatedGoals.length
        const isPerfectNow = completedCount === totalCount && totalCount > 0
        const wasPerfectToday = state.perfectDayDates.includes(today)
        
        let newPerfectDays = state.perfectDays
        let newPerfectDayDates = [...state.perfectDayDates]
        
        // Handle perfect day logic
        if (isPerfectNow && !wasPerfectToday) {
          newPerfectDays = state.perfectDays + 1
          newPerfectDayDates.push(today)
        } else if (!isPerfectNow && wasPerfectToday) {
          newPerfectDays = Math.max(0, state.perfectDays - 1)
          newPerfectDayDates = newPerfectDayDates.filter(d => d !== today)
        }
        
        // Streak logic - only increment once per day on first completion
        let newStreak = state.flameStreak
        let newLastStreakDate = state.lastStreakDate
        const todayRecord = state.dayRecords.find(r => r.date === today)
        const wasFirstCompletionToday = !todayRecord?.streakIncremented && 
          newCompleted && 
          state.lastStreakDate !== today
        
        if (wasFirstCompletionToday) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]
          
          if (state.lastStreakDate === yesterdayStr || state.lastStreakDate === null) {
            newStreak = state.flameStreak + 1
          } else {
            newStreak = 1
          }
          newLastStreakDate = today
        }
        
        // Update day record
        const existingRecordIndex = state.dayRecords.findIndex(r => r.date === today)
        const newDayRecords = [...state.dayRecords]
        
        const newRecord: DayRecord = {
          date: today,
          goalsCompleted: completedCount,
          totalGoals: totalCount,
          isPerfect: isPerfectNow,
          streakIncremented: wasFirstCompletionToday || todayRecord?.streakIncremented || false
        }
        
        if (existingRecordIndex >= 0) {
          newDayRecords[existingRecordIndex] = newRecord
        } else {
          newDayRecords.push(newRecord)
        }
        
        return {
          goals: updatedGoals,
          petXP: newXP,
          petLevel: newLevel,
          flameStreak: newStreak,
          lastStreakDate: newLastStreakDate,
          perfectDays: newPerfectDays,
          perfectDayDates: newPerfectDayDates,
          dayRecords: newDayRecords
        }
      }),
      
      resetDailyGoals: () => set((state) => {
        // When resetting daily goals, recalculate XP based on 0 completed goals
        // This removes aura from all goals that were completed
        const completedGoalsAura = state.goals
          .filter(g => g.completed)
          .reduce((sum, g) => sum + g.auraReward, 0)
        
        const newXP = Math.max(0, state.petXP - completedGoalsAura)
        const newLevel = calculateLevel(newXP)
        
        return {
          goals: state.goals.map(g => ({ ...g, completed: false })),
          petXP: newXP,
          petLevel: newLevel
        }
      })
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
