// src/components/InteractivePortfolio.js
import { useState, useEffect, useRef } from 'react';
import {
	GlassNavigation,
	GlassStartButton,
	GlassChatButton,
	GlassChatAssistant,
} from './GlassNavComponents'; // Import the glass navigation components

import './GlitchText';

import {
	ArrowLeftIcon,
	SendIcon,
	GithubIcon,
	LinkedInIcon,
	MailIcon,
	RocketIcon,
	DownloadIcon,
	MapPinIcon,
	PhoneIcon
} from './icons';
import GlitchEffects from './GlitchText';

// Main Portfolio Component
const InteractivePortfolio = () => {
	// Main state management
	const [activeSection, setActiveSection] = useState('intro');
	const [isAnimating, setIsAnimating] = useState(false);
	const [showAssistant, setShowAssistant] = useState(false);
	const [userMessage, setUserMessage] = useState('');
	const [chatMessages, setChatMessages] = useState([
		{
			id: 0,
			sender: 'bot',
			message: "Hi there! I'm The Shre-Oracle, Shreyas's portfolio assistant. Ask me anything about his projects, skills, or experience!",
			isGeminiResponse: true,
			timestamp: new Date().toISOString()
		}
	]);
	const [selectedProject, setSelectedProject] = useState(null);
	const [contactForm, setContactForm] = useState({
		name: '',
		email: '',
		message: ''
	});
	const [hasScrolledToBottom, setHasScrolledToBottom] = useState(true);
	const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
	const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
	const [minimized, setMinimized] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const backgroundRef = useRef(null);
	const messagesEndRef = useRef(null);
	const messagesContainerRef = useRef(null);
	const userScrolledRef = useRef(false);
	const mousePosition = useRef({ x: 0, y: 0 });

	// Handle section changes with animation
	const changeSection = (section) => {
		if (isAnimating || section === activeSection) return;

		setIsAnimating(true);
		setTimeout(() => {
			setActiveSection(section);
			setIsAnimating(false);
		}, 800);
	};

	// Handle chat messages
	const handleSendMessage = () => {
		if (!userMessage.trim() || isProcessing) return;

		// When user sends a message, we should scroll to bottom automatically
		setShouldScrollToBottom(true);
		setShowNewMessageIndicator(false);

		// Add user message with a unique id
		const userMsg = userMessage.trim();
		setChatMessages(prev => [...prev, {
			id: prev.length,  // Add this line
			sender: 'user',
			message: userMsg,
			timestamp: new Date().toISOString()
		}]);
		setUserMessage('');

		// Show typing indicator
		setIsTyping(true);
		setIsProcessing(true);

		// Simulate AI response
		setTimeout(() => {
			let response = "I'm not sure about that. Try asking about Shreyas's projects, skills, or experience!";

			// Simple keyword matching for demo purposes
			const lowerMsg = userMsg.toLowerCase();
			if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
				response = "Shreyas has worked on several impressive projects. His Medical Multi-Agent Framework integrates LLMs with critique mechanisms and achieved 92% alignment with healthcare expertise requirements. His Multimodal Video Ad Classifier analyzes video content with 81.43% human-coder agreement. Would you like me to show you the Projects section?";
			} else if (lowerMsg.includes('skill') || lowerMsg.includes('technology')) {
				response = "Shreyas's top skills include Python (95%), Machine Learning (90%), Data Engineering (90%), and SQL (90%). He's proficient with frameworks like TensorFlow, PyTorch, and FastAPI. His expertise spans both AI development and cloud architecture. Want to see his full Skills Tree?";
			} else if (lowerMsg.includes('experience') || lowerMsg.includes('job')) {
				response = "Shreyas currently works as a Data Engineer & AI Developer at Intelligent DataWorks, where he architected an HR management platform that improved system architecture by 30%. He's also a Co-Founder at Clau API, developing financial platforms with AI capabilities. Would you like to see more details in the Experience section?";
			} else if (lowerMsg.includes('education') || lowerMsg.includes('university')) {
				response = "Shreyas has an MS in Data Analytics Engineering from Northeastern University (2023-2025) and a BE in AI and ML from BMSIT&M (2019-2023). His education provides a strong foundation in both theoretical and applied aspects of AI and data science.";
			} else if (lowerMsg.includes('contact') || lowerMsg.includes('hire') || lowerMsg.includes('email')) {
				response = "You can contact Shreyas via email at shreyas.atneu@gmail.com or connect with him on LinkedIn. He's open to discussing professional opportunities, collaborations, and project ideas in AI, data science, and cloud development.";
			} else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
				response = "Hello! I'm The Shre-Oracle, Shreyas's portfolio assistant. I can tell you about his projects, skills, experience, or help you navigate through his interactive portfolio. What would you like to know?";
			} else if (lowerMsg.includes('thank')) {
				response = "You're welcome! I'm happy to help you explore Shreyas's portfolio. Feel free to ask if you'd like to know more about any specific aspect of his work, skills, or experience.";
			} else if (lowerMsg.includes('who are you') || lowerMsg.includes('what are you')) {
				response = "I'm The Shre-Oracle, a digital divination guru for Shreyas's interactive portfolio. I'm designed to help visitors navigate the portfolio and learn about Shreyas's projects, skills, and professional experience in an engaging way!";
			}

			// Handle navigation intents
			if (lowerMsg.includes('show') || lowerMsg.includes('go to') || lowerMsg.includes('navigate')) {
				if (lowerMsg.includes('project')) {
					response = "I'll show you Shreyas's impressive projects. His portfolio includes a Medical Multi-Agent Framework, a Multimodal Video Ad Classifier, and an ML-based Glioma Classification system. Feel free to ask about any specific project!";
					setTimeout(() => changeSection('projects'), 0);
				} else if (lowerMsg.includes('skill')) {
					response = "Let's check out Shreyas's Skills Tree! He excels in Python (95%), Machine Learning (90%), and Data Engineering (90%). The visualization shows how his skills interconnect.";
					setTimeout(() => changeSection('skills'), 0);
				} else if (lowerMsg.includes('experience')) {
					response = "Let's explore Shreyas's professional experience! He's currently a Data Engineer & AI Developer at Intelligent DataWorks and a Co-Founder at Clau API. He previously worked as an AI Engineer at Chipmonk Technologies.";
					setTimeout(() => changeSection('experience'), 0);
				} else if (lowerMsg.includes('contact')) {
					response = "Here's how you can get in touch with Shreyas. He's always open to discussing new opportunities and collaborations.";
					setTimeout(() => changeSection('contact'), 0);
				}
			}

			// Add bot response with a unique id
			setChatMessages(prev => [...prev, {
				id: prev.length,  // Add this line
				sender: 'bot',
				message: response,
				isGeminiResponse: true,
				timestamp: new Date().toISOString()
			}]);

			// Reset typing indicators
			setIsTyping(false);
			setIsProcessing(false);
		}, 1000 + Math.random() * 500);
	};

	// Handle key press
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	// Handle contact form changes
	const handleContactChange = (e) => {
		const { name, value } = e.target;
		setContactForm({
			...contactForm,
			[name]: value
		});
	};

	// Handle contact form submission
	const handleContactSubmit = () => {
		// In a real app, you would submit to a backend here
		console.log('Contact form submitted:', contactForm);
		alert('Thanks for reaching out! Shreyas will get back to you soon.');
		setContactForm({ name: '', email: '', message: '' });
	};

	// Check if we should scroll to bottom when new messages arrive
	useEffect(() => {
		// If user hasn't scrolled up, scroll to bottom automatically
		if (shouldScrollToBottom && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		} else if (!shouldScrollToBottom && !isTyping) {
			// Show new message indicator
			setShowNewMessageIndicator(true);
		}
	}, [chatMessages, shouldScrollToBottom, isTyping]);

	// Reset userScrolled when user scrolls to bottom manually
	useEffect(() => {
		if (hasScrolledToBottom) {
			userScrolledRef.current = false;
			setShouldScrollToBottom(true);
			setShowNewMessageIndicator(false);
		}
	}, [hasScrolledToBottom]);

	// Handle scroll events to enable "new message" indicator
	const handleScroll = () => {
		if (messagesContainerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
			const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

			// Update scroll position state
			setHasScrolledToBottom(isAtBottom);

			// If user scrolls up, mark as user-initiated scroll
			if (!isAtBottom && !userScrolledRef.current) {
				userScrolledRef.current = true;
				setShouldScrollToBottom(false);
			}
		}
	};

	// Scroll to bottom manually
	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
			setShouldScrollToBottom(true);
			userScrolledRef.current = false;
			setShowNewMessageIndicator(false);
		}
	};

	// Format timestamp for display
	const formatTimestamp = (timestamp) => {
		try {
			return new Date(timestamp).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch (e) {
			return '';
		}
	};

	// Clear chat history
	const clearChatHistory = () => {
		if (window.confirm("Are you sure you want to clear the chat history?")) {
			setChatMessages([
				{
					id: 0,  // Add this line
					sender: 'bot',
					message: "Hi there! I'm The Shre-Oracle, Shreyas's portfolio assistant. Ask me anything about his projects, skills, or experience!",
					isGeminiResponse: true,
					timestamp: new Date().toISOString()
				}
			]);
			setShouldScrollToBottom(true);
			setShowNewMessageIndicator(false);
		}
	};

	// Initialize interactive background
	useEffect(() => {
		const canvas = backgroundRef.current;
		const ctx = canvas.getContext('2d');
		let particles = [];
		let animationFrameId;

		// Handle mouse move event
		const handleMouseMove = (e) => {
			mousePosition.current = {
				x: e.clientX,
				y: e.clientY
			};
		};

		// Setup canvas
		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			initParticles();
		};

		// Initialize particles
		const initParticles = () => {
			particles = [];
			const particleCount = Math.floor((canvas.width * canvas.height) / 10000);

			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * 3 + 1,
					speedX: Math.random() * 1 - 0.5,
					speedY: Math.random() * 1 - 0.5,
					color: `rgba(100, 120, 255, ${Math.random() * 0.3 + 0.1})`
				});
			}
		};

		// Animation loop
		const animate = () => {
			ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Update and draw particles
			particles.forEach(particle => {
				// Calculate distance to mouse
				const dx = mousePosition.current.x - particle.x;
				const dy = mousePosition.current.y - particle.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Mouse influence (repel or attract)
				if (distance < 150) {
					const angle = Math.atan2(dy, dx);
					const force = (150 - distance) / 1500;
					particle.speedX -= Math.cos(angle) * force;
					particle.speedY -= Math.sin(angle) * force;
				}

				// Apply speed to position
				particle.x += particle.speedX;
				particle.y += particle.speedY;

				// Dampen speed
				particle.speedX *= 0.98;
				particle.speedY *= 0.98;

				// Boundary checking
				if (particle.x < 0 || particle.x > canvas.width) {
					particle.speedX *= -1;
				}
				if (particle.y < 0 || particle.y > canvas.height) {
					particle.speedY *= -1;
				}

				// Draw particle
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fillStyle = particle.color;
				ctx.fill();
			});

			// Draw connections between particles
			particles.forEach((particleA, i) => {
				particles.slice(i + 1).forEach(particleB => {
					const dx = particleA.x - particleB.x;
					const dy = particleA.y - particleB.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 120) {
						ctx.beginPath();
						ctx.moveTo(particleA.x, particleA.y);
						ctx.lineTo(particleB.x, particleB.y);
						ctx.strokeStyle = `rgba(150, 170, 230, ${(120 - distance) / 120 * 0.2})`;
						ctx.lineWidth = 1;
						ctx.stroke();
					}
				});
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		// Initial setup
		handleResize();
		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);
		animate();

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className="relative min-h-screen overflow-hidden font-sans text-gray-800">
			{/* Interactive Background */}
			<div className="interactive-background"></div>
			<div className="glass-background"></div>
			<canvas
				ref={backgroundRef}
				className="absolute inset-0 z-0"
			/>

			{/* Container */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
				{/* Main content area */}
				<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
					{activeSection === 'intro' && <IntroSection onNavigate={changeSection} />}
					{activeSection === 'projects' && (
						<ProjectsSection
							onNavigate={changeSection}
							setSelectedProject={setSelectedProject}
							selectedProject={selectedProject}
						/>
					)}
					{activeSection === 'skills' && <SkillsSection onNavigate={changeSection} />}
					{activeSection === 'experience' && <ExperienceSection onNavigate={changeSection} />}
					{activeSection === 'contact' && (
						<ContactSection
							onNavigate={changeSection}
							contactForm={contactForm}
							onChange={handleContactChange}
							onSubmit={handleContactSubmit}
						/>
					)}
				</div>

				{/* Glass Navigation Bar - Replace the old navigation */}
				{activeSection !== 'intro' && (
					<GlassNavigation activeSection={activeSection} changeSection={changeSection} />
				)}

				{/* Glass Chat Button - Replace the old chat button */}
				<GlassChatButton showAssistant={showAssistant} setShowAssistant={setShowAssistant} />

				{/* Glass Chat Assistant - Replace the old chat assistant */}
				<GlassChatAssistant
					showAssistant={showAssistant}
					minimized={minimized}
					setMinimized={setMinimized}
					setShowAssistant={setShowAssistant}
					chatMessages={chatMessages}
					userMessage={userMessage}
					setUserMessage={setUserMessage}
					handleSendMessage={handleSendMessage}
					handleKeyPress={handleKeyPress}
					messagesContainerRef={messagesContainerRef}
					handleScroll={handleScroll}
					messagesEndRef={messagesEndRef}
					showNewMessageIndicator={showNewMessageIndicator}
					scrollToBottom={scrollToBottom}
					isTyping={isTyping}
					isProcessing={isProcessing}
					formatTimestamp={formatTimestamp}
					clearChatHistory={clearChatHistory}
				/>
			</div>
		</div>
	);
};

// IntroSection Component
const IntroSection = ({ onNavigate }) => {
	return (
		<div className="text-center p-6 max-w-3xl mx-auto">
			<div className="mb-8 relative inline-block">
				<div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg glow-effect">
					<div className="text-6xl text-white font-bold">S</div>
				</div>
			</div>

			<div className="glass-card p-8 rounded-xl mb-10">
				<GlitchEffects />

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<GlassStartButton label="Projects" onClick={() => onNavigate('projects')} />
					<GlassStartButton label="Skills" onClick={() => onNavigate('skills')} />
					<GlassStartButton label="Experience" onClick={() => onNavigate('experience')} />
					<GlassStartButton label="Contact" onClick={() => onNavigate('contact')} />
				</div>
			</div>

			<div className="flex justify-center space-x-6">
				<SocialButtonGlass icon={<GithubIcon className="w-6 h-6" />} url="https://github.com/lambdabypi/" />
				<SocialButtonGlass icon={<LinkedInIcon className="w-6 h-6" />} url="https://www.linkedin.com/in/shreyas-sreenivas-9452a9169/" />
				<SocialButtonGlass icon={<MailIcon className="w-6 h-6" />} url="mailto:shreyas.atneu@gmail.com" />
			</div>
		</div>
	);
};

// Projects Section
const ProjectsSection = ({ onNavigate, setSelectedProject, selectedProject }) => {
	const projects = [
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

	if (selectedProject) {
		const project = projects.find(p => p.id === selectedProject);
		return (
			<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				{/* Fixed header */}
				<div className="glass-header sticky top-0 z-10">
					<div className="glass-header-inner p-2">
						<h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
							Project Details
						</h2>
					</div>
					<div className="glass-header-glow"></div>
				</div>

				<div className="p-6">
					<button
						onClick={() => setSelectedProject(null)}
						className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors glass-button px-3 py-1.5 rounded-lg"
					>
						<ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to projects
					</button>

					<div className="flex flex-col md:flex-row gap-8">
						<div className="md:w-2/5">
							<div className="glass-card rounded-xl p-5 flex items-center justify-center h-60 mb-6">
								<RocketIcon className="w-20 h-20 text-blue-400" />
							</div>

							<div className="flex flex-wrap gap-2 mb-4">
								{project.tags.map((tag, idx) => (
									<span key={idx} className="px-3 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-xs border border-blue-300/30 backdrop-blur-sm">
										{tag}
									</span>
								))}
							</div>
						</div>

						<div className="md:w-3/5">
							<h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
								{project.title}
							</h2>
							<div className="text-blue-400 mb-2 font-medium">{project.period}</div>
							<p className="text-gray-300 mb-4">
								{project.description}
							</p>
							<p className="text-gray-400 mb-8">
								{project.details}
							</p>

							<div className="grid grid-cols-2 gap-4 mb-6">
								{project.metrics.map((metric, idx) => (
									<div key={idx} className="glass-card p-4 rounded-xl">
										<div className="text-blue-300 mb-1 text-sm font-medium">{metric.label}</div>
										<div className="text-2xl font-bold text-white">{metric.value}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			{/* Fixed header */}
			<div className="glass-header sticky top-0 z-10">
				<div className="glass-header-inner p-2">
					<h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
						Projects
					</h2>
				</div>
				<div className="glass-header-glow"></div>
			</div>

			<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{projects.map((project) => (
						<div
							key={project.id}
							className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
							onClick={() => setSelectedProject(project.id)}
						>
							<div className="h-44 flex items-center justify-center p-4 border-b border-white/10 relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-75 transition-opacity"></div>
								<RocketIcon className="w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors relative z-10" />
							</div>

							<div className="p-5">
								<h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
									{project.title}
								</h3>
								<p className="text-gray-300 text-sm mb-4">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tags.slice(0, 3).map((tag, idx) => (
										<span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs border border-blue-300/30 backdrop-blur-sm">
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// Skills Section
const SkillsSection = ({ onNavigate }) => {
	const skills = [
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

	const categories = ['Programming', 'AI/ML', 'Data', 'Cloud'];
	const categoryColors = {
		'Programming': 'from-blue-500 to-blue-400',
		'AI/ML': 'from-purple-500 to-purple-400',
		'Data': 'from-green-500 to-green-400',
		'Cloud': 'from-pink-500 to-pink-400'
	};

	const categoryIcons = {
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

	return (
		<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			{/* Fixed header */}
			<div className="glass-header sticky top-0 z-10">
				<div className="glass-header-inner p-2">
					<h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
						Skills & Expertise
					</h2>
				</div>
				<div className="glass-header-glow"></div>
			</div>

			<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{categories.map((category) => (
						<div key={category} className="mb-6">
							<div className="flex items-center mb-4">
								<div className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryColors[category]} flex items-center justify-center text-white mr-3`}>
									{categoryIcons[category]}
								</div>
								<h3 className="text-xl font-bold text-white">
									{category}
								</h3>
							</div>

							<div className="glass-card p-5 rounded-xl">
								{skills
									.filter(skill => skill.category === category)
									.map((skill) => (
										<div key={skill.name} className="mb-5 last:mb-0">
											<div className="flex justify-between mb-2">
												<span className="text-gray-200">{skill.name}</span>
												<span className="text-blue-300 font-medium">{skill.level}%</span>
											</div>

											<div className="relative w-full h-2.5 bg-gray-800/50 rounded-full overflow-hidden shadow-inner">
												<div
													className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category]} transition-all duration-1000 ease-out`}
													style={{ width: `${skill.level}%` }}
												>
													<div className="absolute inset-0 skill-shine"></div>
												</div>
											</div>
										</div>
									))
								}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};


// Experience Section
const ExperienceSection = ({ onNavigate }) => {
	const experiences = [
		{
			title: 'Data Engineer & AI Developer',
			company: 'Intelligent DataWorks',
			location: 'Boston, USA',
			period: 'Jan 2025 - Present',
			description: [
				'Architected HR management platform integrating job operations, applicant tracking, applicant management, jobs management using REST API, FastAPI, and PostgreSQL with Pydantic, improving system architecture by 30%.',
				'Engineered authentication framework with JWT tokens, bcrypt password hashing, and AWS SES for email verification to implement persistent sessions and role-based access control, enhancing security while improving user experience.',
				'Developed HR workflows in Python, Streamlit and PostgreSQL by creating interactive dashboards and implementing AI algorithms to enable data-driven hiring decisions and automated candidate evaluation.'
			],
			skills: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'AWS SES', 'Streamlit', 'AI Algorithms']
		},
		{
			title: 'Co-Founder and Lead Developer',
			company: 'Clau API, Vivytech',
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
			title: 'AI Engineer',
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

	const education = [
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

	return (
		<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			{/* Fixed header */}
			<div className="p-6 border-b border-white/30 sticky top-0 z-10">
				<div className="rounded-lg p-2">
					<h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
						Professional Experience
					</h2>
				</div>
				<div className="glass-header-glow"></div>
			</div>

			{/* Scrollable content */}
			<div className="p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ scrollbarWidth: 'thin' }}>
				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/60 md:left-1/2 md:-ml-0.5"></div>

					{experiences.map((exp, idx) => (
						<div key={idx} className="relative mb-12">
							{/* Timeline dot */}
							<div className="absolute left-0 w-3 h-3 rounded-full bg-purple-500 border-4 border-white/50 shadow-md md:left-1/2 md:-ml-1.5"></div>

							{/* Content */}
							<div className={`ml-6 md:w-1/2 ${idx % 2 === 0 ? 'md:ml-0 md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
								<div className="glass-card p-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
									<div className="text-blue-400 mb-1">{exp.period}</div>
									<h3 className="text-xl font-bold mb-1 text-black">{exp.title}</h3>
									<div className="text-black-300 mb-1">{exp.company}</div>
									<div className="text-gray-400 mb-3 text-sm">{exp.location}</div>

									<ul className="text-black-200 mb-4 list-disc pl-5 space-y-2">
										{exp.description.map((item, i) => (
											<li key={i}>{item}</li>
										))}
									</ul>

									<div className="flex flex-wrap gap-2">
										{exp.skills.map((skill, skillIdx) => (
											<span key={skillIdx} className="px-2 py-1 bg-blue-500/20 text-black-200 rounded-full text-xs border border-blue-300/30 backdrop-blur-sm">
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<h3 className="text-2xl font-bold mt-12 mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
					Education
				</h3>

				<div className="space-y-6">
					{education.map((edu, idx) => (
						<div key={idx} className="glass-card p-4 rounded-lg hover:shadow-xl transition-all duration-300">
							<div className="flex flex-col md:flex-row md:justify-between md:items-start">
								<div>
									<h4 className="text-xl font-bold text-black">{edu.degree}</h4>
									<div className="text-blue-300">{edu.institution}</div>
									<div className="text-gray-400 text-sm">{edu.location}</div>
								</div>
								<div className="text-blue-300 mt-2 md:mt-0">{edu.period}</div>
							</div>

							<div className="mt-4">
								<div className="font-medium text-black-200">Relevant Courses:</div>
								<div className="flex flex-wrap gap-2 mt-2">
									{edu.courses.map((course, i) => (
										<span key={i} className="px-2 py-1 bg-white/10 text-black-200 rounded-full text-xs border border-white/20">
											{course}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-8 text-center">
					<a
						href="#resume"
						className="inline-block px-4 py-2 glass-button rounded-lg hover:shadow-lg transition-all text-black border border-white/30"
					>
						Download Resume
						<DownloadIcon className="w-4 h-4 ml-2 inline-block" />
					</a>
				</div>
			</div>
		</div>
	);
};

// Contact Section
const ContactSection = ({ onNavigate, contactForm, onChange, onSubmit }) => {
	return (
		<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			{/* Fixed header */}
			<div className="glass-header sticky top-0 z-10">
				<div className="glass-header-inner p-2">
					<h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
						Get In Touch
					</h2>
				</div>
				<div className="glass-header-glow"></div>
			</div>

			<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<div className="glass-card p-5 rounded-xl mb-6">
							<p className="text-gray-300 mb-6">
								I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out through any of the channels below!
							</p>

							<div className="space-y-5">
								<ContactMethodGlass
									icon={<MailIcon className="w-5 h-5" />}
									label="Email"
									value="shreyas.atneu@gmail.com"
									bgColor="bg-blue-500/30"
								/>
								<ContactMethodGlass
									icon={<LinkedInIcon className="w-5 h-5" />}
									label="LinkedIn"
									value="linkedin.com/in/shreyassreenivas"
									bgColor="bg-indigo-500/30"
								/>
								<ContactMethodGlass
									icon={<GithubIcon className="w-5 h-5" />}
									label="GitHub"
									value="github.com/shreyassreenivas"
									bgColor="bg-purple-500/30"
								/>
								<ContactMethodGlass
									icon={<PhoneIcon className="w-5 h-5" />}
									label="Phone"
									value="(857) 396-9611"
									bgColor="bg-pink-500/30"
								/>
								<ContactMethodGlass
									icon={<MapPinIcon className="w-5 h-5" />}
									label="Location"
									value="Boston, MA, USA"
									bgColor="bg-green-500/30"
								/>
							</div>
						</div>

						<div className="glass-card p-5 rounded-xl">
							<h3 className="text-lg font-bold text-white mb-4">Connect With Me</h3>
							<div className="flex justify-center space-x-4">
								<SocialButtonGlass
									icon={<GithubIcon className="w-6 h-6" />}
									url="https://github.com/shreyassreenivas"
									bgColor="bg-gray-800/50"
									hoverColor="bg-gray-800/70"
								/>
								<SocialButtonGlass
									icon={<LinkedInIcon className="w-6 h-6" />}
									url="https://linkedin.com/in/shreyassreenivas"
									bgColor="bg-blue-600/50"
									hoverColor="bg-blue-600/70"
								/>
								<SocialButtonGlass
									icon={<MailIcon className="w-6 h-6" />}
									url="mailto:shreyas.atneu@gmail.com"
									bgColor="bg-red-500/50"
									hoverColor="bg-red-500/70"
								/>
							</div>
						</div>
					</div>

					<div className="glass-card p-5 rounded-xl">
						<div className="space-y-5">
							<div>
								<label className="block text-blue-300 mb-2 text-sm font-medium">Name</label>
								<input
									type="text"
									name="name"
									value={contactForm.name}
									onChange={onChange}
									className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
									placeholder="Your name"
								/>
							</div>

							<div>
								<label className="block text-blue-300 mb-2 text-sm font-medium">Email</label>
								<input
									type="email"
									name="email"
									value={contactForm.email}
									onChange={onChange}
									className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
									placeholder="Your email"
								/>
							</div>

							<div>
								<label className="block text-blue-300 mb-2 text-sm font-medium">Message</label>
								<textarea
									name="message"
									value={contactForm.message}
									onChange={onChange}
									className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-white placeholder-gray-400 min-h-[180px] resize-none"
									placeholder="Your message"
								></textarea>
							</div>

							<button
								type="button"
								onClick={onSubmit}
								className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition-all text-white font-medium flex items-center justify-center shadow-md hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1"
							>
								Send Message
								<SendIcon className="w-4 h-4 ml-2" />
							</button>

							<div className="text-gray-400 text-sm text-center mt-4">
								I'll get back to you as soon as possible!
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Glass Contact Method Component
const ContactMethodGlass = ({ icon, label, value, bgColor = "bg-blue-500/30" }) => {
	return (
		<div className="flex items-start">
			<div className={`mt-1 w-10 h-10 flex items-center justify-center ${bgColor} rounded-full text-white border border-white/20 shadow-inner`}>
				{icon}
			</div>
			<div className="ml-3">
				<div className="text-sm text-blue-300 font-medium">{label}</div>
				<div className="text-white">{value}</div>
			</div>
		</div>
	);
};

// Glass Social Button Component
const SocialButtonGlass = ({ icon, url = "#social", bgColor = "bg-blue-500/30", hoverColor = "bg-blue-500/50" }) => {
	return (
		<a
			href={url}
			className={`w-12 h-12 flex items-center justify-center ${bgColor} hover:${hoverColor} rounded-full transition-all duration-300 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-white/20`}
			target="_blank"
			rel="noopener noreferrer"
		>
			{icon}
		</a>
	);
};

export default InteractivePortfolio;