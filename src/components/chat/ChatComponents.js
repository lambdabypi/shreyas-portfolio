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

// Pixel Character Components
const PixelDog = ({ mood = 'happy', isAnimating = false }) => {
	const [frame, setFrame] = useState(0);
	const [tailWag, setTailWag] = useState(0);

	useEffect(() => {
		if (isAnimating) {
			const interval = setInterval(() => {
				setFrame(prev => (prev + 1) % 4);
				setTailWag(prev => (prev + 1) % 3);
			}, 300);
			return () => clearInterval(interval);
		}
	}, [isAnimating]);

	const getDogStyle = () => {
		const baseStyle = {
			width: '32px',
			height: '32px',
			imageRendering: 'pixelated',
			transform: `translateY(${isAnimating ? Math.sin(frame) * 2 : 0}px)`,
			transition: 'transform 0.3s ease'
		};

		switch (mood) {
			case 'excited':
				return { ...baseStyle, filter: 'brightness(1.2) saturate(1.3)' };
			case 'thinking':
				return { ...baseStyle, filter: 'sepia(0.3)' };
			case 'happy':
			default:
				return baseStyle;
		}
	};

	return (
		<div className="pixel-dog-container relative">
			<div
				className="pixel-dog"
				style={getDogStyle()}
			>
				{/* Pixel Dog SVG */}
				<svg viewBox="0 0 32 32" className="w-full h-full">
					{/* Dog body */}
					<rect x="8" y="16" width="16" height="8" fill="#8B4513" />
					<rect x="6" y="18" width="2" height="4" fill="#8B4513" />
					<rect x="24" y="18" width="2" height="4" fill="#8B4513" />
					<rect x="8" y="24" width="4" height="2" fill="#8B4513" />
					<rect x="20" y="24" width="4" height="2" fill="#8B4513" />

					{/* Dog head */}
					<rect x="10" y="8" width="12" height="8" fill="#D2691E" />
					<rect x="8" y="10" width="2" height="4" fill="#D2691E" />
					<rect x="22" y="10" width="2" height="4" fill="#D2691E" />

					{/* Eyes */}
					<rect x="12" y="10" width="2" height="2" fill="#000" />
					<rect x="18" y="10" width="2" height="2" fill="#000" />
					{mood === 'excited' && (
						<>
							<rect x="12" y="9" width="2" height="1" fill="#FFF" />
							<rect x="18" y="9" width="2" height="1" fill="#FFF" />
						</>
					)}

					{/* Nose */}
					<rect x="15" y="12" width="2" height="2" fill="#000" />

					{/* Mouth */}
					{mood === 'excited' ? (
						<>
							<rect x="13" y="14" width="1" height="1" fill="#000" />
							<rect x="18" y="14" width="1" height="1" fill="#000" />
							<rect x="14" y="15" width="4" height="1" fill="#FF69B4" />
						</>
					) : (
						<rect x="14" y="14" width="4" height="1" fill="#000" />
					)}

					{/* Ears */}
					<rect x="8" y="6" width="4" height="4" fill="#8B4513" />
					<rect x="20" y="6" width="4" height="4" fill="#8B4513" />

					{/* Tail - animated */}
					<rect
						x={isAnimating ? 24 + Math.sin(tailWag) * 2 : 24}
						y={16 - tailWag}
						width="2"
						height="6"
						fill="#8B4513"
					/>

					{/* Sparkles when thinking */}
					{mood === 'thinking' && (
						<>
							<rect x="4" y="4" width="1" height="1" fill="#FFD700" />
							<rect x="6" y="2" width="1" height="1" fill="#FFD700" />
							<rect x="26" y="5" width="1" height="1" fill="#FFD700" />
						</>
					)}
				</svg>
			</div>

			{/* Typing indicator for dog */}
			{mood === 'thinking' && (
				<div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
					<div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
						<div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
						<div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
						<div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
					</div>
				</div>
			)}
		</div>
	);
};

const PixelHuman = ({ isTyping = false }) => {
	const [frame, setFrame] = useState(0);

	useEffect(() => {
		if (isTyping) {
			const interval = setInterval(() => {
				setFrame(prev => (prev + 1) % 4);
			}, 250);
			return () => clearInterval(interval);
		}
	}, [isTyping]);

	return (
		<div className="pixel-human-container relative">
			<div
				className="pixel-human"
				style={{
					width: '32px',
					height: '32px',
					imageRendering: 'pixelated',
					transform: `scale(${isTyping ? 1 + Math.sin(frame) * 0.1 : 1})`,
					transition: 'transform 0.2s ease'
				}}
			>
				{/* Pixel Human SVG */}
				<svg viewBox="0 0 32 32" className="w-full h-full">
					{/* Human body */}
					<rect x="12" y="18" width="8" height="10" fill="#4A90E2" />
					<rect x="10" y="20" width="4" height="6" fill="#F4C2A1" />
					<rect x="18" y="20" width="4" height="6" fill="#F4C2A1" />
					<rect x="12" y="28" width="3" height="4" fill="#2C3E50" />
					<rect x="17" y="28" width="3" height="4" fill="#2C3E50" />

					{/* Human head */}
					<rect x="11" y="6" width="10" height="10" fill="#F4C2A1" />

					{/* Hair */}
					<rect x="10" y="4" width="12" height="4" fill="#8B4513" />
					<rect x="9" y="6" width="2" height="6" fill="#8B4513" />
					<rect x="21" y="6" width="2" height="6" fill="#8B4513" />

					{/* Eyes */}
					<rect x="13" y="9" width="2" height="2" fill="#000" />
					<rect x="17" y="9" width="2" height="2" fill="#000" />

					{/* Nose */}
					<rect x="15" y="11" width="2" height="1" fill="#E8B4A0" />

					{/* Mouth */}
					{isTyping ? (
						<ellipse cx="16" cy="13.5" rx="1.5" ry="1" fill="#000" />
					) : (
						<rect x="14" y="13" width="4" height="1" fill="#000" />
					)}

					{/* Arms - animated when typing */}
					<rect
						x={isTyping ? 8 + Math.sin(frame) : 8}
						y={20 + (isTyping ? Math.cos(frame) : 0)}
						width="4"
						height="6"
						fill="#F4C2A1"
					/>
					<rect
						x={isTyping ? 20 - Math.sin(frame) : 20}
						y={20 + (isTyping ? Math.cos(frame + Math.PI) : 0)}
						width="4"
						height="6"
						fill="#F4C2A1"
					/>

					{/* Keyboard when typing */}
					{isTyping && (
						<>
							<rect x="10" y="26" width="12" height="2" fill="#34495E" />
							<rect x="11" y="26.5" width="2" height="1" fill="#ECF0F1" />
							<rect x="14" y="26.5" width="2" height="1" fill="#ECF0F1" />
							<rect x="17" y="26.5" width="2" height="1" fill="#ECF0F1" />
							<rect x="20" y="26.5" width="1" height="1" fill="#ECF0F1" />
						</>
					)}
				</svg>
			</div>
		</div>
	);
};

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

// Enhanced Chat Message Bubble Component with Pixel Characters
export const ChatBubble = ({ message, formatTimestamp, isTyping = false }) => {
	const [showPixelChar, setShowPixelChar] = useState(false);
	const [charMood, setCharMood] = useState('happy');

	useEffect(() => {
		// Show pixel character when message appears
		setShowPixelChar(true);

		// Determine mood based on message content
		if (message.message) {
			const content = message.message.toLowerCase();
			if (content.includes('!') || content.includes('excited') || content.includes('awesome')) {
				setCharMood('excited');
			} else if (content.includes('?') || content.includes('let me') || content.includes('thinking')) {
				setCharMood('thinking');
			} else {
				setCharMood('happy');
			}
		}

		// Hide character after delay
		const timer = setTimeout(() => {
			if (!isTyping) {
				setShowPixelChar(false);
			}
		}, 10000);

		return () => clearTimeout(timer);
	}, [message, isTyping]);

	return (
		<div className={`glass-message-bubble ${message.sender} ${message.sender === 'bot' ? 'hover:shadow-lg' : 'hover:bg-blue-500/30'} transition-all duration-300 relative`}>
			{/* Pixel Character Display */}
			{showPixelChar && (
				<div className={`absolute ${message.sender === 'bot' ? '-left-8' : '-right-8'} top-1/2 transform -translate-y-1/2`}>
					{message.sender === 'bot' ? (
						<PixelDog mood={charMood} isAnimating={isTyping} />
					) : (
						<PixelHuman isTyping={false} />
					)}
				</div>
			)}

			{message.sender === 'bot' && (
				<div className="glass-bot-icon">
					<SparklesIcon className="h-3 w-3" />
				</div>
			)}
			<div className="glass-message-text">
				{message.message || '[Message content missing]'}
			</div>

			{message.timestamp && (
				<div className="glass-message-time">
					{formatTimestamp(message.timestamp)}
				</div>
			)}
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

// Enhanced Chat Assistant Component with Pixel Characters
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

	// Simplified animation state
	const [showingChat, setShowingChat] = useState(false);
	const [userIsTyping, setUserIsTyping] = useState(false);

	// Track user typing for pixel human animation
	useEffect(() => {
		if (userMessage.length > 0) {
			setUserIsTyping(true);
			const timer = setTimeout(() => setUserIsTyping(false), 1000);
			return () => clearTimeout(timer);
		} else {
			setUserIsTyping(false);
		}
	}, [userMessage]);

	// Memoize the function to prevent recreation on each render
	const handleSuggestion = useCallback((text) => {
		if (isProcessing) return;
		setUserMessage(text);
		setTimeout(() => {
			handleSendMessage();
		}, 100);
	}, [isProcessing, setUserMessage, handleSendMessage]);

	// SIMPLIFIED animation logic - no staggered effects
	useEffect(() => {
		if (showAssistant && !minimized) {
			setShowingChat(true);
		} else {
			setShowingChat(false);
		}
	}, [showAssistant, minimized]);

	if (!showAssistant) return null;

	return (
		<>
			{/* Full Chat Window */}
			{!minimized && (
				<div
					className="fixed bottom-24 right-6 z-30 w-96 h-[30rem] glass-chat rounded-xl shadow-2xl border border-white/20 flex flex-col overflow-hidden transition-all duration-500 transform origin-bottom-right"
					style={{
						opacity: showingChat ? 1 : 0,
						transform: showingChat ? 'scale(1)' : 'scale(0.9)'
					}}
				>
					{/* Chatbot Header with Pixel Dog */}
					<div className="glass-chat-header">
						<div className="flex items-center">
							<div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3 relative overflow-hidden">
								<div className="absolute inset-0 button-shine"></div>
								<div className="relative z-10">
									<PixelDog mood="happy" isAnimating={isTyping} />
								</div>
							</div>
							<div>
								<div className="text-lg font-bold text-black">Fido</div>
								<div className="text-xs text-gray">Portfolio Assistant</div>
							</div>
							{/* User typing indicator in header */}
							{userIsTyping && (
								<div className="ml-auto mr-3">
									<PixelHuman isTyping={true} />
								</div>
							)}
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
							<span className="text-sm text-black">Assistant Online</span>
						</div>
						{chatMessages.length > 1 && (
							<span className="text-sm text-gray-400">{chatMessages.length} messages</span>
						)}
					</div>

					{/* Messages area with pixel characters */}
					<div
						className="glass-chat-messages custom-scrollbar relative"
						ref={messagesContainerRef}
						onScroll={handleScroll}
					>
						{chatMessages.map((msg, idx) => {
							// Generate a more stable key
							const messageKey = `${msg.sender}-${msg.id}-${idx}`;

							return (
								<div
									key={messageKey}
									className={`glass-message ${msg.sender} translate-y-0 relative`}
								>
									<ChatBubble message={msg} formatTimestamp={formatTimestamp} isTyping={false} />
								</div>
							);
						})}

						{/* Enhanced Typing indicator with pixel dog */}
						{isTyping && (
							<div className="glass-message bot opacity-100 translate-y-0 relative">
								<div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
									<PixelDog mood="thinking" isAnimating={true} />
								</div>
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

					{/* Enhanced Input area with pixel human */}
					<div className="glass-chat-input-container">
						<div className="glass-chat-input-wrapper group focus-within:shadow-lg transition-shadow relative">
							{/* Pixel Human appears when typing */}
							{userMessage.trim() && (
								<div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
									<PixelHuman isTyping={true} />
								</div>
							)}

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
								className={`glass-chat-send-btn ${userMessage.trim() && !isProcessing ? 'bg-blue-500/80 hover:bg-blue-600/80' : 'bg-gray-500/50'} transition-colors relative overflow-hidden`}
								disabled={isProcessing || !userMessage.trim()}
							>
								{isProcessing ? (
									<div className="glass-loading-spinner"></div>
								) : (
									<SendIcon className="h-4 w-4" />
								)}
								{/* Send button pixel effect */}
								{userMessage.trim() && !isProcessing && (
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
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

			{/* Enhanced Minimized Chatbot with pixel dog */}
			{minimized && (
				<div
					className="glass-chat-minimized hover:shadow-lg hover:scale-105 transition-all duration-300 relative"
					onClick={() => setMinimized(false)}
				>
					<div className="absolute inset-0 rounded-full overflow-hidden">
						<div className="absolute inset-0 bg-white/10 button-shine"></div>
					</div>
					<div className="relative z-10">
						<PixelDog mood="happy" isAnimating={false} />
					</div>
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
	ChatAssistant,
	PixelDog,
	PixelHuman
};

export default ChatComponents;