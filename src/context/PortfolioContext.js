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
	const [selectedVRProject, setSelectedVRProject] = useState(null); // Added VR project state

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

	// Handle section changes with animation - WITH DEBUG LOGGING
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
			setSelectedProject(null); // Clear selected project
			setSelectedVRProject(null); // Clear selected VR project
			setIsAnimating(false);
			console.log(`✨ Navigation completed to: ${section}`);
		}, 800);
	};

	// Handle chat messages - WITH DEBUG LOGGING
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
			console.log(`📤 Sending message to GeminiService: "${userMsg}"`);
			const { response, shouldNavigate, targetSection } =
				await geminiServiceInstance.generateResponse(userMsg);

			// DEBUG: Log navigation details
			console.log('🔍 Navigation Debug:', {
				userMessage: userMsg,
				shouldNavigate,
				targetSection,
				currentActiveSection: activeSection,
				isAnimating,
				isProcessing
			});

			// Handle navigation intents
			if (shouldNavigate && targetSection) {
				console.log(`🚀 Attempting to navigate to: ${targetSection} (after 500ms delay)`);
				setTimeout(() => {
					console.log(`🎯 Executing changeSection(${targetSection})`);
					changeSection(targetSection);
				}, 500);
			} else {
				console.log('❌ No navigation triggered:', { shouldNavigate, targetSection });
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
		selectedVRProject,        // Added VR project state
		setSelectedVRProject,     // Added VR project setter
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