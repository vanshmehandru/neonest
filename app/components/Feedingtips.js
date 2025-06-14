import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Baby, Heart, Utensils, Star } from "lucide-react";

const Feedingtips = () => {
  return (
    <div>
      <section id="feeding-tips" className="py-1 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Feeding Tips</h2>
            <p className="text-xl text-gray-600">Guidance for nourishing your baby at every stage</p>
          </div>

          {/* Top 2 Side-by-Side Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
            <Card className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-blue-700">General Feeding Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-sm text-gray-700">
                  {[
                    "Always feed in a calm, comfortable setting.",
                    "Sterilize bottles and utensils properly.",
                    "Watch for hunger cues rather than sticking to strict schedules.",
                    "Burp your baby after every feed.",
                    "Do not add cereal to bottles unless prescribed.",
                    "Gradually introduce one solid food at a time after 6 months.",
                    "Ensure baby stays upright during and after feeding.",
                    "Avoid honey before 12 months.",
                    "Keep hydrated – breast milk or formula covers hydration until 6 months.",
                    "Trust your baby's appetite – don’t force-feed.",
                  ].map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-red-700">Feeding Cautions & Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-sm text-gray-700">
                  {[
                    "Do not feed cow’s milk before 1 year.",
                    "Avoid choking hazards – no nuts, grapes, or raw carrots early on.",
                    "Check food temperature before feeding.",
                    "Don't prop bottles or leave baby unattended.",
                    "Limit juice; it’s not necessary for infants.",
                    "Watch for food allergies – introduce one new food every 3 days.",
                    "No added salt or sugar in baby foods.",
                    "Always supervise during solid feeding.",
                    "Avoid overfeeding – look for satiety signs.",
                    "Breastfeeding mothers should monitor their diet too.",
                  ].map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Age-wise Feeding Tips Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                month: "0-3 Months",
                color: "pink",
                icon: Utensils,
                tips: [
                  "Exclusive breastfeeding or formula.",
                  "Feed every 2–3 hours.",
                  "Watch for rooting and sucking cues.",
                  "Burp after every feed.",
                  "Avoid overfeeding – small stomachs.",
                  "No water or solids yet.",
                ],
              },
              {
                month: "4-6 Months",
                color: "purple",
                icon: Utensils,
                tips: [
                  "May start solids if baby is ready.",
                  "Begin with iron-rich single grains.",
                  "Introduce spoon-feeding slowly.",
                  "Breast milk/formula still primary.",
                  "Avoid allergenic foods initially.",
                  "Ensure sitting support during feeding.",
                ],
              },
              {
                month: "7-9 Months",
                color: "blue",
                icon: Utensils,
                tips: [
                  "Introduce mashed fruits/veggies.",
                  "Offer water in small amounts.",
                  "Start finger foods like soft bananas.",
                  "Use soft spoons and baby bowls.",
                  "Encourage self-feeding exploration.",
                  "Gradually increase feeding frequency.",
                ],
              },
              {
                month: "10-12 Months",
                color: "green",
                icon: Utensils,
                tips: [
                  "Offer family foods in soft form.",
                  "Encourage spoon and cup use.",
                  "Introduce 3 meals + 2 snacks routine.",
                  "Avoid high-sugar/salty foods.",
                  "Still include breast milk/formula.",
                  "Let baby decide how much to eat.",
                ],
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
                    {stage.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-${stage.color}-400`}></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

             <div>
        <Feedingtips/>
      </div>

      {/* Information */}
      <div className="text-center text-gray-500 text-sm mt-8 mb-6">
        For more information regarding this section, visit{" "}
        <a href="/Resources" className="text-pink-600 hover:underline">
          Resources
        </a>{" "}
        or{" "}
        <a href="/Faqs" className="text-pink-600 hover:underline">
          FAQs
        </a>
        .
      </div>
    </div>
  );
};

export default Feedingtips;

