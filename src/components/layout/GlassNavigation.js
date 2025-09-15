// src/components/layout/GlassNavigation.js
import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

// Glass Navigation Bar with animation enhancements
export const GlassNavigation = () => {
	const { activeSection, changeSection } = usePortfolio();
	const [hoveredSection, setHoveredSection] = useState(null);

	return (
		<nav className="fixed top-4 left-4 right-4 z-30 glass-nav backdrop-blur-xl rounded-xl shadow-lg border border-white/20 transition-all duration-300">
			<div className="flex justify-between items-center px-5 py-3">
				<div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
					Shreyas Sreenivas
				</div>
				<div className="flex space-x-2">
					<GlassNavButton
						label="Projects"
						onClick={() => changeSection('projects')}
						active={activeSection === 'projects'}
						onHover={() => setHoveredSection('projects')}
						onLeave={() => setHoveredSection(null)}
						isHovered={hoveredSection === 'projects'}
					/>
					<GlassNavButton
						label="Skills"
						onClick={() => changeSection('skills')}
						active={activeSection === 'skills'}
						onHover={() => setHoveredSection('skills')}
						onLeave={() => setHoveredSection(null)}
						isHovered={hoveredSection === 'skills'}
					/>
					<GlassNavButton
						label="Experience"
						onClick={() => changeSection('experience')}
						active={activeSection === 'experience'}
						onHover={() => setHoveredSection('experience')}
						onLeave={() => setHoveredSection(null)}
						isHovered={hoveredSection === 'experience'}
					/>
					<GlassNavButton
						label="Contact"
						onClick={() => changeSection('contact')}
						active={activeSection === 'contact'}
						onHover={() => setHoveredSection('contact')}
						onLeave={() => setHoveredSection(null)}
						isHovered={hoveredSection === 'contact'}
					/>
				</div>
			</div>
		</nav>
	);
};

// Enhanced Glass Navigation Button with hover effects
export const GlassNavButton = ({
	label,
	onClick,
	active,
	onHover,
	onLeave,
	isHovered
}) => {
	return (
		<button
			onClick={onClick}
			onMouseEnter={onHover}
			onMouseLeave={onLeave}
			className={`relative px-4 py-2 rounded-lg transition-all duration-300 overflow-hidden group ${active
					? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white shadow-md'
					: 'text-black-300 hover:text-black'
				}`}
		>
			{/* Background with hover effect */}
			<span
				className={`absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 ${isHovered && !active ? 'opacity-100' : ''
					}`}
			/>

			{/* Button shine effect */}
			<span
				className={`absolute inset-0 opacity-0 transition-opacity duration-300 button-shine ${isHovered ? 'opacity-100' : ''
					}`}
			/>

			{/* Text content */}
			<span className="relative z-10">{label}</span>
		</button>
	);
};

export default GlassNavigation;