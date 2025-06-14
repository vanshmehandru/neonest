"use client";
import { useState, useEffect, useRef } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  Star,
  Utensils,
  Package,
  Camera,
  Shield,
  PlayCircle,
  HelpCircle,
  Baby,
  X, 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/Button";
import Image from "next/image";
import NewSections from "./Newsections";

const Homepage = () => {
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [userReview, setUserReview] = useState(null); 

  const reviewRef = useRef(null); 

  const featuredReviews = [
    {
      name: "Riya Sharma",
      tag: "Recommendations",
      content:
        "Got neonest recommended by a friend... imagining my son, Aarav's first year without it gives me goosebumps",
      keywords: ["Must have", "Smart parenting", "Better child care"],
    },
    {
      name: "Parag Mehta",
      tag: "Happy life",
      content:
        "My wife's been happier ever since she started using neonest. our parenting life in the first year was really good. Thankyou neonest💕",
      keywords: ["Helpful", "Life saver", "Easy parenting"],
    },
    {
      name: "Pooja Desai",
      tag: "AI Pediatrician",
      content:
        "The AI pediatrician diagnosed my child's sickness based on symptoms and I was able to consult the doctor on time and help my child. Genius!",
      keywords: ["Health", "Reliable", "Safety"],
    },
    {
      name: "Nisha Gupta",
      tag: "AI motherly",
      content:
        "AI mother role bohot motivate karta hai aur hamesha supportive rehta hai. Love it!",
      keywords: ["AI roles", "Helpful", "Comforting"],
    },
  ];

  const [reactions, setReactions] = useState(() =>
    featuredReviews.map(() => ({
      helpful: false,
      notHelpful: false,
      helpfulCount: 0,
      notHelpfulCount: 0,
    }))
  );

  useEffect(() => {
    const popUpTime = 15 * 24 * 60 * 60 * 1000; 
    const checkAndPromptReview = () => {
      const lastReview = localStorage.getItem("lastReviewPrompt");
      const now = Date.now();

      if (!lastReview) {
        localStorage.setItem("lastReviewPrompt", now.toString());
        setTimeout(() => setShowReviewPrompt(true), popUpTime);
      } else {
        const timePassed = now - parseInt(lastReview);
        const remaining = popUpTime - timePassed;

        if (remaining <= 0) {
          setShowReviewPrompt(true);
        } else {
          setTimeout(() => setShowReviewPrompt(true), remaining);
        }
      }
    };

    checkAndPromptReview();

    const interval = setInterval(checkAndPromptReview, popUpTime);

    return () => clearInterval(interval); 
  }, []);

  const handleSubmitReview = () => {
    const newReview = {
      name: "You",
      tag: "Shared Experience",
      content: reviewText,
      keywords: [`${selectedRating} ★`],
    };

    setUserReview(newReview); 
    setFeedbackSubmitted(true);
    localStorage.setItem("lastReviewPrompt", Date.now().toString());

    setTimeout(() => {
      setFeedbackSubmitted(false);
      setShowReviewPrompt(false);
      setSelectedRating(0); 
      setReviewText(""); 
    }, 2000);

    console.log("Review submitted:", selectedRating, reviewText);
  };

  const handleReaction = (index, type) => {
    setReactions((prev) => {
      const current = prev[index];
      const updated = { ...current };

      if (type === "helpful") {
        if (current.helpful) {
          updated.helpful = false;
          updated.helpfulCount -= 1;
        } else {
          updated.helpful = true;
          updated.helpfulCount += 1;
          if (current.notHelpful) {
            updated.notHelpful = false;
            updated.notHelpfulCount -= 1;
          }
        }
      } else if (type === "notHelpful") {
        if (current.notHelpful) {
          updated.notHelpful = false;
          updated.notHelpfulCount -= 1;
        } else {
          updated.notHelpful = true;
          updated.notHelpfulCount += 1;
          if (current.helpful) {
            updated.helpful = false;
            updated.helpfulCount -= 1;
          }
        }
      }

      const updatedReactions = [...prev];
      updatedReactions[index] = updated;
      return updatedReactions;
    });
  };

  const handleAddReviewClick = () => {
    setShowReviewPrompt(true);
    setTimeout(() => {
      reviewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDismissReview = () => {
    setShowReviewPrompt(false);
    setSelectedRating(0); 
    setReviewText(""); 
    setFeedbackSubmitted(false); 
  };

  return (
    <>
      {/* hero section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="mb-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Your Baby's First Year Journey
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Expert guidance, milestone tracking, and loving support for
              parents navigating their baby's incredible first year of life.
              Now with AI-powered chat support!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Tracking Milestones
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-300 text-pink-600 text-lg px-8 py-3 rounded-full hover:bg-pink-50 transition-all duration-300"
              >
                Chat with AI Assistant
              </Button>
            </div>
            <div className="relative w-full max-w-2xl mx-auto">
              <Image
                src="/baby_parents.jpeg"
                alt="Happy baby with parents"
                width={600}
                height={400}
                className="mx-auto rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce shadow-md">
                <Heart className="w-9 h-9 text-yellow-600" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center animate-pulse shadow-md">
                <Star className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/80">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools to support your parenting journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer border-none rounded-xl p-4">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle className="group-hover:text-pink-600 transition-colors text-xl font-semibold">
                  Feeding Schedule
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Track feeding times, amounts, and create custom schedules
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer border-none rounded-xl p-4">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors text-xl font-semibold">
                  Inventory Tracker
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Monitor baby essentials and get low stock alerts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer border-none rounded-xl p-4">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="group-hover:text-purple-600 transition-colors text-xl font-semibold">
                  Memory Vault
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Capture precious moments and share with community
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer border-none rounded-xl p-4">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="group-hover:text-green-600 transition-colors text-xl font-semibold">
                  Vaccine Tracker
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Track vaccinations and upload medical records
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer border-none rounded-xl p-4">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="group-hover:text-orange-600 transition-colors text-xl font-semibold">
                  Parent Resources
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Videos, articles, and expert advice
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer border-none rounded-xl p-4">
              <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="group-hover:text-teal-600 transition-colors text-xl font-semibold">
                  FAQs
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Quick answers to common baby care questions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Age Milestones Section */}
      <section id="milestones" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Development Milestones
            </h2>
            <p className="text-xl text-gray-600">
              Track your baby's amazing growth month by month
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                month: "0-3 Months",
                icon: Baby,
                color: "pink",
                milestones: [
                  "First smile",
                  "Holds head up",
                  "Follows objects",
                  "Responds to sounds",
                ],
              },
              {
                month: "3-6 Months",
                icon: Heart,
                color: "purple",
                milestones: [
                  "Rolls over",
                  "Sits with support",
                  "Reaches for toys",
                  "Babbles",
                ],
              },
              {
                month: "6-9 Months",
                icon: Utensils,
                color: "blue",
                milestones: [
                  "Sits alone",
                  "Crawls",
                  "First foods",
                  "Says 'mama' or 'dada'",
                ],
              },
              {
                month: "9-12 Months",
                icon: Star,
                color: "green",
                milestones: [
                  "Pulls to stand",
                  "First steps",
                  "Waves bye-bye",
                  "First words",
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
                    {stage.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-base text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-${stage.color}-400 flex-shrink-0`}></div>
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

      {/* Reviews Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-white/80 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left">
              Read how NeoNest helped parents
            </h2>
            <div className="text-center md:text-right">
              <Button
                variant="outline"
                className="text-pink-600 border-pink-400 font-semibold hover:bg-pink-50 px-6 py-2 rounded-full"
                onClick={handleAddReviewClick}
              >
                + Add Your Review
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {userReview && (
              <Card className="bg-white/90 border border-green-300 shadow-lg p-4 rounded-xl">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-lg text-gray-800 font-semibold">
                    {userReview.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-green-600">
                    #{userReview.tag}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-700 text-base mb-3">
                    {userReview.content}
                  </p>
                  <div className="text-xs text-gray-500 mb-2">
                    Tags: {userReview.keywords.map((word) => `"${word}"`).join(", ")}
                  </div>
                </CardContent>
              </Card>
            )}

            {featuredReviews.map((review, index) => {
              const reaction = reactions[index] || {
                helpful: false,
                notHelpful: false,
                helpfulCount: 0,
                notHelpfulCount: 0,
              };

              return (
                <Card
                  key={index}
                  className="bg-white/90 border border-gray-200 shadow-md p-4 rounded-xl"
                >
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-lg text-gray-800 font-semibold">
                      {review.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-pink-600">
                      #{review.tag}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-700 text-base mb-3">
                      {review.content}
                    </p>
                    <div className="text-xs text-gray-500 mb-2">
                      Popular tags:{" "}
                      {review.keywords.map((word) => `"${word}"`).join(", ")}
                    </div>

                    {/* Reaction Buttons */}
                    <div className="flex items-center gap-6 text-sm mt-3">
                      <div
                        className={`cursor-pointer flex items-center gap-1 transition-colors duration-200 ${
                          reaction.helpful ? "text-green-600" : "text-gray-400 hover:text-green-500"
                        }`}
                        onClick={() => handleReaction(index, "helpful")}
                      >
                        <ThumbsUp size={18} />
                        <span className="text-xs">
                          {reaction.helpfulCount || 0}
                        </span>
                      </div>
                      <div
                        className={`cursor-pointer flex items-center gap-1 transition-colors duration-200 ${
                          reaction.notHelpful ? "text-red-600" : "text-gray-400 hover:text-red-500"
                        }`}
                        onClick={() => handleReaction(index, "notHelpful")}
                      >
                        <ThumbsDown size={18} />
                        <span className="text-xs">
                          {reaction.notHelpfulCount || 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="text-pink-600 border-pink-400 font-bold hover:bg-pink-50 px-8 py-3 rounded-full"
            >
              View All Reviews →
            </Button>
          </div>
        </div>
      </section>


     <NewSections/>

      {/* Feedback Modal */}
      {showReviewPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <section
            ref={reviewRef}
            className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100 animate-slideUp relative"
          >
            <button
              onClick={handleDismissReview}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Dismiss feedback modal"
            >
              <X size={24} />
            </button>

            {feedbackSubmitted ? (
              <div className="text-center text-green-700 font-semibold text-lg py-4">
                ✅ Thank you for your feedback!
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-yellow-800 mb-4 text-center">
                  Help us make NeoNest better!
                </h3>
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className={`w-10 h-10 text-3xl transition-colors duration-200 ${
                        selectedRating >= star
                          ? "text-yellow-500"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  rows={4}
                  placeholder="Share your thoughts about NeoNest..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base resize-y focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  autoFocus
                ></textarea>
                <div className="flex justify-center mt-5">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={handleSubmitReview}
                    disabled={!selectedRating || reviewText.trim() === ""}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Homepage;