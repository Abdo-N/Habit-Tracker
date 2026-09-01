import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import HabitCard from "../components/HabitCard.jsx";

function HomePage() {
  const [habits, setHabits] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHabits() {
      try {
        const res = await api.get("/habits");
        setHabits(res.data);
      } catch (err) {
        console.error("Failed to fetch habits:", err);
        setError("Failed to load habits. Please try again.");
      }
    }
    fetchHabits();
  }, []);

  async function handleToggle(id) {
    try {
      const res = await api.post(`/habits/${id}/toggle`);
      setHabits(habits.map(h => h._id === id ? res.data : h));
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  }

  async function handleEdit(id, updatedHabit) {
    try {
      const res = await api.put(`/habits/${id}`, updatedHabit);
      setHabits(habits.map(h => h._id === id ? res.data : h));
    } catch (err) {
      console.error("Edit failed:", err);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await api.delete(`/habits/${id}`);
      setHabits(habits.filter(h => h._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  async function handleCreate() {
    try {
      const res = await api.post("/habits", { name, icon, color });
      setHabits([res.data, ...habits]);
      setIsAdding(false);
      setName(""); setIcon(""); setColor("");
    } catch (err) {
      console.error("Create failed:", err);
      setError("Failed to create habit. Please try again.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {isAdding && (
        <div className="card bg-base-100 shadow-sm p-4 flex flex-col gap-3 mb-3">
          <input type="text" placeholder="Habit Name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" />
          <input type="text" placeholder="Habit Icon" value={icon} onChange={(e) => setIcon(e.target.value)} className="input input-bordered w-full" />
          <input type="text" placeholder="Habit Color" value={color} onChange={(e) => setColor(e.target.value)} className="input input-bordered w-full" />
          <div className="flex gap-2">
            <button onClick={handleCreate} className="btn btn-active">Create</button>
            <button onClick={() => setIsAdding(false)} className="btn btn-active">Cancel</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsAdding(true)} className="btn btn-active">Add Habit</button>
    </div>
  );
}

export default HomePage;