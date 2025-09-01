"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Upload, Plus, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DexaSnapshot {
  id: string
  date: string
  bodyFatPercentage: number
  leanMass: number
  boneDensity: number
  visceralFat: number
  totalWeight: number
  muscleDistribution: {
    arms: number
    legs: number
    trunk: number
  }
  bodyPhotos?: string[]
}

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  age: number
  heightFeet: number
  heightInches: number
  gender: 'male' | 'female' | 'other'
  profilePhoto?: string
}

export default function ProfilePage() {
  const router = useRouter()
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: 'Kevin',
    lastName: 'Suh',
    email: 'kevin@example.com',
    age: 28,
    heightFeet: 5,
    heightInches: 9,
    gender: 'male',
    profilePhoto: undefined // Start with no photo to show initials
  })
  
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)

  const [dexaSnapshots, setDexaSnapshots] = useState<DexaSnapshot[]>([
    {
      id: '1',
      date: '2024-08-01',
      bodyFatPercentage: 18.5,
      leanMass: 143.7,
      boneDensity: 1.2,
      visceralFat: 0.8,
      totalWeight: 176.4,
      muscleDistribution: {
        arms: 27.6,
        legs: 62.4,
        trunk: 53.8
      },
      bodyPhotos: ['/placeholder-body-1.jpg', '/placeholder-body-2.jpg']
    },
    {
      id: '2',
      date: '2024-06-15',
      bodyFatPercentage: 20.1,
      leanMass: 140.7,
      boneDensity: 1.18,
      visceralFat: 1.0,
      totalWeight: 181.9,
      muscleDistribution: {
        arms: 26.7,
        legs: 61.3,
        trunk: 52.7
      },
      bodyPhotos: ['/placeholder-body-old-1.jpg']
    }
  ])

  const [isAddingSnapshot, setIsAddingSnapshot] = useState(false)
  const [newSnapshot, setNewSnapshot] = useState<Partial<DexaSnapshot>>({
    date: new Date().toISOString().split('T')[0],
    bodyPhotos: []
  })

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: any) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleAddSnapshot = () => {
    if (newSnapshot.bodyFatPercentage && newSnapshot.leanMass && newSnapshot.totalWeight) {
      const snapshot: DexaSnapshot = {
        id: Date.now().toString(),
        date: newSnapshot.date || new Date().toISOString().split('T')[0],
        bodyFatPercentage: newSnapshot.bodyFatPercentage,
        leanMass: newSnapshot.leanMass,
        boneDensity: newSnapshot.boneDensity || 1.2,
        visceralFat: newSnapshot.visceralFat || 0.8,
        totalWeight: newSnapshot.totalWeight,
        muscleDistribution: newSnapshot.muscleDistribution || {
          arms: 26.5,
          legs: 61.7,
          trunk: 52.9
        },
        bodyPhotos: newSnapshot.bodyPhotos || []
      }
      
      setDexaSnapshots(prev => [snapshot, ...prev])
      setNewSnapshot({
        date: new Date().toISOString().split('T')[0],
        bodyPhotos: []
      })
      setIsAddingSnapshot(false)
    }
  }

  const getChangeIndicator = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-600" />
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-600" />
    }
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-black">Personal Profile</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setIsPhotoModalOpen(true)}
                >
                  <Avatar className="h-24 w-24 ring-2 ring-gray-200 ring-offset-2 group-hover:ring-gray-300 transition-all">
                    {personalInfo.profilePhoto && <AvatarImage src={personalInfo.profilePhoto} />}
                    <AvatarFallback 
                      className="font-bold text-xl"
                      style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                    >
                      {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={personalInfo.firstName}
                        onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={personalInfo.lastName}
                        onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      disabled
                      className="bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={personalInfo.age}
                        onChange={(e) => handlePersonalInfoChange('age', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="heightFeet">Height (ft)</Label>
                      <Input
                        id="heightFeet"
                        type="number"
                        min="0"
                        max="8"
                        value={personalInfo.heightFeet}
                        onChange={(e) => handlePersonalInfoChange('heightFeet', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="heightInches">Height (in)</Label>
                      <Input
                        id="heightInches"
                        type="number"
                        min="0"
                        max="11"
                        value={personalInfo.heightInches}
                        onChange={(e) => handlePersonalInfoChange('heightInches', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={personalInfo.gender} 
                        onValueChange={(value) => handlePersonalInfoChange('gender', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DEXA Scan Snapshots */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  DEXA Scan Snapshots
                </CardTitle>
                <Dialog open={isAddingSnapshot} onOpenChange={setIsAddingSnapshot}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Snapshot
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New DEXA Scan</DialogTitle>
                      <DialogDescription>
                        Upload your latest DEXA scan results and progress photos
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Scan Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newSnapshot.date}
                            onChange={(e) => setNewSnapshot(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="weight">Total Weight (lb)</Label>
                          <Input
                            id="weight"
                            type="number"
                            step="0.1"
                            value={newSnapshot.totalWeight || ''}
                            onChange={(e) => setNewSnapshot(prev => ({ ...prev, totalWeight: parseFloat(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bodyfat">Body Fat %</Label>
                          <Input
                            id="bodyfat"
                            type="number"
                            step="0.1"
                            value={newSnapshot.bodyFatPercentage || ''}
                            onChange={(e) => setNewSnapshot(prev => ({ ...prev, bodyFatPercentage: parseFloat(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="leanmass">Lean Mass (lb)</Label>
                          <Input
                            id="leanmass"
                            type="number"
                            step="0.1"
                            value={newSnapshot.leanMass || ''}
                            onChange={(e) => setNewSnapshot(prev => ({ ...prev, leanMass: parseFloat(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bonedensity">Bone Density</Label>
                          <Input
                            id="bonedensity"
                            type="number"
                            step="0.01"
                            value={newSnapshot.boneDensity || ''}
                            onChange={(e) => setNewSnapshot(prev => ({ ...prev, boneDensity: parseFloat(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="visceralfat">Visceral Fat</Label>
                          <Input
                            id="visceralfat"
                            type="number"
                            step="0.1"
                            value={newSnapshot.visceralFat || ''}
                            onChange={(e) => setNewSnapshot(prev => ({ ...prev, visceralFat: parseFloat(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Body Photos</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleAddSnapshot} className="flex-1">
                          Save Snapshot
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsAddingSnapshot(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dexaSnapshots.map((snapshot, index) => {
                  const previousSnapshot = dexaSnapshots[index + 1]
                  
                  return (
                    <div key={snapshot.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <h3 className="font-semibold text-lg">{formatDate(snapshot.date)}</h3>
                          {index === 0 && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Latest
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Total Weight: {snapshot.totalWeight} lb
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Body Fat</span>
                            {previousSnapshot && getChangeIndicator(snapshot.bodyFatPercentage, previousSnapshot.bodyFatPercentage)}
                          </div>
                          <div className="text-2xl font-bold text-black">
                            {snapshot.bodyFatPercentage}%
                          </div>
                          {previousSnapshot && (
                            <div className="text-xs text-gray-500">
                              {snapshot.bodyFatPercentage > previousSnapshot.bodyFatPercentage ? '+' : ''}
                              {(snapshot.bodyFatPercentage - previousSnapshot.bodyFatPercentage).toFixed(1)}%
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Lean Mass</span>
                            {previousSnapshot && getChangeIndicator(snapshot.leanMass, previousSnapshot.leanMass)}
                          </div>
                          <div className="text-2xl font-bold text-black">
                            {snapshot.leanMass} lb
                          </div>
                          {previousSnapshot && (
                            <div className="text-xs text-gray-500">
                              {snapshot.leanMass > previousSnapshot.leanMass ? '+' : ''}
                              {(snapshot.leanMass - previousSnapshot.leanMass).toFixed(1)} lb
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Bone Density</span>
                            {previousSnapshot && getChangeIndicator(snapshot.boneDensity, previousSnapshot.boneDensity)}
                          </div>
                          <div className="text-2xl font-bold text-black">
                            {snapshot.boneDensity}
                          </div>
                          {previousSnapshot && (
                            <div className="text-xs text-gray-500">
                              {snapshot.boneDensity > previousSnapshot.boneDensity ? '+' : ''}
                              {(snapshot.boneDensity - previousSnapshot.boneDensity).toFixed(2)}
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Visceral Fat</span>
                            {previousSnapshot && getChangeIndicator(previousSnapshot.visceralFat, snapshot.visceralFat)}
                          </div>
                          <div className="text-2xl font-bold text-black">
                            {snapshot.visceralFat}
                          </div>
                          {previousSnapshot && (
                            <div className="text-xs text-gray-500">
                              {snapshot.visceralFat > previousSnapshot.visceralFat ? '+' : ''}
                              {(snapshot.visceralFat - previousSnapshot.visceralFat).toFixed(1)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Body Photos */}
                      {snapshot.bodyPhotos && snapshot.bodyPhotos.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-3">Progress Photos</h4>
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {snapshot.bodyPhotos.map((photo, photoIndex) => (
                              <div key={photoIndex} className="flex-shrink-0">
                                <div className="w-24 h-32 bg-gray-200 rounded-lg overflow-hidden">
                                  <img 
                                    src={photo} 
                                    alt={`Progress photo ${photoIndex + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Photo Upload Modal */}
      <Dialog open={isPhotoModalOpen} onOpenChange={setIsPhotoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
            <DialogDescription>
              Upload a new profile photo. Supported formats: PNG, JPG up to 5MB.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Avatar className="h-32 w-32 ring-2 ring-gray-200 ring-offset-4">
                {personalInfo.profilePhoto && <AvatarImage src={personalInfo.profilePhoto} />}
                <AvatarFallback 
                  className="font-bold text-2xl"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => {
                  // Handle photo upload logic here
                  setIsPhotoModalOpen(false)
                }} 
                className="flex-1"
              >
                Save Photo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsPhotoModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}