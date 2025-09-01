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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Upload, MessageCircle, Activity, ArrowRight, Dumbbell, RotateCcw, BarChart3, X, FileText } from "lucide-react"

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

// Conversation starters data
const conversationStarters = [
  { icon: Dumbbell, title: "Past Training", description: "Review recent workouts" },
  { icon: RotateCcw, title: "Recovery", description: "Optimize rest and sleep" },
  { icon: BarChart3, title: "Planning", description: "Set new fitness goals" },
]

export default function FitnessCoachDashboard() {
  const [chatMessage, setChatMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
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
              <Badge variant="secondary" className="text-sm font-medium bg-gray-100 text-gray-800">
                Day 35 of 100
              </Badge>
              <Avatar>
                <AvatarImage src="/fitness-user-avatar.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-16">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-8">
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

            <div className="lg:col-span-4 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Personal Profile</h2>
                <p className="text-gray-600">Your current stats</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Age</p>
                    <p className="text-xl font-bold text-black">32</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Height</p>
                    <p className="text-xl font-bold text-black">5'10"</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Weight</p>
                    <p className="text-xl font-bold text-black">177.1 lbs</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Body Fat</p>
                    <p className="text-xl font-bold text-black">12.8%</p>
                  </div>
                </div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full h-10 bg-black text-white hover:bg-gray-800 font-medium text-sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload DEXA Scan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-black">Upload DEXA Scan</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      {!uploadedFile ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            id="dexa-upload"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label htmlFor="dexa-upload" className="cursor-pointer">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-black mb-2">Upload your DEXA scan</p>
                            <p className="text-sm text-gray-600">PDF, JPG, or PNG files accepted</p>
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <span className="text-sm font-medium text-black">{uploadedFile.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setUploadedFile(null)
                                setDexaData({
                                  scanDate: "",
                                  bodyFatPercentage: "",
                                  leanMass: "",
                                  boneDensity: "",
                                  visceralFat: "",
                                  totalWeight: "",
                                })
                              }}
                              className="ml-auto p-1 h-auto"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="scanDate" className="text-sm font-medium text-black">
                                Scan Date
                              </Label>
                              <Input
                                id="scanDate"
                                type="date"
                                value={dexaData.scanDate}
                                onChange={(e) => setDexaData({ ...dexaData, scanDate: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="bodyFat" className="text-sm font-medium text-black">
                                Body Fat %
                              </Label>
                              <Input
                                id="bodyFat"
                                value={dexaData.bodyFatPercentage}
                                onChange={(e) => setDexaData({ ...dexaData, bodyFatPercentage: e.target.value })}
                                placeholder="12.8"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="leanMass" className="text-sm font-medium text-black">
                                Lean Mass (lbs)
                              </Label>
                              <Input
                                id="leanMass"
                                value={dexaData.leanMass}
                                onChange={(e) => setDexaData({ ...dexaData, leanMass: e.target.value })}
                                placeholder="154.2"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="boneDensity" className="text-sm font-medium text-black">
                                Bone Density
                              </Label>
                              <Input
                                id="boneDensity"
                                value={dexaData.boneDensity}
                                onChange={(e) => setDexaData({ ...dexaData, boneDensity: e.target.value })}
                                placeholder="1.15"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="visceralFat" className="text-sm font-medium text-black">
                                Visceral Fat
                              </Label>
                              <Input
                                id="visceralFat"
                                value={dexaData.visceralFat}
                                onChange={(e) => setDexaData({ ...dexaData, visceralFat: e.target.value })}
                                placeholder="0.8"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="totalWeight" className="text-sm font-medium text-black">
                                Total Weight (lbs)
                              </Label>
                              <Input
                                id="totalWeight"
                                value={dexaData.totalWeight}
                                onChange={(e) => setDexaData({ ...dexaData, totalWeight: e.target.value })}
                                placeholder="177.1"
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsModalOpen(false)}
                              className="flex-1 border-gray-300 hover:border-gray-400 text-black"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSubmitDexaScan}
                              className="flex-1 bg-black text-white hover:bg-gray-800"
                            >
                              Save DEXA Scan
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-black tracking-tight">100-Day Body Recomposition</h2>
                  <Badge className="bg-black text-white font-medium">ACTIVE</Badge>
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

              <div className="h-80 bg-gray-50 rounded-lg p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#000000"
                      strokeWidth={3}
                      dot={{ fill: "#000000", strokeWidth: 2, r: 4 }}
                    />
                    <Line type="monotone" dataKey="calories" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Past Plans</h2>
                <p className="text-gray-600">Your completed fitness journeys</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-black">Summer Cut 2024</p>
                    <Badge className="bg-black text-white text-xs">-15 lbs</Badge>
                  </div>
                  <p className="text-sm text-gray-600">90 days • Completed Aug 15, 2024</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-black">Strength Building</p>
                    <Badge className="bg-black text-white text-xs">+8 lbs muscle</Badge>
                  </div>
                  <p className="text-sm text-gray-600">120 days • Completed May 10, 2024</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-black">Marathon Prep</p>
                    <Badge className="bg-black text-white text-xs">26.2 miles</Badge>
                  </div>
                  <p className="text-sm text-gray-600">180 days • Completed Oct 22, 2023</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-8">
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
