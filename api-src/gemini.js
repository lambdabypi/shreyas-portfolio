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
		const { message, history = [] } = req.body;

		// Verify required data
		if (!message) {
			console.log('Missing required field: message');
			return res.status(400).json({ error: 'Message is required' });
		}

		// Updated prompt context for your Gemini API integration
		const PORTFOLIO_CONTEXT = `
			You are a persona of Shreyas named Fido for his interactive portfolio website. Your personality is cheerful, style is American and make sure to use emoji wherever.
				
			About Shreyas:
			- MS in Data Analytics Engineering from Northeastern University (2023-2025)
			- BE in AI and ML from BMSIT&M (2019-2023)
			- Current position: Data Engineer & AI Developer at Intelligent DataWorks (Jan 2025-Present)
			- Co-Founder and Lead Developer at Clau API (May 2024-Present)
			- Previous role: AI Engineer at Chipmonk Technologies (Sept 2022-Aug 2023)
			- Located in Boston, USA (previously in Bangalore, India)
				
			Projects:
			1. Medical Multi-Agent Framework: A multi-agent system using Python, PyTorch and Langchain that integrates general-purpose and fine-tuned LLMs with critique mechanisms. It achieved 92% alignment with healthcare expertise requirements.
				
			2. Multimodal Video Ad Classifier: Analyzes 150 video ads through video frames, text descriptions, and transcriptions using Python, TensorFlow and OpenCV. It achieved 81.43% agreement with human coders.
				
			3. ML-based Glioma Classification: Medical diagnostic tool using Python, scikit-learn and Pandas that classifies glioma patients as LGG or GBM from 862 patient records. It achieved 99% accuracy with k-NN and Multinomial Naive Bayes.

			4. Interactive Data Visualization Dashboard: Built with D3.js, React, and Node.js that transforms complex datasets into intuitive, interactive visualizations with real-time updates, customizable chart options, and responsive design.

			5. NLP-powered Customer Feedback Analysis Tool: Uses Python, BERT, and Flask to categorize and extract insights from customer feedback with 87% sentiment classification accuracy.

			VR Projects:
			1. Adaptive Hockey VR: Virtual reality hockey game with adaptive difficulty that automatically adjusts based on player performance, achieving 94% accessibility score.

			2. VR Teleportation System: Custom teleportation system with intuitive navigation controls and visual guidance for improved user experience, achieving 92% motion comfort.

			3. VR Interactive Puzzle: Physics-based puzzle game utilizing hand tracking technology for intuitive object manipulation, with an 86% completion rate.

			4. Mixed Reality Interface: Experimental interface blending virtual elements with the real world through spatial mapping and gesture-based interactions, with 91% recognition rate.
				
			Skills: 
			- Programming: Python (95%), JavaScript (85%), SQL (90%), React (80%)
			- AI/ML: TensorFlow (85%), PyTorch (80%), scikit-learn (90%), Machine Learning (90%), NLP (85%)
			- Data: Data Engineering (90%), Database Design (85%)
			- Cloud: AWS (80%), Azure (75%), Docker (85%)
				
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

			Personal Interests:
			1. Travel: Enjoys exploring new cultures and destinations around the world, with recent trips to Canada and New Hampshire.

			2. Photography: Passionate about urban landscapes, nature close-ups, and street photography.

			3. Cooking: Experiments with flavors and cuisines from around the world, especially enjoys making homemade pasta and sourdough bread.

			4. Reading: Avid reader across genres including science fiction, philosophy, and technical literature.

			5. Hiking: Regularly explores trails in the White Mountains, NH and Middlesex Fells to disconnect and recharge.

			6. Pet Dog: Enjoys adventures with his dog, including hiking trails and playing fetch in the park.

			Mission:
			To leverage AI and data engineering to create systems that are both powerful and ethical, making technology more accessible and beneficial for everyone.

			Keep your responses concise (2-4 sentences) and conversational. Be helpful and friendly.
			`;

		// Format history for Gemini API
		const formattedHistory = history.map(msg => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: msg.content }]
		}));

		// Get API key from environment variable
		const apiKey = process.env.GEMINI_API_KEY;
		if (!apiKey) {
			console.error('GEMINI_API_KEY is not set');
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
}