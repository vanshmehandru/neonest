"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import ImportantContacts from "../components/ImportantContacts ";
import Badge from "../components/ui/Badge";
import {
  Plus,
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  FileText,
  Edit,
  Trash2,
  Bell,
  Save,
} from "lucide-react"

const standardVaccines = [
  { name: "Hepatitis B", ageMonths: 0, description: "First dose at birth" },
  { name: "Hepatitis B", ageMonths: 1, description: "Second dose" },
  { name: "DTaP", ageMonths: 2, description: "Diphtheria, Tetanus, Pertussis" },
  { name: "Hib", ageMonths: 2, description: "Haemophilus influenzae type b" },
  { name: "PCV", ageMonths: 2, description: "Pneumococcal conjugate" },
  { name: "IPV", ageMonths: 2, description: "Inactivated poliovirus" },
  { name: "Rotavirus", ageMonths: 2, description: "Oral rotavirus vaccine" },
  { name: "DTaP", ageMonths: 4, description: "Second dose" },
  { name: "Hib", ageMonths: 4, description: "Second dose" },
  { name: "PCV", ageMonths: 4, description: "Second dose" },
  { name: "IPV", ageMonths: 4, description: "Second dose" },
  { name: "Rotavirus", ageMonths: 4, description: "Second dose" },
  { name: "Hepatitis B", ageMonths: 6, description: "Third dose" },
  { name: "DTaP", ageMonths: 6, description: "Third dose" },
  { name: "Hib", ageMonths: 6, description: "Third dose" },
  { name: "PCV", ageMonths: 6, description: "Third dose" },
  { name: "IPV", ageMonths: 6, description: "Third dose" },
  { name: "Rotavirus", ageMonths: 6, description: "Third dose" },
  { name: "Influenza", ageMonths: 6, description: "Annual flu vaccine" },
  { name: "MMR", ageMonths: 12, description: "Measles, Mumps, Rubella" },
  { name: "Varicella", ageMonths: 12, description: "Chickenpox vaccine" },
  { name: "Hepatitis A", ageMonths: 12, description: "First dose" },
]

export default function VaccineTracker() {
  const [vaccines, setVaccines] = useState([])
  const [babyBirthDate, setBabyBirthDate] = useState("")
  const [isAddingVaccine, setIsAddingVaccine] = useState(false)
  const [editingVaccine, setEditingVaccine] = useState(null)
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    scheduledDate: "",
    completedDate: "",
    status: "scheduled",
    notes: "",
    document: null,
  })

  useEffect(() => {
    const savedVaccines = localStorage.getItem("babyVaccines")
    const savedBirthDate = localStorage.getItem("babyBirthDate")

    if (savedVaccines) {
      setVaccines(JSON.parse(savedVaccines))
    } else {
      if (savedBirthDate) {
        initializeStandardSchedule(savedBirthDate)
      }
    }

    if (savedBirthDate) {
      setBabyBirthDate(savedBirthDate)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("babyVaccines", JSON.stringify(vaccines))
  }, [vaccines])

  useEffect(() => {
    if (babyBirthDate) {
      localStorage.setItem("babyBirthDate", babyBirthDate)
    }
  }, [babyBirthDate])

  const initializeStandardSchedule = (birthDate) => {
    const birth = new Date(birthDate)
    const standardSchedule = standardVaccines.map((vaccine, index) => {
      const scheduledDate = new Date(birth)
      scheduledDate.setMonth(scheduledDate.getMonth() + vaccine.ageMonths)

      return {
        id: Date.now() + index,
        name: vaccine.name,
        description: vaccine.description,
        scheduledDate: scheduledDate.toISOString().split("T")[0],
        completedDate: "",
        status: "scheduled",
        notes: "",
        document: null,
        ageMonths: vaccine.ageMonths,
      }
    })
    setVaccines(standardSchedule)
  }

  const addVaccine = () => {
    if (newVaccine.name && newVaccine.scheduledDate) {
      const vaccine = {
        id: Date.now(),
        ...newVaccine,
      }
      setVaccines([...vaccines, vaccine])
      setNewVaccine({ name: "", scheduledDate: "", completedDate: "", status: "scheduled", notes: "", document: null })
      setIsAddingVaccine(false)
    }
  }

  const updateVaccine = (id, updatedVaccine) => {
    setVaccines(vaccines.map((vaccine) => (vaccine.id === id ? { ...vaccine, ...updatedVaccine } : vaccine)))
    setEditingVaccine(null)
  }

  const deleteVaccine = (id) => {
    setVaccines(vaccines.filter((vaccine) => vaccine.id !== id))
  }

  const markAsCompleted = (id, completedDate = new Date().toISOString().split("T")[0]) => {
    setVaccines(
      vaccines.map((vaccine) =>
        vaccine.id === id
          ? {
              ...vaccine,
              status: "completed",
              completedDate: completedDate,
            }
          : vaccine,
      ),
    )
  }

  const getVaccineStatus = (vaccine) => {
    const today = new Date()
    const scheduled = new Date(vaccine.scheduledDate)
    const daysDiff = Math.ceil((scheduled - today) / (1000 * 60 * 60 * 24))

    if (vaccine.status === "completed") {
      return { status: "completed", color: "bg-green-400 text-green-700", text: "Completed", icon: CheckCircle }
    } else if (daysDiff < 0) {
      return { status: "overdue", color: "bg-red-400 text-red-700", text: "Overdue", icon: AlertTriangle }
    } else if (daysDiff <= 7) {
      return { status: "due", color: "bg-yellow-400 text-yellow-700", text: "Due Soon", icon: Bell }
    } else {
      return { status: "scheduled", color: "bg-blue-400 text-blue-700", text: "Scheduled", icon: Clock }
    }
  }

  const handleFileUpload = (e, vaccineId = null) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (vaccineId) {
          setVaccines(
            vaccines.map((vaccine) =>
              vaccine.id === vaccineId ? { ...vaccine, document: event.target.result } : vaccine,
            ),
          )
        } else if (editingVaccine) {
          setEditingVaccine({ ...editingVaccine, document: event.target.result })
        } else {
          setNewVaccine({ ...newVaccine, document: event.target.result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const upcomingVaccines = vaccines
    .filter((vaccine) => vaccine.status !== "completed")
    .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
    .slice(0, 3)

  const overdueVaccines = vaccines.filter((vaccine) => {
    const today = new Date()
    const scheduled = new Date(vaccine.scheduledDate)
    return vaccine.status !== "completed" && scheduled < today
  })

  return (
    <div className="p-6 space-y-6"> 
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Medical Records: Vaccines & Important Contacts</h2> 
          <p className="text-gray-600">Keep track of your baby's vaccination schedule and essential medical contacts for quick access.</p> {/* Updated description */}
        </div>
        <Button
          onClick={() => setIsAddingVaccine(true)}
          className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vaccine
        </Button>
      </div>

      {/* Baby Birth Date Setup */}
      {!babyBirthDate && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Set Baby's Birth Date
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Enter your baby's birth date to automatically generate the standard vaccination schedule.
            </p>
            <div className="flex gap-4">
              <Input
                type="date"
                value={babyBirthDate}
                onChange={(e) => setBabyBirthDate(e.target.value)}
                className="max-w-xs"
              />
              <Button
                onClick={() => initializeStandardSchedule(babyBirthDate)}
                disabled={!babyBirthDate}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Generate Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts */}
      {overdueVaccines.length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">Overdue Vaccines ({overdueVaccines.length})</span>
            </div>
            <div className="space-y-2">
              {overdueVaccines.map((vaccine) => (
                <div key={vaccine.id} className="flex items-center justify-between p-2 bg-white/50 rounded">
                  <span>
                    {vaccine.name} - {vaccine.description}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600">
                      Due: {new Date(vaccine.scheduledDate).toLocaleDateString()}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => markAsCompleted(vaccine.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark Complete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Vaccines */}
      {upcomingVaccines.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Upcoming Vaccines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingVaccines.map((vaccine) => {
                const status = getVaccineStatus(vaccine)
                return (
                  <div key={vaccine.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <status.icon
                        className={`w-5 h-5 ${
                          status.status === "completed"
                            ? "text-green-600"
                            : status.status === "overdue"
                              ? "text-red-600"
                              : status.status === "due"
                                ? "text-yellow-600"
                                : "text-blue-600"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium">{vaccine.name}</h4>
                        <p className="text-sm text-gray-600">{vaccine.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={status.color}>{status.text}</Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(vaccine.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Vaccine Form */}
      {(isAddingVaccine || editingVaccine) && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              {editingVaccine ? "Edit Vaccine" : "Add New Vaccine"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vaccine Name</label>
                <Input
                  placeholder="e.g., DTaP"
                  value={editingVaccine ? editingVaccine.name : newVaccine.name}
                  onChange={(e) => {
                    if (editingVaccine) {
                      setEditingVaccine({ ...editingVaccine, name: e.target.value })
                    } else {
                      setNewVaccine({ ...newVaccine, name: e.target.value })
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editingVaccine ? editingVaccine.status : newVaccine.status}
                  onChange={(e) => {
                    if (editingVaccine) {
                      setEditingVaccine({ ...editingVaccine, status: e.target.value })
                    } else {
                      setNewVaccine({ ...newVaccine, status: e.target.value })
                    }
                  }}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Scheduled Date</label>
                <Input
                  type="date"
                  value={editingVaccine ? editingVaccine.scheduledDate : newVaccine.scheduledDate}
                  onChange={(e) => {
                    if (editingVaccine) {
                      setEditingVaccine({ ...editingVaccine, scheduledDate: e.target.value })
                    } else {
                      setNewVaccine({ ...newVaccine, scheduledDate: e.target.value })
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Completed Date</label>
                <Input
                  type="date"
                  value={editingVaccine ? editingVaccine.completedDate : newVaccine.completedDate}
                  onChange={(e) => {
                    if (editingVaccine) {
                      setEditingVaccine({ ...editingVaccine, completedDate: e.target.value })
                    } else {
                      setNewVaccine({ ...newVaccine, completedDate: e.target.value })
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Any additional notes..."
                value={editingVaccine ? editingVaccine.notes : newVaccine.notes}
                onChange={(e) => {
                  if (editingVaccine) {
                    setEditingVaccine({ ...editingVaccine, notes: e.target.value })
                  } else {
                    setNewVaccine({ ...newVaccine, notes: e.target.value })
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload Document</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e)}
                  className="hidden"
                  id="vaccine-document"
                />
                <label
                  htmlFor="vaccine-document"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </label>
                {(editingVaccine?.document || newVaccine.document) && (
                  <span className="text-sm text-green-600">Document uploaded ✓</span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={editingVaccine ? () => updateVaccine(editingVaccine.id, editingVaccine) : addVaccine}
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingVaccine ? "Update" : "Add"} Vaccine
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingVaccine(false)
                  setEditingVaccine(null)
                  setNewVaccine({
                    name: "",
                    scheduledDate: "",
                    completedDate: "",
                    status: "scheduled",
                    notes: "",
                    document: null,
                  })
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vaccine List */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Vaccination Record
            <Badge variant="secondary">
              {vaccines.filter((v) => v.status === "completed").length} / {vaccines.length} completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {vaccines.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No vaccines recorded yet</p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white mt-4" // Added text-white here
                onClick={() => setIsAddingVaccine(true)}
              >
                Add First Vaccine
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {vaccines
                .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
                .map((vaccine) => {
                  const status = getVaccineStatus(vaccine)
                  return (
                    <div
                      key={vaccine.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <status.icon
                          className={`w-5 h-5 ${
                            status.status === "completed"
                              ? "text-green-600"
                              : status.status === "overdue"
                                ? "text-red-600"
                                : status.status === "due"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                          }`}
                        />
                        <div>
                          <h4 className="font-medium">{vaccine.name}</h4>
                          <p className="text-sm text-gray-600">{vaccine.description}</p>
                          {vaccine.notes && <p className="text-sm text-gray-500 italic">"{vaccine.notes}"</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge className={status.color}>{status.text}</Badge>
                          <p className="text-sm text-gray-500 mt-1">
                            Scheduled: {new Date(vaccine.scheduledDate).toLocaleDateString()}
                          </p>
                          {vaccine.completedDate && (
                            <p className="text-sm text-green-600">
                              Completed: {new Date(vaccine.completedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {vaccine.document && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                console.log("Download document for", vaccine.name)
                              }}
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                          )}

                          {vaccine.status !== "completed" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsCompleted(vaccine.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}

                          <Button size="sm" variant="ghost" onClick={() => setEditingVaccine(vaccine)}>
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteVaccine(vaccine.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-2xl font-bold text-green-700">
                  {vaccines.filter((v) => v.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-700">
                  {vaccines.filter((v) => v.status === "scheduled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {
                    vaccines.filter((v) => {
                      const today = new Date()
                      const scheduled = new Date(v.scheduledDate)
                      const daysDiff = Math.ceil((scheduled - today) / (1000 * 60 * 60 * 24))
                      return v.status !== "completed" && daysDiff <= 7 && daysDiff >= 0
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-red-600">Overdue</p>
                <p className="text-2xl font-bold text-red-700">{overdueVaccines.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Contacts */}
      <div>
        <hr className="my-10 border-t-2 border-gray-200" />
        <ImportantContacts />
      </div>

      {/* Information about health and safety */}
      <div className="text-center text-gray-500 text-sm mt-8">
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
  )
}