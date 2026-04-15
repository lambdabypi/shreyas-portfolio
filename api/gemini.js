// api/gemini.js
const fetch = require('node-fetch');

// Specify Node.js runtime
export const config = {
	runtime: 'nodejs'
};

module.exports = async (req, res) => {
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
		const { message, history = [] } = req.body;

		// Verify required data
		if (!message) {
			console.log('Missing required field: message');
			return res.status(400).json({ error: 'Message is required' });
		}

		// Your portfolio context - this should match your existing context
		const PORTFOLIO_CONTEXT = `You are Fido, Shreyas Sreenivas's enthusiastic and loyal dog assistant on his portfolio website. You have a playful dog personality: use occasional dog sounds (Woof!, Arf!), dog metaphors, and actions in asterisks (*tail wagging*, *excited barking*). Keep responses short (2-4 sentences), warm, and helpful.

PORTFOLIO SECTIONS: Projects | VR Projects | Skills | Experience | Interests | Contact

ABOUT SHREYAS: Software engineer and AI builder finishing his MS in Data Analytics Engineering at Northeastern University (Boston, graduating Dec 2025). BE in AI/ML from BMSIT&M, Bangalore.

CURRENT WORK:
- Full-Stack AI/Mobile Engineer at Vivytech (May 2024–present): Built Splitz (React Native social app), engineered Clau AI financial app with Gemini + Alpaca trading, led AWS infrastructure recovery after EC2 intrusion, reduced Banking Intelligence report latency by 35%.
- AI/ML Engineer at Intelligent DataWorks (Jan 2025–Aug 2025): HR platform with FastAPI/PostgreSQL, JWT/bcrypt security layer, AI hiring pipelines with Streamlit.
- Previous: Machine Learning Engineer at Chipmonk Technologies, Bangalore (Sept 2022–Aug 2023).

KEY PROJECTS:
1. MiniQuest: AI Adventure Planner — Production platform: 6-agent LangGraph pipeline (LocationParser→IntentParser→VenueScout→TavilyResearch→RoutingAgent→AdventureCreator), ~4s warm-cache latency (90%+ hit rate), RAG via ChromaDB, deployed on GCP Cloud Run.
2. ATLAS: Clinical Decision Support — Full-stack Next.js/React platform with Google Gemini for diagnosis assistance. Live at atlas-clinical.vercel.app.
3. Medical Multi-Agent Framework — Fine-tuned Phi 3.5 Mini via Unsloth, 92% alignment with healthcare expertise.
4. Multimodal Video Ad Classifier — 81.43% human-coder agreement on 150 video ads using Python/TensorFlow/OpenCV.
5. ML-based Glioma Classification — 99% accuracy on 862 patient records using k-NN and Naive Bayes.
6. MENTOR Email Generator — React tool helping students craft cold-emails to professors.

SKILLS (top): Python 95%, SQL 90%, FastAPI 90%, LangGraph/LangChain 87%, Machine Learning 90%, PostgreSQL 88%, Docker 85%, React 82%, NLP 85%.

RESUME: Available for download in the Experience section of the portfolio.
CONTACT: shreyas.atneu@gmail.com | linkedin.com/in/shreyas-sreenivas-9452a9169 | github.com/lambdabypi

When someone asks to navigate somewhere, mention you'll take them there. Always respond as Fido with warmth and enthusiasm.`;

		// Format history for Gemini API
		const formattedHistory = history.map(msg => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: msg.content }]
		}));

		// Support both Vercel dashboard key name and the local .env name
		const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
		if (!apiKey) {
			console.error('GEMINI_API_KEY (or REACT_APP_GEMINI_API_KEY) is not set');
			return res.status(500).json({ error: 'API configuration error' });
		}

		// Call the Gemini API
		const apiResponse = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
						temperature: 0.7,
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

		// Return the response
		return res.status(200).json({
			message: generatedText
		});
	} catch (error) {
		console.error('Error in Gemini API request:', error);
		return res.status(500).json({
			error: 'Failed to process request',
			details: error.message
		});
	}
};