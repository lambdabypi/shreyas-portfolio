// src/components/GlitchText.js
import { useState, useEffect, useMemo, useCallback } from 'react';

// Enhanced GlitchText component that does character replacement
const GlitchText = ({ text, glitchInterval = 4000, intensity = 'medium', className = '' }) => {
	const [displayText, setDisplayText] = useState(text);
	const [isGlitching, setIsGlitching] = useState(false);
	const [glitchIntensity, setGlitchIntensity] = useState(0.7);

	// Characters to use in the glitch effect
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|';

	// Glitch effect
	useEffect(() => {
		let glitchFrameInterval;
		let normalInterval;
		let initialDelay;

		// Start with normal text
		setDisplayText(text);

		// Function to trigger a glitch session
		const triggerGlitch = () => {
			if (Math.random() < 0.8) { // 80% chance to glitch
				setIsGlitching(true);
				setGlitchIntensity(Math.random() * 0.5 + 0.5); // Random intensity between 0.5-1.0

				// Glitch effect - rapidly change random characters
				let glitchCount = 0;
				const maxGlitches = Math.floor(Math.random() * 10) + 5; // 5-15 frames of glitching

				glitchFrameInterval = setInterval(() => {
					if (glitchCount > maxGlitches) {
						clearInterval(glitchFrameInterval);
						setDisplayText(text); // Reset back to normal text
						setIsGlitching(false);

						// Schedule next glitch
						normalInterval = setTimeout(triggerGlitch, Math.random() * glitchInterval + (glitchInterval / 2));
						return;
					}

					// Create glitched text by replacing random characters
					const textArray = text.split('');

					// The number of characters to glitch depends on intensity
					const numGlitches = intensity === 'high'
						? Math.floor(Math.random() * 4) + 3  // 3-7 chars
						: intensity === 'medium'
							? Math.floor(Math.random() * 3) + 1  // 1-4 chars
							: Math.floor(Math.random() * 2) + 1; // 1-3 chars

					for (let i = 0; i < numGlitches; i++) {
						const position = Math.floor(Math.random() * textArray.length);
						textArray[position] = characters.charAt(Math.floor(Math.random() * characters.length));
					}

					setDisplayText(textArray.join(''));
					glitchCount++;
				}, 80); // Duration of each glitch frame
			} else {
				// Schedule next attempt if we skipped this one
				normalInterval = setTimeout(triggerGlitch, Math.random() * glitchInterval + 500);
			}
		};

		// Start the cycle
		initialDelay = setTimeout(triggerGlitch, Math.random() * 2000 + 1000);

		return () => {
			clearTimeout(initialDelay);
			clearInterval(glitchFrameInterval);
			clearTimeout(normalInterval);
		};
	}, [text, glitchInterval, intensity, characters]);

	// Determine visual glitch style based on whether we're glitching
	const glitchStyle = isGlitching ? {
		position: 'relative',
		display: 'inline-block',
		textShadow: `${Math.random() * 8 - 4}px ${Math.random() * 5 - 2.5}px 0 rgba(255,0,0,${glitchIntensity}),
                 ${Math.random() * -8 + 4}px ${Math.random() * -5 + 2.5}px 0 rgba(0,255,255,${glitchIntensity})`,
		transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
		filter: `hue-rotate(${Math.random() * 30}deg)`,
	} : {};

	return (
		<span className={`relative inline-block ${className}`}>
			{/* Main text with glitch effects */}
			<span style={glitchStyle}>
				{displayText}
			</span>

			{/* Additional visual glitch layers - only shown during glitch effect */}
			{isGlitching && (
				<>
					<span
						style={{
							position: 'absolute',
							top: `${Math.random() * 6 - 3}px`,
							left: 0,
							color: 'rgba(255, 0, 0, 0.7)',
							clipPath: `polygon(0 ${Math.random() * 50}%, 100% ${Math.random() * 50}%, 100% ${50 + Math.random() * 50}%, 0 ${50 + Math.random() * 50}%)`,
							textShadow: '2px 0 #f0f',
							mixBlendMode: 'screen',
							zIndex: -1,
						}}
					>
						{displayText}
					</span>
					<span
						style={{
							position: 'absolute',
							top: `${Math.random() * -6 + 3}px`,
							left: 0,
							color: 'rgba(0, 255, 255, 0.7)',
							clipPath: `polygon(0 ${Math.random() * 50}%, 100% ${Math.random() * 50}%, 100% ${50 + Math.random() * 50}%, 0 ${50 + Math.random() * 50}%)`,
							textShadow: '-2px 0 #0ff',
							mixBlendMode: 'screen',
							zIndex: -1,
						}}
					>
						{displayText}
					</span>
				</>
			)}
		</span>
	);
};

// Component for job title glitch rotation
const GlitchJobTitle = () => {
	const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
	const [titleGlitching, setTitleGlitching] = useState(false);
	const [displayText, setDisplayText] = useState("");

	// Characters for the glitch effect
	const glitchChars = useMemo(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|', []);

	// Job titles to cycle through - memoized to prevent recreation on each render
	const jobTitles = useMemo(() => [
		"Data Scientist",
		"Machine Learning Engineer",
		"Full-Stack AI Developer",
		"Cloud Solutions Architect",
		"NLP Specialist"
	], []);

	// Initialize with the first title
	useEffect(() => {
		setDisplayText(jobTitles[0]);
	}, [jobTitles]);

	// Helper function to create glitched text - wrapped in useCallback to prevent recreations
	const createGlitchedText = useCallback((text, numGlitches) => {
		const textArray = text.split('');
		const positions = new Set();

		// Generate unique random positions
		while (positions.size < numGlitches && positions.size < text.length) {
			positions.add(Math.floor(Math.random() * text.length));
		}

		// Replace characters at those positions
		positions.forEach(pos => {
			textArray[pos] = glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
		});

		return textArray.join('');
	}, [glitchChars]);

	// Effect for job title glitches and rotation
	useEffect(() => {
		// Cycle through job titles
		const titleInterval = setInterval(() => {
			setTitleGlitching(true);

			// Start the glitch transition
			let glitchSteps = 0;
			const maxSteps = 10;
			const glitchDuration = 100; // ms between glitch frames

			const glitchInterval = setInterval(() => {
				if (glitchSteps < maxSteps / 2) {
					// First half: increasingly glitch the current title
					const glitchText = createGlitchedText(
						jobTitles[currentTitleIndex],
						Math.ceil((glitchSteps / (maxSteps / 2)) * jobTitles[currentTitleIndex].length * 0.5)
					);
					setDisplayText(glitchText);
				} else if (glitchSteps === Math.floor(maxSteps / 2)) {
					// Midpoint: change to the next title index
					const nextIndex = (currentTitleIndex + 1) % jobTitles.length;
					setCurrentTitleIndex(nextIndex);

					// Heavily glitch the new title
					const glitchText = createGlitchedText(
						jobTitles[nextIndex],
						Math.ceil(jobTitles[nextIndex].length * 0.7)
					);
					setDisplayText(glitchText);
				} else {
					// Second half: gradually reduce glitching on the new title
					const remaining = maxSteps - glitchSteps;
					const glitchText = createGlitchedText(
						jobTitles[currentTitleIndex],
						Math.ceil((remaining / (maxSteps / 2)) * jobTitles[currentTitleIndex].length * 0.5)
					);
					setDisplayText(glitchText);
				}

				glitchSteps++;

				// End the glitch effect
				if (glitchSteps >= maxSteps) {
					clearInterval(glitchInterval);
					setDisplayText(jobTitles[currentTitleIndex]);
					setTitleGlitching(false);
				}
			}, glitchDuration);

		}, 4000); // Change every 4 seconds

		return () => clearInterval(titleInterval);
	}, [currentTitleIndex, jobTitles, createGlitchedText]);

	return (
		<div
			className="text-xl text-blue-300 mb-8 font-medium relative"
			style={{
				minHeight: '1.75rem', // Prevent layout shift during transitions
			}}
		>
			<div
				style={{
					position: 'relative',
					display: 'inline-block',
					transform: titleGlitching ?
						`translate3d(${Math.random() * 8 - 4}px, ${Math.random() * 4 - 2}px, 0) skew(${Math.random() * 6 - 3}deg)`
						: 'none',
					textShadow: titleGlitching ?
						`${Math.random() * 6 - 3}px ${Math.random() * 3 - 1.5}px 0 rgba(255,0,0,0.7),
             ${Math.random() * -6 + 3}px ${Math.random() * -3 + 1.5}px 0 rgba(0,255,255,0.7)`
						: 'none',
					transition: titleGlitching ? 'none' : 'all 0.5s ease-out',
				}}
			>
				{displayText}
			</div>

			{/* Glitch layers */}
			{titleGlitching && (
				<>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							color: 'rgba(255, 0, 255, 0.7)',
							clipPath: `polygon(0 ${Math.random() * 50}%, 100% ${Math.random() * 50}%, 100% ${50 + Math.random() * 50}%, 0 ${50 + Math.random() * 50}%)`,
							transform: `translate3d(${Math.random() * 8 - 4}px, ${Math.random() * 4 - 2}px, 0)`,
							textShadow: '2px 0 rgb(255, 0, 0)',
							mixBlendMode: 'screen',
						}}
					>
						{displayText}
					</div>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							color: 'rgba(0, 255, 255, 0.7)',
							clipPath: `polygon(0 ${Math.random() * 50}%, 100% ${Math.random() * 50}%, 100% ${50 + Math.random() * 50}%, 0 ${50 + Math.random() * 50}%)`,
							transform: `translate3d(${Math.random() * -8 + 4}px, ${Math.random() * -4 + 2}px, 0)`,
							textShadow: '-2px 0 rgb(0, 255, 0)',
							mixBlendMode: 'screen',
						}}
					>
						{displayText}
					</div>
				</>
			)}
		</div>
	);
};

// Combined component for portfolio use
const GlitchEffects = () => {
	return (
		<div>
			{/* Name with random glitch effect */}
			<h1 className="text-5xl font-bold mb-4">
				<GlitchText
					text="Shreyas Sreenivas"
					intensity="medium"
					className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent"
				/>
			</h1>

			{/* Job title with cycling glitch effect */}
			<GlitchJobTitle />
		</div>
	);
};

export default GlitchEffects;