import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Text animation for speech bubble
const TypewriterText = ({ text }) => {
	const [displayedText, setDisplayedText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timer = setTimeout(() => {
				setDisplayedText(prev => prev + text[currentIndex]);
				setCurrentIndex(currentIndex + 1);
			}, 50); // Speed of typing
			return () => clearTimeout(timer);
		}
	}, [text, currentIndex]);

	// Reset animation when text changes
	useEffect(() => {
		setDisplayedText('');
		setCurrentIndex(0);
	}, [text]);

	return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

// This component assumes you have multiple memoji frames or images for different expressions
const MemojiSpeakingAvatar = ({
	// Default images - you'll need to replace these with your actual image paths
	idleImageSrc = '/memoji-idle.png',
	talkingImageSrcs = ['/memoji-talking-1.png', '/memoji-talking-2.png', '/memoji-talking-3.png'],
	name = "Shreyas"
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [bubbleText, setBubbleText] = useState(`Hi, I'm ${name}!`);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Different greeting texts
	const greetings = [
		`Hi, I'm ${name}!`,
		"Welcome to my portfolio!",
		"Check out my projects!",
		"I build AI solutions!",
		"Let's connect!"
	];

	// Animate memoji when speaking
	useEffect(() => {
		if (!isSpeaking) {
			return; // Don't animate when not speaking
		}

		// Animate through talking images
		const interval = setInterval(() => {
			setCurrentImageIndex(prevIndex =>
				prevIndex >= talkingImageSrcs.length - 1 ? 0 : prevIndex + 1
			);
		}, 150);

		return () => clearInterval(interval);
	}, [isSpeaking, talkingImageSrcs.length]);

	// Initial greeting
	useEffect(() => {
		setTimeout(() => {
			setIsSpeaking(true);
			setBubbleText(greetings[0]);
			setTimeout(() => {
				setIsSpeaking(false);
			}, 3000);
		}, 1000);

		// Random greetings
		const interval = setInterval(() => {
			if (!isHovered && Math.random() > 0.7) {
				const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
				setBubbleText(randomGreeting);
				setIsSpeaking(true);
				setTimeout(() => {
					setIsSpeaking(false);
				}, 2500);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [greetings, isHovered]);

	// Get current image based on state
	const getCurrentImage = () => {
		if (!isSpeaking) return idleImageSrc;
		return talkingImageSrcs[currentImageIndex];
	};

	return (
		<div
			className="relative w-48 h-48 mx-auto"
			onMouseEnter={() => {
				setIsHovered(true);
				const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
				setBubbleText(randomGreeting);
				setIsSpeaking(true);
				setTimeout(() => setIsSpeaking(false), 2500);
			}}
			onMouseLeave={() => {
				setIsHovered(false);
			}}
			onClick={() => {
				if (!isSpeaking) {
					const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
					setBubbleText(randomGreeting);
					setIsSpeaking(true);
					setTimeout(() => setIsSpeaking(false), 2500);
				}
			}}
		>
			{/* Memoji container */}
			<motion.div
				className="w-36 h-36 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-lg"
				animate={{
					y: [0, -5, 0],
				}}
				transition={{
					repeat: Infinity,
					duration: 3,
					ease: "easeInOut"
				}}
				whileHover={{
					scale: 1.05,
					boxShadow: "0 0 25px rgba(101, 31, 255, 0.6)"
				}}
			>
				{/* For a one-frame solution if you don't have talking frames */}
				{talkingImageSrcs.length === 0 ? (
					<motion.img
						src={idleImageSrc}
						alt={`${name}'s avatar`}
						className="w-full h-full object-cover"
						animate={{ scale: isSpeaking ? [1, 1.03, 1] : 1 }}
						transition={{
							repeat: isSpeaking ? Infinity : 0,
							duration: 0.3
						}}
					/>
				) : (
					// Multi-frame animation for talking
					<img
						src={getCurrentImage()}
						alt={`${name}'s avatar`}
						className="w-full h-full object-cover"
					/>
				)}
			</motion.div>

			{/* Decorative elements */}
			<motion.div
				className="absolute -top-2 -left-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white"
				whileHover={{ scale: 1.2, rotate: 20 }}
				whileTap={{ scale: 0.9 }}
			>
				S
			</motion.div>

			{/* Speech bubble with typewriter effect */}
			<AnimatePresence>
				{isSpeaking && (
					<motion.div
						className="absolute -top-14 right-0 bg-white text-black px-4 py-2 rounded-xl shadow-lg z-10 text-sm font-medium"
						initial={{ opacity: 0, y: 10, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.9 }}
						transition={{ duration: 0.2 }}
					>
						<TypewriterText text={bubbleText} />
						<div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MemojiSpeakingAvatar;