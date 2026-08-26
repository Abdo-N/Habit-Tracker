import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import HabitCard from "./components/HabitCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
export default App;