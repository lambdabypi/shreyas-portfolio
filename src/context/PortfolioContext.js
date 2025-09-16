// src/context/PortfolioContext.js
import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
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

	// Chat assistant state
	const [showAssistant, setShowAssistant] = useState(false);
	const [minimized, setMinimized] = useState(false);
	const [userMessage, setUserMessage] = useState('');
	const [chatMessages, setChatMessages] = useState([
		{
			id: 0,
			sender: 'bot',
			message: "Hi there! I'm Fido, Shreyas's portfolio assistant. Ask me anything about his projects, skills, or experience!",
			isGeminiResponse: true,
			timestamp: new Date().toISOString()
		}
	]);
	const [isTyping, setIsTyping] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [hasScrolledToBottom, setHasScrolledToBottom] = useState(true);
	const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
	const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);

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
		if (isAnimating || section === activeSection) return;

		setIsAnimating(true);
		setTimeout(() => {
			setActiveSection(section);
			setIsAnimating(false);
		}, 800);
	};

	// Handle chat messages
	const handleSendMessage = async () => {
		if (!userMessage.trim() || isProcessing) return;

		// When user sends a message, we should scroll to bottom automatically
		setShouldScrollToBottom(true);
		setShowNewMessageIndicator(false);

		// Add user message with a unique id
		const userMsg = userMessage.trim();
		setChatMessages(prev => [...prev, {
			id: prev.length,
			sender: 'user',
			message: userMsg,
			timestamp: new Date().toISOString()
		}]);
		setUserMessage('');

		// Show typing indicator
		setIsTyping(true);
		setIsProcessing(true);

		try {
			// Process message with GeminiService
			const { response, shouldNavigate, targetSection } =
				await geminiServiceInstance.generateResponse(userMsg);

			// Handle navigation intents
			if (shouldNavigate && targetSection) {
				setTimeout(() => changeSection(targetSection), 500);
			}

			// Add bot response
			setChatMessages(prev => [...prev, {
				id: prev.length,
				sender: 'bot',
				message: response,
				isGeminiResponse: true,
				timestamp: new Date().toISOString()
			}]);
		} catch (error) {
			console.error('Error processing message:', error);
			// Add error message
			setChatMessages(prev => [...prev, {
				id: prev.length,
				sender: 'bot',
				message: "I'm having trouble processing your request. Please try again.",
				isGeminiResponse: false,
				timestamp: new Date().toISOString()
			}]);
		} finally {
			// Reset typing indicators
			setIsTyping(false);
			setIsProcessing(false);
		}
	};

	// Handle key press for chat
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

	// Clear chat history
	const clearChatHistory = () => {
		if (window.confirm("Are you sure you want to clear the chat history?")) {
			setChatMessages([
				{
					id: 0,
					sender: 'bot',
					message: "Hi there! I'm Fido, Shreyas's portfolio assistant. Ask me anything about his projects, skills, or experience!",
					isGeminiResponse: true,
					timestamp: new Date().toISOString()
				}
			]);
			setShouldScrollToBottom(true);
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