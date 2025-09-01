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
              <h2 className="font-bold text-black tracking-tight text-3xl mb-3.5">Weekly Activity Overview</h2>
              <p className="text-gray-600 text-lg">Your activity across all connected apps</p>
            </div>

            <div className="h-80 bg-gray-50 rounded-lg p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="runs" fill="#000000" name="Runs" />
                  <Bar dataKey="lifts" fill="#6b7280" name="Strength Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-black tracking-tight">100-Day Body Recomposition</h2>
                  <Badge className="bg-black text-white font-medium">ACTIVE</Badge>
                </div>
                <p className="text-gray-600 text-lg">
                  Goal: Lose 10 lbs while maintaining lean mass • Started Jan 1, 2025
                </p>
              </div>
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
                <h3 className="text-xl font-bold text-black">January 2025</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentMonth(Math.min(3, currentMonth + 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="p-2 text-center">
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{day}</p>
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {calendarData.map((day, index) => (
                    <div key={index} className="aspect-square p-1">
                      {day ? (
                        <div className={`h-full w-full rounded-lg p-2 flex flex-col items-center justify-between relative ${
                          day.date === new Date().getDate() ? 'bg-red-100 border border-red-300' : 'hover:bg-gray-100'
                        }`}>
                          {/* Today indicator */}
                          {day.date === new Date().getDate() && (
                            <div className="absolute -top-1 -right-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                          )}
                          
                          {/* Day number */}
                          <span className="text-sm font-medium text-gray-900">{day.date}</span>
                          
                          {/* Activity dots */}
                          <div className="flex gap-1 flex-wrap justify-center">
                            {day.activities.run && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            {day.activities.lift && (
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            )}
                            {day.activities.calories && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full"></div>
                      )}
                    </div>
                  ))}
                </div>
                
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
