export function getLastYearDates() {
  const dates = [];
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates.reverse();
}

export function getCurrentStreak(completedDays) {
  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const dateStr = currentDate.toISOString().split("T")[0];
    if (completedDays.includes(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getBestStreak(completedDays) {
  let Beststreak = 0;
  let currentStreak = 0;
  let earliestDate = completedDays.length > 0 ? new Date([...completedDays].sort()[0]) : new Date();
  let currentDate = new Date();

  while (currentDate >= earliestDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    if (completedDays.includes(dateStr)) {
      currentStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
        currentStreak = 0;
        currentDate.setDate(currentDate.getDate() - 1);
    }
     if (currentStreak > Beststreak) {
            Beststreak = currentStreak;
        }
  }

  return Beststreak;
}