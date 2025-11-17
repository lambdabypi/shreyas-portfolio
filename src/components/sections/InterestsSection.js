// src/components/sections/InterestsSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader } from '../ui/GlassComponents';
import TimelineExperience from './TimelineExperience';

// Main Interests Section component
const InterestsSection = () => {
	const { isAnimating } = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Interests & Hobbies" />

				<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
					{/* Introduction */}
					<div className="mb-8">
						<p className="text-black-200 mb-4">
							Beyond technology and professional endeavors, I enjoy exploring various interests that keep me balanced and inspired. Here's a glimpse into my personal world outside of work.
						</p>
					</div>

					{/* Timeline Experience */}
					<TimelineExperience />
				</div>
			</div>
		</div>
	);
};

export default InterestsSection;