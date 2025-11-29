// src/components/chat/ChatComponents.js
import { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
	XIcon,
	TrashIcon,
	MinusIcon,
	ChevronDownIcon,
	SendIcon,
	ArrowRightIcon
} from '../icons';

// Dog Avatar Component with different moods
const DogAvatar = ({ mood = 'happy', size = 'w-10 h-10' }) => {
	const getEyes = () => {
		switch (mood) {
			case 'excited': return '•ᴗ•';
			case 'curious': return '•◡•';
			case 'proud': return '^ᴗ^';
			case 'playful': return '◕‿◕';
			case 'sleepy': return '•‿•';
			default: return '•‿•';
		}
	};

	const getTailWag = () => {
		return mood === 'excited' ? 'animate-bounce' : '';
	};

	return (
		<div className={`${size} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold relative overflow-hidden border-2 border-orange-300 ${getTailWag()}`}>
			<div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"></div>
			<span className="relative text-xs">{getEyes()}</span>
			{/* Dog ears */}
			<div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-600 rounded-full transform rotate-45"></div>
			<div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-600 rounded-full transform rotate-45"></div>
		</div>
	);
};

// Chat Button Component - Updated with dog theme
export const ChatButton = () => {
	const { showAssistant, setShowAssistant } = usePortfolio();
	const [pulsating, setPulsating] = useState(false);

	// Add a pulsating effect occasionally to attract attention
	useEffect(() => {
		if (!showAssistant) {
			const interval = setInterval(() => {
				setPulsating(true);
				setTimeout(() => setPulsating(false), 2000);
			}, 8000);

			return () => clearInterval(interval);
		}
	}, [showAssistant]);

	return (
		<button
			className={`fixed bottom-6 right-6 z-30 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-orange-400 to-amber-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform ${pulsating ? 'scale-110 animate-pulse' : 'hover:scale-110'
				} border-2 border-orange-300`}
			onClick={() => setShowAssistant(!showAssistant)}
		>
			<div className="absolute inset-0 rounded-full overflow-hidden">
				<div className="absolute inset-0 bg-white/20 opacity-20"></div>
			</div>

			{showAssistant ? (
				<XIcon className="w-6 h-6 text-white relative z-10" />
			) : (
				<div className="relative z-10">
					<span className="text-2xl">🐕</span>
					<span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
				</div>
			)}
		</button>
	);
};

// Dog-themed Chat Bubble Component
export const ChatBubble = ({ message, formatTimestamp }) => {
	const getDogMood = () => {
		// Extract mood from message or determine based on content
		if (message.mood) return message.mood;

		const msgText = (message.message || '').toLowerCase();
		if (msgText.includes('excited') || msgText.includes('woof') || msgText.includes('*tail wagging*')) return 'excited';
		if (msgText.includes('curious') || msgText.includes('*tilts head*') || msgText.includes('sniff')) return 'curious';
		if (msgText.includes('proud') || msgText.includes('good boy') || msgText.includes('amazing')) return 'proud';
		if (msgText.includes('playful') || msgText.includes('*spins*') || msgText.includes('*runs*')) return 'playful';

		return 'happy';
	};

	return (
		<div className={`flex items-start space-x-3 mb-4 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
			{message.sender === 'bot' && (
				<DogAvatar mood={getDogMood()} />
			)}

			<div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg relative ${message.sender === 'user'
				? 'bg-blue-500 text-white ml-auto rounded-br-sm'
				: 'bg-white text-gray-800 rounded-bl-sm border-2 border-orange-200'
				}`}>
				{/* Speech bubble tail */}
				<div className={`absolute top-4 ${message.sender === 'user'
					? 'right-0 translate-x-full'
					: 'left-0 -translate-x-full'
					} w-0 h-0 border-8 border-transparent ${message.sender === 'user' ? 'border-l-blue-500' : 'border-r-white'
					}`}></div>

				<div className="text-sm leading-relaxed">
					{message.message || '[Message content missing]'}
				</div>

				{message.timestamp && (
					<div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
						}`}>
						{formatTimestamp(message.timestamp)}
					</div>
				)}
			</div>

			{message.sender === 'user' && (
				<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
					<span className="text-xs">👤</span>
				</div>
			)}
		</div>
	);
};

// Dog-themed Suggestion Button Component
export const SuggestionButton = ({ text, onClick, disabled }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`px-3 py-2 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full text-sm text-orange-800 font-medium border border-orange-300 transition-all duration-200 relative overflow-hidden ${disabled
				? 'opacity-50 cursor-not-allowed'
				: 'hover:shadow-md hover:from-orange-300 hover:to-amber-300 transform hover:-translate-y-0.5'
				}`}
			disabled={disabled}
		>
			<span className="relative z-10 flex items-center">
				🐾 {text}
				<ArrowRightIcon className={`w-3 h-3 ml-1 transition-all duration-300 ${isHovered && !disabled ? 'opacity-100 translate-x-1' : 'opacity-0 -translate-x-1'
					}`} />
			</span>
		</button>
	);
};

// Dog Typing Indicator Component
const DogTypingIndicator = () => {
	return (
		<div className="flex items-start space-x-3 mb-4">
			<DogAvatar mood="curious" />
			<div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border-2 border-orange-200 shadow-lg">
				<div className="flex items-center space-x-1">
					<span className="text-sm text-gray-600">Fido is thinking</span>
					<div className="flex space-x-1">
						<div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
						<div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
						<div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
					</div>
					<span className="text-lg">🐕</span>
				</div>
			</div>
		</div>
	);
};

// Main Dog Chat Assistant Component
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

	const [showingChat, setShowingChat] = useState(false);

	// Memoize the function to prevent recreation on each render
	const handleSuggestion = useCallback((text) => {
		if (isProcessing) return;
		setUserMessage(text);
		setTimeout(() => {
			handleSendMessage();
		}, 100);
	}, [isProcessing, setUserMessage, handleSendMessage]);

	// Animation logic
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
					className="fixed bottom-24 right-6 z-30 w-96 h-[32rem] bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-2xl border-2 border-orange-200 flex flex-col overflow-hidden transition-all duration-500 transform origin-bottom-right"
					style={{
						opacity: showingChat ? 1 : 0,
						transform: showingChat ? 'scale(1)' : 'scale(0.9)'
					}}
				>
					{/* Dog Chat Header */}
					<div className="bg-gradient-to-r from-orange-400 to-amber-500 p-4 border-b-2 border-orange-300">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<DogAvatar size="w-12 h-12" mood="happy" />
								<div className="ml-3">
									<div className="text-lg font-bold text-white flex items-center">
										Fido 🐕
									</div>
									<div className="text-xs text-orange-100">Your Pawsome Portfolio Assistant</div>
								</div>
							</div>
							<div className="flex space-x-2">
								<button
									className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
									onClick={clearChatHistory}
									title="Clear chat history"
								>
									<TrashIcon className="h-4 w-4" />
								</button>
								<button
									className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
									onClick={() => setMinimized(true)}
									title="Minimize"
								>
									<MinusIcon className="h-4 w-4" />
								</button>
								<button
									className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
									onClick={() => setShowAssistant(false)}
									title="Close"
								>
									<XIcon className="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>

					{/* Status bar */}
					<div className="bg-orange-100/50 px-4 py-2 border-b border-orange-200">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
								<span className="text-sm text-orange-800">Fido is online and ready to help! 🦴</span>
							</div>
							{chatMessages.length > 1 && (
								<span className="text-sm text-orange-600">{chatMessages.length} messages</span>
							)}
						</div>
					</div>

					{/* Messages area */}
					<div
						className="flex-1 overflow-y-auto p-4 space-y-4"
						ref={messagesContainerRef}
						onScroll={handleScroll}
						style={{
							scrollbarWidth: 'thin',
							scrollbarColor: '#fb923c #fed7aa'
						}}
					>
						{chatMessages.map((msg, idx) => {
							const messageKey = `${msg.sender}-${msg.id}-${idx}`;
							return (
								<ChatBubble key={messageKey} message={msg} formatTimestamp={formatTimestamp} />
							);
						})}

						{/* Typing indicator */}
						{isTyping && <DogTypingIndicator />}

						<div ref={messagesEndRef} />
					</div>

					{/* New message indicator */}
					{showNewMessageIndicator && (
						<button
							className="absolute right-8 bottom-32 bg-orange-400 text-white px-3 py-1 rounded-full text-sm shadow-lg animate-bounce flex items-center"
							onClick={scrollToBottom}
						>
							<ChevronDownIcon className="h-3 w-3 mr-1" />
							Woof! New message!
						</button>
					)}

					{/* Input area */}
					<div className="bg-white border-t-2 border-orange-200 p-4">
						{/* Input field */}
						<div className="relative mb-3">
							<input
								type="text"
								value={userMessage}
								onChange={(e) => setUserMessage(e.target.value)}
								onKeyPress={handleKeyPress}
								className="w-full pl-4 pr-12 py-3 bg-orange-50 border-2 border-orange-200 rounded-full focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-gray-800 placeholder-orange-400"
								placeholder="Ask Fido anything about Shreyas! 🐾"
								disabled={isProcessing}
							/>
							<button
								onClick={handleSendMessage}
								className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${userMessage.trim() && !isProcessing
									? 'bg-orange-400 hover:bg-orange-500 text-white'
									: 'bg-gray-200 text-gray-400 cursor-not-allowed'
									}`}
								disabled={isProcessing || !userMessage.trim()}
							>
								{isProcessing ? (
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								) : (
									<SendIcon className="h-4 w-4" />
								)}
							</button>
						</div>

						{/* Enhanced suggestion buttons */}
						<div className="flex flex-wrap gap-2">
							<SuggestionButton
								text="Projects"
								onClick={() => handleSuggestion("Show me Shreyas's projects")}
								disabled={isProcessing}
							/>
							<SuggestionButton
								text="Skills"
								onClick={() => handleSuggestion("What are Shreyas's skills?")}
								disabled={isProcessing}
							/>
							<SuggestionButton
								text="Experience"
								onClick={() => handleSuggestion("Tell me about Shreyas's experience")}
								disabled={isProcessing}
							/>
							<SuggestionButton
								text="Good Boy!"
								onClick={() => handleSuggestion("You're such a good boy Fido!")}
								disabled={isProcessing}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Enhanced Minimized Dog */}
			{minimized && (
				<div
					className="fixed bottom-24 right-6 z-30 w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-orange-300"
					onClick={() => setMinimized(false)}
				>
					<span className="text-2xl animate-bounce">🐕</span>
					<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
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