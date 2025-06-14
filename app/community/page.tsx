"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Search, MapPin, MicVocal, BookOpen, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Updated data with new categories
const communityResources = [
  { name: "Redeemer Presbyterian", location: "New York, NY", type: "Church", category: "church", icon: Users },
  { name: "Antioch Community Church", location: "Waco, TX", type: "Church", category: "church", icon: Users },
  { name: "Pillar Church", location: "Scottsdale, AZ", type: "Church", category: "church", icon: Users },
  { name: "Overflow Church", location: "Minneapolis, MN", type: "Church", category: "church", icon: Users },
  {
    name: "The Kings Call",
    location: "Scottsdale, AZ",
    type: "Discipleship Group",
    category: "local discipleship",
    icon: BookOpen,
  },
  { name: "The Deep End Podcast", location: "Online", type: "Podcast", category: "online community", icon: MicVocal },
]

const filterOptions = [
  { value: "all", label: "All Types" },
  { value: "church", label: "Churches" },
  { value: "online community", label: "Online Communities" },
  { value: "local discipleship", label: "Local Discipleship" },
]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Filter resources based on search term and selected filter
  const filteredResources = communityResources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || resource.category === selectedFilter

    return matchesSearch && matchesFilter
  })

  const getTypeColor = (category: string) => {
    switch (category) {
      case "church":
        return "bg-primary/10 text-primary"
      case "online community":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "local discipleship":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 md:p-10 text-foreground bg-background">
      <header className="mb-12 text-center">
        <Users className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-serif mb-2">Community</h1>
        <p className="text-lg text-muted-foreground">
          Find and connect with the Body of Christ and valuable resources.
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Search and Filter Section */}
        <div className="mb-8 p-4 bg-card rounded-lg shadow-md border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, city, or type..."
                className="pl-10 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Search</Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredResources.length} of {communityResources.length} resources
            {selectedFilter !== "all" && (
              <span> in "{filterOptions.find((f) => f.value === selectedFilter)?.label}"</span>
            )}
          </p>
          {(searchTerm || selectedFilter !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSelectedFilter("all")
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <Card key={index} className="bg-card shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif flex items-center">
                      <IconComponent size={18} className="mr-2 text-primary flex-shrink-0" />
                      <span className="truncate">{resource.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin size={14} className="mr-2 flex-shrink-0" />
                      {resource.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={getTypeColor(resource.category)}>{resource.type}</Badge>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedFilter("all")
                }}
              >
                Show All Resources
              </Button>
            </div>
          )}
        </div>

        {/* Category Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Churches</h3>
            <p className="text-sm text-muted-foreground">
              {communityResources.filter((r) => r.category === "church").length} local congregations
            </p>
          </Card>
          <Card className="text-center p-4">
            <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">Discipleship Groups</h3>
            <p className="text-sm text-muted-foreground">
              {communityResources.filter((r) => r.category === "local discipleship").length} local study groups
            </p>
          </Card>
          <Card className="text-center p-4">
            <MicVocal className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">Online Communities</h3>
            <p className="text-sm text-muted-foreground">
              {communityResources.filter((r) => r.category === "online community").length} digital resources
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
