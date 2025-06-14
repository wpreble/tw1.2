"use client"

import type React from "react"
import { useState, type FormEvent, useEffect, useRef, useCallback } from "react"
import { ChatInput } from "@/components/ui/chat-input"
import MessagesArea from "@/components/messages-area"
import { Button } from "@/components/ui/button"
import { PanelLeftOpen, Plus, Mic, Send, GripVertical } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DisciplineTracker } from "@/components/discipline-tracker"
import { CodexPanel } from "@/components/codex-panel"
import { ModelSelector } from "@/components/model-selector"

interface Message {
  id: string | number
  content: string
  role: "user" | "assistant"
  timestamp?: Date
}

interface ChatHistoryItem {
  // Define this if not already globally available
  id: string
  title: string
  recency: string
  messages: { role: "user" | "assistant"; text: string }[]
}

const MIN_RIGHT_PANEL_WIDTH = 280
const DEFAULT_RIGHT_PANEL_WIDTH = 320
const MAX_RIGHT_PANEL_WIDTH = 450

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)
  const [activeRightPanelTab, setActiveRightPanelTab] = useState("codex")
  const [rightPanelWidth, setRightPanelWidth] = useState(DEFAULT_RIGHT_PANEL_WIDTH)
  const isResizingRightPanel = useRef(false)
  const rightPanelRef = useRef<HTMLElement>(null)
  const [lastReadPassage, setLastReadPassage] = useState("John 3:16-18")

  const handleSendMessage = async (value: string, existingMessages?: Message[]) => {
    if (value.trim() === "" && (!existingMessages || existingMessages.length === 0)) return

    const currentMessages = existingMessages || messages

    const userMessage: Message = {
      id: Date.now().toString(),
      content: value,
      role: "user",
      timestamp: new Date(),
    }

    const updatedMessages = value.trim() === "" ? [...currentMessages] : [...currentMessages, userMessage]
    setMessages(updatedMessages)

    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: `Michxl processing: "${value}". Here's a reflection based on timeless wisdom... (Simulated AI response)`,
      role: "assistant", // Corrected: role should be 'assistant' not 'assistant' | 'system'
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSendMessage(inputValue)
  }

  const handleCodexSelect = (content: string, type?: "prompt" | "context") => {
    if (type === "prompt") {
      handleSendMessage(content)
    } else {
      setInputValue((prev) => (prev ? `${prev}\n\n${content}` : content))
    }
  }

  const handleQuickAdd = (action: string) => {
    alert(`${action} logged! (Feature in progress)`)
  }

  const handleNewChat = () => {
    setMessages([])
    // Potentially generate a new session ID here if you're managing sessions
  }

  const handleOpenChat = (sessionId: string, chatMessages: ChatHistoryItem["messages"]) => {
    const formattedMessages: Message[] = chatMessages.map((msg, index) => ({
      id: `${sessionId}-${index}`,
      content: msg.text,
      role: msg.role,
      timestamp: new Date(), // Or use actual timestamps if available
    }))
    setMessages(formattedMessages)
  }

  const startResizingRightPanel = useCallback((e: React.MouseEvent) => {
    isResizingRightPanel.current = true
    e.preventDefault()
  }, [])

  const stopResizingRightPanel = useCallback(() => {
    isResizingRightPanel.current = false
  }, [])

  const resizeRightPanel = useCallback((e: MouseEvent) => {
    if (isResizingRightPanel.current && rightPanelRef.current) {
      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= MIN_RIGHT_PANEL_WIDTH && newWidth <= MAX_RIGHT_PANEL_WIDTH) {
        setRightPanelWidth(newWidth)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", resizeRightPanel)
    window.addEventListener("mouseup", stopResizingRightPanel)
    return () => {
      window.removeEventListener("mousemove", resizeRightPanel)
      window.removeEventListener("mouseup", stopResizingRightPanel)
    }
  }, [resizeRightPanel, stopResizingRightPanel])

  return (
    <div className="flex-1 flex flex-row overflow-hidden h-full">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-0 bg-background">
        {" "}
        {/* Changed to bg-background */}
        <header className="p-2 flex items-center justify-between sticky top-0 bg-background z-10">
          {" "}
          {/* Changed to bg-background */}
          <div className="flex-1 flex justify-center">
            <ModelSelector />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className="border-border text-muted-foreground hover:bg-muted/50" // Use theme variables
            aria-label={isRightPanelOpen ? "Close context panel" : "Open context panel"}
          >
            <PanelLeftOpen size={18} />
          </Button>
        </header>
        <div className="flex-1 min-h-0">
          <MessagesArea messages={messages} isLoading={isLoading} />
        </div>
        {messages.length > 0 && messages[messages.length - 1].role === "assistant" && !isLoading && (
          <div className="px-4 pb-2 flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-primary text-primary hover:bg-primary/10" // Use theme variables
              onClick={() => handleQuickAdd("Log Prayer")}
            >
              Log Prayer 🙏
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-primary text-primary hover:bg-primary/10" // Use theme variables
              onClick={() => handleQuickAdd("Log Word")}
            >
              Log Word 📖
            </Button>
          </div>
        )}
        <div className="p-4 border-t border-border bg-background">
          {" "}
          {/* Changed to bg-background and border-border */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-card border border-border rounded-xl shadow-md flex items-center p-1.5 space-x-1.5" // Use theme variables
          >
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Plus size={20} />
              <span className="sr-only">Add content</span>
            </Button>
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Michxl..."
              className="min-h-10 flex-1 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 px-2 py-2" // Use theme variables
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleFormSubmit(e as any)
                }
              }}
            />
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Mic size={20} />
              <span className="sr-only">Voice input</span>
            </Button>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg w-9 h-9" // Use theme variables
            >
              <Send size={16} />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>

      {isRightPanelOpen && (
        <div
          onMouseDown={startResizingRightPanel}
          className="w-1.5 cursor-col-resize bg-transparent hover:bg-muted/20 transition-colors duration-200 flex items-center justify-center group flex-shrink-0" // Use theme variable
        >
          <GripVertical className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-200" />{" "}
          {/* Use theme variable */}
        </div>
      )}
      <aside
        ref={rightPanelRef}
        style={{ width: isRightPanelOpen ? `${rightPanelWidth}px` : "0px" }}
        className={cn(
          "bg-card text-card-foreground border-l border-border flex flex-col transition-all duration-300 ease-in-out overflow-x-hidden flex-shrink-0", // Use theme variables
          !isRightPanelOpen && "opacity-0 pointer-events-none p-0 border-0",
        )}
      >
        {isRightPanelOpen && (
          <div className="flex flex-col h-full">
            <Tabs
              value={activeRightPanelTab}
              onValueChange={setActiveRightPanelTab}
              className="flex flex-col flex-grow min-h-0"
            >
              <TabsList className="grid grid-cols-2 gap-1 bg-background p-2 border-b border-border flex-shrink-0">
                {" "}
                {/* Use theme variables */}
                <TabsTrigger
                  value="codex"
                  className="text-xs py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-muted-foreground" // Use theme variables
                >
                  Codex
                </TabsTrigger>
                <TabsTrigger
                  value="tracker"
                  className="text-xs py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-muted-foreground" // Use theme variables
                >
                  Discipline Tracker
                </TabsTrigger>
              </TabsList>

              <div className="flex-grow overflow-y-auto p-4">
                {" "}
                {/* Removed fixed p-4, CodexPanel and DisciplineTracker handle their own padding */}
                <TabsContent value="codex" className="mt-0 h-full">
                  <CodexPanel
                    onSelectItem={handleCodexSelect}
                    lastReadPassage={lastReadPassage}
                    onNewChat={handleNewChat}
                    onOpenChat={handleOpenChat}
                  />
                </TabsContent>
                <TabsContent value="tracker" className="mt-0">
                  <DisciplineTracker />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </aside>
    </div>
  )
}
