"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Brain, Target, PlusCircle, BookOpen, Sword, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface JournalEntry {
  id: number
  issue: string
  notes: string
  scripture: string
  category: "warfare" | "apologetics"
}

const warfareResources = [
  {
    id: "wr1",
    title: "Fear & Anxiety",
    scripture:
      "2 Timothy 1:7 - For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    category: "Common Attack",
  },
  {
    id: "wr2",
    title: "Lustful Thoughts",
    scripture:
      "2 Corinthians 10:5 - We demolish arguments and every pretension that sets itself up against the knowledge of God, and we take captive every thought to make it obedient to Christ.",
    category: "Common Attack",
  },
  {
    id: "wr3",
    title: "Pride & Arrogance",
    scripture: "Proverbs 16:18 - Pride goes before destruction, a haughty spirit before a fall.",
    category: "Common Attack",
  },
]

const apologeticsResources = [
  {
    id: "ar1",
    title: "The Problem of Evil",
    description: "How to address why God allows suffering in the world.",
    keyPoints: ["Free will defense", "Soul-making theodicy", "Greater good argument"],
  },
  {
    id: "ar2",
    title: "Historical Jesus",
    description: "Evidence for the historical existence and claims of Jesus Christ.",
    keyPoints: ["Multiple attestation", "Criterion of embarrassment", "Early testimony"],
  },
  {
    id: "ar3",
    title: "Biblical Reliability",
    description: "Defending the accuracy and transmission of Scripture.",
    keyPoints: ["Manuscript evidence", "Archaeological support", "Internal consistency"],
  },
]

const currentChallenge = {
  month: "January 2025",
  verse: "James 1:22",
  text: "But be doers of the word, and not hearers only, deceiving yourselves.",
  challenge: "Daily Scripture Application",
  description:
    "Each day, read a passage and identify one specific way to apply it in your life. Take action on that application before the day ends.",
  progress: 15, // Days completed
  totalDays: 31,
}

export default function ActionPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newIssue, setNewIssue] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"warfare" | "apologetics">("warfare")

  const handleAddEntry = () => {
    if (!newIssue.trim()) return
    const newEntry: JournalEntry = {
      id: Date.now(),
      issue: newIssue,
      notes: "My thoughts and research on this topic...",
      scripture: "Researching key scriptures and arguments...",
      category: selectedCategory,
    }
    setEntries([newEntry, ...entries])
    setNewIssue("")
  }

  const progressPercentage = (currentChallenge.progress / currentChallenge.totalDays) * 100

  return (
    <div className="p-6 md:p-10 text-foreground bg-background">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-serif mb-2">Action</h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <p className="text-lg text-muted-foreground italic font-serif">
            "But be <span className="font-bold text-primary">doers</span> of the word, and not hearers only, deceiving
            yourselves."
          </p>
        </div>
        <p className="text-sm text-muted-foreground">— James 1:22</p>
      </header>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Monthly Challenge Section */}
        <section>
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-primary flex items-center">
                <Target className="mr-3" />
                Monthly Doers Challenge - {currentChallenge.month}
              </CardTitle>
              <CardDescription className="text-base">
                <span className="font-semibold">{currentChallenge.challenge}</span> - {currentChallenge.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">This Month's Foundation:</p>
                  <p className="font-serif italic text-lg">"{currentChallenge.text}"</p>
                  <p className="text-sm text-muted-foreground mt-1">— {currentChallenge.verse}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Progress: {currentChallenge.progress}/{currentChallenge.totalDays} days
                    </p>
                    <div className="w-64 bg-muted rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Calendar className="mr-2 h-4 w-4" />
                    Log Today's Action
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Spiritual Warfare Section */}
          <section className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-xl font-serif flex items-center">
                  <Shield className="mr-2 text-primary" />
                  Spiritual Warfare
                </CardTitle>
                <CardDescription>Resources for spiritual combat and victory.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {warfareResources.map((resource) => (
                    <div key={resource.id} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{resource.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                      <p className="text-xs scripture-quote">{resource.scripture}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View All Warfare Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Apologetics Section */}
          <section className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-xl font-serif flex items-center">
                  <Brain className="mr-2 text-primary" />
                  Apologetics
                </CardTitle>
                <CardDescription>Defend the faith with reason and evidence.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {apologeticsResources.map((resource) => (
                    <div key={resource.id} className="p-3 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {resource.keyPoints.map((point, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <Sword className="mr-2 h-4 w-4" />
                    View All Apologetics Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Personal Journal Section */}
          <section className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Personal Action Journal</CardTitle>
                <CardDescription>Track your spiritual battles and apologetic studies.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-muted-foreground">
                    Category
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedCategory === "warfare" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("warfare")}
                      className="flex-1"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Warfare
                    </Button>
                    <Button
                      variant={selectedCategory === "apologetics" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("apologetics")}
                      className="flex-1"
                    >
                      <Brain className="mr-1 h-3 w-3" />
                      Apologetics
                    </Button>
                  </div>
                </div>
                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-muted-foreground mb-1">
                    {selectedCategory === "warfare" ? "Spiritual Issue" : "Apologetic Topic"}
                  </label>
                  <Input
                    id="issue"
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    placeholder={
                      selectedCategory === "warfare"
                        ? "e.g., Fear, Doubt, Temptation"
                        : "e.g., Evolution, Suffering, Reliability"
                    }
                  />
                </div>
                <Button onClick={handleAddEntry} className="w-full">
                  <PlusCircle size={16} className="mr-2" />
                  Create Entry
                </Button>

                {entries.length > 0 && (
                  <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                    <h4 className="text-sm font-semibold">Recent Entries:</h4>
                    {entries.slice(0, 3).map((entry) => (
                      <div key={entry.id} className="p-2 bg-muted/20 rounded text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{entry.issue}</span>
                          <Badge variant="outline" className="text-xs">
                            {entry.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
