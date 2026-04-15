// src/components/sections/ProjectsSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader, GlassCard } from '../ui/GlassComponents';
import { ArrowLeftIcon } from '../icons';
import projectsData from '../../data/projectsData';
import MentorEmailGenerator from '../projects/MentorEmailGenerator';

// ── Per-project visual config ────────────────────────────────────────────────
const PROJECT_CONFIG = {
	'miniquest': {
		gradient: 'from-teal-500/30 to-cyan-500/20',
		hoverGradient: 'group-hover:from-teal-500/45 group-hover:to-cyan-500/35',
		accent: 'text-teal-300',
		badge: 'bg-teal-500/20 border-teal-400/40 text-teal-200',
	},
	'atlas': {
		gradient: 'from-rose-500/30 to-pink-500/20',
		hoverGradient: 'group-hover:from-rose-500/45 group-hover:to-pink-500/35',
		accent: 'text-rose-300',
		badge: 'bg-rose-500/20 border-rose-400/40 text-rose-200',
	},
	'medical-framework': {
		gradient: 'from-purple-500/30 to-violet-600/20',
		hoverGradient: 'group-hover:from-purple-500/45 group-hover:to-violet-600/35',
		accent: 'text-purple-300',
		badge: 'bg-purple-500/20 border-purple-400/40 text-purple-200',
	},
	'mentor-email-generator': {
		gradient: 'from-blue-500/30 to-indigo-500/20',
		hoverGradient: 'group-hover:from-blue-500/45 group-hover:to-indigo-500/35',
		accent: 'text-blue-300',
		badge: 'bg-blue-500/20 border-blue-400/40 text-blue-200',
	},
	'video-classifier': {
		gradient: 'from-orange-500/30 to-amber-500/20',
		hoverGradient: 'group-hover:from-orange-500/45 group-hover:to-amber-500/35',
		accent: 'text-orange-300',
		badge: 'bg-orange-500/20 border-orange-400/40 text-orange-200',
	},
	'glioma-classification': {
		gradient: 'from-emerald-500/30 to-green-500/20',
		hoverGradient: 'group-hover:from-emerald-500/45 group-hover:to-green-500/35',
		accent: 'text-emerald-300',
		badge: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
	},
};

const defaultConfig = {
	gradient: 'from-blue-500/30 to-purple-500/20',
	hoverGradient: 'group-hover:from-blue-500/45 group-hover:to-purple-500/35',
	accent: 'text-blue-300',
	badge: 'bg-blue-500/20 border-blue-400/40 text-blue-200',
};

// ── Unique SVG icons per project ─────────────────────────────────────────────
const ProjectIcon = ({ id }) => {
	switch (id) {

		case 'miniquest':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					{/* Glowing backdrop */}
					<circle cx="32" cy="32" r="28" fill="url(#mq-bg)" opacity="0.18" />
					{/* Map pin body */}
					<path d="M32 8C23.16 8 16 15.16 16 24c0 12 16 32 16 32s16-20 16-32c0-8.84-7.16-16-16-16z"
						fill="url(#mq-pin)" opacity="0.9" />
					{/* Pin inner circle */}
					<circle cx="32" cy="24" r="6" fill="white" opacity="0.9" />
					<circle cx="32" cy="24" r="3.5" fill="url(#mq-dot)" />
					{/* Route line */}
					<path d="M14 52 Q24 44 32 48 Q40 52 50 44" stroke="url(#mq-route)" strokeWidth="2"
						strokeDasharray="3 2" strokeLinecap="round" opacity="0.7" />
					{/* Sparkles */}
					<circle cx="52" cy="16" r="1.5" fill="#67e8f9" opacity="0.8" />
					<circle cx="12" cy="20" r="1" fill="#2dd4bf" opacity="0.6" />
					<circle cx="56" cy="30" r="1" fill="#67e8f9" opacity="0.5" />
					<defs>
						<radialGradient id="mq-bg" cx="50%" cy="50%">
							<stop offset="0%" stopColor="#0d9488" />
							<stop offset="100%" stopColor="#0891b2" />
						</radialGradient>
						<linearGradient id="mq-pin" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#2dd4bf" />
							<stop offset="100%" stopColor="#0ea5e9" />
						</linearGradient>
						<radialGradient id="mq-dot">
							<stop offset="0%" stopColor="#0d9488" />
							<stop offset="100%" stopColor="#0284c7" />
						</radialGradient>
						<linearGradient id="mq-route" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#2dd4bf" />
							<stop offset="100%" stopColor="#38bdf8" />
						</linearGradient>
					</defs>
				</svg>
			);

		case 'atlas':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#atl-bg)" opacity="0.15" />
					{/* Clipboard backdrop */}
					<rect x="19" y="11" width="26" height="34" rx="3" fill="url(#atl-doc)" opacity="0.18" />
					<rect x="27" y="8" width="10" height="5" rx="2" fill="url(#atl-clip)" opacity="0.75" />
					{/* ECG heartbeat line */}
					<path d="M10 33 L19 33 L23 22 L27 44 L31 28 L35 37 L39 33 L54 33"
						stroke="url(#atl-ecg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
					{/* Pulse nodes */}
					<circle cx="23" cy="22" r="2.5" fill="#fb7185" opacity="0.9" />
					<circle cx="31" cy="28" r="2.5" fill="#f43f5e" opacity="0.95" />
					<circle cx="35" cy="37" r="2" fill="#fb7185" opacity="0.85" />
					{/* AI sparkle top-right */}
					<path d="M47 14 L49 18 L53 16 L49 20 L51 24 L47 20 L43 22 L47 18 Z"
						fill="url(#atl-star)" opacity="0.75" />
					<defs>
						<radialGradient id="atl-bg" cx="50%" cy="50%">
							<stop offset="0%" stopColor="#e11d48" />
							<stop offset="100%" stopColor="#be185d" />
						</radialGradient>
						<linearGradient id="atl-doc" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#fb7185" />
							<stop offset="100%" stopColor="#f43f5e" />
						</linearGradient>
						<linearGradient id="atl-clip" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#fda4af" />
							<stop offset="100%" stopColor="#fb7185" />
						</linearGradient>
						<linearGradient id="atl-ecg" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#fda4af" />
							<stop offset="50%" stopColor="#f43f5e" />
							<stop offset="100%" stopColor="#fb7185" />
						</linearGradient>
						<linearGradient id="atl-star" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#67e8f9" />
							<stop offset="100%" stopColor="#a78bfa" />
						</linearGradient>
					</defs>
				</svg>
			);

		case 'medical-framework':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#med-bg)" opacity="0.15" />
					{/* Brain outline */}
					<path d="M32 14 C22 14 16 20 16 27 C16 30 17 32 19 34 C17 35 16 37 16 39 C16 44 20 48 26 48 C28 48 30 47 32 46 C34 47 36 48 38 48 C44 48 48 44 48 39 C48 37 47 35 45 34 C47 32 48 30 48 27 C48 20 42 14 32 14Z"
						stroke="url(#med-stroke)" strokeWidth="1.5" fill="url(#med-fill)" opacity="0.7" />
					{/* Neural nodes */}
					<circle cx="32" cy="22" r="3.5" fill="#a855f7" opacity="0.9" />
					<circle cx="22" cy="32" r="3" fill="#8b5cf6" opacity="0.85" />
					<circle cx="42" cy="32" r="3" fill="#8b5cf6" opacity="0.85" />
					<circle cx="26" cy="42" r="2.5" fill="#7c3aed" opacity="0.8" />
					<circle cx="38" cy="42" r="2.5" fill="#7c3aed" opacity="0.8" />
					{/* Connections */}
					<line x1="32" y1="22" x2="22" y2="32" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
					<line x1="32" y1="22" x2="42" y2="32" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
					<line x1="22" y1="32" x2="26" y2="42" stroke="#c084fc" strokeWidth="1" opacity="0.5" />
					<line x1="42" y1="32" x2="38" y2="42" stroke="#c084fc" strokeWidth="1" opacity="0.5" />
					<line x1="22" y1="32" x2="42" y2="32" stroke="#c084fc" strokeWidth="1" opacity="0.4" />
					<defs>
						<radialGradient id="med-bg">
							<stop offset="0%" stopColor="#7c3aed" />
							<stop offset="100%" stopColor="#4f46e5" />
						</radialGradient>
						<linearGradient id="med-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#c084fc" />
							<stop offset="100%" stopColor="#818cf8" />
						</linearGradient>
						<linearGradient id="med-fill" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
							<stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
						</linearGradient>
					</defs>
				</svg>
			);

		case 'mentor-email-generator':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#em-bg)" opacity="0.15" />
					{/* Graduation cap */}
					<polygon points="32,10 52,20 32,30 12,20" fill="url(#em-cap)" opacity="0.9" />
					<rect x="46" y="20" width="2" height="10" fill="#60a5fa" opacity="0.8" />
					<circle cx="47" cy="31" r="2.5" fill="#3b82f6" opacity="0.9" />
					{/* Envelope body */}
					<rect x="12" y="36" width="40" height="22" rx="3" fill="url(#em-env)" opacity="0.85" />
					{/* Envelope flap / V shape */}
					<path d="M12 36 L32 50 L52 36" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
					{/* Shine */}
					<line x1="18" y1="44" x2="28" y2="44" stroke="white" strokeWidth="1" opacity="0.3" />
					<defs>
						<radialGradient id="em-bg">
							<stop offset="0%" stopColor="#2563eb" />
							<stop offset="100%" stopColor="#4f46e5" />
						</radialGradient>
						<linearGradient id="em-cap" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#93c5fd" />
							<stop offset="100%" stopColor="#60a5fa" />
						</linearGradient>
						<linearGradient id="em-env" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#3b82f6" />
							<stop offset="100%" stopColor="#6366f1" />
						</linearGradient>
					</defs>
				</svg>
			);

		case 'video-classifier':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#vid-bg)" opacity="0.15" />
					{/* Film strip body */}
					<rect x="10" y="18" width="44" height="28" rx="3" fill="url(#vid-strip)" opacity="0.85" />
					{/* Sprocket holes left */}
					<rect x="13" y="22" width="5" height="4" rx="1" fill="#0f172a" opacity="0.8" />
					<rect x="13" y="29" width="5" height="4" rx="1" fill="#0f172a" opacity="0.8" />
					<rect x="13" y="36" width="5" height="4" rx="1" fill="#0f172a" opacity="0.8" />
					{/* Sprocket holes right */}
					<rect x="46" y="22" width="5" height="4" rx="1" fill="#0f172a" opacity="0.8" />
					<rect x="46" y="29" width="5" height="4" rx="1" fill="#0f172a" opacity="0.8" />
					<rect x="46" y="36" width="5" height="4" rx="1" fill="#0f172a" opacity="0.8" />
					{/* Eye / scan lens in center */}
					<ellipse cx="32" cy="32" rx="10" ry="7" stroke="white" strokeWidth="1.5" opacity="0.8" />
					<circle cx="32" cy="32" r="4" fill="url(#vid-eye)" opacity="0.9" />
					<circle cx="33.5" cy="30.5" r="1.2" fill="white" opacity="0.7" />
					{/* Scan lines */}
					<line x1="22" y1="32" x2="21" y2="32" stroke="white" strokeWidth="1" opacity="0.5" />
					<line x1="43" y1="32" x2="42" y2="32" stroke="white" strokeWidth="1" opacity="0.5" />
					<defs>
						<radialGradient id="vid-bg">
							<stop offset="0%" stopColor="#ea580c" />
							<stop offset="100%" stopColor="#d97706" />
						</radialGradient>
						<linearGradient id="vid-strip" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#f97316" />
							<stop offset="100%" stopColor="#fb923c" />
						</linearGradient>
						<radialGradient id="vid-eye">
							<stop offset="0%" stopColor="#fbbf24" />
							<stop offset="100%" stopColor="#f97316" />
						</radialGradient>
					</defs>
				</svg>
			);

		case 'glioma-classification':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#gl-bg)" opacity="0.15" />
					{/* DNA helix strand 1 */}
					<path d="M24 8 C28 16 36 20 32 28 C28 36 20 40 24 48 C28 56 36 58 32 56"
						stroke="url(#gl-s1)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
					{/* DNA helix strand 2 */}
					<path d="M40 8 C36 16 28 20 32 28 C36 36 44 40 40 48 C36 56 28 58 32 56"
						stroke="url(#gl-s2)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
					{/* Rungs */}
					<line x1="26" y1="16" x2="38" y2="16" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.7" />
					<line x1="30" y1="24" x2="34" y2="24" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.7" />
					<line x1="26" y1="32" x2="38" y2="32" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.7" />
					<line x1="30" y1="40" x2="34" y2="40" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.7" />
					<line x1="26" y1="48" x2="38" y2="48" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.7" />
					{/* Node dots on rungs */}
					<circle cx="26" cy="16" r="2" fill="#34d399" opacity="0.9" />
					<circle cx="38" cy="16" r="2" fill="#10b981" opacity="0.9" />
					<circle cx="26" cy="32" r="2" fill="#34d399" opacity="0.9" />
					<circle cx="38" cy="32" r="2" fill="#10b981" opacity="0.9" />
					<circle cx="26" cy="48" r="2" fill="#34d399" opacity="0.9" />
					<circle cx="38" cy="48" r="2" fill="#10b981" opacity="0.9" />
					<defs>
						<radialGradient id="gl-bg">
							<stop offset="0%" stopColor="#059669" />
							<stop offset="100%" stopColor="#047857" />
						</radialGradient>
						<linearGradient id="gl-s1" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#6ee7b7" />
							<stop offset="100%" stopColor="#059669" />
						</linearGradient>
						<linearGradient id="gl-s2" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#34d399" />
							<stop offset="100%" stopColor="#10b981" />
						</linearGradient>
					</defs>
				</svg>
			);

		default:
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="#3b82f620" />
					<path d="M32 12 L38 26 L54 28 L43 39 L46 55 L32 47 L18 55 L21 39 L10 28 L26 26 Z"
						fill="url(#def-star)" opacity="0.8" />
					<defs>
						<linearGradient id="def-star" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#60a5fa" />
							<stop offset="100%" stopColor="#a78bfa" />
						</linearGradient>
					</defs>
				</svg>
			);
	}
};

// ── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, onClick }) => {
	const cfg = PROJECT_CONFIG[project.id] || defaultConfig;

	return (
		<div
			className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
			onClick={onClick}
		>
			{/* Hero area */}
			<div className="h-44 flex items-center justify-center p-4 border-b border-white/10 relative overflow-hidden">
				<div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} ${cfg.hoverGradient} transition-all duration-300`} />

				<div className="relative z-10 drop-shadow-lg">
					<ProjectIcon id={project.id} />
				</div>

				{/* Badges top-right */}
				<div className="absolute top-2 right-2 flex flex-col items-end gap-1">
					{project.interactive && (
						<span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
							Interactive
						</span>
					)}
					{project.liveUrl && (
						<span className="bg-emerald-500/80 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
							<span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block" />
							Live
						</span>
					)}
				</div>
			</div>

			{/* Body */}
			<div className="p-5">
				<h3 className={`text-lg font-bold mb-1.5 text-white ${cfg.accent} group-hover:text-opacity-100 transition-colors leading-snug`}>
					{project.title}
				</h3>
				<p className="text-white/50 text-sm mb-4 line-clamp-2">
					{project.description}
				</p>
				<div className="flex flex-wrap gap-1.5">
					{project.tags.slice(0, 3).map((tag, idx) => (
						<span key={idx} className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>
							{tag}
						</span>
					))}
					{project.tags.length > 3 && (
						<span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/40">
							+{project.tags.length - 3}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

// ── Project detail ────────────────────────────────────────────────────────────
const ProjectDetail = ({ project, onBack }) => {
	const cfg = PROJECT_CONFIG[project.id] || defaultConfig;

	if (project.id === 'mentor-email-generator' && project.interactive) {
		return (
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Project Details" />
				<div className="p-6">
					<button
						onClick={onBack}
						className="mb-6 flex items-center text-blue-400 hover:text-white transition-colors glass-button px-3 py-1.5 rounded-lg"
					>
						<ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to projects
					</button>
					<MentorEmailGenerator />
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			<GlassHeader title="Project Details" />

			<div className="p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ maxHeight: 'min(70vh, 70dvh)' }}>
				<button
					onClick={onBack}
					className="mb-6 flex items-center text-blue-400 hover:text-white transition-colors glass-button px-3 py-1.5 rounded-lg"
				>
					<ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to projects
				</button>

				<div className="flex flex-col md:flex-row gap-8">
					{/* Left: icon + tags + links */}
					<div className="md:w-2/5">
						<div className={`glass-card rounded-xl p-5 flex items-center justify-center h-52 mb-5 bg-gradient-to-br ${cfg.gradient}`}>
							<div className="drop-shadow-xl scale-125">
								<ProjectIcon id={project.id} />
							</div>
						</div>

						<div className="flex flex-wrap gap-2 mb-4">
							{project.tags.map((tag, idx) => (
								<span key={idx} className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>
									{tag}
								</span>
							))}
						</div>

						{/* Links */}
						<div className="flex flex-wrap gap-2">
							{project.liveUrl && (
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									onClick={e => e.stopPropagation()}
									className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
								>
									<span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
									Live Demo
								</a>
							)}
							{project.githubUrl && (
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									onClick={e => e.stopPropagation()}
									className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/70 hover:bg-white/15 transition-colors"
								>
									GitHub
								</a>
							)}
						</div>
					</div>

					{/* Right: details */}
					<div className="md:w-3/5">
						<h2 className={`text-2xl font-bold mb-2 ${cfg.accent}`}>
							{project.title}
						</h2>
						<div className="text-blue-400 mb-3 font-medium text-sm">{project.period}</div>
						<p className="text-white/60 mb-4 text-sm">
							{project.description}
						</p>
						<p className="text-white mb-6 text-sm leading-relaxed">
							{project.details}
						</p>

						<div className="grid grid-cols-2 gap-3">
							{project.metrics.map((metric, idx) => (
								<GlassCard key={idx} className="p-4" hoverEffect={false}>
									<div className={`mb-1 text-xs font-medium ${cfg.accent}`}>{metric.label}</div>
									<div className="text-xl font-bold text-white">{metric.value}</div>
								</GlassCard>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// ── Section ───────────────────────────────────────────────────────────────────
const ProjectsSection = () => {
	const { selectedProject, setSelectedProject, isAnimating } = usePortfolio();

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
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Projects" />

				<div className="p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ maxHeight: 'min(70vh, 70dvh)' }}>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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
