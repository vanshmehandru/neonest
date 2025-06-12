"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/Button"
import Input from "../components/ui/Input"
import Badge from "../components/ui/Badge"
import { Plus, Camera, Video, Heart, Share2, Edit, Trash2, Eye, MessageCircle, Upload, Save, X } from "lucide-react"
import Image from "next/image"

export default function MemoryVault() {
  const [memories, setMemories] = useState([])
  const [isAddingMemory, setIsAddingMemory] = useState(false)
  const [editingMemory, setEditingMemory] = useState(null)
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [newMemory, setNewMemory] = useState({
    title: "",
    description: "",
    type: "photo",
    file: null,
    tags: "",
    isPublic: false,
    isLiked: false, // Added isLiked property
  })

  // Load memories from localStorage
  useEffect(() => {
    const savedMemories = localStorage.getItem("babyMemories")
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories))
    }
  }, [])

  // Save memories to localStorage
  useEffect(() => {
    localStorage.setItem("babyMemories", JSON.stringify(memories))
  }, [memories])

  const addMemory = () => {
    if (newMemory.title && newMemory.description) {
      const memory = {
        id: Date.now(),
        ...newMemory,
        tags: newMemory.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        date: new Date().toISOString(),
        likes: 0,
        comments: [],
      }
      setMemories([memory, ...memories])
      setNewMemory({ title: "", description: "", type: "photo", file: null, tags: "", isPublic: false, isLiked: false }) // Reset isLiked
      setIsAddingMemory(false)
    }
  }

  const updateMemory = (id, updatedMemory) => {
    setMemories(
      memories.map((memory) =>
        memory.id === id
          ? {
              ...memory,
              ...updatedMemory,
              tags:
                typeof updatedMemory.tags === "string"
                  ? updatedMemory.tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag)
                  : updatedMemory.tags,
            }
          : memory,
      ),
    )
    setEditingMemory(null)
  }

  const deleteMemory = (id) => {
    setMemories(memories.filter((memory) => memory.id !== id))
    setSelectedMemory(null)
  }

  const toggleLike = (id) => {
    setMemories(
      memories.map((memory) =>
        memory.id === id
          ? { ...memory, likes: memory.isLiked ? memory.likes - 1 : memory.likes + 1, isLiked: !memory.isLiked }
          : memory,
      ),
    )
  }

  const shareToPublic = (id) => {
    setMemories(memories.map((memory) => (memory.id === id ? { ...memory, isPublic: !memory.isPublic } : memory)))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (editingMemory) {
          setEditingMemory({ ...editingMemory, file: event.target.result })
        } else {
          setNewMemory({ ...newMemory, file: event.target.result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const publicMemories = memories.filter((memory) => memory.isPublic)

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto"> {/* Adjusted overall padding and max-width */}
      <div className="flex items-center justify-between mb-6"> {/* Adjusted margin-bottom */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Memory Vault</h2>
          <p className="text-gray-600 mt-1">Capture and share precious moments with your baby</p> {/* Adjusted margin-top */}
        </div>
        <Button
          onClick={() => setIsAddingMemory(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Memory
        </Button>
      </div>

      {/* Add/Edit Memory Form */}
      {(isAddingMemory || editingMemory) && (
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 p-6 shadow-lg rounded-lg"> {/* Added padding, shadow, rounded-lg */}
          <CardHeader className="mb-4 p-0"> {/* Removed default padding, added margin-bottom */}
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-pink-700"> {/* Adjusted text size, font weight, and color */}
              <Camera className="w-6 h-6 text-pink-600" /> {/* Adjusted icon size */}
              {editingMemory ? "Edit Memory" : "Add New Memory"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-0"> {/* Adjusted spacing, removed default padding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Title</label> {/* Added text color */}
                <Input
                  placeholder="e.g., First Smile"
                  value={editingMemory ? editingMemory.title : newMemory.title}
                  onChange={(e) => {
                    if (editingMemory) {
                      setEditingMemory({ ...editingMemory, title: e.target.value })
                    } else {
                      setNewMemory({ ...newMemory, title: e.target.value })
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent" // Added focus styles
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Type</label> {/* Added text color */}
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent" // Added focus styles
                  value={editingMemory ? editingMemory.type : newMemory.type}
                  onChange={(e) => {
                    if (editingMemory) {
                      setEditingMemory({ ...editingMemory, type: e.target.value })
                    } else {
                      setNewMemory({ ...newMemory, type: e.target.value })
                    }
                  }}
                >
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Description</label> {/* Added text color */}
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-24 resize-y focus:ring-2 focus:ring-pink-400 focus:border-transparent" // Added resize-y and focus styles
                placeholder="Describe this precious moment..."
                value={editingMemory ? editingMemory.description : newMemory.description}
                onChange={(e) => {
                  if (editingMemory) {
                    setEditingMemory({ ...editingMemory, description: e.target.value })
                  } else {
                    setNewMemory({ ...newMemory, description: e.target.value })
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Upload File</label> {/* Added text color */}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/,video/"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-gray-700" // Added text color
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </label>
                {(editingMemory?.file || newMemory.file) && (
                  <span className="text-sm text-green-600">File uploaded ✓</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Tags (comma separated)</label> {/* Added text color */}
              <Input
                placeholder="e.g., milestone, cute, funny"
                value={
                  editingMemory
                    ? Array.isArray(editingMemory.tags)
                      ? editingMemory.tags.join(", ")
                      : editingMemory.tags
                    : newMemory.tags
                }
                onChange={(e) => {
                  if (editingMemory) {
                    setEditingMemory({ ...editingMemory, tags: e.target.value })
                  } else {
                    setNewMemory({ ...newMemory, tags: e.target.value })
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent" // Added focus styles
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={editingMemory ? editingMemory.isPublic : newMemory.isPublic}
                onChange={(e) => {
                  if (editingMemory) {
                    setEditingMemory({ ...editingMemory, isPublic: e.target.checked })
                  } else {
                    setNewMemory({ ...newMemory, isPublic: e.target.checked })
                  }
                }}
                className="form-checkbox h-4 w-4 text-pink-600 rounded focus:ring-pink-400" // Styled checkbox
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700"> {/* Added text color */}
                Share with community (make public)
              </label>
            </div>

            <div className="flex gap-3 pt-2"> {/* Adjusted gap and padding-top */}
              <Button
                onClick={editingMemory ? () => updateMemory(editingMemory.id, editingMemory) : addMemory}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 flex-1 py-2" // Added flex-1 and py-2
              >
                <Save className="w-4 h-4 mr-2" />
                {editingMemory ? "Update" : "Add"} Memory
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingMemory(false)
                  setEditingMemory(null)
                  setNewMemory({ title: "", description: "", type: "photo", file: null, tags: "", isPublic: false, isLiked: false }) // Reset isLiked
                }}
                className="flex-1 py-2" // Added flex-1 and py-2
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Memory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <Card
            key={memory.id}
            className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden border border-gray-100 rounded-lg" // Added shadow, border, and rounded-lg
          >
            <div className="relative">
              {memory.file ? (
                memory.type === "video" ? (
                  <div className="relative h-48 bg-gray-200 flex items-center justify-center rounded-t-lg"> {/* Added rounded-t-lg */}
                    <Video className="w-12 h-12 text-gray-400" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        onClick={() => setSelectedMemory(memory)}
                        className="bg-white/90 text-gray-800 hover:bg-white"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 rounded-t-lg overflow-hidden"> {/* Added rounded-t-lg and overflow-hidden */}
                    <Image src={memory.file || "/placeholder.svg"} alt={memory.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        onClick={() => setSelectedMemory(memory)}
                        className="bg-white/90 text-gray-800 hover:bg-white"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center rounded-t-lg"> {/* Added rounded-t-lg */}
                  <Camera className="w-12 h-12 text-pink-400" />
                </div>
              )}

              <div className="absolute top-3 right-3 flex gap-2"> {/* Adjusted top and right spacing, and gap */}
                <Badge className={memory.type === "video" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}>
                  {memory.type === "video" ? <Video className="w-3 h-3 mr-1" /> : <Camera className="w-3 h-3 mr-1" />}
                  {memory.type}
                </Badge>
                {memory.isPublic && (
                  <Badge className="bg-green-500 text-green-700">
                    <Share2 className="w-3 h-3 mr-1" />
                    Public
                  </Badge>
                )}
              </div>
            </div>

            <CardContent className="p-4 pt-3"> {/* Adjusted padding-top */}
              <h3 className="font-semibold text-lg mb-2 group-hover:text-pink-600 transition-colors">{memory.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{memory.description}</p>

              {memory.tags && memory.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3"> {/* Adjusted gap */}
                  {memory.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5"> {/* Added padding */}
                      {tag}
                    </Badge>
                  ))}
                  {memory.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5"> {/* Added padding */}
                      +{memory.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-2 border-t border-gray-100"> {/* Adjusted margin-bottom, padding-top, and added border */}
                <span>{new Date(memory.date).toLocaleDateString('en-GB')}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(memory.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      memory.isLiked ? "text-pink-600" : "hover:text-pink-600" // Conditional class for pink heart
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={memory.isLiked ? "currentColor" : "none"} /> {/* Fill color conditionally */}
                    {memory.likes}
                  </button>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {memory.comments?.length || 0}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditingMemory(memory)} className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => shareToPublic(memory.id)}
                  className={memory.isPublic ? "text-green-600 hover:bg-green-50" : "hover:bg-gray-50"} // Added hover background
                >
                  <Share2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteMemory(memory.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50" // Added hover background
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {memories.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm p-8 text-center rounded-lg shadow-md"> {/* Adjusted padding, added shadow, rounded-lg */}
          <CardContent className="py-0 px-0"> {/* Removed default padding */}
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No memories yet</h3>
            <p className="text-gray-500 mb-6">Start capturing precious moments with your baby</p> {/* Adjusted margin-bottom */}
            <Button
              onClick={() => setIsAddingMemory(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Memory
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Community Blog Section */}
      {publicMemories.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 p-6 shadow-lg rounded-lg"> {/* Added padding, shadow, rounded-lg */}
          <CardHeader className="mb-4 p-0"> {/* Removed default padding, added margin-bottom */}
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700"> {/* Adjusted text size, font weight, and color */}
              <Share2 className="w-6 h-6 text-blue-600" /> {/* Adjusted icon size */}
              Community Blog
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5"> {/* Adjusted margin-left and padding */}
                {publicMemories.length} shared memories
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0"> {/* Removed default padding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicMemories.slice(0, 4).map((memory) => (
                <div key={memory.id} className="flex gap-3 p-4 bg-white/50 rounded-lg items-center border border-gray-100 hover:shadow-sm transition-shadow"> {/* Adjusted padding, added items-center, border and hover */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    {memory.type === "video" ? (
                      <Video className="w-7 h-7 text-gray-400" /> 
                    ) : (
                      <Camera className="w-7 h-7 text-gray-400" /> 
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base mb-1 truncate text-gray-800">{memory.title}</h4> {/* Adjusted text size and color */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{memory.description}</p> {/* Adjusted text size */}
                    <div className="flex items-center gap-3 text-sm text-gray-500"> {/* Adjusted gap and text size */}
                      <button
                        onClick={() => toggleLike(memory.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          memory.isLiked ? "text-pink-600" : "hover:text-pink-600" // Conditional class for pink heart
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={memory.isLiked ? "currentColor" : "none"} /> {/* Fill color conditionally */}
                        {memory.likes}
                      </button>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {memory.comments?.length || 0}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {publicMemories.length > 4 && (
              <div className="text-center mt-6"> {/* Adjusted margin-top */}
                <Button variant="outline" size="sm" className="px-6 py-2"> {/* Added padding */}
                  View All Shared Memories
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn"> {/* Adjusted opacity, added animate-fadeIn */}
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative"> {/* Adjusted max-width, added shadow, rounded-lg, relative */}
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b border-gray-200"> {/* Adjusted padding, added border-b */}
              <CardTitle className="text-2xl font-bold text-gray-800">{selectedMemory.title}</CardTitle> {/* Adjusted text size and color */}
              <Button size="icon" variant="ghost" onClick={() => setSelectedMemory(null)} className="absolute top-3 right-3 text-gray-500 hover:bg-gray-100"> {/* Adjusted position, size, and hover */}
                <X className="w-5 h-5" /> {/* Adjusted icon size */}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 p-6"> {/* Adjusted spacing and padding */}
              {selectedMemory.file && (
                <div className="w-full rounded-lg overflow-hidden border border-gray-200"> {/* Added border and rounded-lg */}
                  {selectedMemory.type === "video" ? (
                    <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-500">
                      <Video className="w-20 h-20 text-gray-400" /> {/* Adjusted icon size */}
                      <p className="ml-4 text-lg">Video preview not available</p> {/* Adjusted text size */}
                    </div>
                  ) : (
                    <Image
                      src={selectedMemory.file || "/placeholder.svg"}
                      alt={selectedMemory.title}
                      width={800} // Increased width for better detail
                      height={500} // Increased height for better detail
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2 text-gray-700 text-lg">Description</h4> {/* Adjusted text size and color */}
                <p className="text-gray-700 leading-relaxed">{selectedMemory.description}</p> {/* Adjusted text color and line height */}
              </div>

              {selectedMemory.tags && selectedMemory.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700 text-lg">Tags</h4> {/* Adjusted text size and color */}
                  <div className="flex flex-wrap gap-2">
                    {selectedMemory.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm bg-gray-100 text-gray-700"> {/* Adjusted padding, text size, and colors */}
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-5 border-t border-gray-200"> {/* Adjusted padding-top and border */}
                <span className="text-sm text-gray-500">{new Date(selectedMemory.date).toLocaleDateString('en-GB')}</span>
                <div className="flex items-center gap-5"> {/* Adjusted gap */}
                  <button
                    onClick={() => toggleLike(selectedMemory.id)}
                    className={`flex items-center gap-2 text-lg transition-colors ${
                      selectedMemory.isLiked ? "text-pink-600" : "text-gray-500 hover:text-pink-600" // Conditional class for pink heart
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={selectedMemory.isLiked ? "currentColor" : "none"} /> {/* Fill color conditionally */}
                    {selectedMemory.likes} likes
                  </button>
                  <div className="flex items-center gap-2 text-gray-500 text-lg"> {/* Adjusted text size */}
                    <MessageCircle className="w-5 h-5" /> {/* Adjusted icon size */}
                    {selectedMemory.comments?.length || 0} comments
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}