"use client"

import { useState, useEffect } from "react";
import { Plus, Clock, Utensils, Baby, Edit, Trash2, Calendar, Save } from "lucide-react";
import Input from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Feedingtips from "../components/Feedingtips";

export default function Page() {
  const [schedules, setSchedules] = useState([]);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    time: "",
    type: "breast",
    amount: "",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("feedingSchedules");
    if (saved) setSchedules(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("feedingSchedules", JSON.stringify(schedules));
  }, [schedules]);

  const addSchedule = () => {
    if (newSchedule.time) {
      const item = {
        id: Date.now(),
        ...newSchedule,
        date: new Date().toISOString().split("T")[0],
      };
      setSchedules([...schedules, item]);
      setNewSchedule({ time: "", type: "breast", amount: "", notes: "" });
      setIsAddingSchedule(false);
    }
  };

  const updateSchedule = (id, updated) => {
    setSchedules(schedules.map((s) => (s.id === id ? { ...s, ...updated } : s)));
    setEditingSchedule(null);
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "breast": return Baby;
      case "bottle":
      case "solid": return Utensils;
      default: return Utensils;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "breast": return "bg-pink-400 text-pink-700";
      case "bottle": return "bg-blue-400 text-blue-700";
      case "solid": return "bg-green-400 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const todaySchedules = schedules.filter(s => s.date === today).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Feeding: Tips and Schedule</h2>
          <p className="text-gray-600">Know best feeding practices and track your baby's feeding times and amounts.</p>
        </div>
        <Button onClick={() => setIsAddingSchedule(true)} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Feeding
        </Button>
      </div>

      {(isAddingSchedule || editingSchedule) && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 mt-3 mb-10">
            <Utensils className="w-5 h-5 text-pink-400" />
            {editingSchedule ? "Edit Feeding" : "Add New Feeding"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <Input type="time" value={editingSchedule ? editingSchedule.time : newSchedule.time} onChange={(e) => {
                const value = e.target.value;
                editingSchedule
                  ? setEditingSchedule({ ...editingSchedule, time: value })
                  : setNewSchedule({ ...newSchedule, time: value });
              }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md" value={editingSchedule ? editingSchedule.type : newSchedule.type} onChange={(e) => {
                const value = e.target.value;
                editingSchedule
                  ? setEditingSchedule({ ...editingSchedule, type: value })
                  : setNewSchedule({ ...newSchedule, type: value });
              }}>
                <option value="breast">Breastfeeding</option>
                <option value="bottle">Bottle</option>
                <option value="solid">Solid Food</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <Input placeholder="e.g., 4 oz, 30 min, 1/2 cup" value={editingSchedule ? editingSchedule.amount : newSchedule.amount} onChange={(e) => {
                const value = e.target.value;
                editingSchedule
                  ? setEditingSchedule({ ...editingSchedule, amount: value })
                  : setNewSchedule({ ...newSchedule, amount: value });
              }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <Input placeholder="Optional notes" value={editingSchedule ? editingSchedule.notes : newSchedule.notes} onChange={(e) => {
                const value = e.target.value;
                editingSchedule
                  ? setEditingSchedule({ ...editingSchedule, notes: value })
                  : setNewSchedule({ ...newSchedule, notes: value });
              }} />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={editingSchedule ? () => updateSchedule(editingSchedule.id, editingSchedule) : addSchedule} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              <Save className="w-4 h-4 mr-2" /> {editingSchedule ? "Update" : "Add"} Feeding
            </Button>
            <Button onClick={() => {
              setIsAddingSchedule(false);
              setEditingSchedule(null);
              setNewSchedule({ time: "", type: "breast", amount: "", notes: "" });
            }} className="border border-gray-300">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-lg border p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          Today's Feeding Schedule
          <Badge>{todaySchedules.length} feedings</Badge>
        </h3>

        {todaySchedules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Utensils className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No feedings scheduled for today</p>
            <Button onClick={() => setIsAddingSchedule(true)} className="mt-4 border border-gray-300 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add First Feeding
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {todaySchedules.map((s) => {
              const Icon = getTypeIcon(s.type);
              return (
                <div key={s.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{s.time}</span>
                    </div>
                    <Badge className={getTypeColor(s.type)}>
                      <Icon className="w-3 h-3 mr-1" />
                      {s.type.charAt(0).toUpperCase() + s.type.slice(1)}
                    </Badge>
                    {s.amount && <span className="text-sm text-gray-600">{s.amount}</span>}
                    {s.notes && <span className="text-sm text-gray-500 italic">"{s.notes}"</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setEditingSchedule(s)} className="text-sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => deleteSchedule(s.id)} className="text-red-600 hover:text-red-700 text-sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}