"use client";

import { Baby, Heart, Utensils, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export default function InteractionWithBaby() {
  return (
    <section id="interaction" className="py-4 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Interacting With Your Baby
          </h2>
          <p className="text-xl text-gray-600">
            Discover meaningful ways to engage and support your baby's development
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              month: "0-3 Months",
              icon: Baby,
              color: "pink",
              activities: [
                "Make eye contact",
                "Talk softly to them",
                "Sing lullabies",
                "Tummy time",
                "Gentle massage",
                "Use high-contrast toys",
              ],
            },
            {
              month: "4-6 Months",
              icon: Heart,
              color: "purple",
              activities: [
                "Play peekaboo",
                "Mirror play",
                "Rattles and sounds",
                "Read picture books",
                "Encourage rolling",
                "Let them grasp toys",
              ],
            },
            {
              month: "7-9 Months",
              icon: Utensils,
              color: "blue",
              activities: [
                "Introduce solid foods",
                "Let them bang objects",
                "Interactive songs",
                "Support while sitting",
                "Play with textures",
                "Encourage crawling",
              ],
            },
            {
              month: "10-12 Months",
              icon: Star,
              color: "green",
              activities: [
                "Name objects",
                "Encourage standing",
                "Imitate sounds",
                "Play stacking games",
                "Clap hands together",
                "Walk with support",
              ],
            },
          ].map((stage, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow border-none bg-white/80 backdrop-blur-sm rounded-xl p-4"
            >
              <CardHeader className="text-center p-0 mb-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-${stage.color}-400 flex items-center justify-center mb-4 shadow-md`}
                >
                  <stage.icon className={`w-8 h-8 text-${stage.color}-600`} />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {stage.month}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-2">
                  {stage.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-base text-gray-700">
                      <div className={`w-2 h-2 rounded-full bg-${stage.color}-400 flex-shrink-0`}></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
