"use client"

import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {
  Baby,
  Heart,
  Utensils,
  Shield,
  Star,
  Package,
  Camera,
  HelpCircle,
  PlayCircle,
} from "lucide-react"
import Image from "next/image"

const Homepage = () => {
  return (
   <>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Baby's First Year Journey
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Expert guidance, milestone tracking, and loving support for parents navigating their baby's incredible
              first year of life. Now with AI-powered chat support!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-lg px-8"
              >
                Start Tracking Milestones
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 text-lg px-8"
              >
                Chat with AI Assistant
              </Button>
            </div>
            <div className="relative">
             <Image
  src="/public/baby_parents.jpeg" 
  alt="Happy baby with parents"
  width={600}
  height={400}
  className="mx-auto rounded-2xl shadow-2xl"
/>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
                <Heart className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600">Comprehensive tools to support your parenting journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
              // onClick={() => setActiveTab("feeding")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle className="group-hover:text-pink-600 transition-colors">Feeding Schedule</CardTitle>
                <CardDescription>Track feeding times, amounts, and create custom schedules</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
              // onClick={() => setActiveTab("inventory")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">Inventory Tracker</CardTitle>
                <CardDescription>Monitor baby essentials and get low stock alerts</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
              // onClick={() => setActiveTab("memories")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors">Memory Vault</CardTitle>
                <CardDescription>Capture precious moments and share with community</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
              // onClick={() => setActiveTab("vaccines")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="group-hover:text-green-600 transition-colors">Vaccine Tracker</CardTitle>
                <CardDescription>Track vaccinations and upload medical records</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
              // onClick={() => setActiveTab("resources")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="group-hover:text-orange-600 transition-colors">Parent Resources</CardTitle>
                <CardDescription>Videos, articles, and expert advice</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer"
              // onClick={() => setActiveTab("faqs")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="group-hover:text-teal-600 transition-colors">FAQs</CardTitle>
                <CardDescription>Quick answers to common baby care questions</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Age Milestones Section */}
      <section id="milestones" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Development Milestones</h2>
            <p className="text-xl text-gray-600">Track your baby's amazing growth month by month</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                month: "0-3 Months",
                icon: Baby,
                color: "pink",
                milestones: ["First smile", "Holds head up", "Follows objects", "Responds to sounds"],
              },
              {
                month: "3-6 Months",
                icon: Heart,
                color: "purple",
                milestones: ["Rolls over", "Sits with support", "Reaches for toys", "Babbles"],
              },
              {
                month: "6-9 Months",
                icon: Utensils,
                color: "blue",
                milestones: ["Sits alone", "Crawls", "First foods", "Says 'mama' or 'dada'"],
              },
              {
                month: "9-12 Months",
                icon: Star,
                color: "green",
                milestones: ["Pulls to stand", "First steps", "Waves bye-bye", "First words"],
              },
            ].map((stage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-${stage.color}-400 flex items-center justify-center mb-4`}
                  >
                    <stage.icon className={`w-8 h-8 text-${stage.color}-600`} />
                  </div>
                  <CardTitle className="text-xl">{stage.month}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stage.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-${stage.color}-400`}></div>
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Component */}
      {/* <Chatbot /> */}
   
    </>
  );
};

export default Homepage;
