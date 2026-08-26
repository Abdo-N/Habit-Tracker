const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {

    const today = new Date().toISOString().split("T")[0];
    const isCheckedToday = habit.completedDays.includes(today);

  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">

        {/*toggle button for habit*/}
        <input
        type="checkbox"
        checked={isCheckedToday}
        onChange={() => onToggle(habit._id)}
        className="checkbox bg-base-600 checked:bg-blue-500 checked:text-white rounded-full w-6 h-6 m-2"  
        />

        {/*edit button for habit*/}
        <input
        type="checkbox"
        checked={isCheckedToday}
        onChange={() => onEdit(habit._id)}
        className="checkbox"  
        />

        {/*delete button for habit*/}
        <button onClick={() => onDelete(habit._id)} className="btn btn-outline btn-error rounded-full">Delete</button>




      <div className="card-body">
        <h2 className="card-title">{habit.icon} {habit.name}</h2>
        {/* rest of the card */}
      </div>
    </div>
  );
};

export default HabitCard