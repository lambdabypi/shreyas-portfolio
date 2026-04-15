// src/context/PortfolioContext.js
import { createContext, useState, useRef, useEffect, useContext } from 'react';
import geminiServiceInstance from '../services/GeminiService';

// Create context
const PortfolioContext = createContext();

// Create custom hook for using the context
export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
	// Section state
	const [activeSection, setActiveSection] = useState('intro');
	const [isAnimating, setIsAnimating] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [selectedVRProject, setSelectedVRProject] = useState(null);

	// Chat assistant state
	const [showAssistant, setShowAssistant] = useState(false);
	const [minimized, setMinimized] = useState(false);
	const [userMessage, setUserMessage] = useState('');
	const [chatMessages, setChatMessages] = useState([
		{
			id: 0,
			sender: 'bot',
			message: "Woof! Hi there! I'm Fido! 🐕 *tail wagging intensifies* I'm so excited to help you learn about my amazing human Shreyas! Ask me anything about his projects, skills, or experience! *happy panting*",
			isGeminiResponse: true,
			timestamp: new Date().toISOString(),
			mood: 'excited'
		}
	]);
	const [isTyping, setIsTyping] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [hasScrolledToBottom, setHasScrolledToBottom] = useState(true);
	const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
	const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
	const [chatResetKey, setChatResetKey] = useState(0);

	// Contact form state
	const [contactForm, setContactForm] = useState({
		name: '',
		email: '',
		message: ''
	});

	// Refs
	const messagesEndRef = useRef(null);
	const messagesContainerRef = useRef(null);
	const userScrolledRef = useRef(false);
	const mousePosition = useRef({ x: 0, y: 0 });

	// Handle section changes with animation
	const changeSection = (section) => {
		console.log(`🔄 changeSection called with: ${section} (current: ${activeSection})`);

		if (isAnimating || section === activeSection) {
			console.log(`⚠️ Navigation blocked - isAnimating: ${isAnimating}, same section: ${section === activeSection}`);
			return;
		}

		console.log(`✅ Starting navigation to: ${section}`);
		setIsAnimating(true);
		setTimeout(() => {
			console.log(`🎯 Setting active section to: ${section}`);
			setActiveSection(section);
			setSelectedProject(null);
			setSelectedVRProject(null);
			setIsAnimating(false);
			console.log(`✨ Navigation completed to: ${section}`);
		}, 800);
	};

	// Handle chat messages with dog personality
	const handleSendMessage = async (messageOverride = null) => {
		const msgToSend = messageOverride !== null ? messageOverride.trim() : userMessage.trim();
		if (!msgToSend || isProcessing) return;

		setShouldScrollToBottom(true);
		setShowNewMessageIndicator(false);
		setUserMessage('');

		setChatMessages(prev => [...prev, {
			id: prev.length,
			sender: 'user',
			message: msgToSend,
			timestamp: new Date().toISOString()
		}]);

		setIsTyping(true);
		setIsProcessing(true);

		try {
			const { response, shouldNavigate, targetSection, mood } =
				await geminiServiceInstance.generateResponse(msgToSend);

			if (shouldNavigate && targetSection) {
				setTimeout(() => changeSection(targetSection), 500);
			}

			setChatMessages(prev => [...prev, {
				id: prev.length,
				sender: 'bot',
				message: response,
				mood: mood || 'happy',
				isGeminiResponse: true,
				timestamp: new Date().toISOString()
			}]);
		} catch (error) {
			console.error('Error processing message:', error);
			setChatMessages(prev => [...prev, {
				id: prev.length,
				sender: 'bot',
				message: "*whimpers softly* 🐕 Sorry, I'm having trouble understanding right now... Could you try asking again? *hopeful tail wag*",
				mood: 'sad',
				isGeminiResponse: false,
				timestamp: new Date().toISOString()
			}]);
		} finally {
			setIsTyping(false);
			setIsProcessing(false);
		}
	};

	// Handle key down for chat input
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	// Handle contact form changes
	const handleContactChange = (e) => {
		const { name, value } = e.target;
		setContactForm({
			...contactForm,
			[name]: value
		});
	};

	// Handle contact form submission
	const handleContactSubmit = () => {
		// In a real app, you would submit to a backend here
		console.log('Contact form submitted:', contactForm);
		alert('Thanks for reaching out! Shreyas will get back to you soon.');
		setContactForm({ name: '', email: '', message: '' });
	};

	// Check if we should scroll to bottom when new messages arrive
	useEffect(() => {
		// If user hasn't scrolled up, scroll to bottom automatically
		if (shouldScrollToBottom && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		} else if (!shouldScrollToBottom && !isTyping) {
			// Show new message indicator
			setShowNewMessageIndicator(true);
		}
	}, [chatMessages, shouldScrollToBottom, isTyping]);

	// Reset userScrolled when user scrolls to bottom manually
	useEffect(() => {
		if (hasScrolledToBottom) {
			userScrolledRef.current = false;
			setShouldScrollToBottom(true);
			setShowNewMessageIndicator(false);
		}
	}, [hasScrolledToBottom]);

	// Handle scroll events to enable "new message" indicator
	const handleScroll = () => {
		if (messagesContainerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
			const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

			// Update scroll position state
			setHasScrolledToBottom(isAtBottom);

			// If user scrolls up, mark as user-initiated scroll
			if (!isAtBottom && !userScrolledRef.current) {
				userScrolledRef.current = true;
				setShouldScrollToBottom(false);
			}
		}
	};

	// Scroll to bottom manually
	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
			setShouldScrollToBottom(true);
			userScrolledRef.current = false;
			setShowNewMessageIndicator(false);
		}
	};

	// Format timestamp for display
	const formatTimestamp = (timestamp) => {
		try {
			return new Date(timestamp).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch (e) {
			return '';
		}
	};

	// Clear chat history with dog personality
	const clearChatHistory = () => {
		if (window.confirm("Are you sure you want to clear our conversation? 🐕 I'll miss our chat!")) {
			setChatMessages([
				{
					id: 0,
					sender: 'bot',
					message: "Woof! Hi there! I'm Fido! 🐕 *tail wagging intensifies* I'm so excited to help you learn about my amazing human Shreyas! Ask me anything about his projects, skills, or experience! *happy panting*",
					isGeminiResponse: true,
					timestamp: new Date().toISOString(),
					mood: 'excited'
				}
			]);
			setShouldScrollToBottom(true);
			setChatResetKey(k => k + 1);
			setShowNewMessageIndicator(false);
		}
	};

	// Context value
	const contextValue = {
		// Section state
		activeSection,
		isAnimating,
		selectedProject,
		setSelectedProject,
		selectedVRProject,
		setSelectedVRProject,
		changeSection,

		// Chat state
		showAssistant,
		setShowAssistant,
		minimized,
		setMinimized,
		userMessage,
		setUserMessage,
		chatMessages,
		isTyping,
		isProcessing,
		showNewMessageIndicator,
		chatResetKey,

		// Chat functions
		handleSendMessage,
		handleKeyPress,
		handleScroll,
		scrollToBottom,
		formatTimestamp,
		clearChatHistory,

		// Contact state
		contactForm,
		handleContactChange,
		handleContactSubmit,

		// Refs
		messagesEndRef,
		messagesContainerRef,
		mousePosition
	};

	return (
		<PortfolioContext.Provider value={contextValue}>
			{children}
		</PortfolioContext.Provider>
	);
};

export default PortfolioContext;