"use client"
import Image from "next/image"
import {
  MessageSquare,
  BookOpen,
  StickyNote,
  Star,
  ChevronDown,
  Search,
  Wrench,
  Bot,
  PenTool,
  BarChart3,
  Zap,
  Globe,
  Camera,
  FileText,
  Mic,
  User,
  Settings,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import Link from "next/link"
import { useState } from "react"

const conversationHistory = [
  {
    id: 1,
    title: "Scaling with Digital Products",
    date: "Today",
    preview: "How can I productize my expertise effectively...",
  },
  {
    id: 2,
    title: "Web3 & Creator Economy",
    date: "Yesterday",
    preview: "Exploring the future of content and ownership...",
  },
]

const aiTools = [
  {
    Icon: Bot,
    name: "ChatGPT / Claude",
    description: "Advanced LLMs for content ideation, strategy, and problem-solving.",
    href: "https://chat.openai.com",
    cta: "Explore LLMs",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-600/20">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-400/30 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-600/30 blur-2xl" />
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: PenTool,
    name: "Copywriting AI (e.g., Copy.ai)",
    description: "AI-powered tools for marketing copy, emails, and social media posts.",
    href: "https://copy.ai",
    cta: "Start Writing",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-600/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-400/40 blur-xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-pink-600/40 blur-xl" />
      </div>
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Camera,
    name: "Midjourney / DALL-E",
    description: "AI image generation for unique visuals and brand assets.",
    href: "https://midjourney.com",
    cta: "Generate Images",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-600/20">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-400/50 blur-lg" />
        <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-cyan-600/50 blur-lg" />
      </div>
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Zap,
    name: "Automation Tools (e.g., Zapier)",
    description: "Automate workflows and connect apps to streamline operations.",
    href: "https://zapier.com",
    cta: "Automate Now",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-600/20">
        <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-orange-400/30 blur-xl" />
        <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-red-600/30 blur-xl" />
      </div>
    ),
    className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Globe,
    name: "Web Analytics (e.g., Google Analytics)",
    description: "Understand your audience and website performance.",
    href: "https://analytics.google.com/",
    cta: "Analyze Data",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/20">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/30 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal-600/30 blur-2xl" />
      </div>
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: FileText,
    name: "Notion / Roam / Obsidian",
    description: "Intelligent workspaces for notes, project management, and knowledge.",
    href: "https://notion.so",
    cta: "Get Organized",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-pink-400/40 blur-xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-purple-600/40 blur-xl" />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Mic,
    name: "Transcription AI (e.g., Otter.ai)",
    description: "AI assistant for recording, transcribing, and summarizing audio/video.",
    href: "https://otter.ai",
    cta: "Transcribe Now",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-slate-600/20">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gray-400/50 blur-lg" />
        <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-slate-600/50 blur-lg" />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: BarChart3,
    name: "Community Platforms (e.g., Circle.so)",
    description: "Build and manage your online community effectively.",
    href: "https://circle.so",
    cta: "Build Community",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-blue-600/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-400/40 blur-xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-600/40 blur-xl" />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
  },
]

export default function ToolboxPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTools = aiTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Image
              src="/images/matt-gottesman-logo.png"
              alt="Matt Gottesman Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Matt Gottesman <span className="text-brandBlue-500">AI</span>
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link href="/" className="block">
              <div className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  <span className="text-sm">MattyGPT</span>
                </div>
              </div>
            </Link>

            <Link href="/resource-library" className="block">
              <div className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} />
                  <span className="text-sm">Resource Hub</span>
                </div>
              </div>
            </Link>

            <Link href="/notes" className="block">
              <div className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <StickyNote size={18} />
                  <span className="text-sm">My Notes</span>
                </div>
              </div>
            </Link>

            <div className="px-3 py-2 rounded-lg bg-brandBlue-50 dark:bg-brandBlue-900/20 text-brandBlue-700 dark:text-brandBlue-400 border border-brandBlue-200 dark:border-brandBlue-800">
              <div className="flex items-center gap-2">
                <Wrench size={18} />
                <span className="text-sm font-medium">Creator Tools</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between px-3 py-2 text-gray-500 dark:text-gray-400">
              <span className="text-xs font-medium uppercase">Recent Chats</span>
              <ChevronDown size={14} />
            </div>

            <div className="space-y-1 mt-2">
              {conversationHistory.map((conversation) => (
                <div
                  key={conversation.id}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer"
                >
                  <div className="text-sm font-medium truncate">{conversation.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{conversation.date}</div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Card className="p-3 bg-gradient-to-r from-brandBlue-50 to-blue-100 dark:from-brandBlue-900/20 dark:to-blue-900/30 border-brandBlue-200 dark:border-brandBlue-800">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-brandBlue-500" />
              <span className="text-sm font-semibold text-brandBlue-700 dark:text-brandBlue-400">Matt's Offerings</span>
            </div>
            <p className="text-xs text-brandBlue-600 dark:text-brandBlue-400 mb-2">
              🚀 Productize Your Expertise Workshop - Enrolling Now!
            </p>
            <Button size="sm" className="w-full bg-brandBlue-500 hover:bg-brandBlue-600 text-white text-xs">
              Learn More
            </Button>
          </Card>
        </div>

        <div className="p-4">
          <a
            href="https://www.instagram.com/mattgottesman/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            >
              <Instagram size={16} className="mr-2" />
              Connect on Instagram
            </Button>
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Creator Tools</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Essential tools to build, create, and scale</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <Settings size={18} />
            </Button>
            <Avatar className="h-8 w-8 bg-gray-200 dark:bg-gray-700">
              <AvatarFallback className="text-gray-600 dark:text-gray-300">
                <User size={16} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <BentoGrid className="lg:grid-rows-3 max-w-6xl mx-auto">
            {filteredTools.map((tool) => (
              <BentoCard key={tool.name} {...tool} />
            ))}
          </BentoGrid>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tools found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Insights by MattyGPT. Powered by{" "}
            <a
              href="https://www.mattgottesman.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandBlue-600 dark:text-brandBlue-400 hover:text-brandBlue-700 dark:hover:text-brandBlue-300 underline uppercase"
            >
              Matt Gottesman
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
