"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import { Play, BookOpen, FileText, ExternalLink, Search, Filter, Clock, Star, Eye } from "lucide-react";

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
];

const categories = [
  { id: "all", name: "All Resources" },
  { id: "feeding", name: "Feeding & Nutrition" },
  { id: "sleep", name: "Sleep & Rest" },
  { id: "development", name: "Development" },
  { id: "health", name: "Health & Safety" },
];

const resourceTypes = [
  { id: "all", name: "All Types" },
  { id: "video", name: "Videos" },
  { id: "article", name: "Articles" },
  { id: "journal", name: "Research Papers" },
];

export default function Resources() {

  useEffect(() => {
      document.title = "Resources | NeoNest";
    }, []);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      !searchTerm ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return Play;
      case "article":
        return BookOpen;
      case "journal":
        return FileText;
      default:
        return BookOpen;
    }
  };

  const getResourceBadgeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-red-500 text-white";
      case "article":
        return "bg-yellow-500 text-white";
      case "journal":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">Parent Resources</h2>
        <p className="text-lg text-gray-600">
          Curated videos, articles, and research to support your parenting journey
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 inset-y-0 flex items-center h-full text-gray-400 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 py-2 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 w-full"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter Group */}
        <div className="flex flex-wrap items-center gap-4 bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Category:</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => setSelectedCategory(category.id)}
              size="sm"
              className={`rounded-xl text-sm ${
                selectedCategory === category.id
                  ? "bg-pink-100 text-pink-700 font-semibold border-pink-300"
                  : "text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Type Filter Group */}
        <div className="flex flex-wrap items-center gap-4 bg-white rounded-xl shadow-sm p-4">
          <span className="text-sm font-medium text-gray-600">Type:</span>
          {resourceTypes.map((type) => (
            <Button
              key={type.id}
              variant="outline"
              onClick={() => setSelectedType(type.id)}
              size="sm"
              className={`rounded-xl text-sm ${
                selectedType === type.id
                  ? "bg-pink-100 text-pink-700 font-semibold border-pink-300"
                  : "text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {type.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const ResourceIcon = getResourceIcon(resource.type);
          return (
            <Card
              key={resource.id}
              className="group bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  {resource.type === "video" && (
                    <>
                      <div className="absolute inset-0 bg-black/30 rounded-t-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-800 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {resource.duration}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4 pb-2">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${getResourceBadgeColor(resource.type)}`}>
                      <ResourceIcon className="w-3 h-3" />
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

              <CardContent className="pt-0 px-4 pb-6">
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                <div className="space-y-1 mb-4 text-sm text-gray-500">
                  {resource.author && <div>By {resource.author}</div>}
                  {resource.journal && <div>{resource.journal}</div>}

                  <div className="flex flex-wrap gap-3">
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
                    {resource.publishDate && (
                      <div>{new Date(resource.publishDate).toLocaleDateString("en-GB")}</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white font-medium rounded-xl transition-all duration-200"
                  variant="ghost"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {resource.type === "video" ? "Watch Video" : "Read More"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedType("all");
            }}
            className="rounded-xl"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

