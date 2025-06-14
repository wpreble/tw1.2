"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data for the 365-day plan
const readingPlan = Array.from({ length: 365 }, (_, i) => ({
  id: i + 1,
  day: `Day ${i + 1}`,
  reading: `Genesis ${i + 1}-${i + 2}`, // Example reading
  completed: false,
}))

export default function StudyPage() {
  const [plan, setPlan] = useState(readingPlan)

  const toggleDay = (id: number) => {
    setPlan(plan.map((day) => (day.id === id ? { ...day, completed: !day.completed } : day)))
  }

  return (
    <div className="p-6 md:p-10 text-foreground bg-background">
      {" "}
      {/* Use theme variables */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-serif mb-2">Study</h1>
        <p className="text-lg text-muted-foreground">Commit to daily immersion in the Word.</p>{" "}
        {/* Use theme variable */}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Tier 1: Accessible */}
        <Card className="md:col-span-2 shadow-lg">
          {" "}
          {/* Card component handles its own theming */}
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-primary flex items-center">
              {" "}
              {/* Use theme variable */}
              <BookOpen className="mr-3" />
              Tier 1: The 365 Foundation
            </CardTitle>
            <CardDescription>A one-year journey through foundational scriptures.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4 text-muted-foreground">Check off each day's reading to track your progress.</p>{" "}
            {/* Use theme variable */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {plan.slice(0, 7).map((day) => (
                <div
                  key={day.id}
                  className={cn(
                    "flex items-center p-2 rounded-md transition-colors",
                    day.completed ? "bg-primary/10 text-muted-foreground" : "hover:bg-muted/50", // Use theme variables
                  )}
                >
                  <Checkbox
                    id={`day-${day.id}`}
                    checked={day.completed}
                    onCheckedChange={() => toggleDay(day.id)}
                    className="mr-3"
                  />
                  <label
                    htmlFor={`day-${day.id}`}
                    className={cn("flex-1 cursor-pointer", day.completed && "line-through")}
                  >
                    <span className="font-semibold text-sm">{day.day}:</span>
                    <span className="text-sm ml-2">{day.reading}</span>
                  </label>
                </div>
              ))}
              <p className="text-center text-xs text-muted-foreground pt-2">...and 358 more days.</p>{" "}
              {/* Use theme variable */}
            </div>
          </CardContent>
        </Card>

        {/* Locked Tiers */}
        <div className="space-y-6">
          <Card className="bg-muted/30 shadow-md border-border opacity-60">
            {" "}
            {/* Use theme variables */}
            <CardHeader className="flex-row items-center gap-4">
              <Lock className="text-muted-foreground" /> {/* Use theme variable */}
              <div>
                <CardTitle className="text-xl font-serif text-muted-foreground">Tier 2: Thematic Deep Dive</CardTitle>{" "}
                {/* Use theme variable */}
                <CardDescription className="text-muted-foreground/80">Coming Soon</CardDescription>{" "}
                {/* Use theme variable */}
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-muted/30 shadow-md border-border opacity-60">
            {" "}
            {/* Use theme variables */}
            <CardHeader className="flex-row items-center gap-4">
              <Lock className="text-muted-foreground" /> {/* Use theme variable */}
              <div>
                <CardTitle className="text-xl font-serif text-muted-foreground">Tier 3: Historical Context</CardTitle>{" "}
                {/* Use theme variable */}
                <CardDescription className="text-muted-foreground/80">Coming Soon</CardDescription>{" "}
                {/* Use theme variable */}
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
