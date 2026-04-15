// src/data/skillsData.js

export const skills = [
	// Languages
	{ name: 'Python',       level: 95, category: 'Languages',        icon: '🐍', color: 'from-yellow-400 to-amber-500' },
	{ name: 'JavaScript',   level: 85, category: 'Languages',        icon: '✨', color: 'from-yellow-300 to-yellow-500' },
	{ name: 'TypeScript',   level: 78, category: 'Languages',        icon: '📘', color: 'from-blue-400 to-blue-600',    isNew: true },
	{ name: 'SQL',          level: 90, category: 'Languages',        icon: '🗄️', color: 'from-slate-400 to-slate-500' },
	{ name: 'Node.js',      level: 75, category: 'Languages',        icon: '💚', color: 'from-green-400 to-green-600' },

	// AI / LLMs
	{ name: 'Machine Learning',     level: 90, category: 'AI / LLMs', icon: '🧠', color: 'from-purple-400 to-purple-600' },
	{ name: 'LangGraph / LangChain',level: 87, category: 'AI / LLMs', icon: '🕸️', color: 'from-violet-500 to-purple-700', isNew: true },
	{ name: 'NLP',                  level: 85, category: 'AI / LLMs', icon: '💬', color: 'from-indigo-400 to-indigo-600' },
	{ name: 'PyTorch',              level: 80, category: 'AI / LLMs', icon: '🔥', color: 'from-orange-500 to-red-500' },

	// Frameworks & APIs
	{ name: 'React',        level: 82, category: 'Frameworks & APIs', icon: '⚛️', color: 'from-cyan-400 to-cyan-600' },
	{ name: 'React Native', level: 78, category: 'Frameworks & APIs', icon: '📱', color: 'from-blue-300 to-blue-500', isNew: true },
	{ name: 'FastAPI',      level: 90, category: 'Frameworks & APIs', icon: '⚡', color: 'from-teal-400 to-teal-600', isNew: true },
	{ name: 'Express.js',   level: 80, category: 'Frameworks & APIs', icon: '🔗', color: 'from-gray-400 to-gray-500' },

	// Data & Cloud
	{ name: 'PostgreSQL', level: 88, category: 'Data & Cloud', icon: '🐘', color: 'from-blue-500 to-blue-700',   isNew: true },
	{ name: 'AWS',        level: 80, category: 'Data & Cloud', icon: '☁️', color: 'from-orange-400 to-amber-500' },
	{ name: 'GCP',        level: 80, category: 'Data & Cloud', icon: '🌍', color: 'from-blue-400 to-cyan-500',   isNew: true },
	{ name: 'Docker',     level: 85, category: 'Data & Cloud', icon: '🐳', color: 'from-sky-400 to-sky-600' },
];

export const categories = ['Languages', 'AI / LLMs', 'Frameworks & APIs', 'Data & Cloud'];

export const categoryColors = {
	'Languages':        'from-blue-500 to-blue-400',
	'AI / LLMs':        'from-purple-500 to-purple-400',
	'Frameworks & APIs':'from-teal-500 to-cyan-400',
	'Data & Cloud':     'from-emerald-500 to-green-400',
};

export const categoryIcons = {
	'Languages': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
		</svg>
	),
	'AI / LLMs': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zM9 9h6M9 13h4" />
		</svg>
	),
	'Frameworks & APIs': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
		</svg>
	),
	'Data & Cloud': (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
		</svg>
	),
};

const skillsData = { skills, categories, categoryColors, categoryIcons };
export default skillsData;
