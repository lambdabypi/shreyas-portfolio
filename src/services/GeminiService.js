// src/services/GeminiService.js
class GeminiService {
	constructor() {
		this.initialized = false;
		this.conversationHistory = [];
		this.navigationPatterns = {
			map: ['map', 'world', 'journey', 'timeline', 'path'],
			skills: ['skill', 'ability', 'expertise', 'knowledge', 'proficiency', 'tech'],
			projects: ['project', 'work', 'portfolio', 'showcase', 'creation', 'built', 'web project', 'regular project'],
			'vr-projects': ['vr', 'virtual reality', 'vr project', 'virtual', 'reality', 'immersive', '3d', 'headset', 'vr work'],
			experience: ['experience', 'job', 'career', 'position', 'role', 'employment', 'company', 'workplace']
		};

		// Log hostname for debugging
		if (typeof window !== 'undefined') {
			console.log('Current hostname:', window.location.hostname);
		}
	}

	/**
	 * Test function to debug navigation detection
	 * @param {string} testMessage - Message to test
	 */
	testNavigationDetection(testMessage) {
		console.log(`🧪 Testing navigation detection for: "${testMessage}"`);

		const lowerMsg = testMessage.toLowerCase();
		console.log(`📝 Lowercase message: "${lowerMsg}"`);

		// Check for navigation triggers
		const navigationTriggers = ['show', 'go to', 'navigate', 'take me', 'view', 'see', 'open', 'display', 'explore'];
		const hasNavigationTrigger = this.containsAny(lowerMsg, navigationTriggers);
		console.log(`🎯 Has navigation trigger: ${hasNavigationTrigger}`);

		if (hasNavigationTrigger) {
			// Check for VR-specific keywords first
			if (this.containsAny(lowerMsg, this.navigationPatterns['vr-projects'])) {
				console.log(`🔍 VR keywords detected:`, this.navigationPatterns['vr-projects']);
				return { shouldNavigate: true, targetSection: 'vr-projects' };
			}

			// Check other sections
			for (const [section, patterns] of Object.entries(this.navigationPatterns)) {
				if (section !== 'vr-projects') {
					const matches = this.containsAny(lowerMsg, patterns);
					console.log(`🔍 Section ${section} patterns:`, patterns, `- Matches: ${matches}`);
					if (matches) {
						console.log(`✅ Navigation detected for section: ${section}`);
						return { shouldNavigate: true, targetSection: section };
					}
				}
			}
		}

		console.log(`❌ No navigation detected`);
		return { shouldNavigate: false, targetSection: null };
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
		console.log(`🔍 GeminiService: Detecting navigation intent for "${userMessage}"`);
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);
		console.log(`🔍 GeminiService: Navigation result:`, { shouldNavigate, targetSection });

		try {
			// Get the base URL - this is crucial for cross-origin requests
			const baseUrl = this.getApiBaseUrl();
			const apiUrl = `${baseUrl}/api/gemini`;

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

			console.log(`✅ GeminiService: Returning API response with navigation:`, { shouldNavigate, targetSection });
			return { response: generatedText, shouldNavigate, targetSection };
		} catch (error) {
			console.error('Error calling Gemini API:', error);
			console.log('🔄 GeminiService: Falling back to local response');

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
			// Check for VR-specific keywords first (more specific)
			if (this.containsAny(lowerMsg, this.navigationPatterns['vr-projects'])) {
				targetSection = 'vr-projects';
				shouldNavigate = true;
			}
			// Then check other sections
			else {
				for (const [section, patterns] of Object.entries(this.navigationPatterns)) {
					if (section !== 'vr-projects' && this.containsAny(lowerMsg, patterns)) {
						targetSection = section;
						shouldNavigate = true;
						break;
					}
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
		console.log(`🔄 GeminiService: Using fallback response for "${userMessage}"`);
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);
		const response = this.getContextualResponse(userMessage);

		console.log(`🔄 GeminiService: Fallback navigation result:`, { shouldNavigate, targetSection });
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
				return "Let's check out Shreyas's Skills Tree! He excels in Python (95%), Machine Learning (90%), and Data Engineering (90%). The visualization shows how his skills interconnect.";
			} else if (targetSection === 'projects') {
				return "I'll show you Shreyas's web development projects! His portfolio includes a Medical Multi-Agent Framework, a Multimodal Video Ad Classifier, and an ML-based Glioma Classification system. Feel free to ask about any specific project!";
			} else if (targetSection === 'vr-projects') {
				return "Let me show you Shreyas's VR projects! He's created immersive virtual reality experiences and 3D applications. You'll be able to explore his VR portfolio and see his work in virtual environments!";
			} else if (targetSection === 'experience') {
				return "Let's explore Shreyas's professional experience! He's currently a Data Engineer & AI Developer at Intelligent DataWorks and a Co-Founder at Clau API. He previously worked as an AI Engineer at Chipmonk Technologies.";
			}
		}

		// Handle specific query types
		if (this.containsAny(lowerMsg, ['vr', 'virtual reality', 'immersive', '3d', 'headset'])) {
			return "Shreyas has worked on several VR and immersive technology projects! His VR portfolio showcases his expertise in creating virtual reality experiences and 3D applications. Would you like me to show you the VR Projects section?";
		}

		if (this.containsAny(lowerMsg, ['project', 'work', 'portfolio', 'build']) && !this.containsAny(lowerMsg, ['vr', 'virtual reality', 'immersive', '3d'])) {
			return "Shreyas has worked on several impressive projects. His Medical Multi-Agent Framework integrates LLMs with critique mechanisms and achieved 92% alignment with healthcare expertise requirements. His Multimodal Video Ad Classifier analyzes video content with 81.43% human-coder agreement. Would you like me to show you the Projects section?";
		}

		if (this.containsAny(lowerMsg, ['experience', 'job', 'work', 'company', 'position'])) {
			return "Shreyas currently works as a Data Engineer & AI Developer at Intelligent DataWorks, where he architected an HR management platform that improved system architecture by 30%. He's also a Co-Founder at Clau API, developing financial platforms with AI capabilities. Would you like to see more details in the Experience section?";
		}

		// Education queries
		if (this.containsAny(lowerMsg, ['education', 'study', 'degree', 'school', 'university', 'college', 'academic'])) {
			return "Shreyas holds an MS in Data Analytics Engineering from Northeastern University (2023-2025) and a BE in AI and ML from BMSIT&M (2019-2023). His academic background combines strong fundamentals in AI with advanced data analytics skills.";
		}

		// Skills and technical knowledge queries
		if (this.containsAny(lowerMsg, ['skills', 'technical', 'programming', 'languages', 'proficiency'])) {
			return "Shreyas is highly skilled in Python (95%), JavaScript (85%), SQL (90%), and React (80%). He's also proficient in AI/ML technologies like TensorFlow (85%), PyTorch (80%), and scikit-learn (90%), with expertise in Data Engineering (90%) and Cloud technologies like AWS (80%) and Docker (85%).";
		}

		// Contact queries
		if (this.containsAny(lowerMsg, ['contact', 'email', 'reach', 'connect', 'message', 'get in touch'])) {
			return "You can contact Shreyas via email at shreyas.atneu@gmail.com. You can also connect with him on LinkedIn or check out his projects on GitHub. Would you like me to navigate to the Contact section?";
		}

		// About/Bio queries
		if (this.containsAny(lowerMsg, ['about', 'bio', 'who', 'person', 'background', 'tell me about'])) {
			return "Shreyas is a Data Engineer & AI Developer with expertise in AI, machine learning, and data engineering. He holds an MS in Data Analytics Engineering and has professional experience at companies like Intelligent DataWorks and Chipmonk Technologies. He's passionate about building AI-powered solutions with practical applications.";
		}

		// Specific project queries
		if (this.containsAny(lowerMsg, ['medical', 'multi-agent', 'healthcare', 'agent'])) {
			return "Shreyas's Medical Multi-Agent Framework is a sophisticated system using Python, PyTorch and Langchain that integrates general-purpose and fine-tuned LLMs with critique mechanisms. The project achieved 92% alignment with healthcare expertise requirements and demonstrates his ability to build complex AI systems for specialized domains.";
		}

		if (this.containsAny(lowerMsg, ['video', 'classifier', 'ad', 'multimodal'])) {
			return "The Multimodal Video Ad Classifier project analyzes 150 video ads through video frames, text descriptions, and transcriptions using Python, TensorFlow and OpenCV. It achieved an impressive 81.43% agreement with human coders, showing Shreyas's expertise in computer vision and multimodal AI.";
		}

		if (this.containsAny(lowerMsg, ['glioma', 'medical', 'classification', 'diagnostic'])) {
			return "Shreyas's ML-based Glioma Classification project is a medical diagnostic tool using Python, scikit-learn and Pandas that classifies glioma patients as LGG or GBM from 862 patient records. The project achieved 99% accuracy with k-NN and Multinomial Naive Bayes algorithms, demonstrating his ability to build high-accuracy medical AI systems.";
		}

		// Technical skills specific queries
		if (this.containsAny(lowerMsg, ['python', 'programming'])) {
			return "Python is Shreyas's strongest programming language (95% proficiency). He's used it extensively in projects like the Medical Multi-Agent Framework and ML-based Glioma Classification, leveraging libraries like PyTorch, TensorFlow, scikit-learn, and Pandas.";
		}

		if (this.containsAny(lowerMsg, ['machine learning', 'ml', 'ai', 'artificial intelligence', 'models'])) {
			return "Shreyas has extensive experience in Machine Learning and AI (90% proficiency), having worked with technologies like TensorFlow, PyTorch, and scikit-learn. His projects demonstrate expertise in both traditional ML algorithms and modern deep learning approaches.";
		}

		if (this.containsAny(lowerMsg, ['data', 'engineering', 'database', 'sql'])) {
			return "Shreyas is highly skilled in Data Engineering (90%) and Database Design (85%), with proficiency in SQL (90%). At Intelligent DataWorks, he architected an HR management platform using PostgreSQL, and at Chipmonk Technologies, he built a MySQL database for construction metrics.";
		}

		if (this.containsAny(lowerMsg, ['cloud', 'aws', 'docker', 'deployment'])) {
			return "Shreyas has strong cloud computing skills, including AWS (80%) and Docker (85%). At Clau API, he deployed applications on AWS EC2 and built a CICD pipeline at Chipmonk Technologies, demonstrating his ability to create robust, scalable infrastructure.";
		}

		// Personal questions
		if (this.containsAny(lowerMsg, ['hobby', 'interest', 'free time', 'passion', 'enjoy'])) {
			return "While Shreyas is passionate about AI and technology, he also values maintaining a well-rounded life with interests outside of work. For specific details about his personal hobbies and interests, you might want to connect with him directly through the contact section.";
		}

		if (this.containsAny(lowerMsg, ['located', 'location', 'live', 'based', 'where'])) {
			return "Shreyas is currently based in Boston, USA, where he works as a Data Engineer & AI Developer at Intelligent DataWorks. Previously, he was located in Bangalore, India, during his time at Chipmonk Technologies.";
		}

		// Resume/CV queries
		if (this.containsAny(lowerMsg, ['resume', 'cv', 'download', 'pdf'])) {
			return "This portfolio provides a comprehensive overview of Shreyas's skills, projects, and experience. If you're interested in a downloadable resume or want to discuss specific opportunities, I recommend reaching out to him directly through the contact section.";
		}

		// Default response
		return "I'm here to help you explore Shreyas's portfolio. You can ask about his projects, skills, experience, or education. Or I can help you navigate to different sections of the portfolio. What would you like to know?";
	}
}

// Create service instance
const geminiServiceInstance = new GeminiService();

// Export as singleton
export default geminiServiceInstance;