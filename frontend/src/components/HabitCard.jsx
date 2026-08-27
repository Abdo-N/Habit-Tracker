import React, { useState } from "react";
import {getCurrentStreak, getLastYearDates, getBestStreak} from "../lib/utils.js";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Purely presentational: groups the flat date list into Sun-Sat columns so the
// heatmap can be drawn as a calendar grid, without touching the date logic in lib/utils.js.
function buildWeeks(dates) {
  const weeks = [];
  let week = [];
  dates.forEach((date, idx) => {
    const day = new Date(`${date}T00:00:00`).getDay();
    if (idx === 0) {
      for (let i = 0; i < day; i++) week.push(null);
    }
    week.push(date);
    if (day === 6 || idx === dates.length - 1) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
      week = [];
    }
  });
  return weeks;
}

function buildMonthLabels(weeks) {
  let lastMonth = -1;
  return weeks.map((week) => {
    const firstDate = week.find((d) => d !== null);
    if (!firstDate) return "";
    const month = new Date(`${firstDate}T00:00:00`).getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTH_LABELS[month];
    }
    return "";
  });
}

const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {

    const today = new Date().toISOString().split("T")[0];
    const isCheckedToday = habit.completedDays.includes(today);
    const dates = getLastYearDates();
    const currentStreak = getCurrentStreak(habit.completedDays);
    const bestStreak = getBestStreak(habit.completedDays);
    const weeks = buildWeeks(dates);
    const monthLabels = buildMonthLabels(weeks);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(habit.name);
    const [icon, setIcon] = useState(habit.icon);
    const [color, setColor] = useState(habit.color);


  return isEditing ? (
        <div className="card w-full bg-base-100 card-md shadow-sm">
          <div className="card-body flex flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="input input-bordered w-full"
            />

            <div className="flex gap-2">
              {/*save button*/}
              <button onClick={() => {
                onEdit(habit._id, { name, icon, color });
                setIsEditing(false);
              }} className="btn btn-outline btn-info btn-sm rounded-full">Save</button>

              {/*cancel button*/}
              <button onClick={() => {
                setName(habit.name);
                setIcon(habit.icon);
                setColor(habit.color);
                setIsEditing(false);
              }} className="btn btn-outline btn-info btn-sm rounded-full">Cancel</button>
            </div>
          </div>
        </div>

      ) :
      (
        <div className="card w-full bg-base-100 card-md shadow-sm relative">
        <div className="card-body gap-3">

          {/* Edit/delete icon actions */}
          <div className="absolute top-4 right-4 flex gap-1">
            <button onClick={() => setIsEditing(!isEditing)} className="btn btn-ghost btn-xs btn-circle" title="Edit">✎</button>
            <button onClick={() => onDelete(habit._id)} className="btn btn-ghost btn-xs btn-circle" title="Delete">✕</button>
          </div>

          {/* Header: toggle, icon, name, streak badges */}
          <div className="flex items-center gap-3">
            {/*toggle button for habit*/}
            <input
            type="checkbox"
            checked={isCheckedToday}
            onChange={() => onToggle(habit._id)}
            className="checkbox checked:bg-blue-500 checked:text-white rounded-full w-8 h-8 shrink-0"
            />
            <span className="text-xl">{habit.icon}</span>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold leading-none">{habit.name}</h2>
              <div className="flex gap-2 mt-1">
                <span className={`badge badge-sm ${currentStreak > 0 ? "badge-info" : "badge-warning"}`}>
                  {currentStreak > 0 ? `${currentStreak}-day streak` : "No streak"}
                </span>
                <span className="badge badge-sm badge-neutral">Best: {bestStreak}</span>
              </div>
            </div>
          </div>

          {/* Calendar heatmap */}
          <div className="overflow-x-auto pt-2">
            <div className="flex gap-0.75 pl-9">
              {weeks.map((_, wi) => (
                <div key={wi} className="text-[10px] text-base-content/50" style={{ width: "13px" }}>
                  {monthLabels[wi]}
                </div>
              ))}
            </div>
            <div className="flex gap-0.75">
              <div className="flex flex-col gap-0.75 w-9 pr-1 shrink-0">
                {WEEKDAY_LABELS.map(label => (
                  <div key={label} className="text-[10px] text-base-content/50 leading-none" style={{ height: "13px" }}>{label}</div>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.75">
                  {week.map((date, di) => date ? (
                    <div
                      key={date}
                      className="rounded-sm"
                      style={{ backgroundColor: habit.completedDays.includes(date) ? habit.color : "#27272a", width: "13px", height: "13px" }}
                      title={date}
                    ></div>
                  ) : (
                    <div key={di} style={{ width: "13px", height: "13px" }}></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default HabitCard