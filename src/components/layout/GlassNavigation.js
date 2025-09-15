// src/components/layout/GlassNavigation.js
// Update your existing GlassNavigation component to include VR projects

import { usePortfolio } from '../../context/PortfolioContext';

// Navigation item component
const NavItem = ({ icon, label, section, active, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${active
					? 'bg-white/20 text-white shadow-md'
					: 'text-white/70 hover:bg-white/10 hover:text-white'
				}`}
		>
			{icon}
			<span className="font-medium">{label}</span>
		</button>
	);
};

// Main navigation component
export const GlassNavigation = () => {
	const { activeSection, changeSection } = usePortfolio();

	// Navigation items data
	const navItems = [
		{
			label: 'About',
			section: 'intro',
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			)
		},
		{
			label: 'Projects',
			section: 'projects',
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
				</svg>
			)
		},
		// Add VR Projects navigation item
		{
			label: 'VR Projects',
			section: 'vr-projects',
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
				</svg>
			)
		},
		{
			label: 'Skills',
			section: 'skills',
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
			)
		},
		{
			label: 'Experience',
			section: 'experience',
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			)
		},
		{
			label: 'Contact',
			section: 'contact',
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			)
		}
	];

	return (
		<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
			<div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-md rounded-xl shadow-lg">
				{navItems.map((item) => (
					<NavItem
						key={item.section}
						icon={item.icon}
						label={item.label}
						section={item.section}
						active={activeSection === item.section}
						onClick={() => changeSection(item.section)}
					/>
				))}
			</div>
		</div>
	);
};