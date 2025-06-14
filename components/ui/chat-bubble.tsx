"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageLoading } from "@/components/ui/message-loading" // Assuming this exists and is fine

interface ChatBubbleProps {
  variant?: "user" | "assistant" // Changed from "sent" | "received"
  className?: string
  children: React.ReactNode
}

export function ChatBubble({ variant = "assistant", className, children }: ChatBubbleProps) {
  return (
    <div className={cn("flex items-start gap-3 mb-4", variant === "user" && "flex-row-reverse", className)}>
      {children}
    </div>
  )
}

interface ChatBubbleMessageProps {
  variant?: "user" | "assistant"
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function ChatBubbleMessage({ variant = "assistant", isLoading, className, children }: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-3 text-sm max-w-md md:max-w-lg lg:max-w-xl shadow-md", // Common styles
        variant === "user"
          ? "bg-card text-card-foreground border border-border" // User: Uses card styles for theme awareness
          : "bg-obsidianBlack text-parchmentOffWhite border border-greyBlue", // Assistant: Specific dark theme style
        className,
      )}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

interface ChatBubbleAvatarProps {
  src?: string
  fallback?: string
  className?: string
  isUser?: boolean
}

export function ChatBubbleAvatar({ src, fallback = "M", className, isUser = false }: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      {src && <AvatarImage src={src || "/placeholder.svg"} alt={isUser ? "User Avatar" : "Michxl AI Avatar"} />}
      <AvatarFallback className={cn(isUser ? "bg-mistGrey text-obsidianBlack" : "bg-greyBlue text-pureWhite")}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
