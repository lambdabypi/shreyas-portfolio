// src/InteractivePortfolio.js
import { useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Layout components
import InteractiveBackground from './components/layout/InteractiveBackground';
import { GlassNavigation } from './components/layout/GlassNavigation';

// Section components
import IntroSection from './components/sections/IntroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import VRProjectsSection from './components/sections/VRProjectsSection';
import InterestsSection from './components/sections/InterestsSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';

// Chat components
import { ChatButton, ChatAssistant } from './components/chat/ChatComponents';

// Constellation Clicker Overlay
import ConstellationClickerOverlay from './components/ConstellationClickerOverlay';

// Main portfolio content
const PortfolioContent = () => {
	const { activeSection, isAnimating, mousePosition } = usePortfolio();

	// Handle mouse move to update position in context
	useEffect(() => {
		const handleMouseMove = (e) => {
			mousePosition.current = {
				x: e.clientX,
				y: e.clientY
			};
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [mousePosition]);

	// Determine which section to display
	const renderActiveSection = () => {
		switch (activeSection) {
			case 'intro':
				return <IntroSection />;
			case 'projects':
				return <ProjectsSection />;
			case 'vr-projects':
				return <VRProjectsSection />;
			case 'interests': // Add the new case for interests section
				return <InterestsSection />;
			case 'skills':
				return <SkillsSection />;
			case 'experience':
				return <ExperienceSection />;
			case 'contact':
				return <ContactSection />;
			default:
				return <IntroSection />;
		}
	};

	return (
		<div className="relative min-h-screen overflow-hidden font-sans text-gray-800">
			{/* Interactive Background */}
			<InteractiveBackground />

			{/* Constellation Clicker Overlay */}
			<ConstellationClickerOverlay />

			{/* Container */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen has-menubar">
				{/* Main content area */}
				<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
					{renderActiveSection()}
				</div>

				{/* Navigation - Only shown outside intro */}
				<GlassNavigation />

				{/* Chat components */}
				<ChatButton />
				<ChatAssistant />
			</div>
		</div>
	);
};

// Wrapper component with Context Provider
const InteractivePortfolio = () => {
	return (
		<PortfolioProvider>
			<PortfolioContent />
		</PortfolioProvider>
	);
};

export default InteractivePortfolio;