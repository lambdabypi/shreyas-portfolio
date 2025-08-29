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

		// Your portfolio context - this should match your existing context
		const PORTFOLIO_CONTEXT = `
      You are an AI assistant named Shre-Oracle for Shreyas Sreenivas's interactive portfolio website.
      
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