// src/data/projectsData.js

const projectsData = [
	{
		id: 'medical-framework',
		title: 'Medical Multi-Agent Framework',
		description: 'A multi-agent system using Python, PyTorch and Langchain that integrates general-purpose and fine-tuned LLMs with critique mechanisms.',
		period: 'Sept 2024 - Dec 2024',
		details: 'Fine-tuned Phi 3.5 Mini using Unsloth and conducted comprehensive data analysis across medical specialties, achieving improved diagnostic accuracy and 92% alignment with requirements of healthcare expertise.',
		tags: ['Python', 'PyTorch', 'Langchain', 'LLMs', 'Phi 3.5 Mini'],
		metrics: [
			{ label: 'Alignment Rate', value: '92%' },
			{ label: 'Completion', value: '100%' }
		]
	},
	{
		id: 'mentor-email-generator',
		title: 'MENTOR Email Generator',
		description: 'A React-based tool that helps students generate personalized emails to professors for mentorship and research opportunities.',
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
		description: 'A multimodal LLM classifier that analyzes 150 video ads through video frames, text descriptions, and transcriptions.',
		period: 'Jun 2024',
		details: 'The system achieved 81.43% agreement with human coders, exceptional performance in branding elements (F1 = 0.88) and emotional intent (F1 = 0.81), and identified improvements for narrative features (F1 = 0.56).',
		tags: ['Python', 'TensorFlow', 'OpenCV', 'Video Analysis', 'LLMs'],
		metrics: [
			{ label: 'Human Agreement', value: '81.43%' },
			{ label: 'Video Ads Analyzed', value: '150' }
		]
	},
	{
		id: 'glioma-classification',
		title: 'ML-based Glioma Classification',
		description: 'A medical diagnostic tool that classifies glioma patients as LGG or GBM from 862 patient records.',
		period: 'Feb 2024 - Apr 2024',
		details: 'The system evaluated multiple algorithms including Logistic Regression, SVM, Random Forest, and achieved 99% accuracy with k-NN and Multinomial Naive Bayes, delivering exceptional performance for potential clinical applications.',
		tags: ['Python', 'scikit-learn', 'Pandas', 'k-NN', 'Naive Bayes'],
		metrics: [
			{ label: 'Accuracy', value: '99%' },
			{ label: 'Patient Records', value: '862' }
		]
	}
];

export default projectsData;