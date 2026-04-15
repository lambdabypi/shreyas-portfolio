// src/data/projectsData.js

const projectsData = [
	{
		id: 'miniquest',
		title: 'MiniQuest: AI Adventure Planner',
		description: 'Production AI platform that generates three fully-routed single-day itineraries backed by real-time venue research, Google Maps directions, and RAG-based personalization.',
		period: 'Jan 2025 - Present',
		details: 'A 6-agent LangGraph pipeline (LocationParser → IntentParser → VenueScout → TavilyResearch → RoutingAgent → AdventureCreator) discovers real venues via Google Places, researches them 18-way parallel with Tavily, and streams three adventures progressively via SSE the moment each finishes. Redis caching hits 90%+ on warm cache, cutting latency from ~20s cold to ~4s. RAG personalization via ChromaDB + text-embedding-3-small learns from every saved adventure. Fully deployed on GCP Cloud Run + Firebase Hosting with a React Native mobile companion app.',
		tags: ['Python', 'LangGraph', 'FastAPI', 'OpenAI GPT-4o', 'Tavily API', 'React 18', 'TypeScript', 'GCP Cloud Run', 'MongoDB', 'Redis', 'ChromaDB', 'React Native'],
		metrics: [
			{ label: 'Warm Cache Speed', value: '~4s' },
			{ label: 'Cache Hit Rate', value: '90%+' },
			{ label: 'Active Agents', value: '6' },
			{ label: 'Storage Savings', value: '97%' }
		],
		liveUrl: 'https://project-572cd754-7f2b-465c-b68.web.app'
	},
	{
		id: 'atlas',
		title: 'ATLAS: Clinical Decision Support',
		description: 'Full-stack AI-assisted clinical decision support platform with Gemini-powered diagnosis and analytics workflows for structured and unstructured medical data.',
		period: '2024',
		details: 'ATLAS is a full-stack clinical decision support platform built with Node.js, React, Next.js, and TypeScript. Integrates Google Gemini AI for generative diagnosis assistance, with analytics workflows that process both structured and unstructured clinical data to support evidence-based medical decision-making at scale.',
		tags: ['Node.js', 'React', 'Next.js', 'TypeScript', 'Gemini AI'],
		metrics: [
			{ label: 'AI Model', value: 'Gemini' },
			{ label: 'Stack', value: 'Full-Stack' },
			{ label: 'Data Types', value: '2' },
			{ label: 'Platform', value: 'Web' }
		],
		liveUrl: 'https://atlas-clinical.vercel.app/',
		githubUrl: 'https://github.com/lambdabypi/ATLAS'
	},
	{
		id: 'medical-framework',
		title: 'Medical Multi-Agent Framework',
		description: 'A multi-agent system using Python, PyTorch and LangChain that integrates general-purpose and fine-tuned LLMs with critique mechanisms for medical diagnostics.',
		period: 'Sept 2024 - Dec 2024',
		details: 'Fine-tuned Phi 3.5 Mini using Unsloth and conducted comprehensive data analysis across medical specialties, achieving improved diagnostic accuracy and 92% alignment with requirements of healthcare expertise.',
		tags: ['Python', 'PyTorch', 'LangChain', 'LLMs', 'Phi 3.5 Mini', 'Unsloth', 'Fine-tuning'],
		metrics: [
			{ label: 'Alignment Rate', value: '92%' },
			{ label: 'Completion', value: '100%' }
		]
	},
	{
		id: 'mentor-email-generator',
		title: 'MENTOR Email Generator',
		description: 'A React tool that helps students craft personalized cold-emails to professors for mentorship and research opportunities, with smart research-interest matching.',
		period: 'Jul 2024 - Aug 2024',
		details: 'MENTOR (Messaging ENvironment for Teacher Outreach & Recruitment) simplifies the process of reaching out to potential academic mentors. It provides intelligent email generation with research interest matching, customizable student information, and comprehensive professor filtering.',
		tags: ['React', 'JavaScript', 'TailwindCSS', 'Academic Tools'],
		interactive: true,
		metrics: [
			{ label: 'Professors Database', value: '50+' },
			{ label: 'Adoption Rate', value: '87%' }
		]
	},
	{
		id: 'video-classifier',
		title: 'Multimodal Video Ad Classifier',
		description: 'A multimodal LLM classifier that analyzes 150 video ads through video frames, text descriptions, and audio transcriptions to match human coding accuracy.',
		period: 'Jun 2024',
		details: 'The system achieved 81.43% agreement with human coders, exceptional performance in branding elements (F1 = 0.88) and emotional intent (F1 = 0.81), and identified improvements for narrative features (F1 = 0.56).',
		tags: ['Python', 'TensorFlow', 'OpenCV', 'Video Analysis', 'LLMs', 'Multimodal AI'],
		metrics: [
			{ label: 'Human Agreement', value: '81.43%' },
			{ label: 'Video Ads Analyzed', value: '150' }
		]
	},
	{
		id: 'glioma-classification',
		title: 'ML-based Glioma Classification',
		description: 'A medical diagnostic system that classifies glioma patients as LGG or GBM from 862 patient records, achieving 99% accuracy with ensemble methods.',
		period: 'Feb 2024 - Apr 2024',
		details: 'The system evaluated multiple algorithms including Logistic Regression, SVM, Random Forest, and achieved 99% accuracy with k-NN and Multinomial Naive Bayes, delivering exceptional performance for potential clinical applications.',
		tags: ['Python', 'scikit-learn', 'Pandas', 'k-NN', 'Naive Bayes', 'SVM'],
		metrics: [
			{ label: 'Accuracy', value: '99%' },
			{ label: 'Patient Records', value: '862' }
		]
	}
];

export default projectsData;
