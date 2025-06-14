"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Card components are not used directly for the panel background
import { Shield, Users, StarIcon as StudyIcon, HistoryIcon, Brain, PlusCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Placeholder data for codex sources
const codexSources = {
  warfare: [
    { id: "wf1", title: "My Entry on Fear", content: "Scriptures and notes about overcoming fear..." },
    { id: "wf2", title: "Common Attack: Lust", content: "Key verses to combat lustful thoughts..." },
  ],
  community: [
    { id: "cm1", title: "Sermon: The Good Shepherd", content: "Transcript from Pastor John's sermon on Psalm 23..." },
  ],
  study: [{ id: "st1", title: "Genesis 1-2 Notes", content: "My reflections on the creation account..." }],
  history: [{ id: "hs1", title: "Notes on the Council of Nicaea", content: "Key outcomes and figures..." }],
}

// Placeholder for actual chat history items
interface ChatHistoryItem {
  id: string
  title: string
  recency: string // e.g., "Today", "Yesterday", "2 days ago"
  messages: { role: "user" | "assistant"; text: string }[] // Store actual messages for when a chat is opened
}

const placeholderChatSessions: ChatHistoryItem[] = [
  {
    id: "session1",
    title: "Exploring the Trinity",
    recency: "Today",
    messages: [{ role: "user", text: "Can you explain the concept of the Trinity?" }],
  },
  {
    id: "session2",
    title: "Understanding Romans 8",
    recency: "Yesterday",
    messages: [{ role: "user", text: "Help me understand the key themes in Romans chapter 8." }],
  },
  {
    id: "session3",
    title: "Early Church Fathers on Prayer",
    recency: "2 days ago",
    messages: [{ role: "user", text: "What did the early church fathers teach about prayer?" }],
  },
  {
    id: "session4",
    title: "The Beatitudes: Application",
    recency: "3 days ago",
    messages: [{ role: "user", text: "How can I apply the Beatitudes to my daily life?" }],
  },
  {
    id: "session5",
    title: "Psalm 23: Comfort & Guidance",
    recency: "Last week",
    messages: [{ role: "user", text: "Discuss the comfort and guidance found in Psalm 23." }],
  },
]

interface CodexPanelProps {
  onSelectItem: (content: string, type?: "prompt" | "context") => void
  onNewChat: () => void
  onOpenChat: (sessionId: string, messages: ChatHistoryItem["messages"]) => void
  lastReadPassage?: string
}

export function CodexPanel({
  onSelectItem,
  onNewChat,
  onOpenChat,
  lastReadPassage = "Genesis 1:1-5",
}: CodexPanelProps) {
  const [source, setSource] = useState<"warfare" | "community" | "study" | "history">("warfare")
  const [chatSessions] = useState<ChatHistoryItem[]>(placeholderChatSessions)

  const handleItemClick = (item: { title: string; content: string }) => {
    onSelectItem(`Let's discuss this from my Codex: "${item.title}". Here is the context: ${item.content}`, "context")
  }

  const handleAnalysisRequest = (analysisType: string) => {
    if (analysisType === "historical_perspectives") {
      onSelectItem(
        "Analyze the following topic or Bible passage by providing perspectives from church fathers and prominent theologians. Include a mixture of perspectives: Catholic, Orthodox, Protestant, other affiliations or no affiliation, mystic, scholar, early church, modern figures, etc. If no specific topic is given in the chat, please ask me what topic or passage I'd like to dive into.",
        "prompt",
      )
    } else if (analysisType === "breakdown_passage" && lastReadPassage) {
      onSelectItem(
        `Let's break down this passage I recently studied: ${lastReadPassage}. Provide insights, context, and application points.`,
        "prompt",
      )
    } else if (analysisType === "breakdown_passage") {
      onSelectItem(`I'd like to break down a passage. Please ask me which one.`, "prompt")
    }
  }

  const items = codexSources[source]

  return (
    <div className="h-full flex flex-col text-card-foreground bg-card p-0">
      <CardHeader className="pb-3 flex-shrink-0 px-3 pt-3">
        <CardTitle className="text-xl font-serif text-foreground">Codex</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Context, Analysis & History</CardDescription>
      </CardHeader>
      <div className="px-3 mb-3 flex-shrink-0">
        <div className="p-3 border border-primary/50 rounded-lg bg-background dark:bg-obsidianBlack/30">
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs truncate"
              onClick={() => handleAnalysisRequest("historical_perspectives")}
              title="Historical Perspectives Analysis"
            >
              <Brain size={14} className="mr-2 flex-shrink-0" />
              <span className="truncate">Historical Perspectives Analysis</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs truncate"
              onClick={() => handleAnalysisRequest("breakdown_passage")}
              title="Breakdown Last Read Passage"
            >
              <StudyIcon size={14} className="mr-2 flex-shrink-0" />
              <span className="truncate">Breakdown Last Read Passage</span>
            </Button>
          </div>

          <Select onValueChange={(value) => setSource(value as any)} defaultValue={source}>
            <SelectTrigger className="w-full mt-3">
              <SelectValue placeholder="Select a source..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warfare">
                <div className="flex items-center gap-2">
                  <Shield size={14} /> Warfare Handbook
                </div>
              </SelectItem>
              <SelectItem value="community">
                <div className="flex items-center gap-2">
                  <Users size={14} /> Community
                </div>
              </SelectItem>
              <SelectItem value="study">
                <div className="flex items-center gap-2">
                  <StudyIcon size={14} /> Study Notes
                </div>
              </SelectItem>
              <SelectItem value="history">
                <div className="flex items-center gap-2">
                  <HistoryIcon size={14} /> Church History
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-3 max-h-32 overflow-y-auto space-y-1 pr-1">
            {items.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full h-auto text-left justify-start p-1.5"
                onClick={() => handleItemClick(item)}
                title={item.title}
              >
                <div className="flex flex-col w-full overflow-hidden">
                  <p className="text-xs font-semibold truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.content}</p>
                </div>
              </Button>
            ))}
            {items.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-2">No items in this section yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col min-h-0 px-3 pb-3">
        <div className="h-full flex flex-col p-3 border border-primary/50 rounded-lg bg-background dark:bg-obsidianBlack/30">
          <div className="flex justify-between items-center pb-2 flex-shrink-0">
            <h3 className="text-sm font-sans uppercase font-semibold text-foreground">Chat History</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewChat}
              className="text-muted-foreground hover:text-foreground"
            >
              <PlusCircle size={20} />
              <span className="sr-only">New Chat</span>
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            <div className="space-y-1">
              {chatSessions.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No past chats yet. Start a new one!</p>
              ) : (
                chatSessions.map((session) => (
                  <Button
                    key={session.id}
                    variant="ghost"
                    className="w-full h-auto text-left justify-start p-2 hover:bg-muted/50"
                    onClick={() => onOpenChat(session.id, session.messages)}
                  >
                    <div className="flex flex-col w-full overflow-hidden">
                      <p className="text-sm font-medium text-foreground truncate">{session.title}</p>
                      <p className="text-xs text-muted-foreground">{session.recency}</p>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
