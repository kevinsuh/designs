"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Upload, MessageCircle, Activity, ArrowRight, Dumbbell, RotateCcw, BarChart3, X, FileText, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

// Mock data for demonstration
const progressData = [
  { day: "Day 1", calories: 2200, target: 2000, weight: 180 },
  { day: "Day 7", calories: 2100, target: 2000, weight: 179.5 },
  { day: "Day 14", calories: 1950, target: 2000, weight: 179 },
  { day: "Day 21", calories: 2050, target: 2000, weight: 178.2 },
  { day: "Day 28", calories: 1980, target: 2000, weight: 177.8 },
  { day: "Day 35", calories: 1920, target: 2000, weight: 177.1 },
]

const activityData = [
  { week: "Week 1", runs: 3, lifts: 4, steps: 65000 },
  { week: "Week 2", runs: 4, lifts: 3, steps: 72000 },
  { week: "Week 3", runs: 3, lifts: 4, steps: 68000 },
  { week: "Week 4", runs: 5, lifts: 3, steps: 78000 },
  { week: "Week 5", runs: 4, lifts: 4, steps: 75000 },
]

// Mock data for recent chat threads
const recentThreads = [
  { id: 1, title: "Weekly progress review", lastMessage: "Your consistency is improving!", timestamp: "2 hours ago" },
  { id: 2, title: "Nutrition adjustments", lastMessage: "Let's increase your protein intake", timestamp: "1 day ago" },
  { id: 3, title: "Recovery strategies", lastMessage: "Try these sleep optimization tips", timestamp: "3 days ago" },
  { id: 4, title: "Workout modifications", lastMessage: "Here's your updated routine", timestamp: "5 days ago" },
  { id: 5, title: "Goal setting session", lastMessage: "Your new targets look great!", timestamp: "1 week ago" },
]

// Top insights data
const topInsights = {
  wins: [
    { text: "You're running an average of 30 seconds faster per mile than 1 year ago", emoji: "🏆" },
    { text: "You've increased your top bench press from 180 lb to 225 lb", emoji: "🏆" },
    { text: "Your consistency has improved - 28 workouts completed this month vs 18 last month", emoji: "🏆" },
  ],
  improvements: [
    { text: "Your sleep score has decreased this month compared to last month", emoji: "👀" },
    { text: "You've been in a caloric surplus for 15 of the last 30 days", emoji: "👀" },
    { text: "Your recovery time between sets has increased by 20% this week", emoji: "👀" },
  ]
}

// Monthly calendar data for current month (January 2025) - Strava style
const generateCalendarData = () => {
  const days = []
  const currentDate = new Date(2025, 0, 1) // January 2025
  const daysInMonth = new Date(2025, 0 + 1, 0).getDate()
  const firstDayOfWeek = new Date(2025, 0, 1).getDay()
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }
  
  // Generate mock daily activity data for each day
  for (let day = 1; day <= daysInMonth; day++) {
    const hasRun = Math.random() > 0.6 // 40% chance of running
    const hasLift = Math.random() > 0.5 // 50% chance of lifting
    const metCalorieGoal = Math.random() > 0.3 // 70% chance of meeting calorie goal
    
    days.push({
      date: day,
      activities: {
        run: hasRun,
        lift: hasLift,
        calories: metCalorieGoal,
      }
    })
  }
  
  return days
}

const calendarData = generateCalendarData()

// Generate Last 7 Days data
const generateLast7Days = () => {
  const days = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const hasRun = Math.random() > 0.6
    const hasLift = Math.random() > 0.5
    const metCalorieGoal = Math.random() > 0.3
    
    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date,
      activities: {
        run: hasRun,
        lift: hasLift,
        calories: metCalorieGoal,
      }
    })
  }
  
  return days
}

// Generate Last 30 Days data
const generateLast30Days = () => {
  const days = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const hasRun = Math.random() > 0.6
    const hasLift = Math.random() > 0.5
    const metCalorieGoal = Math.random() > 0.3
    
    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date,
      monthName: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      activities: {
        run: hasRun,
        lift: hasLift,
        calories: metCalorieGoal,
      }
    })
  }
  
  return days
}

// Generate All 100 Days data (assuming we're on day 100)
const generateAll100Days = () => {
  const days = []
  const today = new Date() // Assuming this is day 100
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 99) // Go back 99 days to get day 1
  
  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    
    const hasRun = Math.random() > 0.6
    const hasLift = Math.random() > 0.5
    const metCalorieGoal = Math.random() > 0.3
    
    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date,
      monthName: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      planDay: i + 1, // Day 1-100 of the plan
      activities: {
        run: hasRun,
        lift: hasLift,
        calories: metCalorieGoal,
      }
    })
  }
  
  return days
}

const last7Days = generateLast7Days()
const last30Days = generateLast30Days()
const all100Days = generateAll100Days()

// Conversation starters data - updated with dynamic insights
const conversationStarters = [
  { icon: Dumbbell, title: "Sleep Score", description: "Why do you think my sleep score might have gotten worse?" },
  { icon: RotateCcw, title: "Caloric Surplus", description: "What are common patterns that led to a caloric surplus?" },
  { icon: BarChart3, title: "Recovery Time", description: "How can I improve my recovery between sets?" },
]

export default function FitnessCoachDashboard() {
  const [chatMessage, setChatMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [currentMonth, setCurrentMonth] = useState(0) // 0 = January 2025
  const [calendarView, setCalendarView] = useState<'last7' | 'last30' | 'all'>('last7')
  const [dexaData, setDexaData] = useState({
    scanDate: "",
    bodyFatPercentage: "",
    leanMass: "",
    boneDensity: "",
    visceralFat: "",
    totalWeight: "",
  })

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Simulate coach response
      setTimeout(() => {
        setChatMessage("")
      }, 1000)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setDexaData({
        scanDate: new Date().toISOString().split("T")[0],
        bodyFatPercentage: "12.8",
        leanMass: "154.2",
        boneDensity: "1.15",
        visceralFat: "0.8",
        totalWeight: "177.1",
      })
    }
  }

  const handleSubmitDexaScan = () => {
    console.log("Submitting DEXA scan data:", { file: uploadedFile, data: dexaData })
    setIsModalOpen(false)
    setUploadedFile(null)
    setDexaData({
      scanDate: "",
      bodyFatPercentage: "",
      leanMass: "",
      boneDensity: "",
      visceralFat: "",
      totalWeight: "",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-7 w-7 text-black" />
              <h1 className="text-2xl font-bold text-black tracking-tight">FitCoach AI</h1>
            </div>
            <div className="flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/fitness-user-avatar.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Personal Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-16">

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-black tracking-tight">100-Day Body Recomposition</h2>
                <Badge className="bg-black text-white font-medium">ACTIVE</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Past Plans</DropdownMenuItem>
                    <DropdownMenuItem>Start New Plan</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-gray-600 text-lg">
                Goal: Lose 10 lbs while maintaining lean mass • Started Jan 1, 2025
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium uppercase tracking-wide text-sm">Weight Loss</span>
                  <span className="text-lg font-bold text-black">2.9 / 10 lbs</span>
                </div>
                <Progress value={29} className="h-2 bg-gray-100" />
                <p className="text-sm text-gray-600">29% complete</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium uppercase tracking-wide text-sm">Caloric Deficit</span>
                  <span className="text-lg font-bold text-black">-1,750 cal</span>
                </div>
                <Progress value={87} className="h-2 bg-gray-100" />
                <p className="text-sm text-gray-600">Weekly target: -2,000 cal</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium uppercase tracking-wide text-sm">Workouts</span>
                  <span className="text-lg font-bold text-black">28 / 35</span>
                </div>
                <Progress value={80} className="h-2 bg-gray-100" />
                <p className="text-sm text-gray-600">5 workouts/week target</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-black">Start</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Body Fat</p>
                      <p className="text-lg font-bold text-black">18.5%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Lean Mass Index</p>
                      <p className="text-lg font-bold text-black">19.2</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-black">Goal</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Body Fat</p>
                      <p className="text-lg font-bold text-black">12.8%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Lean Mass Index</p>
                      <p className="text-lg font-bold text-black">19.2+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">
                  {calendarView === 'last7' ? 'Last 7 Days' : 
                   calendarView === 'last30' ? 'Last 30 Days' : 'All 100 Days'}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                      {calendarView === 'last7' ? 'Last 7 Days' : 
                       calendarView === 'last30' ? 'Last 30 Days' : 'All Days'}
                      <ChevronLeft className="ml-2 h-4 w-4 -rotate-90" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCalendarView('last7')}>
                      Last 7 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCalendarView('last30')}>
                      Last 30 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCalendarView('all')}>
                      All Days
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                {calendarView === 'last7' && (
                  <div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-0 mb-2">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                        <div key={day} className="p-2 text-center">
                          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{day}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                      {last7Days.map((day, index) => {
                        const isFirstOfMonth = day.date === 1
                        const monthName = day.fullDate.toLocaleDateString('en-US', { month: 'long' })
                        
                        return (
                          <div key={index} className="border-r border-b border-gray-200 last:border-r-0 bg-white min-h-[120px] p-2">
                            <div className="mb-2">
                              <p className="text-sm font-bold text-black">
                                {isFirstOfMonth ? `${monthName} ${day.date}` : day.date}
                              </p>
                            </div>
                            <div className="space-y-1">
                              {day.activities.run && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Run</span>
                                </div>
                              )}
                              {day.activities.lift && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Lift</span>
                                </div>
                              )}
                              {day.activities.calories && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Deficit</span>
                                </div>
                              )}
                              {!day.activities.run && !day.activities.lift && !day.activities.calories && (
                                <div className="text-center">
                                  <span className="text-xs text-gray-400">Rest Day</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {calendarView === 'last30' && (
                  <div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-0 mb-2">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                        <div key={day} className="p-2 text-center">
                          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{day}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                      {last30Days.map((day, index) => {
                        const isFirstOfMonth = day.date === 1
                        const monthName = day.fullDate.toLocaleDateString('en-US', { month: 'long' })
                        
                        return (
                          <div key={index} className="border-r border-b border-gray-200 last:border-r-0 bg-white min-h-[120px] p-2">
                            <div className="mb-2">
                              <p className="text-sm font-bold text-black">
                                {isFirstOfMonth ? `${monthName} ${day.date}` : day.date}
                              </p>
                            </div>
                            <div className="space-y-1">
                              {day.activities.run && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Run</span>
                                </div>
                              )}
                              {day.activities.lift && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Lift</span>
                                </div>
                              )}
                              {day.activities.calories && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Deficit</span>
                                </div>
                              )}
                              {!day.activities.run && !day.activities.lift && !day.activities.calories && (
                                <div className="text-center">
                                  <span className="text-xs text-gray-400">Rest Day</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {calendarView === 'all' && (
                  <div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-0 mb-2">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                        <div key={day} className="p-2 text-center">
                          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{day}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                      {all100Days.map((day, index) => {
                        const isFirstOfMonth = day.date === 1
                        const monthName = day.fullDate.toLocaleDateString('en-US', { month: 'long' })
                        
                        return (
                          <div key={index} className="border-r border-b border-gray-200 last:border-r-0 bg-white min-h-[120px] p-2">
                            <div className="mb-2">
                              <p className="text-sm font-bold text-black">
                                {isFirstOfMonth ? `${monthName} ${day.date}` : day.date}
                              </p>
                            </div>
                            <div className="space-y-1">
                              {day.activities.run && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Run</span>
                                </div>
                              )}
                              {day.activities.lift && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Lift</span>
                                </div>
                              )}
                              {day.activities.calories && (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600">Deficit</span>
                                </div>
                              )}
                              {!day.activities.run && !day.activities.lift && !day.activities.calories && (
                                <div className="text-center">
                                  <span className="text-xs text-gray-400">Rest Day</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                
                {/* Legend */}
                <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Running</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-600">Strength Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Calorie Goal Met</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-bold text-black tracking-tight text-3xl mb-3.5">Top Insights</h2>
              <p className="text-gray-600 text-lg">Your main wins and areas for improvement</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-black">🏆 Wins</h3>
                <div className="space-y-3">
                  {topInsights.wins.map((insight, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{insight.emoji}</span>
                        <p className="text-sm text-green-800 font-medium">{insight.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-black">👀 Areas for Improvement</h3>
                <div className="space-y-3">
                  {topInsights.improvements.map((insight, index) => (
                    <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{insight.emoji}</span>
                        <p className="text-sm text-amber-800 font-medium">{insight.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-black mb-2 tracking-tight">Have questions for me?</h2>
                <p className="text-gray-600 text-lg mb-8">Get insights based on your recent performance and goals</p>
              </div>
              
              <div className="flex justify-center">
                <div className="max-w-2xl w-full">
                  <Input
                    placeholder="Ask your AI fitness coach anything..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="h-16 bg-white border-2 border-gray-300 text-lg placeholder:text-gray-500 focus:border-black focus:ring-0 transition-all text-left rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                {conversationStarters.map((starter, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center gap-3 h-12 px-6 bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 text-black font-medium"
                    onClick={() => setChatMessage(starter.description)}
                  >
                    {starter.icon && <starter.icon className="h-4 w-4" />}
                    {starter.title}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black">Recent Conversations</h3>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:border-gray-400 text-black font-medium bg-transparent"
                >
                  View All Chats
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="grid gap-3">
                {recentThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <MessageCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <h4 className="font-bold text-black truncate">{thread.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 ml-4">
                      <span>{thread.timestamp}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
