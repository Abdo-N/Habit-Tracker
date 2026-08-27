import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import HabitCard from "../components/HabitCard.jsx";


function HomePage() {
  const [habits, setHabits] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    async function fetchHabits() {
      const res = await api.get("/habits");
      setHabits(res.data);
    }
    fetchHabits();
  }, []);

    async function handleToggle(id)
    {
        const res = await api.post(`/habits/${id}/toggle`);
        setHabits(habits.map(h => h._id === id ? res.data : h));
    }

    async function handleEdit(id, updatedHabit) {
        const res = await api.put(`/habits/${id}`, updatedHabit);
        setHabits(habits.map(h => h._id === id ? res.data : h));
    }

    async function handleDelete(id) {
        const res = await api.delete(`/habits/${id}`);
        setHabits(habits.filter(h => h._id !== id));
    }

    async function handleCreate() {
      const res = await api.post("/habits", { name, icon, color });
      setHabits([res.data, ...habits]);
      setIsAdding(false);
      setName(""); setIcon(""); setColor("");
  }

 return (
  <div>
    {isAdding && (
      <div>
        <input type="text" placeholder="Habit Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Habit Icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
        <input type="text" placeholder="Habit Color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button onClick={handleCreate}>Create</button>
      </div>
    )}

    {habits.map((habit) => (
      <HabitCard key={habit._id} habit={habit} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
    ))}

    <button onClick={() => setIsAdding(true)}>Add Habit</button>
  </div>
);
}



export default HomePage;