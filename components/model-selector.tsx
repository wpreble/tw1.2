"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const models = [
  {
    id: "wayfinder-1",
    name: "Wayfinder 1",
    description: "Guidance for study, prayer, biblical perspective, and learning to follow the way.",
    available: true,
  },
  {
    id: "michxl-1.5",
    name: "Michxl 1.5",
    description: "Spiritual strategist for warfare, dominion, and building God's kingdom.",
    available: false,
  },
  {
    id: "samuel-1",
    name: "Samuel 1",
    description: "Rigorous scripture analysis & application.",
    available: false,
  },
]

interface ModelSelectorProps {
  className?: string
}

function ModelSelector({ className }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = React.useState(models[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-1 px-2 py-1.5 text-lg font-serif focus:outline-none focus:ring-0 text-foreground",
            className,
          )}
        >
          {selectedModel.name}
          <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[320px] bg-card border-border">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Select a Model</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className={cn(
              "flex items-center justify-between py-3 focus:bg-muted/50",
              !model.available && "opacity-60 cursor-not-allowed",
            )}
            onSelect={() => model.available && setSelectedModel(model)}
            disabled={!model.available}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium font-serif text-foreground">{model.name}</p>
                {!model.available && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Coming Soon</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 pr-2">{model.description}</p>
            </div>
            {selectedModel.id === model.id && model.available && (
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ModelSelector }
export default ModelSelector
