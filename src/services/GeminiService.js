// src/services/GeminiService.js
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

		// For debugging purposes
		console.log('GeminiService initialized, window.location:',
			window.location ? {
				host: window.location.host,
				hostname: window.location.hostname,
				pathname: window.location.pathname,
				protocol: window.location.protocol
			} : 'Not available');
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
			// Use absolute URL for testing
			const apiUrl = 'https://shreyas-portfolio-gold.vercel.app/api/gemini';
			console.log('Calling API at:', apiUrl); // Debug log

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

			// Log response status for debugging
			console.log('API response status:', response.status);

			if (!response.ok) {
				// Try to get error text if available
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
			console.log('API response data received');

			// Extract the generated text
			const generatedText = data.message;

			// Add response to history
			this.addToHistory({ role: 'assistant', content: generatedText });

			return { response: generatedText, shouldNavigate, targetSection };
		} catch (error) {
			console.error('Error calling Gemini API:', error);
			// Log detailed error info
			console.error('Error details:', {
				message: error.message,
				stack: error.stack,
				time: new Date().toISOString()
			});

			// Fallback to your existing method if API fails
			console.log('Using fallback response method');
			return this.getFallbackResponse(userMessage);
		}
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

		// Keep all your other existing fallback responses

		// Default response
		return "I'm here to help you explore Shreyas's portfolio. You can ask about his projects, skills, experience, or education. Or I can help you navigate to different sections of the portfolio. What would you like to know?";
	}
}

// Create service instance
const geminiServiceInstance = new GeminiService();

// Export as singleton
export default geminiServiceInstance;