// src/components/sections/VRProjectsSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader, GlassCard, GlassBadge } from '../ui/GlassComponents';
import { ArrowLeftIcon } from '../icons';
import vrProjectsData from '../../data/vrProjectsData';

// Custom VR Icon component
const VRIcon = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
		/>
	</svg>
);

// Enhanced VRProjectCard component with custom icons
const VRProjectCard = ({ project, onClick }) => {
	return (
		<div
			className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
			onClick={onClick}
		>
			<div className="h-44 flex items-center justify-center p-4 border-b border-white/10 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-75 transition-opacity"></div>
				<div className="relative z-10">
					<VRIcon className="w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors" />
				</div>
				{project.videoUrl && (
					<div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
						Video Demo
					</div>
				)}
			</div>

			<div className="p-5">
				<h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
					{project.title}
				</h3>
				<p className="text-white text-opacity-50 text-sm mb-4">
					{project.description}
				</p>
				<div className="flex flex-wrap gap-2">
					{project.tags.slice(0, 3).map((tag, idx) => (
						<GlassBadge
							key={idx}
							text={tag}
							bgColorClass="bg-blue-500/20"
							textColorClass="text-black-200"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const VRProjectDetail = ({ project, onBack }) => {
	return (
		<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			{/* Fixed header */}
			<GlassHeader title="VR Project Details" />

			<div className="p-6">
				<button
					onClick={onBack}
					className="mb-6 flex items-center text-blue-400 hover:text-black transition-colors glass-button px-3 py-1.5 rounded-lg"
				>
					<ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to VR projects
				</button>

				<div className="flex flex-col md:flex-row gap-8">
					<div className="md:w-2/5">
						{/* Video embed if available */}
						{project.videoUrl && (
							<div className="glass-card rounded-xl p-2 mb-6 overflow-hidden">
								<iframe
									className="w-full aspect-video rounded-lg"
									src={`${project.videoUrl.replace('youtu.be/', 'youtube.com/embed/')}`}
									title={`${project.title} video`}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
						)}

						{/* If no video, show VR icon */}
						{!project.videoUrl && (
							<div className="glass-card rounded-xl p-5 flex items-center justify-center h-60 mb-6">
								<VRIcon className="w-20 h-20 text-blue-400" />
							</div>
						)}

						<div className="flex flex-wrap gap-2 mb-4">
							{project.tags.map((tag, idx) => (
								<GlassBadge
									key={idx}
									text={tag}
									bgColorClass="bg-blue-500/20"
									textColorClass="text-white text-opacity-80"
								/>
							))}
						</div>

						{/* GitHub link if available */}
						{project.githubUrl && (
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="glass-button w-full py-2 px-4 rounded-lg flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
								View on GitHub
							</a>
						)}
					</div>

					<div className="md:w-3/5">
						<h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
							{project.title}
						</h2>
						<div className="text-blue-400 mb-2 font-medium">{project.period}</div>
						<p className="text-white text-opacity-50 mb-4">
							{project.description}
						</p>
						<p className="text-white mb-8">
							{project.details}
						</p>

						<div className="grid grid-cols-2 gap-4 mb-6">
							{project.metrics.map((metric, idx) => (
								<GlassCard key={idx} className="p-4" hoverEffect={false}>
									<div className="text-blue-300 mb-1 text-sm font-medium">{metric.label}</div>
									<div className="text-2xl font-bold text-white">{metric.value}</div>
								</GlassCard>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const VRProjectsSection = () => {
	const { selectedVRProject, setSelectedVRProject, isAnimating } = usePortfolio();

	// If a VR project is selected, show the project detail
	if (selectedVRProject) {
		const project = vrProjectsData.find(p => p.id === selectedVRProject);
		return (
			<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
				<VRProjectDetail project={project} onBack={() => setSelectedVRProject(null)} />
			</div>
		);
	}

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				{/* Fixed header */}
				<GlassHeader title="VR & Mixed Reality Projects" />

				<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{vrProjectsData.map((project) => (
							<VRProjectCard
								key={project.id}
								project={project}
								onClick={() => setSelectedVRProject(project.id)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VRProjectsSection;