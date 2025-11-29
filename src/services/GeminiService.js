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
			experience: ['experience', 'job', 'career', 'position', 'role', 'employment', 'company', 'workplace'],
			interests: ['interests', 'hobby', 'hobbies', 'personal', 'fun', 'travel', 'dog', 'pet']
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
	 * Generate a response based on conversation context with dog personality
	 * @param {string} userMessage - The user's message
	 * @param {Array} conversationContext - Optional previous messages for context
	 * @returns {Object} - The generated response with mood and navigation intent
	 */
	async generateResponse(userMessage, conversationContext = []) {
		// Add user message to history
		this.addToHistory({ role: 'user', content: userMessage });

		// Check for navigation intents
		console.log(`🔍 GeminiService: Detecting navigation intent for "${userMessage}"`);
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);
		console.log(`🔍 GeminiService: Navigation result:`, { shouldNavigate, targetSection });

		try {
			// Get the base URL - this is crucial for cross-origin requests
			const baseUrl = this.getApiBaseUrl();
			const apiUrl = `${baseUrl}/api/gemini`;

			console.log('Calling API at:', apiUrl);

			// Call the serverless function with dog personality context
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: userMessage,
					history: this.conversationHistory,
					personality: 'dog' // Add personality flag for the API
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

			// Extract the generated text and mood
			const generatedText = data.message;
			const mood = data.mood || this.determineMoodFromResponse(generatedText);

			// Add response to history
			this.addToHistory({ role: 'assistant', content: generatedText });

			console.log(`✅ GeminiService: Returning API response with navigation:`, { shouldNavigate, targetSection });
			return {
				response: generatedText,
				shouldNavigate,
				targetSection,
				mood
			};
		} catch (error) {
			console.error('Error calling Gemini API:', error);
			console.log('🔄 GeminiService: Falling back to local response');

			// Fallback to dog-themed local response if API fails
			return this.getDogFallbackResponse(userMessage);
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

		// Check for explicit navigation triggers
		const navigationTriggers = ['show', 'go to', 'navigate', 'take me', 'view', 'see', 'open', 'display', 'explore'];
		const hasNavigationTrigger = this.containsAny(lowerMsg, navigationTriggers);

		// Check for implicit navigation phrases
		const implicitTriggers = [
			'tell me about', 'what about', 'about his', 'about her', 'about their',
			'his experience', 'her experience', 'their experience',
			'his projects', 'her projects', 'their projects',
			'his skills', 'her skills', 'their skills',
			'his work', 'her work', 'their work',
			'his interests', 'her interests', 'their interests'
		];
		const hasImplicitTrigger = this.containsAny(lowerMsg, implicitTriggers);

		if (hasNavigationTrigger || hasImplicitTrigger) {
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
	 * Determine mood from response content
	 * @param {string} response - The response text
	 * @returns {string} - The determined mood
	 */
	determineMoodFromResponse(response) {
		const lowerResponse = response.toLowerCase();

		if (lowerResponse.includes('excited') || lowerResponse.includes('woof') || lowerResponse.includes('*tail wagging*')) {
			return 'excited';
		}
		if (lowerResponse.includes('curious') || lowerResponse.includes('*tilts head*') || lowerResponse.includes('*sniff*')) {
			return 'curious';
		}
		if (lowerResponse.includes('proud') || lowerResponse.includes('good boy') || lowerResponse.includes('amazing')) {
			return 'proud';
		}
		if (lowerResponse.includes('playful') || lowerResponse.includes('*spins*') || lowerResponse.includes('*runs*')) {
			return 'playful';
		}

		return 'happy';
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
	 * Get a dog-themed fallback response when API is unavailable
	 * @param {string} userMessage - User's message
	 * @returns {Object} - Response with dog personality, navigation intent, and mood
	 */
	getDogFallbackResponse(userMessage) {
		console.log(`🔄 GeminiService: Using dog-themed fallback response for "${userMessage}"`);
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);
		const { response, mood } = this.getDogContextualResponse(userMessage);

		console.log(`🔄 GeminiService: Fallback navigation result:`, { shouldNavigate, targetSection });
		return { response, shouldNavigate, targetSection, mood };
	}

	/**
	 * Get a dog-themed contextual response based on the user message
	 * @param {string} userMessage - The user's message
	 * @returns {Object} - Response text and mood
	 */
	getDogContextualResponse(userMessage) {
		const lowerMsg = userMessage.toLowerCase();
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);

		// Handle "good boy" compliments
		if (this.containsAny(lowerMsg, ['good boy', 'good dog', 'good fido', 'such a good'])) {
			return {
				response: "Woof woof! *tail wagging intensifies* 🐕 Thank you so much! That makes me so happy! *spins in circles with excitement* I'm trying my best to help you learn about my amazing human Shreyas! *happy panting*",
				mood: 'excited'
			};
		}

		// Handle greetings
		if (this.containsAny(lowerMsg, ['hello', 'hi', 'hey', 'woof', 'good morning', 'good afternoon'])) {
			return {
				response: "Woof! *happy barking* 🐕 Hello there! I'm SO excited to see you! *tail wagging* How can I help you learn about my human Shreyas today? I know everything about his amazing work! *happy panting*",
				mood: 'excited'
			};
		}

		// Check for navigation intent responses
		if (shouldNavigate) {
			if (targetSection === 'projects') {
				return {
					response: "Arf arf! *excited barking* 🐕 Oh boy oh boy! I LOVE talking about Shreyas's projects! *runs around excitedly* He's built some pawsome things - like his Medical Multi-Agent Framework and Video Ad Classifier! Let me take you there! *happy bouncing*",
					mood: 'excited'
				};
			} else if (targetSection === 'vr-projects') {
				return {
					response: "*sniff sniff* 🐾 VR projects? Those are super cool! *tilts head curiously* Shreyas creates these amazing virtual worlds and 3D experiences! I wish I could fetch sticks in VR! Let me show you! *playful barking*",
					mood: 'curious'
				};
			} else if (targetSection === 'skills') {
				return {
					response: "Woof! *sits like a good boy* 🏆 My human is SO skilled! *proud stance* He's got 95% Python skills - that's like being able to fetch 95 out of 100 tennis balls! And his Machine Learning skills are at 90%! Let me show you his skills tree! *excited panting*",
					mood: 'proud'
				};
			} else if (targetSection === 'experience') {
				return {
					response: "*happy barking* 🐕 Shreyas has had such amazing jobs! *tail wagging* He's currently a Data Engineer & AI Developer at Intelligent DataWorks, and he co-founded Clau API! I'm so proud of him! *spins with pride* Let's go see all his experience!",
					mood: 'proud'
				};
			} else if (targetSection === 'interests') {
				return {
					response: "Woof woof! *playful bouncing* 🎾 Interests and hobbies? I LOVE this topic! *spins excitedly* Did you know Shreyas loves to travel? And of course, he has ME - his adorable dog companion! Let me show you all the fun stuff! *happy panting*",
					mood: 'playful'
				};
			}
		}

		// Handle specific content queries with dog personality
		if (this.containsAny(lowerMsg, ['python', 'programming', 'code'])) {
			return {
				response: "Arf! *excited tail wagging* 🐕 Python is my human's FAVORITE language! He's 95% skilled at it - that's like being the best stick-fetching dog in the park! *happy panting* He uses it for all his AI projects. It's not about snakes though, which is good because I might want to chase them! *playful bark*",
				mood: 'excited'
			};
		}

		if (this.containsAny(lowerMsg, ['machine learning', 'ml', 'ai', 'artificial intelligence'])) {
			return {
				response: "*tilts head curiously* 🤖 Machine Learning is like teaching computers to be smart like dogs! *proud stance* My human Shreyas is 90% skilled at this - he can make computers learn tricks just like I learned to sit and fetch! His projects use TensorFlow and PyTorch! *happy barking*",
				mood: 'curious'
			};
		}

		if (this.containsAny(lowerMsg, ['medical', 'healthcare', 'multi-agent'])) {
			return {
				response: "Woof! *serious but excited* 🏥 Shreyas built this amazing Medical Multi-Agent Framework! *proud panting* It's like having multiple smart dogs working together to help doctors! It achieved 92% alignment - that's like getting 92 out of 100 treats for good behavior! So impressive! *tail wagging proudly*",
				mood: 'proud'
			};
		}

		if (this.containsAny(lowerMsg, ['video', 'classifier', 'ad'])) {
			return {
				response: "*sniff sniff* 📺 The Video Ad Classifier is super cool! *curious head tilt* Shreyas taught computers to watch videos and understand them - kind of like how I can tell the difference between the mailman and a squirrel! It got 81.43% agreement with humans! *excited barking*",
				mood: 'curious'
			};
		}

		if (this.containsAny(lowerMsg, ['contact', 'email', 'reach'])) {
			return {
				response: "Woof! *helpful panting* 📧 You can reach my amazing human at shreyas.atneu@gmail.com! *tail wagging* He loves hearing from people! You can also find him on LinkedIn or GitHub. I'll make sure he sees your message! *happy barking*",
				mood: 'helpful'
			};
		}

		if (this.containsAny(lowerMsg, ['about', 'who', 'tell me about shreyas'])) {
			return {
				response: "*sits attentively* 🐕 Let me tell you about my incredible human! *proud tail wagging* Shreyas is a Data Engineer & AI Developer who's passionate about building amazing AI solutions! He has a Master's in Data Analytics Engineering and works at Intelligent DataWorks. I'm so proud to be his companion! *happy panting*",
				mood: 'proud'
			};
		}

		if (this.containsAny(lowerMsg, ['you', 'fido', 'dog', 'who are you'])) {
			return {
				response: "Woof woof! *excited bouncing* 🐕 I'm Fido! I'm Shreyas's loyal dog and portfolio assistant! *tail wagging intensifies* I know everything about my human - his projects, skills, experience, and all his amazing work! I love helping visitors learn about him! *happy panting* Ask me anything!",
				mood: 'excited'
			};
		}

		// Default enthusiastic response
		return {
			response: "*tilts head curiously* 🐕 That's an interesting question! *sniff sniff* Let me think about that... *happy panting* I'm here to help you learn all about my amazing human Shreyas! You can ask me about his projects, skills, experience, or anything else! What would you like to know? *tail wagging encouragingly*",
			mood: 'curious'
		};
	}
}

// Create service instance
const geminiServiceInstance = new GeminiService();

// Export as singleton
export default geminiServiceInstance;