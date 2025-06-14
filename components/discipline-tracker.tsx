"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, CheckCircle2, Flame, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrackerData {
  bibleReadingStreak: number
  monthlyChallenge: {
    completed: boolean
    month: string // Added month field
    title: string
    description: string
  }
}

// Function to get current month name
const getCurrentMonthName = () => {
  const date = new Date()
  return date.toLocaleString("default", { month: "long" })
}

export function DisciplineTracker() {
  const [trackerData, setTrackerData] = useState<TrackerData>({
    bibleReadingStreak: 7, // Example: 7-day streak
    monthlyChallenge: {
      completed: false,
      month: getCurrentMonthName(), // Dynamically set current month
      title: `${getCurrentMonthName()} Doers Challenge`, // Updated title
      description: "Daily Scripture Application",
    },
  })

  // Update challenge title if month changes (e.g. on component mount if app is open across month change)
  useEffect(() => {
    const currentMonth = getCurrentMonthName()
    if (trackerData.monthlyChallenge.month !== currentMonth) {
      setTrackerData((prev) => ({
        ...prev,
        monthlyChallenge: {
          ...prev.monthlyChallenge,
          month: currentMonth,
          title: `${currentMonth} Doers Challenge`,
          completed: false, // Reset completion for new month
        },
      }))
    }
  }, []) // Empty dependency array to run once on mount, or add specific dependencies if needed for re-check

  const toggleMonthlyChallenge = () => {
    setTrackerData((prev) => ({
      ...prev,
      monthlyChallenge: {
        ...prev.monthlyChallenge,
        completed: !prev.monthlyChallenge.completed,
      },
    }))
  }

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your journey today!"
    if (streak === 1) return "Great start!"
    if (streak < 7) return "Building momentum!"
    if (streak < 30) return "Strong foundation!"
    if (streak < 100) return "Excellent discipline!"
    return "Incredible dedication!"
  }

  const getStreakColor = (streak: number) => {
    if (streak === 0) return "text-muted-foreground"
    if (streak < 7) return "text-orange-500"
    if (streak < 30) return "text-blue-500"
    if (streak < 100) return "text-green-500"
    return "text-purple-500"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif flex items-center">
          <CheckCircle2 className="mr-2 text-primary" />
          Discipline Tracker
        </CardTitle>
        <CardDescription className="text-xs">Track your spiritual disciplines and growth.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Bible Reading Streak */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center bg-primary/5">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Flame className={cn("h-5 w-5 mr-1", getStreakColor(trackerData.bibleReadingStreak))} />
                  <span className="text-2xl font-bold font-sans text-foreground">{trackerData.bibleReadingStreak}</span>
                </div>
                <span className="text-xs text-muted-foreground">days</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="font-semibold text-sm flex items-center justify-center">
              <BookOpen className="h-4 w-4 mr-2 text-primary" />
              Bible Reading Streak
            </h3>
            <p className={cn("text-xs mt-1", getStreakColor(trackerData.bibleReadingStreak))}>
              {getStreakMessage(trackerData.bibleReadingStreak)}
            </p>
          </div>
        </div>

        {/* Monthly Challenge */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm flex items-center">
            <Target className="h-4 w-4 mr-2 text-primary" />
            Monthly Challenge
          </h3>
          <div
            className={cn(
              "p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between", // Use flex to align items
              trackerData.monthlyChallenge.completed
                ? "border-green-500/50 bg-green-50 dark:bg-green-900/20"
                : "border-border bg-muted/30",
            )}
          >
            <div className="flex-1 min-w-0 mr-4">
              {" "}
              {/* Added mr-4 for spacing */}
              <p className="font-semibold text-lg text-foreground truncate">
                {trackerData.monthlyChallenge.month.substring(0, 3)}... {/* Abbreviated month */}
              </p>
              <p className="text-sm text-muted-foreground mt-1 leading-tight">
                {trackerData.monthlyChallenge.description}
              </p>
            </div>
            <Button
              variant={trackerData.monthlyChallenge.completed ? "default" : "outline"}
              size="sm"
              onClick={toggleMonthlyChallenge}
              className={cn(
                "flex-shrink-0", // Prevent button from shrinking
                trackerData.monthlyChallenge.completed
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
              )}
            >
              {trackerData.monthlyChallenge.completed ? (
                <>
                  <CheckCircle2 className="h-3 w-3 mr-1.5" /> {/* Adjusted icon margin */}
                  Done
                </>
              ) : (
                <>
                  <Calendar className="h-3 w-3 mr-1.5" /> {/* Adjusted icon margin */}
                  Mark Complete
                </>
              )}
            </Button>
          </div>
          {trackerData.monthlyChallenge.completed && (
            <div className="mt-2 text-xs text-green-700 dark:text-green-300 font-medium text-center">
              ✨ Challenge completed for {trackerData.monthlyChallenge.month}! Well done, faithful servant.
            </div>
          )}
        </div>

        {/* Encouragement Section */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground italic">
            "Be steadfast, immovable, always abounding in the work of the Lord."
          </p>
          <p className="text-xs text-muted-foreground mt-1">— 1 Corinthians 15:58</p>
        </div>
      </CardContent>
    </Card>
  )
}
