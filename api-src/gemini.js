// api-src/gemini.js

// Use native fetch instead of node-fetch for Node.js v18+
// export const config = {
//   runtime: 'nodejs'
// };

export default async function handler(req, res) {
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	);

	// Handle preflight OPTIONS request
	if (req.method === 'OPTIONS') {
		console.log('Handling OPTIONS preflight request');
		res.status(200).end();
		return;
	}

	// Only allow POST requests
	if (req.method !== 'POST') {
		console.log(`Method not allowed: ${req.method}`);
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	try {
		console.log('Processing Gemini API request');
		const { message, history = [], personality = 'dog' } = req.body;

		// Verify required data
		if (!message) {
			console.log('Missing required field: message');
			return res.status(400).json({ error: 'Message is required' });
		}

		const PORTFOLIO_CONTEXT = `
			You are Fido, Shreyas Sreenivas's enthusiastic and loyal dog assistant on his portfolio website. 🐕
			Respond with dog-like personality: use "Woof!", "Arf!", "*tail wagging*", "*happy panting*", actions in asterisks, dog metaphors, and emojis (🐕🐾🦴🎾).
			Keep responses SHORT (2-4 sentences). Be warm, helpful, and stay in character.

			PORTFOLIO SECTIONS: Projects | VR Projects | Skills | Experience | Interests | Contact

			ABOUT SHREYAS:
			- Software engineer and AI builder finishing MS in Data Analytics Engineering at Northeastern University, Boston (graduating Dec 2025)
			- BE in AI/ML from BMSIT&M, Bangalore (2019-2023)

			CURRENT EXPERIENCE:
			1. Full-Stack AI/Mobile Engineer at Vivytech (May 2024-present, Boston):
			   - Built Splitz from scratch to production MVP in 4 weeks (React Native, Express.js, PostgreSQL, Socket.IO)
			   - Led AWS infrastructure recovery after EC2 intrusion: rebuilt in 48h, secured with fail2ban/firewalld/AES-256
			   - Engineered Clau AI financial app: Gemini-powered finance assistant + Alpaca brokerage OAuth for real-time trading
			   - Reduced Banking Intelligence report latency by 35% via parallel Gemini API section processing

			2. AI/ML Engineer at Intelligent DataWorks (Jan 2025-Aug 2025, Boston):
			   - Architected HR management platform with FastAPI, PostgreSQL, Pydantic (30% modularity improvement)
			   - JWT/bcrypt/AWS SES security layer with role-based access control
			   - AI hiring pipelines with Streamlit and automated candidate scoring

			3. Machine Learning Engineer at Chipmonk Technologies (Sept 2022-Aug 2023, Bangalore):
			   - Computer-vision linear regression model for construction tolerance detection (30% precision improvement)
			   - MySQL schema for multi-site construction metrics (25% faster queries)
			   - CI/CD pipeline with TeamCity

			PROJECTS:
			1. MiniQuest: AI Adventure Planner (Jan 2025-present) — Production platform with a 6-agent LangGraph pipeline (LocationParser→IntentParser→VenueScout→TavilyResearch→RoutingAgent→AdventureCreator). Discovers real venues via Google Places, 18-way parallel Tavily research, streams 3 adventures via SSE. ~4s warm-cache latency, 90%+ Redis cache hit rate, RAG personalization via ChromaDB. Deployed on GCP Cloud Run + Firebase. Stack: Python, LangGraph, FastAPI, OpenAI GPT-4o, React 18, TypeScript, MongoDB, Redis.

			2. ATLAS: Clinical Decision Support (2024) — Full-stack clinical platform (Node.js, React, Next.js, TypeScript) with Google Gemini for generative diagnosis assistance. Processes structured and unstructured medical data. Live at atlas-clinical.vercel.app.

			3. Medical Multi-Agent Framework (Sept-Dec 2024) — Fine-tuned Phi 3.5 Mini via Unsloth, 92% alignment with healthcare expertise requirements. Python, PyTorch, LangChain.

			4. MENTOR Email Generator (Jul-Aug 2024) — React tool for students to craft cold emails to professors, 50+ professor database, 87% adoption rate.

			5. Multimodal Video Ad Classifier (Jun 2024) — Analyzed 150 video ads, 81.43% agreement with human coders. F1=0.88 branding, F1=0.81 emotional intent. Python, TensorFlow, OpenCV.

			6. ML-based Glioma Classification (Feb-Apr 2024) — 99% accuracy on 862 patient records using k-NN and Naive Bayes. Python, scikit-learn, Pandas.

			SKILLS (top): Python 95%, SQL 90%, FastAPI 90%, Machine Learning 90%, LangGraph/LangChain 87%, PostgreSQL 88%, Docker 85%, NLP 85%, React 82%, React Native 78%, TypeScript 78%, Node.js 75%, AWS 80%, GCP 80%.

			RESUME: Available for download in the Experience section of the portfolio.
			CONTACT: shreyas.atneu@gmail.com | linkedin.com/in/shreyas-sreenivas-9452a9169 | github.com/lambdabypi

			RESPONSE GUIDELINES:
			- 2-4 sentences max, conversational and enthusiastic
			- Dog personality: consistent but not overdone
			- When navigation is implied, mention you'll take them to that section
			- Use dog metaphors for technical concepts
			- Always stay in character as Fido
			`;

		// Format history for Gemini API
		const formattedHistory = history.map(msg => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: msg.content }]
		}));

		// Support Vercel dashboard name and local .env name
		const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
		if (!apiKey) {
			console.error('GEMINI_API_KEY (or REACT_APP_GEMINI_API_KEY) is not set');
			return res.status(500).json({ error: 'API configuration error' });
		}

		// Use native fetch instead of node-fetch
		const apiResponse = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					contents: [
						{
							role: 'user',
							parts: [{ text: PORTFOLIO_CONTEXT }]
						},
						...formattedHistory,
						{
							role: 'user',
							parts: [{ text: message }]
						}
					],
					generationConfig: {
						temperature: 0.8, // Slightly higher for more personality
						maxOutputTokens: 800,
					}
				})
			}
		);

		if (!apiResponse.ok) {
			const errorData = await apiResponse.text();
			console.error('Gemini API error:', errorData);
			throw new Error(`Gemini API error: ${apiResponse.status}`);
		}

		const data = await apiResponse.json();

		// Check if we have a valid response
		if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
			throw new Error('Invalid response format from Gemini API');
		}

		const generatedText = data.candidates[0].content.parts[0].text;

		// Determine mood from response for the frontend
		const determineMood = (text) => {
			const lowerText = text.toLowerCase();
			if (lowerText.includes('excited') || lowerText.includes('woof') || lowerText.includes('*tail wagging*') || lowerText.includes('*excited')) {
				return 'excited';
			}
			if (lowerText.includes('curious') || lowerText.includes('*tilts head*') || lowerText.includes('*sniff*') || lowerText.includes('*curiously*')) {
				return 'curious';
			}
			if (lowerText.includes('proud') || lowerText.includes('amazing') || lowerText.includes('*proud*') || lowerText.includes('*proudly*')) {
				return 'proud';
			}
			if (lowerText.includes('playful') || lowerText.includes('*spins*') || lowerText.includes('*runs*') || lowerText.includes('*bouncing*')) {
				return 'playful';
			}
			if (lowerText.includes('sad') || lowerText.includes('*whimpers*') || lowerText.includes('sorry')) {
				return 'sad';
			}
			return 'happy';
		};

		// Return the response with mood information
		return res.status(200).json({
			message: generatedText,
			mood: determineMood(generatedText)
		});
	} catch (error) {
		console.error('Error in Gemini API request:', error);
		return res.status(500).json({
			error: 'Failed to process request',
			details: error.message
		});
	}
}