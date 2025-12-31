"use strict";
exports.__esModule = true;
exports.hasPassed = exports.isInWeek = exports.getWeekIdentifier = exports.isCurrentWeek = void 0;
/**
 * Check if a timestamp belongs to the current week
 * @param timestamp - Date string, timestamp, or Date object
 * @returns {boolean} - True if timestamp is in current week
 */
function isCurrentWeek(timestamp) {
    var now = new Date();
    var inputDate = new Date(timestamp);
    // Validate date
    if (isNaN(inputDate.getTime()))
        return false;
    var startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    var endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    return inputDate >= startOfWeek && inputDate <= endOfWeek;
}
exports.isCurrentWeek = isCurrentWeek;
/**
 * Get week identifier (YYYY-WWW) from timestamp
 * @param timestamp - Date string, timestamp, or Date object
 * @returns {string} - Week format like "2025-W08"
 */
function getWeekIdentifier(timestamp) {
    var date = new Date(timestamp);
    if (isNaN(date.getTime()))
        return "";
    var year = date.getFullYear();
    var weekNumber = Math.ceil(((date.getDate() + (date.getDay() === 0 ? -6 : date.getDay() - 1)) / 7));
    return year + "-W" + weekNumber.toString().padStart(2, '0');
}
exports.getWeekIdentifier = getWeekIdentifier;
/**
 * Check if timestamp belongs to specific week
 * @param timestamp - Date string, timestamp, or Date object
 * @param weekIdentifier - Week format like "2025-W08"
 * @returns {boolean}
 */
function isInWeek(timestamp, weekIdentifier) {
    var inputDate = new Date(timestamp);
    if (isNaN(inputDate.getTime()))
        return false;
    var targetWeek = getWeekIdentifier(inputDate);
    return targetWeek === weekIdentifier;
}
exports.isInWeek = isInWeek;
function hasPassed(timestamp) {
    var inputDate = new Date(timestamp);
    var now = new Date();
    // Validate date
    if (isNaN(inputDate.getTime()))
        return false;
    // Compare timestamps (now must be after input date)
    return now.getTime() > inputDate.getTime();
}
exports.hasPassed = hasPassed;
