"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cross, BookOpen, Sword, Scroll, Users, PanelLeftOpen, PanelRightOpen, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navItems = [
  { href: "/", icon: Cross, label: "WayFinder AI" },
  { href: "/study", icon: BookOpen, label: "Study" },
  { href: "/action", icon: Sword, label: "Action" }, // Changed from Target to Sword
  { href: "/body-of-christ-history", icon: Scroll, label: "Church History" },
  { href: "/community", icon: Users, label: "Community" },
]

interface AppSidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  sidebarWidth: number
}

// Icon Wrapper Component for consistent styling
const NavIcon = ({ icon: Icon, isActive }: { icon: React.ElementType; isActive: boolean }) => (
  <div
    className={cn(
      "nav-icon-wrapper group w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
      isActive
        ? "bg-pureWhite border-obsidianBlack dark:bg-pureWhite dark:border-obsidianBlack" // Active: White background, black border (consistent for both themes)
        : "border-obsidianBlack dark:border-mistGrey hover:bg-pureWhite dark:hover:bg-pureWhite", // Inactive: Theme-aware border, white hover
    )}
  >
    <Icon
      size={18}
      className={cn(
        isActive
          ? "text-obsidianBlack" // Active icon is black
          : "text-obsidianBlack dark:text-mistGrey group-hover:text-obsidianBlack", // Inactive icon colors
      )}
    />
  </div>
)

export default function AppSidebar({ isSidebarOpen, toggleSidebar, sidebarWidth }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      style={{ width: `${sidebarWidth}px` }}
      className="bg-obsidianBlack text-parchmentOffWhite flex flex-col transition-all duration-300 ease-in-out border-r border-mistGrey/20"
    >
      <div className="p-4 border-b border-mistGrey/20 flex items-center justify-between sticky top-0 z-10 flex-shrink-0 h-[73px]">
        {isSidebarOpen && (
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Image
              src="/images/michxl-logo.png"
              alt="The Way Logo"
              width={32}
              height={32}
              className="flex-shrink-0 rounded-sm"
            />
            <h1 className="text-xl font-serif font-bold text-parchmentOffWhite truncate">The Way</h1>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-mistGrey hover:text-pureWhite">
          {isSidebarOpen ? <PanelLeftOpen size={20} /> : <PanelRightOpen size={20} />}
        </Button>
      </div>

      <nav className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="block group" title={item.label}>
            <div
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                "hover:bg-greyBlue/30",
                pathname === item.href ? "bg-greyBlue text-pureWhite" : "text-mistGrey hover:text-pureWhite",
              )}
            >
              <NavIcon icon={item.icon} isActive={pathname === item.href} />
              {isSidebarOpen && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    pathname === item.href ? "text-pureWhite" : "text-parchmentOffWhite/80 group-hover:text-pureWhite",
                  )}
                >
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-mistGrey/20 mt-auto flex-shrink-0">
        <div className={cn("flex items-center", isSidebarOpen ? "justify-between" : "justify-center")}>
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-2 rounded-md p-2 transition-colors",
              "text-mistGrey hover:text-pureWhite hover:bg-greyBlue/30",
              pathname === "/settings" && "bg-greyBlue text-pureWhite",
            )}
            title="Settings"
          >
            <Settings size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </Link>
          {isSidebarOpen && <ThemeToggle />}
        </div>
      </div>
    </aside>
  )
}
