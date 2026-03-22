export function formatHours(hours) {
  if (Array.isArray(hours)) return hours;
  const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayNames = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };
  return dayOrder
    .filter((d) => hours[d])
    .map((d) => ({ day: dayNames[d], time: hours[d] }));
}
