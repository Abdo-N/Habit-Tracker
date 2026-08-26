const HabitCard = ({ habit, onToggle }) => {
    const today = new Date().toISOString().split("T")[0];
    const isCheckedToday = habit.completedDays.includes(today);
  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
        <input
        type="checkbox"
        checked={isCheckedToday}
        onChange={() => onToggle(habit._id)}
        className="checkbox border-indigo-600 bg-gray-200 checked:border-base-100 checked:bg-blue-500 checked:text-white rounded-full w-6 h-6 m-2"  
        />
      <div className="card-body">
        <h2 className="card-title">{habit.icon} {habit.name}</h2>
        {/* rest of the card */}
      </div>
    </div>
  );
};

export default HabitCard