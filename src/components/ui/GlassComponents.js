// src/components/ui/GlassComponents.js
import { useState } from 'react';
import { ArrowRightIcon } from '../icons';

// Glass Button Component with hover effects
export const GlassButton = ({
	label,
	onClick,
	bgClass = "from-blue-400/80 to-purple-500/80",
	textColorClass = "text-white",
	icon,
	className = ""
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`px-6 py-3 bg-gradient-to-r ${bgClass} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${textColorClass} font-medium flex items-center justify-center group border border-white/20 backdrop-filter backdrop-blur-sm relative overflow-hidden ${className}`}
		>
			{/* Button shine effect */}
			<span
				className={`absolute inset-0 opacity-0 transition-opacity duration-500 button-shine ${isHovered ? 'opacity-100' : ''}`}
			/>

			{/* Text content */}
			<span className="relative z-10">{label}</span>

			{/* Icon if provided, otherwise use arrow */}
			{icon ? (
				<span className="ml-2 relative z-10">{icon}</span>
			) : (
				<ArrowRightIcon className="w-4 h-4 ml-2 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />
			)}
		</button>
	);
};

// Glass Card Component
export const GlassCard = ({
	children,
	className = "",
	hoverEffect = true,
	glowEffect = false,
	pulseEffect = false // New prop to control pulse animation
}) => {
	return (
		<div className={`
      glass-card p-5 rounded-xl 
      ${hoverEffect ? 'hover:shadow-xl transition-transform duration-300 hover:-translate-y-1' : ''}
      ${glowEffect ? 'hover:border-white/30' : ''}
      ${pulseEffect ? 'pulse-on-hover' : ''}
      ${className}
    `}>
			{children}
		</div>
	);
};

// Glass Badge Component
export const GlassBadge = ({
	text,
	bgColorClass = "bg-blue-500/20",
	textColorClass = "text-blue-200",
	className = ""
}) => {
	return (
		<span className={`
      px-2 py-1 ${bgColorClass} ${textColorClass} rounded-full text-xs 
      border border-white/20 backdrop-blur-sm
      ${className}
    `}>
			{text}
		</span>
	);
};

// Glass Header Component
export const GlassHeader = ({ title, subtitle, className = "" }) => {
	return (
		<div className={`glass-header sticky top-0 z-10 ${className}`}>
			<div className="glass-header-inner p-2">
				<h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
					{title}
				</h2>
				{subtitle && (
					<p className="text-center text-gray-300 mt-1">{subtitle}</p>
				)}
			</div>
			<div className="glass-header-glow"></div>
		</div>
	);
};

// Glass Social Button Component
export const GlassSocialButton = ({
	icon,
	url = "#social",
	bgColorClass = "bg-blue-500/30",
	hoverColorClass = "hover:bg-blue-500/50",
	className = ""
}) => {
	return (
		<a
			href={url}
			className={`
        w-12 h-12 flex items-center justify-center ${bgColorClass} ${hoverColorClass} 
        rounded-full transition-all duration-300 text-white shadow-md hover:shadow-lg 
        transform hover:-translate-y-1 border border-white/20
        ${className}
      `}
			target="_blank"
			rel="noopener noreferrer"
		>
			{icon}
		</a>
	);
};

// Glass Contact Method Component
export const GlassContactMethod = ({
	icon,
	label,
	value,
	bgColorClass = "bg-blue-500/30",
	className = ""
}) => {
	return (
		<div className={`flex items-start ${className}`}>
			<div className={`mt-1 w-10 h-10 flex items-center justify-center ${bgColorClass} rounded-full text-white border border-white/20 shadow-inner`}>
				{icon}
			</div>
			<div className="ml-3">
				<div className="text-sm text-blue-300 font-medium">{label}</div>
				<div className="text-black">{value}</div>
			</div>
		</div>
	);
};

// Create a proper named export object
const GlassComponents = {
	GlassButton,
	GlassCard,
	GlassBadge,
	GlassHeader,
	GlassSocialButton,
	GlassContactMethod
};

export default GlassComponents;