"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, BookOpen, FileText, ExternalLink, Search, Filter, Clock, Star, Eye } from "lucide-react"

const resources = [
  {
    id: 1,
    type: "video",
    title: "Baby's First Foods: A Complete Guide",
    description: "Learn how to introduce solid foods safely and nutritiously",
    url: "https://youtube.com/watch?v=example1",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "15:30",
    views: "2.3M",
    rating: 4.8,
    category: "feeding",
    tags: ["solid foods", "nutrition", "6 months"],
  },
  {
    id: 2,
    type: "article",
    title: "Understanding Your Baby's Sleep Patterns",
    description: "Expert insights into infant sleep cycles and how to establish healthy routines",
    url: "https://example.com/sleep-patterns",
    author: "Dr. Sarah Johnson",
    readTime: "8 min read",
    category: "sleep",
    tags: ["sleep training", "newborn", "routine"],
  },
  {
    id: 3,
    type: "journal",
    title: "Pediatric Development Milestones Study",
    description: "Latest research on infant developmental milestones and variations",
    url: "https://journal.example.com/development",
    journal: "Journal of Pediatric Development",
    publishDate: "2024-01-15",
    category: "development",
    tags: ["research", "milestones", "development"],
  },
  {
    id: 4,
    type: "video",
    title: "Baby Massage Techniques for Better Sleep",
    description: "Gentle massage techniques to help your baby relax and sleep better",
    url: "https://youtube.com/watch?v=example2",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "12:45",
    views: "1.8M",
    rating: 4.9,
    category: "sleep",
    tags: ["massage", "relaxation", "bonding"],
  },
  {
    id: 5,
    type: "article",
    title: "Vaccination Schedule: What Every Parent Should Know",
    description: "Complete guide to infant vaccinations and their importance",
    url: "https://example.com/vaccinations",
    author: "Dr. Michael Chen",
    readTime: "12 min read",
    category: "health",
    tags: ["vaccines", "health", "schedule"],
  },
  {
    id: 6,
    type: "journal",
    title: "Breastfeeding Benefits: Long-term Health Outcomes",
    description: "Comprehensive study on the long-term benefits of breastfeeding",
    url: "https://journal.example.com/breastfeeding",
    journal: "International Breastfeeding Journal",
    publishDate: "2024-02-20",
    category: "feeding",
    tags: ["breastfeeding", "health benefits", "research"],
  },
]

const categories = [
  { id: "all", name: "All Resources" },
  { id: "feeding", name: "Feeding & Nutrition" },
  { id: "sleep", name: "Sleep & Rest" },
  { id: "development", name: "Development" },
  { id: "health", name: "Health & Safety" },
]

const resourceTypes = [
  { id: "all", name: "All Types" },
  { id: "video", name: "Videos" },
  { id: "article", name: "Articles" },
  { id: "journal", name: "Research Papers" },
]

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      !searchTerm ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return Play
      case "article":
        return BookOpen
      case "journal":
        return FileText
      default:
        return BookOpen
    }
  }

  const getResourceBadgeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-700"
      case "article":
        return "bg-blue-100 text-blue-700"
      case "journal":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Parent Resources</h2>
        <p className="text-xl text-gray-600">
          Curated videos, articles, and research to support your parenting journey
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Category:
            </span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Type:</span>
            {resourceTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                onClick={() => setSelectedType(type.id)}
                size="sm"
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const ResourceIcon = getResourceIcon(resource.type)

          return (
            <Card
              key={resource.id}
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="p-0">
                {resource.type === "video" && (
                  <div className="relative">
                    <img
                      src={resource.thumbnail || "/placeholder.svg"}
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {resource.duration}
                    </div>
                  </div>
                )}
                <div className="p-4 pb-2">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getResourceBadgeColor(resource.type)}>
                      <ResourceIcon className="w-3 h-3 mr-1" />
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </Badge>
                    {resource.rating && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {resource.rating}
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg mb-2 group-hover:text-pink-600 transition-colors">
                    {resource.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                <div className="space-y-2 mb-4">
                  {resource.author && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>By {resource.author}</span>
                    </div>
                  )}

                  {resource.journal && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{resource.journal}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {resource.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.readTime}
                      </div>
                    )}

                    {resource.views && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {resource.views} views
                      </div>
                    )}

                    {resource.publishDate && <span>{new Date(resource.publishDate).toLocaleDateString()}</span>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full group-hover:bg-pink-600 group-hover:text-white transition-colors"
                  variant="outline"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {resource.type === "video" ? "Watch Video" : "Read More"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setSelectedType("all")
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}