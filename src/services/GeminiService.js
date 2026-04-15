// src/services/GeminiService.js
class GeminiService {
	constructor() {
		this.initialized = false;
		this.conversationHistory = [];
	}

	addToHistory(message) {
		this.conversationHistory.push(message);
		if (this.conversationHistory.length > 10) this.conversationHistory.shift();
	}

	async generateResponse(userMessage, conversationContext = []) {
		this.addToHistory({ role: 'user', content: userMessage });

		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);

		try {
			const baseUrl = this.getApiBaseUrl();
			const apiUrl = `${baseUrl}/api/gemini`;

			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: userMessage,
					history: this.conversationHistory,
					personality: 'dog'
				})
			});

			if (!response.ok) throw new Error(`API request failed: ${response.status}`);

			const data = await response.json();
			const generatedText = data.message;
			const mood = data.mood || this.determineMoodFromResponse(generatedText);

			this.addToHistory({ role: 'assistant', content: generatedText });

			return { response: generatedText, shouldNavigate, targetSection, mood };
		} catch (error) {
			console.error('Error calling Gemini API, using fallback:', error);
			return this.getDogFallbackResponse(userMessage);
		}
	}

	getApiBaseUrl() {
		if (typeof window !== 'undefined') {
			const { protocol, hostname, port } = window.location;
			if (hostname === 'localhost' || hostname === '127.0.0.1')
				return `${protocol}//${hostname}:${port}`;
			return `${protocol}//${hostname}`;
		}
		return '';
	}

	/**
	 * Detect which portfolio section the user wants to navigate to.
	 * Compound phrases are checked FIRST to prevent ambiguous substring matches
	 * (e.g. "work experience" must not match the 'projects' section via the word "work").
	 */
	detectNavigationIntent(message) {
		const lowerMsg = message.toLowerCase();

		// ── 1. Compound-phrase priority (most specific first) ──────────────────
		const COMPOUND = [
			{ phrases: ['work experience', 'job experience', 'career experience', 'work history', 'where has shreyas worked'], section: 'experience' },
			{ phrases: ['vr project', 'virtual reality', 'mixed reality', 'xr project', 'immersive project'], section: 'vr-projects' },
			{ phrases: ['download resume', 'see resume', 'view resume', 'get resume', 'find resume', 'the resume', 'his resume', 'show resume', 'resume download', 'cv download', 'download cv'], section: 'experience' },
			{ phrases: ['get in touch', 'contact info', 'reach out', 'contact page', 'contact shreyas'], section: 'contact' },
			{ phrases: ['tech stack', 'skill set', 'what skills', 'his skills', 'shreyas skills'], section: 'skills' },
		];

		for (const { phrases, section } of COMPOUND) {
			if (phrases.some(p => lowerMsg.includes(p))) {
				return { shouldNavigate: true, targetSection: section };
			}
		}

		// ── 2. Require a navigation-intent trigger ──────────────────────────────
		const NAV_VERBS = ['show', 'go to', 'navigate', 'take me', 'open', 'explore', 'display'];
		const IMPLICIT  = [
			'tell me about', 'what about', 'about his',
			"shreyas's", 'his projects', 'his experience',
			'his interests', 'his work',
		];

		const hasIntent = NAV_VERBS.some(t => lowerMsg.includes(t)) ||
		                  IMPLICIT.some(t => lowerMsg.includes(t));

		if (!hasIntent) return { shouldNavigate: false, targetSection: null };

		// ── 3. Single-word section patterns (safest → most specific first) ─────
		const PATTERNS = [
			{ terms: ['vr', 'immersive', 'headset', 'virtual', '3d experience'], section: 'vr-projects' },
			{ terms: ['experience', 'job', 'career', 'employment', 'company', 'vivytech', 'chipmonk', 'dataworks'], section: 'experience' },
			{ terms: ['skill', 'ability', 'expertise', 'proficiency', 'programming language'], section: 'skills' },
			{ terms: ['interest', 'hobby', 'hobbies', 'travel', 'outside work', 'personal side'], section: 'interests' },
			{ terms: ['contact', 'email', 'reach', 'hire', 'linkedin'], section: 'contact' },
			{ terms: ['project', 'portfolio', 'miniquest', 'atlas', 'glioma', 'showcase'], section: 'projects' },
		];

		for (const { terms, section } of PATTERNS) {
			if (terms.some(t => lowerMsg.includes(t))) {
				return { shouldNavigate: true, targetSection: section };
			}
		}

		return { shouldNavigate: false, targetSection: null };
	}

	determineMoodFromResponse(response) {
		const r = response.toLowerCase();
		if (r.includes('excited') || r.includes('woof') || r.includes('tail wagging')) return 'excited';
		if (r.includes('curious') || r.includes('tilts head') || r.includes('sniff')) return 'curious';
		if (r.includes('proud') || r.includes('amazing')) return 'proud';
		if (r.includes('playful') || r.includes('spins') || r.includes('runs')) return 'playful';
		return 'happy';
	}

	containsAny(text, terms) {
		return terms.some(term => text.includes(term));
	}

	getDogFallbackResponse(userMessage) {
		const { shouldNavigate, targetSection } = this.detectNavigationIntent(userMessage);
		const { response, mood } = this.getDogContextualResponse(userMessage, shouldNavigate, targetSection);
		return { response, shouldNavigate, targetSection, mood };
	}

	getDogContextualResponse(userMessage, shouldNavigate, targetSection) {
		const lowerMsg = userMessage.toLowerCase();

		// Compliments
		if (this.containsAny(lowerMsg, ['good boy', 'good dog', 'good fido', 'such a good'])) {
			return { response: "Woof woof! *tail wagging intensifies* 🐕 Thank you so much! That makes me SO happy! *spins in circles* I'm trying my best to help you learn about my amazing human Shreyas! *happy panting*", mood: 'excited' };
		}

		// Greetings
		if (this.containsAny(lowerMsg, ['hello', 'hi there', 'hey there', 'good morning', 'good afternoon', 'howdy'])) {
			return { response: "Woof! *happy barking* 🐕 Hello there! I'm SO excited to see you! *tail wagging* How can I help you learn about my human Shreyas today? I know everything about his amazing work! *happy panting*", mood: 'excited' };
		}

		// Navigation responses
		if (shouldNavigate) {
			if (targetSection === 'projects') return { response: "Arf arf! *excited barking* 🐕 Shreyas has built some pawsome things — MiniQuest AI planner, ATLAS clinical platform, and more! *runs around excitedly* Taking you to his projects now! *happy bouncing*", mood: 'excited' };
			if (targetSection === 'vr-projects') return { response: "*sniff sniff* 🐾 VR projects? Those are super cool! *tilts head* Shreyas creates amazing immersive experiences in Unity and mixed reality! I wish I could fetch sticks in VR! Let me show you! *playful barking*", mood: 'curious' };
			if (targetSection === 'skills') return { response: "Woof! *sits like a good boy* 🏆 My human is SO skilled! *proud stance* Python at 95%, SQL at 90%, LangGraph, FastAPI — he's basically a superhero! Let me show you his full skills tree! *excited panting*", mood: 'proud' };
			if (targetSection === 'experience') return { response: "*happy barking* 🐕 Shreyas has had amazing jobs! He's a Full-Stack AI Engineer at Vivytech and an AI/ML Engineer at Intelligent DataWorks! *tail wagging* His resume is in this section too! *spins with pride*", mood: 'proud' };
			if (targetSection === 'interests') return { response: "Woof woof! *playful bouncing* 🎾 Interests? I LOVE this topic! *spins excitedly* Shreyas is into VR, music, and travel — and of course, he has ME, his adorable dog assistant! *happy panting*", mood: 'playful' };
			if (targetSection === 'contact') return { response: "Woof! *helpful panting* ✉️ Want to reach Shreyas? His contact section has email, LinkedIn, and GitHub! *tail wagging* He loves hearing from people — let me take you there! *happy bark*", mood: 'happy' };
		}

		// Resume / download
		if (this.containsAny(lowerMsg, ['resume', 'cv', 'curriculum vitae'])) {
			return { response: "*helpful tail wag* 📄 Shreyas's resume is in the Experience section — there's a download button right there! *excited bark* It covers Vivytech, Intelligent DataWorks, and Chipmonk! Taking you there now! *happy panting*", mood: 'happy' };
		}

		// Contact
		if (this.containsAny(lowerMsg, ['contact', 'email', 'reach', 'hire', 'get in touch'])) {
			return { response: "Woof! *helpful panting* 📧 You can reach Shreyas at shreyas.atneu@gmail.com! *tail wagging* He's also on LinkedIn and GitHub. Want me to take you to his contact page? *helpful bark*", mood: 'happy' };
		}

		// Tech-specific
		if (this.containsAny(lowerMsg, ['python', 'programming language', 'coding'])) {
			return { response: "Arf! *excited tail wagging* 🐕 Python is my human's FAVORITE language — 95% skill level! *happy panting* He uses it for all his AI projects, FastAPI backends, and ML models. Not about actual snakes though, thank goodness! *playful bark*", mood: 'excited' };
		}

		if (this.containsAny(lowerMsg, ['machine learning', 'artificial intelligence', 'neural', 'deep learning', 'langgraph', 'langchain'])) {
			return { response: "*tilts head curiously* 🤖 Machine Learning is like teaching computers tricks — just like I learned to sit and fetch! *proud stance* Shreyas is 90% skilled here and has built multi-agent LLM pipelines! *happy barking*", mood: 'curious' };
		}

		if (this.containsAny(lowerMsg, ['miniquest', 'adventure', 'itinerary', 'travel planner'])) {
			return { response: "Woof! *excited spinning* 🚀 MiniQuest is Shreyas's coolest project! *proud panting* It's a 6-agent LangGraph pipeline that generates real-time travel itineraries with Google Maps and RAG personalization! ~4 second response on warm cache! *tail wagging proudly*", mood: 'excited' };
		}

		if (this.containsAny(lowerMsg, ['atlas', 'clinical', 'medical diagnosis', 'healthcare platform'])) {
			return { response: "*serious but excited* 🏥 ATLAS is Shreyas's clinical decision support platform! *proud panting* It uses Google Gemini for generative diagnosis assistance — basically a super-smart medical assistant! *tail wagging*", mood: 'proud' };
		}

		if (this.containsAny(lowerMsg, ['medical framework', 'multi-agent', 'phi 3.5', 'fine-tun'])) {
			return { response: "Woof! *serious but excited* 🏥 Shreyas built a Medical Multi-Agent Framework that fine-tunes Phi 3.5 Mini! *proud panting* It achieved 92% alignment with healthcare expertise requirements! So impressive! *tail wagging proudly*", mood: 'proud' };
		}

		if (this.containsAny(lowerMsg, ['video classifier', 'video ad classifier', 'multimodal'])) {
			return { response: "*sniff sniff* 📺 The Video Ad Classifier is super cool! *curious head tilt* Shreyas taught computers to watch and understand 150 video ads — kind of like how I can tell the mailman from a squirrel! It got 81.43% agreement with humans! *excited barking*", mood: 'curious' };
		}

		if (this.containsAny(lowerMsg, ['glioma', 'cancer', 'medical classification', 'knn', 'naive bayes'])) {
			return { response: "Woof! 🔬 *proud stance* The Glioma Classification system uses k-NN and Naive Bayes on 862 patient records and got 99% accuracy! *impressed bark* That's like getting 99 treats out of 100 — almost perfect! *happy panting*", mood: 'proud' };
		}

		if (this.containsAny(lowerMsg, ['who are you', 'what are you', 'fido', 'tell me about yourself'])) {
			return { response: "Woof woof! *excited bouncing* 🐕 I'm Fido! Shreyas's loyal dog and portfolio assistant! *tail wagging intensifies* I know everything about my human — his projects, skills, experience, everything! Ask me anything! *happy panting*", mood: 'excited' };
		}

		if (this.containsAny(lowerMsg, ['who is shreyas', 'about shreyas', 'tell me about shreyas'])) {
			return { response: "*sits attentively* 🐕 My incredible human Shreyas is a software engineer and AI builder finishing his MS at Northeastern! *proud tail wagging* He ships production apps, builds multi-agent LLM systems, and loves VR. I'm so proud to be his companion! *happy panting*", mood: 'proud' };
		}

		// Default
		return {
			response: "*tilts head curiously* 🐕 That's an interesting question! *sniff sniff* I'm here to help you learn about my amazing human Shreyas! Ask me about his projects, skills, experience, or how to contact him! What would you like to know? *tail wagging encouragingly*",
			mood: 'curious'
		};
	}
}

const geminiServiceInstance = new GeminiService();
export default geminiServiceInstance;
