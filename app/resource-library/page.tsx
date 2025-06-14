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
  Play,
  FileText,
  ExternalLink,
  Clock,
  User,
  Settings,
  Wrench,
  Twitter,
  GlobeIcon,
  Instagram,
  Newspaper,
  LinkedinIcon,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { cn } from "@/lib/utils"

const resources = [
  {
    id: 1,
    title: "The Niche is You™: Masterclass",
    type: "video",
    duration: "1h 15min",
    category: "Branding",
    description:
      "Deep dive into leveraging your unique story and experiences to build your brand and business. Inspired by Naval Ravikant.",
    thumbnail: "/placeholder.svg?width=300&height=169",
    author: "Matt Gottesman",
    difficulty: "Intermediate",
    tags: ["Branding", "PersonalBrand", "Naval"],
  },
  {
    id: 2,
    title: "Productizing Your Expertise Playbook",
    type: "document",
    category: "Strategy",
    description:
      "A step-by-step guide to turning your knowledge and experience into scalable digital products. Earn with your mind, not your time.",
    author: "Matt Gottesman",
    difficulty: "Advanced",
    tags: ["DigitalProducts", "Scaling", "Leverage"],
    thumbnail: "/placeholder.svg?width=300&height=169",
  },
  {
    id: 3,
    title: "Content Creation for the Digital Age",
    type: "article",
    category: "Content",
    description:
      "Strategies for creating impactful content across platforms, drawing from 25+ years of writing and building a 200K+ community.",
    author: "Matt Gottesman",
    difficulty: "Beginner",
    tags: ["ContentCreation", "Writing", "Community"],
    thumbnail: "/placeholder.svg?width=300&height=169",
  },
  {
    id: 4,
    title: "Navigating Crypto & Web3 for Creators",
    type: "video",
    duration: "55 min",
    category: "Web3",
    description:
      "Understanding blockchain, crypto, and their implications for the future of the creator economy. Based on 6+ years in the space.",
    thumbnail: "/placeholder.svg?width=300&height=169",
    author: "Matt Gottesman",
    difficulty: "Intermediate",
    tags: ["Crypto", "Web3", "CreatorEconomy"],
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
]

export default function ResourceLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const categories = ["all", "Branding", "Strategy", "Content", "Web3", "Productivity"]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.tags && resource.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "article":
        return <ExternalLink className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0">
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
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            <Link href="/" className="block">
              <div className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  <span className="text-sm">MattyGPT</span>
                </div>
              </div>
            </Link>
            <div className="px-3 py-2 rounded-lg bg-brandBlue-50 dark:bg-brandBlue-900/20 text-brandBlue-700 dark:text-brandBlue-400 border border-brandBlue-200 dark:border-brandBlue-800">
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span className="text-sm font-medium">Resource Hub</span>
              </div>
            </div>
            <Link href="/notes" className="block">
              <div className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <StickyNote size={18} />
                  <span className="text-sm">My Notes</span>
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resource Hub</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Curated knowledge by Matt Gottesman</p>
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

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[140px]">
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
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "All Levels" : difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden p-6 gap-6">
          <main className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                  <CardHeader className="pb-3">
                    {resource.thumbnail && (
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden">
                        <Image
                          src={resource.thumbnail || "/placeholder.svg"}
                          alt={resource.title}
                          width={300}
                          height={169}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.type)}
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        {resource.duration && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {resource.duration}
                          </div>
                        )}
                      </div>
                      <Badge className={cn("text-xs", getDifficultyColor(resource.difficulty))}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags &&
                          resource.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <span>By {resource.author}</span>
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </main>

          <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Connect with Matt</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Follow Matt</h3>
                <div className="flex space-x-3">
                  <a
                    href="https://www.instagram.com/mattgottesman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brandBlue-500 dark:text-gray-400 dark:hover:text-brandBlue-400"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://twitter.com/mattgottesman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brandBlue-500 dark:text-gray-400 dark:hover:text-brandBlue-400"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://www.mattgottesman.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brandBlue-500 dark:text-gray-400 dark:hover:text-brandBlue-400"
                    aria-label="Website"
                  >
                    <GlobeIcon size={20} />
                  </a>
                  <a
                    href="https://mattgottesman.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brandBlue-500 dark:text-gray-400 dark:hover:text-brandBlue-400"
                    aria-label="Substack"
                  >
                    <Newspaper size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mattgottesman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brandBlue-500 dark:text-gray-400 dark:hover:text-brandBlue-400"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCMYfij15oGv5K8ty1y-2JWg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brandBlue-500 dark:text-gray-400 dark:hover:text-brandBlue-400"
                    aria-label="YouTube"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Links</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a
                      href="https://www.mattgottesman.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-brandBlue-600 dark:text-gray-300 dark:hover:text-brandBlue-400 hover:underline"
                    >
                      MattGottesman.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.mattgottesman.com/articles"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-brandBlue-600 dark:text-gray-300 dark:hover:text-brandBlue-400 hover:underline"
                    >
                      Articles & Writings
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.mattgottesman.com/work-with-me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-brandBlue-600 dark:text-gray-300 dark:hover:text-brandBlue-400 hover:underline"
                    >
                      Workshops & Consulting
                    </a>
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-brandBlue-500 hover:bg-brandBlue-600 text-white dark:text-gray-900 dark:hover:bg-brandBlue-400">
                Book a Strategy Call
              </Button>
            </div>
          </aside>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 flex-shrink-0">
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
