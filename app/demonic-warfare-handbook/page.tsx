"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, PlusCircle } from "lucide-react"

interface JournalEntry {
  id: number
  issue: string
  notes: string
  scripture: string
}

const commonAttacks = [
  {
    id: "ca1",
    attack: "Fear & Anxiety",
    scripture:
      "2 Timothy 1:7 - For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
  },
  {
    id: "ca2",
    attack: "Lustful Thoughts",
    scripture:
      "2 Corinthians 10:5 - We demolish arguments and every pretension that sets itself up against the knowledge of God, and we take captive every thought to make it obedient to Christ.",
  },
  {
    id: "ca3",
    attack: "Pride & Arrogance",
    scripture: "Proverbs 16:18 - Pride goes before destruction, a haughty spirit before a fall.",
  },
]

export default function DemonicWarfareHandbookPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newIssue, setNewIssue] = useState("")

  const handleAddEntry = () => {
    if (!newIssue.trim()) return
    const newEntry: JournalEntry = {
      id: Date.now(),
      issue: newIssue,
      notes: "My thoughts and struggles regarding this issue...",
      scripture: "Researching key scriptures...", // Placeholder
    }
    setEntries([newEntry, ...entries])
    setNewIssue("")
  }

  return (
    <div className="p-6 md:p-10 text-foreground bg-background"> {/* Use theme variables */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-serif mb-2">Warfare Handbook</h1>
        <p className="text-lg text-muted-foreground">Your personal journal for spiritual combat.</p> {/* Use theme variable */}
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-serif mb-4">My Journal Entries</h2>
            <div className="space-y-4">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <Card key={entry.id} className="shadow-md"> {/* Card handles its own theming */}
                    <CardHeader>
                      <CardTitle>{entry.issue}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{entry.notes}</p> {/* Use theme variable */}
                      <p className="text-sm font-semibold scripture-quote">{entry.scripture}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No entries yet. Add an issue you\'re facing.</p> {/* Corrected apostrophe usage */}
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">Common Attacks</h2>
            <div className="space-y-4">
              {commonAttacks.map((attack) => (
                <Card key={attack.id} className="shadow-sm"> {/* Card handles its own theming */}
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield size={18} className="mr-2 text-primary" /> {/* Use theme variable */}
                      {attack.attack}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm scripture-quote">{attack.scripture}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <aside className="md:col-span-1">
          <Card className="sticky top-24 shadow-lg"> {/* Card handles its own theming */}
            <CardHeader>
              <CardTitle className="text-xl font-serif">New Journal Entry</CardTitle>
              <CardDescription>Identify an issue to combat with scripture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-muted-foreground mb-1"> {/* Use theme variable */}
                  Issue to Address (e.g., Lust, Pride, Fear)
                </label>
                <Input
                  id="issue"
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  placeholder="What are you facing?"
                  // Input component should handle its own theming based on globals.css
                />
              </div>
              <Button onClick={handleAddEntry} className="w-full"> {/* Button handles its own theming */}
                <PlusCircle size={16} className="mr-2" />
                Create Entry & Find Scripture
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
