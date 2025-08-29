module.exports = (req, res) => {
	res.status(200).json({
		message: 'Debug endpoint is working',
		envCheck: {
			keyExists: !!process.env.GEMINI_API_KEY,
			keyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
			timestamp: new Date().toISOString()
		}
	});
};