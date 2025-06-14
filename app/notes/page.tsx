"use client"
import { useState } from "react"
import Image from "next/image"
import {
  MessageSquare,
  BookOpen,
  StickyNote,
  Star,
  ChevronDown,
  Search,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Tag,
  User,
  Settings,
  Wrench,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const notes = [
  {
    id: 1,
    title: "Digital Product Strategy",
    content:
      "Key insights from MattyGPT on productizing my 20+ years of internet experience. Focus on 'Earn with your mind, not your time' and leveraging media platforms.",
    tags: ["Productization", "Leverage", "Naval"],
    category: "Strategy",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    color: "green", // Will use brandGreen due to getColorClass logic
  },
  {
    id: 2,
    title: "Content Creation Pillars",
    content:
      "MattyGPT session on core content themes: Life, Love, Creativity, Business, Spirituality. How to weave these into daily content for my 200K+ community. The Niche is You™.",
    tags: ["Content", "Community", "Authenticity"],
    category: "Content Creation",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
    color: "green",
  },
  {
    id: 3,
    title: "Web3 & Creator Economy Ideas",
    content:
      "Exploring how blockchain and crypto can empower creators. Notes from MattyGPT on building permissionless platforms and ethical wealth creation.",
    tags: ["Web3", "Crypto", "CreatorEconomy"],
    category: "Innovation",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-14",
    color: "purple",
  },
  {
    id: 4,
    title: "Brand Strategy for Impact",
    content:
      "Applying LVMH-level thinking to personal and client brands. MattyGPT insights on digital strategy and scaling boutique marketing efforts.",
    tags: ["Branding", "DigitalMarketing", "Consulting"],
    category: "Branding",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-13",
    color: "orange",
  },
]

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
  {
    id: 3,
    title: "Brand Strategy Deep Dive",
    date: "2 days ago",
    preview: "Applying LVMH-level thinking to my brand...",
  },
]

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("updated")

  const categories = ["all", "Strategy", "Content Creation", "Innovation", "Branding", "Productivity"]
  const sortOptions = [
    { value: "updated", label: "Last Updated" },
    { value: "created", label: "Date Created" },
    { value: "title", label: "Title" },
  ]

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || note.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const getColorClass = (color: string) => {
    const colorMap = {
      green: "border-l-brandBlue-500 bg-blue-50 dark:bg-blue-900/10",
      purple: "border-l-purple-500 bg-purple-50 dark:bg-purple-900/10",
      orange: "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10",
      red: "border-l-red-500 bg-red-50 dark:bg-red-900/10",
      blue: "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10", // Kept blue for other potential notes
    }
    return colorMap[color as keyof typeof colorMap] || "border-l-gray-500 bg-gray-50 dark:bg-gray-900/10"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }

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
              <div className="px-3 py-2 rounded-lg bg-brandBlue-50 dark:bg-brandBlue-900/20 text-brandBlue-700 dark:text-brandBlue-400 border-brandBlue-200 dark:border-brandBlue-800">
                <div className="flex items-center gap-2">
                  <StickyNote size={18} />
                  <span className="text-sm font-medium">My Notes</span>
                </div>
              </div>
            </Link>

            <Link href="/toolbox" className="block">
              <div className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <Wrench size={18} />
                  <span className="text-sm">Creator Tools</span>
                </div>
              </div>
            </Link>
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Notes</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Insights & ideas from MattyGPT sessions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-brandBlue-500 hover:bg-brandBlue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className={`hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${getColorClass(note.color)}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <div className="flex gap-1 ml-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {formatDate(note.updatedAt)}</span>
                    <Badge variant="outline" className="text-xs">
                      {note.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{note.content}</p>
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notes found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
              <Button className="bg-brandBlue-500 hover:bg-brandBlue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create your first note
              </Button>
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
