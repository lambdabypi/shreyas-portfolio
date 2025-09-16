// src/components/chat/ChatComponents.js
import { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
	XIcon,
	ChatIcon,
	SparklesIcon,
	TrashIcon,
	MinusIcon,
	ChevronDownIcon,
	SendIcon,
	ArrowRightIcon
} from '../icons';

// Chat Button Component
export const ChatButton = () => {
	const { showAssistant, setShowAssistant } = usePortfolio();
	const [pulsating, setPulsating] = useState(false);

	// Add a pulsating effect occasionally to attract attention
	useEffect(() => {
		if (!showAssistant) {
			const interval = setInterval(() => {
				setPulsating(true);
				setTimeout(() => setPulsating(false), 2000);
			}, 10000);

			return () => clearInterval(interval);
		}
	}, [showAssistant]);

	return (
		<button
			className={`fixed bottom-6 right-6 z-30 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform ${pulsating ? 'scale-110 animate-pulse' : 'hover:scale-110'} border border-white/30`}
			onClick={() => setShowAssistant(!showAssistant)}
		>
			<div className="absolute inset-0 rounded-full overflow-hidden">
				<div className="absolute inset-0 bg-white/20 button-shine opacity-20"></div>
			</div>

			{showAssistant ? (
				<XIcon className="w-6 h-6 text-white relative z-10" />
			) : (
				<div className="relative z-10">
					<ChatIcon className="w-6 h-6 text-white" />
					<span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
				</div>
			)}
		</button>
	);
};

// Chat Message Bubble Component
export const ChatBubble = ({ message, formatTimestamp }) => {
	return (
		<div className={`glass-message ${message.sender}`}>
			<div className={`glass-message-bubble ${message.sender} ${message.sender === 'bot' ? 'hover:shadow-lg' : 'hover:bg-blue-500/30'} transition-all duration-300`}>
				{message.sender === 'bot' && (
					<div className="glass-bot-icon">
						<SparklesIcon className="h-3 w-3" />
					</div>
				)}
				<div className="glass-message-text">{message.message}</div>

				{message.timestamp && (
					<div className="glass-message-time">
						{formatTimestamp(message.timestamp)}
					</div>
				)}
			</div>
		</div>
	);
};

// Suggestion Button Component
export const SuggestionButton = ({ text, onClick, disabled }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`glass-suggestion-btn relative overflow-hidden group ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
			disabled={disabled}
		>
			{/* Button shine effect */}
			<span
				className={`absolute inset-0 opacity-0 transition-opacity duration-300 suggestion-shine ${isHovered && !disabled ? 'opacity-100' : ''}`}
			/>

			{/* Text with arrow icon */}
			<span className="relative z-10 flex items-center">
				{text}
				<ArrowRightIcon className={`w-3 h-3 ml-1 opacity-0 transition-all duration-300 ${isHovered && !disabled ? 'opacity-100 translate-x-1' : '-translate-x-1'}`} />
			</span>
		</button>
	);
};

// Chat Assistant Component
export const ChatAssistant = () => {
	const {
		showAssistant,
		minimized,
		setMinimized,
		setShowAssistant,
		chatMessages,
		userMessage,
		setUserMessage,
		handleSendMessage,
		handleKeyPress,
		messagesContainerRef,
		handleScroll,
		messagesEndRef,
		showNewMessageIndicator,
		scrollToBottom,
		isTyping,
		isProcessing,
		formatTimestamp,
		clearChatHistory
	} = usePortfolio();

	// Animation states
	const [showingChat, setShowingChat] = useState(false);
	const [visibleMessages, setVisibleMessages] = useState([]);

	// Memoize the function to prevent recreation on each render
	const handleSuggestion = useCallback((text) => {
		if (isProcessing) return;
		setUserMessage(text);
		setTimeout(() => {
			handleSendMessage();
		}, 100);
	}, [isProcessing, setUserMessage, handleSendMessage]);

	// Staggered animation for messages on open - improved with useCallback
	useEffect(() => {
		if (showAssistant && !minimized) {
			setShowingChat(true);

			// Clear and reset visible messages
			setVisibleMessages([]);

			// Staggered animation for messages
			const timer = setTimeout(() => {
				let count = 0;
				const interval = setInterval(() => {
					if (count < chatMessages.length) {
						setVisibleMessages(prev => [...prev, count]);
						count++;
					} else {
						clearInterval(interval);
					}
				}, 100);

				return () => clearInterval(interval);
			}, 300);

			return () => clearTimeout(timer);
		} else {
			setShowingChat(false);
			// Don't clear visibleMessages here to prevent flicker
		}
	}, [showAssistant, minimized, chatMessages.length]);

	// Only clear visible messages when the chat is fully hidden
	useEffect(() => {
		if (!showAssistant) {
			const timer = setTimeout(() => {
				setVisibleMessages([]);
			}, 500); // Wait for hide animation to complete
			return () => clearTimeout(timer);
		}
	}, [showAssistant]);

	// Check if message should be animated
	const isMessageVisible = useCallback((index) => {
		return visibleMessages.includes(index);
	}, [visibleMessages]);

	// Get animation delay for each message
	const getAnimationDelay = useCallback((index) => {
		return `${50 * index}ms`;
	}, []);

	if (!showAssistant) return null;

	return (
		<>
			{/* Full Chat Window */}
			{!minimized && (
				<div className="fixed bottom-24 right-6 z-30 w-96 h-[30rem] glass-chat rounded-xl shadow-2xl border border-white/20 flex flex-col overflow-hidden transition-all duration-500 transform origin-bottom-right" style={{
					opacity: showingChat ? 1 : 0,
					transform: showingChat ? 'scale(1)' : 'scale(0.9)'
				}}>
					{/* Chatbot Header */}
					<div className="glass-chat-header">
						<div className="flex items-center">
							<div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3 relative overflow-hidden">
								<div className="absolute inset-0 button-shine"></div>
								<SparklesIcon className="h-5 w-5 text-white relative z-10" />
							</div>
							<div>
								<div className="text-lg font-bold text-black">Chinti</div>
								<div className="text-xs text-grey-200">Portfolio Assistant</div>
							</div>
						</div>
						<div className="flex space-x-2">
							<button
								className="glass-chat-btn hover:bg-red-500/30 transition-colors group"
								onClick={clearChatHistory}
								title="Clear chat history"
							>
								<TrashIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
							</button>
							<button
								className="glass-chat-btn hover:bg-blue-500/30 transition-colors group"
								onClick={() => setMinimized(true)}
								title="Minimize"
							>
								<MinusIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
							</button>
							<button
								className="glass-chat-btn hover:bg-purple-500/30 transition-colors group"
								onClick={() => setShowAssistant(false)}
								title="Close"
							>
								<XIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
							</button>
						</div>
					</div>

					{/* Status bar */}
					<div className="glass-chat-status">
						<div className="flex items-center">
							<div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
							<span className="text-sm text-black-300">Assistant Online</span>
						</div>
						{chatMessages.length > 1 && (
							<span className="text-sm text-gray-400">{chatMessages.length} messages</span>
						)}
					</div>

					{/* Messages area */}
					<div
						className="glass-chat-messages custom-scrollbar"
						ref={messagesContainerRef}
						onScroll={handleScroll}
					>
						{/* Fixed rendering of messages */}
						{chatMessages.map((msg, idx) => (
							<div
								key={`msg-${idx}-${msg.id}`}
								className={`glass-message ${msg.sender} ${isMessageVisible(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
								style={{
									transitionDelay: getAnimationDelay(idx),
									transition: 'opacity 0.3s ease, transform 0.3s ease'
								}}
							>
								<ChatBubble message={msg} formatTimestamp={formatTimestamp} />
							</div>
						))}

						{/* Typing indicator with enhanced animation */}
						{isTyping && (
							<div className="glass-message bot opacity-100 translate-y-0">
								<div className="glass-typing-indicator">
									<div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
									<div className="typing-dot" style={{ animationDelay: '300ms' }}></div>
									<div className="typing-dot" style={{ animationDelay: '600ms' }}></div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* New message indicator when scrolled up */}
					{showNewMessageIndicator && (
						<button
							className="glass-new-message-btn animate-bounce"
							onClick={scrollToBottom}
						>
							<ChevronDownIcon className="h-3 w-3 mr-1" />
							New messages
						</button>
					)}

					{/* Input area */}
					<div className="glass-chat-input-container">
						<div className="glass-chat-input-wrapper group focus-within:shadow-lg transition-shadow">
							<input
								type="text"
								value={userMessage}
								onChange={(e) => setUserMessage(e.target.value)}
								onKeyPress={handleKeyPress}
								className="glass-chat-input placeholder:text-gray-400/70 focus:placeholder:text-gray-400/50 transition-all"
								placeholder="Ask about Shreyas or navigate..."
								disabled={isProcessing}
							/>
							<button
								onClick={() => handleSendMessage()}
								className={`glass-chat-send-btn ${userMessage.trim() && !isProcessing ? 'bg-blue-500/80 hover:bg-blue-600/80' : 'bg-gray-500/50'} transition-colors`}
								disabled={isProcessing || !userMessage.trim()}
							>
								{isProcessing ? (
									<div className="glass-loading-spinner"></div>
								) : (
									<SendIcon className="h-4 w-4" />
								)}
							</button>
						</div>

						{/* Enhanced suggestion buttons */}
						<div className="glass-chat-suggestions">
							<SuggestionButton
								text="Projects"
								onClick={() => handleSuggestion("Show me projects")}
								disabled={isProcessing}
							/>
							<SuggestionButton
								text="Skills"
								onClick={() => handleSuggestion("Go to skills")}
								disabled={isProcessing}
							/>
							<SuggestionButton
								text="Experience"
								onClick={() => handleSuggestion("Show experience")}
								disabled={isProcessing}
							/>
							<SuggestionButton
								text="Contact"
								onClick={() => handleSuggestion("How can I contact Shreyas?")}
								disabled={isProcessing}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Enhanced Minimized Chatbot */}
			{minimized && (
				<div
					className="glass-chat-minimized hover:shadow-lg hover:scale-105 transition-all duration-300"
					onClick={() => setMinimized(false)}
				>
					<div className="absolute inset-0 rounded-full overflow-hidden">
						<div className="absolute inset-0 bg-white/10 button-shine"></div>
					</div>
					<ChatIcon className="h-6 w-6 text-white relative z-10" />
					<div className="glass-chat-indicator"></div>
				</div>
			)}
		</>
	);
};

// Create a proper named export object
const ChatComponents = {
	ChatButton,
	ChatBubble,
	SuggestionButton,
	ChatAssistant
};

export default ChatComponents;