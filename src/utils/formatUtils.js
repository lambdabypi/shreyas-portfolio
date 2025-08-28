// src/utils/formatUtils.js

/**
 * Format a timestamp to a human-readable time
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} - Formatted time (e.g., "12:34 PM")
 */
export const formatTimestamp = (timestamp) => {
	try {
		return new Date(timestamp).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		});
	} catch (e) {
		console.error('Error formatting timestamp:', e);
		return '';
	}
};

/**
 * Format a date range for display
 * @param {string} startDate - Start date string
 * @param {string} endDate - End date string or "Present"
 * @returns {string} - Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
	if (!startDate) return '';

	if (!endDate || endDate.toLowerCase() === 'present') {
		return `${startDate} - Present`;
	}

	return `${startDate} - ${endDate}`;
};

/**
 * Truncate text to a specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
	if (!text || text.length <= maxLength) return text;

	return text.substring(0, maxLength) + '...';
};

/**
 * Calculate time elapsed since a given date
 * @param {string} dateString - Date string
 * @returns {string} - Human-readable time elapsed
 */
export const timeElapsed = (dateString) => {
	const date = new Date(dateString);
	const now = new Date();

	const seconds = Math.floor((now - date) / 1000);
	if (seconds < 60) return `${seconds} seconds ago`;

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

	const days = Math.floor(hours / 24);
	if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;

	const months = Math.floor(days / 30);
	if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;

	const years = Math.floor(months / 12);
	return `${years} year${years !== 1 ? 's' : ''} ago`;
};

export default {
	formatTimestamp,
	formatDateRange,
	truncateText,
	timeElapsed
};