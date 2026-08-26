import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import HabitCard from "../components/HabitCard.jsx";


function HomePage() {
  const [habits, setHabits] = useState([]);

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

  return (
    <div>
      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} onToggle={handleToggle} />
      ))}
    </div>
  );
}



export default HomePage;