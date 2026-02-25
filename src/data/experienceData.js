// src/data/experienceData.js (Fixed)

export const experiences = [
	{
		title: 'AI/ML Engineer',
		company: 'Vivytech',
		location: 'Boston, USA',
		period: 'May 2024 - Present',
		description: [
			'Architected financial platform using REST API, JWT authentication, and 2FA via TOTP on AWS EC2 to establish secure bank connectivity, delivering highly secure operations with personalized financial analytics.',
			'Developed financial analysis engine using Cohere-powered AI with specialized prompt engineering and Plaid API integration to create complete credential management system, enabling real-time transaction updates and tailored strategies.',
			'Engineered technical infrastructure with React dashboard and GDPR-compliant data management by implementing interactive visualizations and role-based access control, improving user experience while ensuring regulatory compliance.'
		],
		skills: ['REST API', 'JWT', '2FA', 'AWS EC2', 'Cohere AI', 'Plaid API', 'React', 'GDPR']
	},
	{
		title: 'AI/ML Engineer',
		company: 'Intelligent DataWorks',
		location: 'Boston, USA',
		period: 'Jan 2025 - Aug-2025',
		description: [
			'Architected HR management platform integrating job operations, applicant tracking, applicant management, jobs management using REST API, FastAPI, and PostgreSQL with Pydantic, improving system architecture by 30%.',
			'Engineered authentication framework with JWT tokens, bcrypt password hashing, and AWS SES for email verification to implement persistent sessions and role-based access control, enhancing security while improving user experience.',
			'Developed HR workflows in Python, Streamlit and PostgreSQL by creating interactive dashboards and implementing AI algorithms to enable data-driven hiring decisions and automated candidate evaluation.'
		],
		skills: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'AWS SES', 'Streamlit', 'AI Algorithms']
	},
	{
		title: 'AI/ML Engineer',
		company: 'Chipmonk Technologies Pvt. Ltd.',
		location: 'Bangalore, India',
		period: 'Sept 2022 - Aug 2023',
		description: [
			'Engineered machine-learning model using linear regression to detect tolerance lines from video feeds, enhancing real-time tracking precision by 30% and streamlining construction data analysis by 35%.',
			'Constructed MySQL database for storing coordinate data and construction metrics by designing efficient data schemas, improving processing time by 25% and facilitating accurate multi-site project tracking.',
			'Built CICD pipeline with TeamCity to automate and analyze testing processes, increasing developer productivity by 30% while ensuring consistent software quality across deployments.'
		],
		skills: ['Machine Learning', 'Linear Regression', 'Video Analysis', 'MySQL', 'TeamCity', 'CICD']
	}
];

export const education = [
	{
		degree: 'MS in Data Analytics Engineering',
		institution: 'Northeastern University',
		location: 'Boston, USA',
		period: 'Sept 2023 - Dec 2025',
		courses: ['Data Management for Analytics', 'Foundations of Data for Analytics', 'Data Mining for Engineering', 'Computation and Visualization for Analytics', 'Natural Language Processing', 'Mixed Reality']
	},
	{
		degree: 'BE in Artificial Intelligence and Machine Learning',
		institution: 'BMSIT&M',
		location: 'Bangalore, India',
		period: 'Aug 2019 - May 2023',
		courses: ['Probability and Statistics', 'Database Management', 'Neural Networks', 'Machine Learning', 'Artificial Intelligence', 'Natural Language Processing', 'Deep Learning', 'Business Intelligence', 'Digital Image Processing', 'Data Structures', 'RPA']
	}
];

// Create a named export object
const experienceData = { experiences, education };

export default experienceData;
