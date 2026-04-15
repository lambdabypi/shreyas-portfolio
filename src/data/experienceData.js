// src/data/experienceData.js

export const experiences = [
	{
		title: 'Full-Stack AI/Mobile Engineer',
		company: 'Vivytech',
		location: 'Boston, USA',
		period: 'May 2024 - Present',
		description: [
			'Took Splitz from scratch to production MVP in 4 weeks using React Native, Express.js, PostgreSQL, and Socket.IO; shipped 25+ UI components, 15 REST endpoints, live WebSocket bet updates, Cloudinary uploads, Firebase push notifications, and full iOS/Android parity.',
			'Led complete AWS infrastructure recovery after a sophisticated EC2 intrusion (root-level backdoors via exposed SSH): rebuilt server from scratch in 48 hours, restricted SSH to IP allowlist, deployed fail2ban/firewalld, secured Aurora RDS behind VPC, and hardened the Clau financial app with AES-256 session encryption and HTTPS-only traffic policies.',
			'Engineered the Clau AI financial app: Google Gemini-powered personal finance assistant covering stocks, markets, and macro topics; Alpaca brokerage OAuth integration for real-time trading via WebSocket; goal-tracking system with cloud sync and completion animations; 20-connection database pool; and full dark-mode UI across all screens.',
			'Reduced Banking Intelligence report generation latency by 35% (60s → 45s) by converting sequential Gemini API calls to parallel section processing; built the Banking Command dashboard with HTML/PDF report export, report caching, and a session-isolation fix that prevented cross-user data leakage.',
		],
		skills: ['React Native', 'Python', 'Express.js', 'PostgreSQL', 'Socket.IO', 'AWS EC2', 'AES-256', 'Google Gemini', 'Alpaca API', 'Firebase', 'Redux', 'Sequelize ORM', 'JWT']
	},
	{
		title: 'AI/ML Engineer',
		company: 'Intelligent DataWorks',
		location: 'Boston, USA',
		period: 'Jan 2025 - Aug 2025',
		description: [
			'Architected an end-to-end HR management platform with job posting, applicant tracking, and candidate evaluation workflows using FastAPI, PostgreSQL, and Pydantic, improving overall system modularity by 30%.',
			'Engineered a security layer with JWT tokens, bcrypt password hashing, and AWS SES email verification to support persistent sessions and role-based access control across multiple user tiers.',
			'Developed AI hiring pipelines in Python and Streamlit with automated candidate scoring and interactive analytics dashboards to support data-driven hiring at scale.',
		],
		skills: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'AWS SES', 'Streamlit', 'Pydantic', 'AI Algorithms']
	},
	{
		title: 'Machine Learning Engineer',
		company: 'Chipmonk Technologies Pvt. Ltd.',
		location: 'Bangalore, India',
		period: 'Sept 2022 - Aug 2023',
		description: [
			'Engineered a computer-vision ML model using linear regression to detect construction tolerance lines from live video feeds, improving real-time tracking precision by 30% and reducing data analysis time by 35%.',
			'Designed a MySQL schema for storing multi-site coordinate and construction metrics data, cutting query processing time by 25% and enabling accurate cross-site project tracking.',
			'Built a CI/CD pipeline with TeamCity to automate test execution and deployment, boosting developer productivity by 30% and ensuring consistent quality across all releases.',
		],
		skills: ['Machine Learning', 'Python', 'Computer Vision', 'Linear Regression', 'MySQL', 'TeamCity', 'CI/CD']
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

const experienceData = { experiences, education };
export default experienceData;
