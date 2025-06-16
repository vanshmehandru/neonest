"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
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
} from "lucide-react";
function getVaccineStatus(vaccine) {
  const today = new Date();
  const scheduledDate = new Date(vaccine.scheduledDate);

  if (vaccine.status === "completed") {
    return {
      status: "completed",
      text: "Completed",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    };
  }

  if (scheduledDate < today) {
    return {
      status: "overdue",
      text: "Overdue",
      color: "bg-red-100 text-red-800",
      icon: AlertTriangle,
    };
  }

  if (scheduledDate.toDateString() === today.toDateString()) {
    return {
      status: "due",
      text: "Due Today",
      color: "bg-yellow-100 text-yellow-800",
      icon: Bell,
    };
  }

  return {
    status: "upcoming",
    text: "Upcoming",
    color: "bg-blue-100 text-blue-800",
    icon: Calendar,
  };
}

export default function VaccineTracker({ babyId }) {
  const [vaccines, setVaccines] = useState([]);
  const [babyBirthDate, setBabyBirthDate] = useState("");
  const [isAddingVaccine, setIsAddingVaccine] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  const [standardVaccines, setStandardVaccines] = useState([]);
  const [age, setAge] = useState(null);
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    scheduledDate: "",
    completedDate: "",
    status: "scheduled",
    notes: "",
  });

  const getAuthToken = () => localStorage.getItem("token");

  useEffect(() => {
      fetchVaccines();
      fetchStandardVacc();
  }, []);

  const fetchVaccines = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vaccine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVaccines(res.data);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
    }
  };

  const fetchStandardVacc = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/standardVaccine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setStandardVaccines(res.data.dueVaccines);
      setAge(res.data.ageInMonths);
    } catch (error) {
      console.error("Error fetching baby birth date:", error);
    }
  };

  const initializeStandardSchedule = async () => {
    try {
      const token = getAuthToken();
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/vaccine`,
        { babyId, birthDate: babyBirthDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchVaccines();
    } catch (error) {
      console.error("Error initializing schedule:", error);
    }
  };

  const addVaccine = async () => {
    try {
      const token = getAuthToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/vaccine`,
        { ...newVaccine, babyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAddingVaccine(false);
      setNewVaccine({
        name: "",
        scheduledDate: "",
        completedDate: "",
        status: "scheduled",
        notes: "",
      });
      fetchVaccines();
    } catch (error) {
      console.error("Error adding vaccine:", error);
    }
  };

  const updateVaccine = async () => {
    try {
      const token = getAuthToken();
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/vaccine`,
        {
          ...editingVaccine,
          vaccineId: editingVaccine._id,
          birthDate : babyBirthDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingVaccine(null);
      fetchVaccines();
    } catch (error) {
      console.error("Error updating vaccine:", error);
    }
  };

  const deleteVaccine = async (vaccineId) => {
    try {
      const token = getAuthToken();
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/vaccine?id=${vaccineId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { babyId },
        }
      );
      fetchVaccines();
    } catch (error) {
      console.error("Error deleting vaccine:", error);
    }
  };

const markAsCompleted = async (vaccineId) => {
  try {
    const token = getAuthToken();
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vaccine/${vaccineId}/complete`,
      {
        completedDate: new Date().toISOString().split("T")[0],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchVaccines(); // Refresh the vaccine list
  } catch (error) {
    console.error("Error marking vaccine as completed:", error);
  }
};


  const overdueVaccines = vaccines.filter((v) => {
    const today = new Date();
    const scheduled = new Date(v.scheduledDate);
    return v.status !== "completed" && scheduled < today;
  });

  const upcomingVaccines = vaccines
    .filter((v) => v.status !== "completed")
    .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header and Add Vaccine Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Vaccine Tracker</h2>
          <p className="text-gray-600">Track your baby's vaccination schedule</p>
        </div>
        <Button onClick={() => setIsAddingVaccine(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Vaccine
        </Button>
      </div>


      {/* Alerts Section */}
      {overdueVaccines.length > 0 && (
        <Card className="border-red-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">
                Overdue Vaccines ({overdueVaccines.length})
              </span>
            </div>
            <div className="space-y-2">
              {overdueVaccines.map((vaccine) => (
                <div key={vaccine._id} className="flex items-center justify-between p-2 rounded">
                  <span>
                    {vaccine.name} - {vaccine.description}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => markAsCompleted(vaccine._id)}
                  >
                    Mark Complete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Vaccines */}
      {upcomingVaccines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Upcoming Vaccines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingVaccines.map((vaccine) => {
                const status = getVaccineStatus(vaccine);
                return (
                  <div key={vaccine._id} className="flex items-center justify-between p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <status.icon className={`w-5 h-5 ${status.status === "completed" ? "text-green-600" : status.status === "overdue" ? "text-red-600" : status.status === "due" ? "text-yellow-600" : "text-blue-600"}`} />
                      <div>
                        <h4 className="font-medium">{vaccine.name}</h4>
                        <p className="text-sm text-gray-600">{vaccine.description}</p>
                      </div>
                    </div>
                    <Badge className={status.color}>{status.text}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Vaccine Form */}
      {(isAddingVaccine || editingVaccine) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {editingVaccine ? "Edit Vaccine" : "Add New Vaccine"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vaccine Name</label>
                <Input
                  value={editingVaccine?.name || newVaccine.name}
                  onChange={(e) => editingVaccine 
                    ? setEditingVaccine({...editingVaccine, name: e.target.value})
                    : setNewVaccine({...newVaccine, name: e.target.value})
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Scheduled Date</label>
                <Input
                  type="date"
                  value={editingVaccine?.scheduledDate || newVaccine.scheduledDate}
                  onChange={(e) => editingVaccine
                    ? setEditingVaccine({...editingVaccine, scheduledDate: e.target.value})
                    : setNewVaccine({...newVaccine, scheduledDate: e.target.value})
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                className="w-full p-2 border rounded-md h-20"
                value={editingVaccine?.notes || newVaccine.notes}
                onChange={(e) => editingVaccine
                  ? setEditingVaccine({...editingVaccine, notes: e.target.value})
                  : setNewVaccine({...newVaccine, notes: e.target.value})
                }
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={editingVaccine ? updateVaccine : addVaccine}>
                <Save className="w-4 h-4 mr-2" />
                {editingVaccine ? "Update" : "Add"} Vaccine
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAddingVaccine(false);
                setEditingVaccine(null);
                setNewVaccine({
                  name: "",
                  scheduledDate: "",
                  completedDate: "",
                  status: "scheduled",
                  notes: "",
                });
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full Vaccine List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Vaccination Record
            <Badge variant="secondary">
              {vaccines.filter(v => v.status === "completed").length} / {vaccines.length} completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {vaccines.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No vaccines recorded yet</p>
              <Button onClick={() => setIsAddingVaccine(true)} className="mt-4">
                Add First Vaccine
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {vaccines
                .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
                .map((vaccine) => {
                  const status = getVaccineStatus(vaccine);
                  return (
                    <div key={vaccine._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <status.icon className={`w-5 h-5 ${status.status === "completed" ? "text-green-600" : status.status === "overdue" ? "text-red-600" : status.status === "due" ? "text-yellow-600" : "text-blue-600"}`} />
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
                          {vaccine.status !== "completed" && (
                            <Button
                              variant="ghost"
                              onClick={() => markAsCompleted(vaccine._id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            onClick={() => setEditingVaccine(vaccine)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => deleteVaccine(vaccine._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="w-full mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-2">Standard Vaccine Schedule</h2>
      {age !== null && (
        <p className="mb-4 text-gray-600">Child's age: <strong>{age} months</strong></p>
      )}

      {standardVaccines?.length > 0 ? (
        <ul className="space-y-3">
          {standardVaccines.map((v, i) => (
            <li key={i} className="bg-gray-100 p-3 rounded shadow-sm">
              <div className="font-bold text-blue-700">{v.name}</div>
              <div className="text-sm text-gray-700">{v.description}</div>
              <div className="text-xs text-gray-500">At {v.ageMonths} months</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No due vaccines found</p>
      )}
    </div>

<ImportantContacts/>

    </div>
  );
}