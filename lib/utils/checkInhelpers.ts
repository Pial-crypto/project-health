/**
 * Check if a timestamp belongs to the current week
 * @param timestamp - Date string, timestamp, or Date object
 * @returns {boolean} - True if timestamp is in current week
 */
export function isCurrentWeek(timestamp: string | number | Date): boolean {
  const now = new Date();
  const inputDate = new Date(timestamp);
  
  // Validate date
  if (isNaN(inputDate.getTime())) return false;

 
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); 
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);

  return inputDate >= startOfWeek && inputDate <= endOfWeek;
}

/**
 * Get week identifier (YYYY-WWW) from timestamp
 * @param timestamp - Date string, timestamp, or Date object
 * @returns {string} - Week format like "2025-W08"
 */
export function getWeekIdentifier(timestamp: string | number | Date): string {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "";
  
  const year = date.getFullYear();
  const weekNumber = Math.ceil(((date.getDate() + (date.getDay() === 0 ? -6 : date.getDay() - 1)) / 7));
  
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

/**
 * Check if timestamp belongs to specific week
 * @param timestamp - Date string, timestamp, or Date object
 * @param weekIdentifier - Week format like "2025-W08"
 * @returns {boolean}
 */
export function isInWeek(timestamp: string | number | Date, weekIdentifier: string): boolean {
  const inputDate = new Date(timestamp);
  if (isNaN(inputDate.getTime())) return false;
  
  const targetWeek = getWeekIdentifier(inputDate);
  return targetWeek === weekIdentifier;
}

export function hasPassed(timestamp: string | number | Date) {
  const inputDate = new Date(timestamp);
  const now = new Date();
  
  // Validate date
  if (isNaN(inputDate.getTime())) return false;
  
  // Compare timestamps (now must be after input date)
  return now.getTime() > inputDate.getTime();
}