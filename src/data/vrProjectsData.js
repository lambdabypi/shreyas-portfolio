// src/data/projectsData.js

const vrProjectsData = [
	{
		id: 'adaptive-hockey-vr',
		title: 'Adaptive Hockey VR',
		description: 'A virtual reality hockey game designed with adaptive difficulty that automatically adjusts based on player performance.',
		period: 'Jan 2024 - May 2024',
		details: 'Designed and developed a fully immersive VR hockey experience that uses real-time performance metrics to dynamically adjust game difficulty. The system analyzes player movement, shot accuracy, and reaction times to create a personalized experience suitable for players of all skill levels.',
		tags: ['Unity', 'C#', 'VR', 'Adaptive AI', 'Oculus SDK'],
		metrics: [
			{ label: 'Accessibility Score', value: '94%' },
			{ label: 'User Engagement', value: '8.7/10' }
		],
		githubUrl: 'https://github.com/lambdabypi/AdaptiveHockey_VR',
		videoUrl: 'https://youtu.be/HUoPJNg2sxw'
	},
	{
		id: 'vr-teleportation',
		title: 'VR Teleportation System',
		description: 'A custom teleportation system with intuitive navigation controls and visual guidance for improved user experience in virtual environments.',
		period: 'Mar 2024 - Apr 2024',
		details: 'Created an advanced teleportation system featuring arc-based trajectory visualization, dynamic surface detection, and customizable range parameters. The system provides clear visual feedback for destination preview and implements smooth camera transitions to reduce motion sickness.',
		tags: ['Unity', 'C#', 'XR Interaction', 'Shader Graph', 'VR Locomotion'],
		metrics: [
			{ label: 'Motion Comfort', value: '92%' },
			{ label: 'Usability', value: '4.8/5' }
		],
		githubUrl: 'https://github.com/lambdabypi/Mixed-Reality'
	},
	{
		id: 'interactive-puzzle-vr',
		title: 'VR Interactive Puzzle',
		description: 'A spatial puzzle game that challenges players to manipulate and assemble 3D objects using natural hand interactions in virtual reality.',
		period: 'Feb 2024 - Mar 2024',
		details: 'Developed a physics-based puzzle game utilizing hand tracking technology for intuitive object manipulation. Players can grab, rotate, and place puzzle pieces with natural gestures, solving increasingly complex spatial challenges across multiple difficulty levels.',
		tags: ['Unity', 'C#', 'Hand Tracking', 'Physics', 'Puzzle Design'],
		metrics: [
			{ label: 'Completion Rate', value: '86%' },
			{ label: 'Avg. Solve Time', value: '12.5 min' }
		],
		githubUrl: 'https://github.com/lambdabypi/Mixed-Reality'
	},
	{
		id: 'mixed-reality-interface',
		title: 'Mixed Reality Interface',
		description: 'An experimental interface that blends virtual elements with the real world through spatial mapping and gesture-based interactions.',
		period: 'Apr 2024 - May 2024',
		details: 'Created a mixed reality interface that uses spatial mapping to detect real-world surfaces and overlays contextual UI elements. The system features gesture recognition for controlling virtual panels, object recognition for contextual information, and spatial anchoring for persistent virtual objects.',
		tags: ['Unity', 'C#', 'MRTK', 'Spatial Mapping', 'Gesture Recognition'],
		metrics: [
			{ label: 'Response Time', value: '<50ms' },
			{ label: 'Recognition Rate', value: '91%' }
		],
		githubUrl: 'https://github.com/lambdabypi/Mixed-Reality'
	}
];

export default vrProjectsData;