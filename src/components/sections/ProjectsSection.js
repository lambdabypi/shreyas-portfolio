// src/components/sections/ProjectsSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader, GlassCard, GlassBadge } from '../ui/GlassComponents';
import { ArrowLeftIcon, RocketIcon } from '../icons';
import projectsData from '../../data/projectsData';
import MentorEmailGenerator from '../projects/MentorEmailGenerator';

// Enhanced ProjectCard component with custom icons based on project type
const ProjectCard = ({ project, onClick }) => {
	// Choose icon based on project ID
	const getProjectIcon = () => {
		switch (project.id) {
			case 'mentor-email-generator':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				);
			default:
				return <RocketIcon className="w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors relative z-10" />;
		}
	};

	return (
		<div
			className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
			onClick={onClick}
		>
			<div className="h-44 flex items-center justify-center p-4 border-b border-white/10 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-75 transition-opacity"></div>
				<div className="relative z-10">
					{getProjectIcon()}
				</div>
				{project.interactive && (
					<div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
						Interactive
					</div>
				)}
			</div>

			<div className="p-5">
				<h3 className="text-xl font-bold mb-2 text-black group-hover:text-blue-300 transition-colors">
					{project.title}
				</h3>
				<p className="text-black-300 text-sm mb-4">
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

const ProjectDetail = ({ project, onBack }) => {
	// If this is the MENTOR project and it's interactive, show the interactive component
	if (project.id === 'mentor-email-generator' && project.interactive) {
		return (
			<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				{/* Fixed header */}
				<GlassHeader title="Project Details" />

				<div className="p-6">
					<button
						onClick={onBack}
						className="mb-6 flex items-center text-blue-400 hover:text-black transition-colors glass-button px-3 py-1.5 rounded-lg"
					>
						<ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to projects
					</button>

					<MentorEmailGenerator />
				</div>
			</div>
		);
	}

	// Default project detail view
	return (
		<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			{/* Fixed header */}
			<GlassHeader title="Project Details" />

			<div className="p-6">
				<button
					onClick={onBack}
					className="mb-6 flex items-center text-blue-400 hover:text-black transition-colors glass-button px-3 py-1.5 rounded-lg"
				>
					<ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to projects
				</button>

				<div className="flex flex-col md:flex-row gap-8">
					<div className="md:w-2/5">
						<div className="glass-card rounded-xl p-5 flex items-center justify-center h-60 mb-6">
							<RocketIcon className="w-20 h-20 text-blue-400" />
						</div>

						<div className="flex flex-wrap gap-2 mb-4">
							{project.tags.map((tag, idx) => (
								<GlassBadge
									key={idx}
									text={tag}
									bgColorClass="bg-blue-500/20"
									textColorClass="text-black-200"
								/>
							))}
						</div>
					</div>

					<div className="md:w-3/5">
						<h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
							{project.title}
						</h2>
						<div className="text-blue-400 mb-2 font-medium">{project.period}</div>
						<p className="text-gray-400 mb-4">
							{project.description}
						</p>
						<p className="text-black mb-8">
							{project.details}
						</p>

						<div className="grid grid-cols-2 gap-4 mb-6">
							{project.metrics.map((metric, idx) => (
								<GlassCard key={idx} className="p-4" hoverEffect={false}>
									<div className="text-blue-300 mb-1 text-sm font-medium">{metric.label}</div>
									<div className="text-2xl font-bold text-black">{metric.value}</div>
								</GlassCard>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProjectsSection = () => {
	const { selectedProject, setSelectedProject, isAnimating } = usePortfolio();

	// If a project is selected, show the project detail
	if (selectedProject) {
		const project = projectsData.find(p => p.id === selectedProject);
		return (
			<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
				<ProjectDetail project={project} onBack={() => setSelectedProject(null)} />
			</div>
		);
	}

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				{/* Fixed header */}
				<GlassHeader title="Projects" />

				<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{projectsData.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								onClick={() => setSelectedProject(project.id)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectsSection;