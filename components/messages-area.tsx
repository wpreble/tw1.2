import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble"
import Image from "next/image"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { ScrollText } from "lucide-react" // Example icon

interface Message {
  id: string | number // Allow string for potential UUIDs
  content: string
  role: "user" | "assistant"
  timestamp?: Date
}

interface MessagesAreaProps {
  messages: Message[]
  isLoading?: boolean
}

export default function MessagesArea({ messages, isLoading }: MessagesAreaProps) {
  return (
    <ChatMessageList className="flex-1 p-4 md:p-6" smooth>
      {messages.length === 0 && !isLoading && (
        <div className="flex-grow flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
          <div className="mb-6">
            <Image
              src="/images/michxl-logo.png" // This logo can remain if it's the general app/first model logo
              alt="WayFinder AI Assistant" // Updated alt text
              width={80}
              height={80}
              className="mx-auto mb-4 rounded-md"
            />
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">WayFinder AI</h1>{" "}
            {/* Changed from Michxl AI */}
            <p className="text-muted-foreground mb-6 max-w-md">
              Welcome to The Way. I am your guide for Scripture, prayer, and historical perspective. How can I assist
              you on your journey today? {/* Kept the welcome message general */}
            </p>
          </div>
          <div className="bg-card border border-border p-6 rounded-lg max-w-lg shadow-xl">
            <ScrollText className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Ask questions, request Scripture passages, or generate prayers to deepen your walk.
            </p>
          </div>
        </div>
      )}
      {messages.map((message) => (
        <ChatBubble key={message.id} variant={message.role}>
          {message.role === "assistant" && <ChatBubbleAvatar src="/images/michxl-logo.png" fallback="W" />}{" "}
          {/* Fallback can be 'W' for WayFinder or 'M' if Michxl is the active model */}
          <ChatBubbleMessage variant={message.role}>
            <div className="prose prose-sm dark:prose-invert prose-p:my-1 prose-headings:font-serif text-inherit">
              {message.content}
            </div>
            {message.timestamp && (
              <p className="text-xs mt-2 opacity-60 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </ChatBubbleMessage>
          {message.role === "user" && <ChatBubbleAvatar isUser fallback="U" />}
        </ChatBubble>
      ))}
      {isLoading && (
        <ChatBubble variant="assistant">
          <ChatBubbleAvatar src="/images/michxl-logo.png" fallback="W" /> {/* Fallback 'W' */}
          <ChatBubbleMessage isLoading variant="assistant" />
        </ChatBubble>
      )}
    </ChatMessageList>
  )
}
