import React, { useState } from "react";


const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {

    const today = new Date().toISOString().split("T")[0];
    const isCheckedToday = habit.completedDays.includes(today);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(habit.name);
    const [icon, setIcon] = useState(habit.icon);
    const [color, setColor] = useState(habit.color);

  return isEditing ? (
        <div>
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />

            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            {/*save button*/}
            <button onClick={() => {
              onEdit(habit._id, { name, icon, color });
              setIsEditing(false);
            }} className="btn btn-outline btn-info rounded-full">Save</button>

            {/*cancel button*/}
            <button onClick={() => {
              setName(habit.name);
              setIcon(habit.icon);
              setColor(habit.color);
              setIsEditing(false);
            }} className="btn btn-outline btn-info rounded-full">Cancel</button>
        </div>
        
      ) : 
      (
        <div className="card w-96 bg-base-100 card-md shadow-sm">

        {/*toggle button for habit*/}
        <input
        type="checkbox"
        checked={isCheckedToday}
        onChange={() => onToggle(habit._id)}
        className="checkbox bg-base-600 checked:bg-blue-500 checked:text-white rounded-full w-6 h-6 m-2"  
        />

        {/*edit button for habit*/}
        <button onClick={() => setIsEditing(!isEditing)} className="btn btn-outline btn-info rounded-full">Edit</button>

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