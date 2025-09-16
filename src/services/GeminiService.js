// src/services/GeminiService.js
class GeminiService {
	constructor() {
		this.initialized = false;
		this.conversationHistory = [];
		this.navigationPatterns = {
			map: ['map', 'world', 'journey', 'timeline', 'path'],
			skills: ['skill', 'ability', 'expertise', 'knowledge', 'proficiency', 'tech'],
			projects: ['project', 'work', 'portfolio', 'showcase', 'creation', 'built'],
			experience: ['experience', 'job', 'career', 'position', 'role', 'employment', 'company', 'workplace'],
			contact: ['contact', 'email', 'message', 'reach', 'connect', 'get in touch']
		};

		// Log hostname for debugging
		if (typeof window !== 'undefined') {
			console.log('Current hostname:', window.location.hostname);
		}
	}

	/**
	 * Add a message to the conversation history
	 * @param {Object} message - Message object with sender and content
	 */
	addToHistory(message) {
		this.conversationHistory.push(message);

		// Keep history at a reasonable size
		if (this.conversationHistory.length > 10) {
			this.conversationHistory.shift();
		}
	}

	/**
	 * Generate a response based on conversation context
	 * @param {string} userMessage - The user's message
	 * @param {Array} conversationContext - Optional previous messages for context
	 * @returns {string} - The generated response
	 */
	async generateResponse(userMessage, conversationContext = []) {
		// Add user message to history
		this.addToHistory({ role: 'user', content: userMessage });

		// Check for navigation intents (keep this feature from your original code)
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);

		try {
			// Get the base URL - this is crucial for cross-origin requests
			const baseUrl = this.getApiBaseUrl();
			const apiUrl = `${baseUrl}/api-src/gemini`;

			console.log('Calling API at:', apiUrl);

			// Call the serverless function
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: userMessage,
					history: this.conversationHistory
				})
			});

			if (!response.ok) {
				// Try to get error text
				let errorText = 'No error details available';
				try {
					errorText = await response.text();
				} catch (e) {
					console.error('Failed to get error text:', e);
				}

				console.error('API Response Error:', {
					status: response.status,
					statusText: response.statusText,
					errorText
				});

				throw new Error(`API request failed: ${response.status}`);
			}

			const data = await response.json();

			// Extract the generated text
			const generatedText = data.message;

			// Add response to history
			this.addToHistory({ role: 'assistant', content: generatedText });

			return { response: generatedText, shouldNavigate, targetSection };
		} catch (error) {
			console.error('Error calling Gemini API:', error);
			// Log detailed error info
			console.error('Error details:', error);

			// Fallback to your existing method if API fails
			return this.getFallbackResponse(userMessage);
		}
	}

	/**
	 * Get the base URL for API calls
	 * @returns {string} The base URL
	 */
	getApiBaseUrl() {
		// If running in browser
		if (typeof window !== 'undefined') {
			// Get current hostname and protocol
			const protocol = window.location.protocol;
			const hostname = window.location.hostname;

			// If in development
			if (hostname === 'localhost' || hostname === '127.0.0.1') {
				return `${protocol}//${hostname}:${window.location.port}`;
			}

			// If in production, use same origin
			return `${protocol}//${hostname}`;
		}

		// Default fallback
		return '';
	}

	/**
	 * Detect navigation intent from user message
	 * @param {string} message - User's message
	 * @returns {Object} - Navigation intent details
	 */
	detectNavigationIntent(message) {
		const lowerMsg = message.toLowerCase();
		let targetSection = null;
		let shouldNavigate = false;

		// Check for navigation triggers
		const navigationTriggers = ['show', 'go to', 'navigate', 'take me', 'view', 'see', 'open', 'display', 'explore'];
		const hasNavigationTrigger = this.containsAny(lowerMsg, navigationTriggers);

		if (hasNavigationTrigger) {
			// Check each section's patterns
			for (const [section, patterns] of Object.entries(this.navigationPatterns)) {
				if (this.containsAny(lowerMsg, patterns)) {
					targetSection = section;
					shouldNavigate = true;
					break;
				}
			}
		}

		return { shouldNavigate, targetSection };
	}

	/**
	 * Check if a string contains any of the specified terms
	 * @param {string} text - Text to check
	 * @param {Array} terms - Terms to look for
	 * @returns {boolean} - True if any term is found
	 */
	containsAny(text, terms) {
		return terms.some(term => text.includes(term));
	}

	/**
	 * Get a fallback response when API is unavailable
	 * @param {string} userMessage - User's message
	 * @returns {Object} - Response and navigation intent
	 */
	getFallbackResponse(userMessage) {
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);
		const response = this.getContextualResponse(userMessage);

		return { response, shouldNavigate, targetSection };
	}

	/**
	 * Get a contextual response based on the user message and conversation history
	 * This is kept from your original code to serve as a fallback
	 */
	getContextualResponse(userMessage, navigationContext = '') {
		const lowerMsg = userMessage.toLowerCase();
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);

		// Check for navigation intent
		if (shouldNavigate) {
			if (targetSection === 'map') {
				return "I'll take you to the World Map visualization where you can explore Shreyas's journey through education, work, and projects!";
			} else if (targetSection === 'skills') {
				return "Let's check out Shreyas's Skills Tree! He excels in Python (95%), Machine Learning (90%), and Data Engineering (90%). The visualization shows how his skills interconnect across different technology domains.";
			} else if (targetSection === 'projects') {
				return "I'll show you Shreyas's impressive projects. His portfolio includes a Medical Multi-Agent Framework, a Multimodal Video Ad Classifier, an ML-based Glioma Classification system, an Interactive Data Visualization Dashboard, and an NLP-powered Customer Feedback Analysis Tool. Feel free to ask about any specific project!";
			} else if (targetSection === 'experience') {
				return "Let's explore Shreyas's professional experience! He's currently a Data Engineer & AI Developer at Intelligent DataWorks and a Co-Founder at Clau API. He previously worked as an AI Engineer at Chipmonk Technologies and has completed research internships in machine learning applications.";
			} else if (targetSection === 'contact') {
				return "You can contact Shreyas via email at shreyas.atneu@gmail.com. You can also connect with him on LinkedIn at https://www.linkedin.com/in/shreyas-sreenivas-9452a9169/ or check out his GitHub at https://github.com/lambdabypi/. He's always open to discussing collaboration opportunities, research projects, or just connecting with fellow tech enthusiasts!";
			}
		}

		// Handle specific query types
		if (this.containsAny(lowerMsg, ['project', 'work', 'portfolio', 'build', 'created', 'developed'])) {
			return "Shreyas has worked on several impressive projects. His Medical Multi-Agent Framework integrates LLMs with critique mechanisms and achieved 92% alignment with healthcare expertise requirements. His Multimodal Video Ad Classifier analyzes video content with 81.43% human-coder agreement. He's also developed an Interactive Data Visualization Dashboard that transformed complex datasets into intuitive visualizations with D3.js and React, and an NLP-powered Customer Feedback Analysis Tool that achieved 87% sentiment classification accuracy. Would you like me to show you the Projects section?";
		}

		if (this.containsAny(lowerMsg, ['experience', 'job', 'work', 'company', 'position', 'role'])) {
			return "Shreyas currently works as a Data Engineer & AI Developer at Intelligent DataWorks, where he architected an HR management platform that improved system architecture by 30%. He's also a Co-Founder at Clau API, developing financial platforms with AI capabilities. Previously, he was an AI Engineer at Chipmonk Technologies where he built an NLP system that increased client proposal acceptance rates by 25%. He has also completed research internships focusing on applying machine learning to solve real-world problems. Would you like to see more details in the Experience section?";
		}

		// Education queries
		if (this.containsAny(lowerMsg, ['education', 'study', 'degree', 'school', 'university', 'college', 'academic'])) {
			return "Shreyas holds an MS in Data Analytics Engineering from Northeastern University (2023-2025) where he specialized in advanced machine learning applications and big data technologies. His coursework included Deep Learning, Natural Language Processing, and Scalable Data Systems. He also has a BE in AI and ML from BMSIT&M (2019-2023) where he graduated with distinction. During his academic journey, he actively participated in research projects and technical competitions, applying theoretical concepts to practical problems.";
		}

		// Skills and technical knowledge queries
		if (this.containsAny(lowerMsg, ['skills', 'technical', 'programming', 'languages', 'proficiency', 'tech stack'])) {
			return "Shreyas is highly skilled in Python (95%), JavaScript (85%), SQL (90%), and React (80%). He's also proficient in AI/ML technologies like TensorFlow (85%), PyTorch (80%), scikit-learn (90%), and Langchain (85%). His expertise extends to Data Engineering (90%) with tools like Apache Spark and Airflow, Cloud technologies including AWS (80%), Azure (75%), and Docker (85%), and Database technologies such as PostgreSQL, MongoDB, and Redis. He's recently been exploring Large Language Models and prompt engineering for specialized AI applications.";
		}

		// Contact queries
		if (this.containsAny(lowerMsg, ['contact', 'email', 'reach', 'connect', 'message', 'get in touch'])) {
			return "You can contact Shreyas via email at shreyas.atneu@gmail.com. You can also connect with him on LinkedIn at https://www.linkedin.com/in/shreyas-sreenivas-9452a9169/ or check out his GitHub at https://github.com/lambdabypi/. He's always open to discussing collaboration opportunities, research projects, or just connecting with fellow tech enthusiasts! Would you like me to navigate to the Contact section?";
		}

		// About/Bio queries
		if (this.containsAny(lowerMsg, ['about', 'bio', 'who', 'person', 'background', 'tell me about'])) {
			return "Shreyas is a Data Engineer & AI Developer with expertise in AI, machine learning, and data engineering. He holds an MS in Data Analytics Engineering from Northeastern University and has professional experience at companies like Intelligent DataWorks and Chipmonk Technologies. He's passionate about building AI-powered solutions with practical applications, particularly in healthcare and financial sectors. Outside of work, he enjoys participating in hackathons, contributing to open-source projects, and exploring the latest advancements in AI research. Shreyas is driven by the mission to create systems that are both powerful and ethical, making technology more accessible and beneficial for everyone.";
		}

		// Specific project queries
		if (this.containsAny(lowerMsg, ['medical', 'multi-agent', 'healthcare', 'agent', 'llm'])) {
			return "Shreyas's Medical Multi-Agent Framework is a sophisticated system using Python, PyTorch and Langchain that integrates general-purpose and fine-tuned LLMs with critique mechanisms. The project features specialized agents for medical knowledge retrieval, diagnostic reasoning, and treatment planning, all working in coordination. It achieved 92% alignment with healthcare expertise requirements and demonstrates his ability to build complex AI systems for specialized domains. The framework includes RAG (Retrieval-Augmented Generation) capabilities with medical knowledge bases and implements complex prompt engineering techniques to ensure reliable and medically sound outputs.";
		}

		if (this.containsAny(lowerMsg, ['video', 'classifier', 'ad', 'multimodal', 'content analysis'])) {
			return "The Multimodal Video Ad Classifier project analyzes 150 video ads through video frames, text descriptions, and transcriptions using Python, TensorFlow and OpenCV. It achieved an impressive 81.43% agreement with human coders, showing Shreyas's expertise in computer vision and multimodal AI. The system extracts key frames from videos, processes visual content using convolutional neural networks, and combines this with text analysis of transcriptions to provide comprehensive content classification. This tool helps marketing teams quickly categorize video content based on themes, emotional tones, and target demographics.";
		}

		if (this.containsAny(lowerMsg, ['glioma', 'medical', 'classification', 'diagnostic', 'cancer'])) {
			return "Shreyas's ML-based Glioma Classification project is a medical diagnostic tool using Python, scikit-learn and Pandas that classifies glioma patients as LGG or GBM from 862 patient records. The project achieved 99% accuracy with k-NN and Multinomial Naive Bayes algorithms, demonstrating his ability to build high-accuracy medical AI systems. The tool analyzes patient genetic data and clinical information to provide rapid and accurate classification of brain tumor types, potentially accelerating diagnosis and treatment planning. The project included rigorous validation against expert diagnoses and was developed in consultation with medical professionals.";
		}

		if (this.containsAny(lowerMsg, ['visualization', 'dashboard', 'data viz', 'interactive', 'd3'])) {
			return "Shreyas developed an Interactive Data Visualization Dashboard using D3.js, React, and Node.js that transforms complex datasets into intuitive, interactive visualizations. The dashboard features real-time data updates, customizable chart options, and responsive design for various screen sizes. It includes advanced visualization techniques such as network graphs, heatmaps, and geospatial visualizations. The project demonstrates Shreyas's front-end development skills combined with data processing capabilities, allowing users to explore and understand complex data relationships through an intuitive interface.";
		}

		if (this.containsAny(lowerMsg, ['nlp', 'feedback', 'sentiment', 'customer', 'analysis', 'text'])) {
			return "Shreyas's NLP-powered Customer Feedback Analysis Tool uses Python, BERT, and Flask to automatically categorize and extract insights from customer feedback. The system achieves 87% accuracy in sentiment classification and can identify specific product features mentioned in reviews. It includes a user-friendly dashboard that displays sentiment trends, common issues, and actionable insights. This tool helps businesses quickly understand customer perspectives at scale, prioritize improvements, and track sentiment changes over time. The project showcases Shreyas's expertise in natural language processing and creating practical business intelligence solutions.";
		}

		// Technical skills specific queries
		if (this.containsAny(lowerMsg, ['python', 'programming'])) {
			return "Python is Shreyas's strongest programming language (95% proficiency). He's used it extensively in projects like the Medical Multi-Agent Framework and ML-based Glioma Classification, leveraging libraries like PyTorch, TensorFlow, scikit-learn, and Pandas. His Python expertise spans data analysis, machine learning model development, API creation with Flask and FastAPI, and automation scripting. He's also experienced with Python for data engineering tasks using libraries like Apache Airflow and PySpark, and has built custom ETL pipelines for various data processing needs.";
		}

		if (this.containsAny(lowerMsg, ['machine learning', 'ml', 'ai', 'artificial intelligence', 'models', 'deep learning'])) {
			return "Shreyas has extensive experience in Machine Learning and AI (90% proficiency), having worked with technologies like TensorFlow, PyTorch, and scikit-learn. His projects demonstrate expertise in both traditional ML algorithms and modern deep learning approaches. He's implemented various model architectures including CNNs for image processing, RNNs and Transformers for sequential data, and ensemble methods for tabular data. Recently, he's been working with Large Language Models (LLMs) and developing frameworks for their responsible application in specialized domains. His AI expertise includes computer vision, natural language processing, predictive analytics, and multimodal learning systems.";
		}

		if (this.containsAny(lowerMsg, ['data', 'engineering', 'database', 'sql', 'big data'])) {
			return "Shreyas is highly skilled in Data Engineering (90%) and Database Design (85%), with proficiency in SQL (90%). At Intelligent DataWorks, he architected an HR management platform using PostgreSQL, and at Chipmonk Technologies, he built a MySQL database for construction metrics. His data engineering toolkit includes Apache Spark for large-scale data processing, Airflow for workflow orchestration, and experience with both relational databases (PostgreSQL, MySQL) and NoSQL solutions (MongoDB, Redis). He's designed data pipelines that process terabytes of data efficiently and implemented data governance practices to ensure data quality and compliance.";
		}

		if (this.containsAny(lowerMsg, ['cloud', 'aws', 'azure', 'docker', 'deployment', 'devops'])) {
			return "Shreyas has strong cloud computing skills, including AWS (80%), Azure (75%), and Docker (85%). At Clau API, he deployed applications on AWS EC2 and built a CICD pipeline at Chipmonk Technologies, demonstrating his ability to create robust, scalable infrastructure. His cloud expertise includes deploying machine learning models in production environments, setting up data lakes with S3 and Azure Blob Storage, and implementing serverless architectures with AWS Lambda and Azure Functions. He's experienced with containerization using Docker and Kubernetes for managing microservices architectures, and implements Infrastructure as Code principles with tools like Terraform.";
		}

		if (this.containsAny(lowerMsg, ['frontend', 'react', 'javascript', 'web', 'ui', 'ux'])) {
			return "Shreyas is proficient in frontend development with React (80%) and JavaScript (85%). He's created responsive, interactive user interfaces for data visualization dashboards and web applications. His frontend skills include state management with Redux, styling with Tailwind CSS and styled-components, and building accessible, user-friendly interfaces. He emphasizes clean code architecture and component reusability in his frontend work, and has experience integrating REST and GraphQL APIs with frontend applications.";
		}

		if (this.containsAny(lowerMsg, ['llm', 'large language models', 'gpt', 'transformer', 'prompt engineering'])) {
			return "Shreyas has been actively working with Large Language Models (LLMs) and has developed expertise in prompt engineering, fine-tuning, and building applications that leverage these models. His Medical Multi-Agent Framework demonstrates his ability to create specialized LLM applications using frameworks like Langchain. He's experienced with implementing Retrieval-Augmented Generation (RAG) to ground LLM outputs in factual information, designing evaluation frameworks for LLM performance, and developing techniques to ensure responsible and accurate AI generation. His approach focuses on creating practical, domain-specific applications that combine the power of LLMs with structured knowledge bases and specialized validation mechanisms.";
		}

		// Personal questions
		if (this.containsAny(lowerMsg, ['hobby', 'interest', 'free time', 'passion', 'enjoy', 'outside work'])) {
			return "Outside of his professional work, Shreyas is passionate about staying at the cutting edge of AI research and participates regularly in hackathons and coding competitions. He's an active contributor to several open-source projects in the AI and data engineering space. He enjoys technical blogging about AI advancements and has presented at local tech meetups. For balance, he practices mindfulness meditation, enjoys hiking in nature, and is an amateur photographer focusing on urban landscapes. He's also an avid reader of science fiction and books on emerging technologies and their societal impact.";
		}

		if (this.containsAny(lowerMsg, ['research', 'paper', 'publication', 'academic', 'conference'])) {
			return "Shreyas has contributed to research in applied machine learning, particularly in healthcare and natural language processing applications. During his graduate studies, he collaborated on a research project investigating transformer-based models for medical document classification. He's presented findings at university research symposiums and continues to follow academic developments in AI closely. He's particularly interested in the intersection of theoretical AI research and practical applications, and regularly implements ideas from recent research papers in his projects.";
		}

		if (this.containsAny(lowerMsg, ['located', 'location', 'live', 'based', 'where'])) {
			return "Shreyas is currently based in Boston, USA, where he works as a Data Engineer & AI Developer at Intelligent DataWorks. Previously, he was located in Bangalore, India, during his time at Chipmonk Technologies. His experience in both tech hubs has given him a global perspective on technology development and business practices.";
		}

		// Resume/CV queries
		if (this.containsAny(lowerMsg, ['resume', 'cv', 'download', 'pdf'])) {
			return "This portfolio provides a comprehensive overview of Shreyas's skills, projects, and experience. If you're interested in a downloadable resume or want to discuss specific opportunities, I recommend reaching out to him directly through the contact section. His resume details his educational background, professional experience, technical skills, and notable projects with quantifiable achievements.";
		}

		// Default response
		return "I'm here to help you explore Shreyas's portfolio. You can ask about his projects, skills, experience, education, or personal interests. Or I can help you navigate to different sections of the portfolio. What would you like to know?";
	}
}

// Create service instance
const geminiServiceInstance = new GeminiService();

// Export as singleton
export default geminiServiceInstance;