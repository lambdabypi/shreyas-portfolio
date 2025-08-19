// src/services/GeminiService.js

// Portfolio context for better AI responses
const PORTFOLIO_CONTEXT = `
  You are an AI assistant named Gemini Flash 2.5 for Shreyas Sreenivas's interactive portfolio website.
  
  About Shreyas:
  - MS in Data Analytics Engineering from Northeastern University (2023-2025)
  - BE in AI and ML from BMSIT&M (2019-2023)
  - Current position: Data Engineer & AI Developer at Intelligent DataWorks (Jan 2025-Present)
  - Co-Founder and Lead Developer at Clau API (May 2024-Present)
  - Previous role: AI Engineer at Chipmonk Technologies (Sept 2022-Aug 2023)
  
  Projects:
  1. Medical Multi-Agent Framework: A multi-agent system using Python, PyTorch and Langchain that integrates general-purpose and fine-tuned LLMs with critique mechanisms. It achieved 92% alignment with healthcare expertise requirements.
  
  2. Multimodal Video Ad Classifier: Analyzes 150 video ads through video frames, text descriptions, and transcriptions using Python, TensorFlow and OpenCV. It achieved 81.43% agreement with human coders.
  
  3. ML-based Glioma Classification: Medical diagnostic tool using Python, scikit-learn and Pandas that classifies glioma patients as LGG or GBM from 862 patient records. It achieved 99% accuracy with k-NN and Multinomial Naive Bayes.
  
  Skills: 
  - Programming: Python (95%), JavaScript (85%), SQL (90%), React (80%)
  - AI/ML: TensorFlow (85%), PyTorch (80%), scikit-learn (90%), Machine Learning (90%), NLP (85%)
  - Data: Data Engineering (90%), Database Design (85%)
  - Cloud: AWS (80%), Docker (85%)
  
  Experience Details:
  1. Intelligent DataWorks (Jan 2025-Present):
     - Architected HR management platform integrating job operations, applicant tracking using REST API, FastAPI, and PostgreSQL with Pydantic, improving system architecture by 30%.
     - Engineered authentication framework with JWT tokens, bcrypt password hashing, and AWS SES for email verification.
     - Developed HR workflows in Python, Streamlit and PostgreSQL by creating interactive dashboards and implementing AI algorithms.
  
  2. Clau API, Vivytech (May 2024-Present):
     - Architected financial platform using REST API, JWT authentication, and 2FA via TOTP on AWS EC2.
     - Developed financial analysis engine using Cohere-powered AI with specialized prompt engineering and Plaid API integration.
     - Engineered technical infrastructure with React dashboard and GDPR-compliant data management.
  
  3. Chipmonk Technologies (Sept 2022-Aug 2023):
     - Engineered machine-learning model using linear regression to detect tolerance lines from video feeds, enhancing real-time tracking precision by 30%.
     - Constructed MySQL database for storing coordinate data and construction metrics.
     - Built CICD pipeline with TeamCity to automate and analyze testing processes.
  
  Keep your responses concise (2-4 sentences) and conversational. Be helpful and friendly.
`;

class GeminiService {
	constructor() {
		this.initialized = false;
		this.conversationHistory = [];
		this.navigationPatterns = {
			map: ['map', 'world', 'journey', 'timeline', 'path'],
			skills: ['skill', 'ability', 'expertise', 'knowledge', 'proficiency', 'tech'],
			projects: ['project', 'work', 'portfolio', 'showcase', 'creation', 'built'],
			experience: ['experience', 'job', 'career', 'position', 'role', 'employment', 'company', 'workplace']
		};
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

		// In a real implementation with Gemini API, you would:
		// 1. Format the conversation history for the API
		// 2. Make the API request with the proper context
		// 3. Process and return the response

		// Simulated API response
		const response = this.getContextualResponse(userMessage, conversationContext);

		// Add response to history
		this.addToHistory({ role: 'assistant', content: response });

		return response;
	}

	/**
	 * Get a contextual response based on the user message and conversation history
	 * @param {string} userMessage - The user's message
	 * @param {string} navigationContext - Optional navigation context
	 * @returns {string} - The response
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
				return "I'll show you Shreyas's impressive projects. His portfolio includes a Medical Multi-Agent Framework, a Multimodal Video Ad Classifier, and an ML-based Glioma Classification system. Feel free to ask about any specific project!";
			} else if (targetSection === 'experience') {
				return "Let's explore Shreyas's professional experience! He's currently a Data Engineer & AI Developer at Intelligent DataWorks and a Co-Founder at Clau API. He previously worked as an AI Engineer at Chipmonk Technologies.";
			}
		}

		// Handle specific query types
		if (this.containsAny(lowerMsg, ['project', 'work', 'portfolio', 'build'])) {
			return "Shreyas has worked on several impressive projects. His Medical Multi-Agent Framework integrates LLMs with critique mechanisms and achieved 92% alignment with healthcare expertise requirements. His Multimodal Video Ad Classifier analyzes video content with 81.43% human-coder agreement. Would you like me to show you the Projects section?";
		}

		if (this.containsAny(lowerMsg, ['experience', 'job', 'work', 'company', 'position'])) {
			return "Shreyas currently works as a Data Engineer & AI Developer at Intelligent DataWorks, where he architected an HR management platform that improved system architecture by 30%. He's also a Co-Founder at Clau API, developing financial platforms with AI capabilities. Would you like to see more details in the Experience section?";
		}

		if (this.containsAny(lowerMsg, ['skill', 'tech', 'ability', 'know', 'good at'])) {
			return "Shreyas's top skills include Python (95%), Machine Learning (90%), Data Engineering (90%), and SQL (90%). He's proficient with frameworks like TensorFlow (85%), PyTorch (80%), and FastAPI. His expertise spans both AI development and cloud architecture. Want to see his full Skills Tree?";
		}

		if (this.containsAny(lowerMsg, ['education', 'study', 'degree', 'university', 'school', 'college'])) {
			return "Shreyas has an MS in Data Analytics Engineering from Northeastern University (2023-2025) and a BE in AI and ML from BMSIT&M (2019-2023). His education provides a strong foundation in both theoretical and applied aspects of AI and data science. I can show you these on the World Map!";
		}

		if (this.containsAny(lowerMsg, ['contact', 'email', 'reach', 'connect', 'touch', 'linkedin'])) {
			return "You can contact Shreyas via email at shreyas.atneu@gmail.com or connect with him on LinkedIn. He's open to discussing professional opportunities, collaborations, and project ideas in AI, data science, and cloud development.";
		}

		if (this.containsAny(lowerMsg, ['hello', 'hi', 'hey', 'greetings', 'howdy'])) {
			return "Hello! I'm Shreyas's portfolio AI assistant powered by Gemini Flash 2.5. I can tell you about his projects, skills, experience, or help you navigate through his interactive portfolio. What would you like to know?";
		}

		if (this.containsAny(lowerMsg, ['thank', 'thanks', 'appreciate', 'helpful'])) {
			return "You're welcome! I'm happy to help you explore Shreyas's portfolio. Feel free to ask if you'd like to know more about any specific aspect of his work, skills, or experience.";
		}

		if (this.containsAny(lowerMsg, ['who are you', 'what are you', 'about you', 'your name'])) {
			return "I'm an AI assistant for Shreyas's interactive portfolio, powered by Gemini Flash 2.5. I'm designed to help visitors navigate the portfolio and learn about Shreyas's projects, skills, and professional experience in an engaging way.";
		}

		// Handle follow-up questions and conversation context
		if (navigationContext) {
			return `${navigationContext} Feel free to ask me specific questions about what you see!`;
		}

		// Default response
		return "I'm here to help you explore Shreyas's portfolio. You can ask about his projects, skills, experience, or education. Or I can help you navigate to different sections of the portfolio. What would you like to know?";
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
}

// Create service instance
const geminiServiceInstance = new GeminiService();

// Export as singleton
export default geminiServiceInstance;