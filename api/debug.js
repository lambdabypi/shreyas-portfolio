// api/debug.js

// Specify Node.js runtime
export const config = {
	runtime: 'nodejs18.x'
};

module.exports = (req, res) => {
	console.log('Debug endpoint called');

	// Set CORS headers
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	);

	// Handle preflight OPTIONS request
	if (req.method === 'OPTIONS') {
		console.log('Handling OPTIONS request');
		res.status(200).end();
		return;
	}

	try {
		console.log('Processing debug request');

		// Return environment info and request details
		const debugInfo = {
			message: 'Debug API endpoint is working',
			apiRouting: 'If you can see this, your API route configuration is working correctly',
			time: new Date().toISOString(),

			// Environment information (sanitized for security)
			environment: {
				nodeEnv: process.env.NODE_ENV || 'not set',
				vercelEnv: process.env.VERCEL_ENV || 'not set',
				geminiKeyExists: !!process.env.GEMINI_API_KEY,
				// Only show key length for diagnostic purposes, never the actual key
				geminiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
				region: process.env.VERCEL_REGION || 'not set',
				nodeVersion: process.version || 'not available'
			},

			// Request information
			request: {
				method: req.method,
				url: req.url,
				// Get hostname from headers (useful for debugging proxied requests)
				host: req.headers.host || 'not available',
				// Strip potentially sensitive info from headers
				safeHeaders: {
					'user-agent': req.headers['user-agent'],
					'content-type': req.headers['content-type'],
					'accept': req.headers['accept'],
					'referer': req.headers['referer']
				}
			}
		};

		console.log('Sending debug response');
		return res.status(200).json(debugInfo);
	} catch (error) {
		console.error('Debug endpoint error:', error);

		return res.status(500).json({
			error: 'Debug endpoint error',
			message: error.message,
			stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
			time: new Date().toISOString()
		});
	}
};