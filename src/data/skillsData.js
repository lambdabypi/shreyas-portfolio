// src/data/skillsData.js (Fixed)

export const skills = [
	{ name: 'Python', level: 95, category: 'Programming' },
	{ name: 'JavaScript', level: 85, category: 'Programming' },
	{ name: 'SQL', level: 90, category: 'Programming' },
	{ name: 'React', level: 80, category: 'Programming' },
	{ name: 'Node.js', level: 75, category: 'Programming' },
	{ name: 'Machine Learning', level: 90, category: 'AI/ML' },
	{ name: 'TensorFlow', level: 85, category: 'AI/ML' },
	{ name: 'PyTorch', level: 80, category: 'AI/ML' },
	{ name: 'scikit-learn', level: 90, category: 'AI/ML' },
	{ name: 'NLP', level: 85, category: 'AI/ML' },
	{ name: 'Data Engineering', level: 90, category: 'Data' },
	{ name: 'Database Design', level: 85, category: 'Data' },
	{ name: 'AWS', level: 80, category: 'Cloud' },
	{ name: 'Docker', level: 85, category: 'Cloud' }
];

export const categories = ['Programming', 'AI/ML', 'Data', 'Cloud'];

export const categoryColors = {
	'Programming': 'from-blue-500 to-blue-400',
	'AI/ML': 'from-purple-500 to-purple-400',
	'Data': 'from-green-500 to-green-400',
	'Cloud': 'from-pink-500 to-pink-400'
};

export const categoryIcons = {
	'Programming': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
		</svg>
	),
	'AI/ML': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
		</svg>
	),
	'Data': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
		</svg>
	),
	'Cloud': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
		</svg>
	)
};

// Create a named export object
const skillsData = { skills, categories, categoryColors, categoryIcons };

export default skillsData;