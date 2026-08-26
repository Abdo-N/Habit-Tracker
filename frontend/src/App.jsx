import { useState, useEffect } from "react";
import api from "./lib/axios.js";


function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function fetchHabits() {
      const res = await api.get("/habits");
      setHabits(res.data);
    }
    fetchHabits();
  }, []);

  return (
    <div>
      {habits.map((habit) => (
        <p key={habit._id}>{habit.icon} {habit.name}</p>
      ))}
    </div>
  );
}

export default App;