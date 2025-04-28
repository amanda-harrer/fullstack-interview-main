export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function addInterval(
  date: Date,
  interval: string,
  amount: number,
): Date {
  const newDate = new Date(date);
  if (interval === "monthly") {
    newDate.setMonth(newDate.getMonth() + amount);
  } else if (interval === "yearly") {
    newDate.setMonth(newDate.getMonth() + amount * 12);
  } else if (interval === "weekly") {
    newDate.setDate(newDate.getDate() + amount * 7);
  }
  return newDate;
}
