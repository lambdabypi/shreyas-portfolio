// src/components/sections/VRProjectsSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader, GlassCard } from '../ui/GlassComponents';
import { ArrowLeftIcon } from '../icons';
import vrProjectsData from '../../data/vrProjectsData';

// ── Per-project visual config ────────────────────────────────────────────────
const VR_CONFIG = {
	'adaptive-hockey-vr': {
		gradient: 'from-indigo-500/30 to-violet-600/20',
		hoverGradient: 'group-hover:from-indigo-500/45 group-hover:to-violet-600/35',
		accent: 'text-indigo-300',
		badge: 'bg-indigo-500/20 border-indigo-400/40 text-indigo-200',
		metricAccent: 'text-indigo-300',
	},
	'vr-teleportation': {
		gradient: 'from-cyan-500/30 to-blue-500/20',
		hoverGradient: 'group-hover:from-cyan-500/45 group-hover:to-blue-500/35',
		accent: 'text-cyan-300',
		badge: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200',
		metricAccent: 'text-cyan-300',
	},
	'interactive-puzzle-vr': {
		gradient: 'from-orange-500/30 to-amber-400/20',
		hoverGradient: 'group-hover:from-orange-500/45 group-hover:to-amber-400/35',
		accent: 'text-orange-300',
		badge: 'bg-orange-500/20 border-orange-400/40 text-orange-200',
		metricAccent: 'text-orange-300',
	},
	'mixed-reality-interface': {
		gradient: 'from-fuchsia-500/30 to-pink-500/20',
		hoverGradient: 'group-hover:from-fuchsia-500/45 group-hover:to-pink-500/35',
		accent: 'text-fuchsia-300',
		badge: 'bg-fuchsia-500/20 border-fuchsia-400/40 text-fuchsia-200',
		metricAccent: 'text-fuchsia-300',
	},
};

const defaultVRConfig = {
	gradient: 'from-blue-500/30 to-purple-500/20',
	hoverGradient: 'group-hover:from-blue-500/45 group-hover:to-purple-500/35',
	accent: 'text-blue-300',
	badge: 'bg-blue-500/20 border-blue-400/40 text-blue-200',
	metricAccent: 'text-blue-300',
};

// ── Unique SVG icons per VR project ──────────────────────────────────────────
const VRProjectIcon = ({ id }) => {
	switch (id) {

		case 'adaptive-hockey-vr':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#hk-bg)" opacity="0.15" />
					{/* VR headset body */}
					<rect x="10" y="22" width="44" height="24" rx="8" fill="url(#hk-headset)" opacity="0.85" />
					{/* Left lens */}
					<ellipse cx="22" cy="34" rx="8" ry="9" fill="#0f172a" opacity="0.8" />
					<ellipse cx="22" cy="34" rx="5" ry="6" fill="url(#hk-lens-l)" opacity="0.7" />
					{/* Right lens */}
					<ellipse cx="42" cy="34" rx="8" ry="9" fill="#0f172a" opacity="0.8" />
					<ellipse cx="42" cy="34" rx="5" ry="6" fill="url(#hk-lens-r)" opacity="0.7" />
					{/* Bridge */}
					<rect x="28" y="30" width="8" height="3" rx="1.5" fill="#312e81" opacity="0.6" />
					{/* Hockey stick */}
					<line x1="32" y1="8" x2="32" y2="22" stroke="url(#hk-stick)" strokeWidth="3" strokeLinecap="round" />
					<path d="M24 8 Q28 10 32 8" stroke="url(#hk-stick)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
					{/* Hockey puck */}
					<ellipse cx="32" cy="50" rx="7" ry="4" fill="url(#hk-puck)" opacity="0.9" />
					{/* Motion lines */}
					<line x1="18" y1="52" x2="12" y2="54" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
					<line x1="46" y1="52" x2="52" y2="54" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
					<defs>
						<radialGradient id="hk-bg"><stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#7c3aed" /></radialGradient>
						<linearGradient id="hk-headset" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#4f46e5" /></linearGradient>
						<radialGradient id="hk-lens-l"><stop offset="0%" stopColor="#a5b4fc" /><stop offset="100%" stopColor="#6366f1" /></radialGradient>
						<radialGradient id="hk-lens-r"><stop offset="0%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="#7c3aed" /></radialGradient>
						<linearGradient id="hk-stick" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#e0e7ff" /><stop offset="100%" stopColor="#a5b4fc" /></linearGradient>
						<radialGradient id="hk-puck"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#312e81" /></radialGradient>
					</defs>
				</svg>
			);

		case 'vr-teleportation':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#tp-bg)" opacity="0.12" />
					{/* Outer portal ring */}
					<circle cx="32" cy="32" r="22" stroke="url(#tp-ring-outer)" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.8" />
					{/* Inner portal */}
					<circle cx="32" cy="32" r="14" stroke="url(#tp-ring-inner)" strokeWidth="2" opacity="0.9" />
					<circle cx="32" cy="32" r="9" fill="url(#tp-core)" opacity="0.7" />
					{/* Arc trajectory */}
					<path d="M10 54 Q18 20 32 24 Q46 28 54 10" stroke="url(#tp-arc)" strokeWidth="1.5"
						strokeDasharray="4 3" strokeLinecap="round" fill="none" opacity="0.7" />
					{/* Origin point */}
					<circle cx="10" cy="54" r="3" fill="#67e8f9" opacity="0.9" />
					{/* Destination point */}
					<circle cx="54" cy="10" r="3" fill="#22d3ee" opacity="0.9" />
					{/* Particles */}
					<circle cx="20" cy="38" r="1.5" fill="#a5f3fc" opacity="0.8" />
					<circle cx="44" cy="26" r="1.5" fill="#7dd3fc" opacity="0.7" />
					<circle cx="14" cy="24" r="1" fill="#67e8f9" opacity="0.6" />
					<circle cx="50" cy="40" r="1" fill="#38bdf8" opacity="0.6" />
					<defs>
						<radialGradient id="tp-bg"><stop offset="0%" stopColor="#0891b2" /><stop offset="100%" stopColor="#1d4ed8" /></radialGradient>
						<linearGradient id="tp-ring-outer" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#67e8f9" /><stop offset="100%" stopColor="#38bdf8" /></linearGradient>
						<linearGradient id="tp-ring-inner" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a5f3fc" /><stop offset="100%" stopColor="#7dd3fc" /></linearGradient>
						<radialGradient id="tp-core"><stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.5" /><stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" /></radialGradient>
						<linearGradient id="tp-arc" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient>
					</defs>
				</svg>
			);

		case 'interactive-puzzle-vr':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#pz-bg)" opacity="0.12" />
					{/* Bottom-left cube face */}
					<path d="M10 36 L32 48 L32 28 L10 16 Z" fill="url(#pz-left)" opacity="0.85" />
					{/* Bottom-right cube face */}
					<path d="M32 48 L54 36 L54 16 L32 28 Z" fill="url(#pz-right)" opacity="0.75" />
					{/* Top cube face */}
					<path d="M10 16 L32 4 L54 16 L32 28 Z" fill="url(#pz-top)" opacity="0.95" />
					{/* Puzzle cut lines on top face */}
					<path d="M21 10 L32 4 L43 10" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
					<path d="M10 16 L21 10 L32 16 L21 22 Z" fill="rgba(255,255,255,0.15)" />
					{/* Floating puzzle piece (top-right corner lifted) */}
					<path d="M43 10 L54 16 L54 22 L43 16 Z" fill="url(#pz-piece)" opacity="0.9"
						transform="translate(3, -4)" />
					{/* Glow under floating piece */}
					<ellipse cx="50" cy="14" rx="6" ry="2" fill="#fb923c" opacity="0.25" />
					{/* Edge highlight */}
					<path d="M10 16 L32 28 L54 16" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
					<path d="M32 28 L32 48" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
					<defs>
						<radialGradient id="pz-bg"><stop offset="0%" stopColor="#ea580c" /><stop offset="100%" stopColor="#d97706" /></radialGradient>
						<linearGradient id="pz-left" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#c2410c" /></linearGradient>
						<linearGradient id="pz-right" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fb923c" /><stop offset="100%" stopColor="#ea580c" /></linearGradient>
						<linearGradient id="pz-top" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fdba74" /><stop offset="100%" stopColor="#fb923c" /></linearGradient>
						<linearGradient id="pz-piece" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fcd34d" /><stop offset="100%" stopColor="#fbbf24" /></linearGradient>
					</defs>
				</svg>
			);

		case 'mixed-reality-interface':
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="28" fill="url(#mr-bg)" opacity="0.12" />
					{/* Reality scan frame — corner brackets */}
					<path d="M10 20 L10 10 L20 10" stroke="url(#mr-bracket)" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M44 10 L54 10 L54 20" stroke="url(#mr-bracket)" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M10 44 L10 54 L20 54" stroke="url(#mr-bracket)" strokeWidth="2.5" strokeLinecap="round" />
					<path d="M44 54 L54 54 L54 44" stroke="url(#mr-bracket)" strokeWidth="2.5" strokeLinecap="round" />
					{/* Subtle grid overlay */}
					<line x1="22" y1="10" x2="22" y2="54" stroke="url(#mr-grid)" strokeWidth="0.5" opacity="0.3" />
					<line x1="32" y1="10" x2="32" y2="54" stroke="url(#mr-grid)" strokeWidth="0.5" opacity="0.3" />
					<line x1="42" y1="10" x2="42" y2="54" stroke="url(#mr-grid)" strokeWidth="0.5" opacity="0.3" />
					<line x1="10" y1="22" x2="54" y2="22" stroke="url(#mr-grid)" strokeWidth="0.5" opacity="0.3" />
					<line x1="10" y1="32" x2="54" y2="32" stroke="url(#mr-grid)" strokeWidth="0.5" opacity="0.3" />
					<line x1="10" y1="42" x2="54" y2="42" stroke="url(#mr-grid)" strokeWidth="0.5" opacity="0.3" />
					{/* Center crosshair */}
					<circle cx="32" cy="32" r="6" stroke="url(#mr-crosshair)" strokeWidth="1.5" />
					<line x1="32" y1="24" x2="32" y2="28" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
					<line x1="32" y1="36" x2="32" y2="40" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
					<line x1="24" y1="32" x2="28" y2="32" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
					<line x1="36" y1="32" x2="40" y2="32" stroke="#e879f9" strokeWidth="1.5" strokeLinecap="round" />
					<circle cx="32" cy="32" r="2.5" fill="url(#mr-center)" />
					{/* Data readout lines */}
					<rect x="12" y="14" width="14" height="2" rx="1" fill="#e879f9" opacity="0.5" />
					<rect x="12" y="18" width="8" height="1.5" rx="0.75" fill="#e879f9" opacity="0.3" />
					<rect x="38" y="46" width="14" height="2" rx="1" fill="#a855f7" opacity="0.5" />
					<rect x="44" y="50" width="8" height="1.5" rx="0.75" fill="#a855f7" opacity="0.3" />
					<defs>
						<radialGradient id="mr-bg"><stop offset="0%" stopColor="#a21caf" /><stop offset="100%" stopColor="#7e22ce" /></radialGradient>
						<linearGradient id="mr-bracket" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f0abfc" /><stop offset="100%" stopColor="#e879f9" /></linearGradient>
						<linearGradient id="mr-grid" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e879f9" /><stop offset="100%" stopColor="#a855f7" /></linearGradient>
						<linearGradient id="mr-crosshair" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f0abfc" /><stop offset="100%" stopColor="#c084fc" /></linearGradient>
						<radialGradient id="mr-center"><stop offset="0%" stopColor="#f0abfc" /><stop offset="100%" stopColor="#e879f9" /></radialGradient>
					</defs>
				</svg>
			);

		default:
			return (
				<svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
					<circle cx="32" cy="32" r="26" stroke="#60a5fa" strokeWidth="2" opacity="0.5" />
					<path d="M12 32 Q20 16 32 18 Q44 20 52 32 Q44 48 32 46 Q20 44 12 32Z"
						fill="url(#def-vr)" opacity="0.7" />
					<ellipse cx="24" cy="32" rx="6" ry="7" fill="#0f172a" opacity="0.7" />
					<ellipse cx="40" cy="32" rx="6" ry="7" fill="#0f172a" opacity="0.7" />
					<defs>
						<linearGradient id="def-vr" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#60a5fa" />
							<stop offset="100%" stopColor="#a78bfa" />
						</linearGradient>
					</defs>
				</svg>
			);
	}
};

// ── VR Project card ───────────────────────────────────────────────────────────
const VRProjectCard = ({ project, onClick }) => {
	const cfg = VR_CONFIG[project.id] || defaultVRConfig;

	return (
		<div
			className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
			onClick={onClick}
		>
			{/* Hero area */}
			<div className="h-44 flex items-center justify-center p-4 border-b border-white/10 relative overflow-hidden">
				<div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} ${cfg.hoverGradient} transition-all duration-300`} />
				<div className="relative z-10 drop-shadow-lg">
					<VRProjectIcon id={project.id} />
				</div>

				{/* Badges */}
				<div className="absolute top-2 right-2 flex flex-col items-end gap-1">
					{project.videoUrl && (
						<span className="bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
							▶ Demo
						</span>
					)}
					<span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>
						Unity / XR
					</span>
				</div>
			</div>

			{/* Body */}
			<div className="p-5">
				<h3 className={`text-lg font-bold mb-1.5 text-white group-hover:${cfg.accent.replace('text-', 'text-')} transition-colors leading-snug`}>
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

// ── VR Project detail ─────────────────────────────────────────────────────────
const VRProjectDetail = ({ project, onBack }) => {
	const cfg = VR_CONFIG[project.id] || defaultVRConfig;

	return (
		<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
			<GlassHeader title="VR Project Details" />

			<div className="p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ maxHeight: 'min(70vh, 70dvh)' }}>
				<button
					onClick={onBack}
					className="mb-6 flex items-center text-blue-400 hover:text-white transition-colors glass-button px-3 py-1.5 rounded-lg"
				>
					<ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to VR projects
				</button>

				<div className="flex flex-col md:flex-row gap-8">
					{/* Left */}
					<div className="md:w-2/5">
						{project.videoUrl ? (
							<div className="glass-card rounded-xl p-2 mb-5 overflow-hidden">
								<iframe
									className="w-full aspect-video rounded-lg"
									src={project.videoUrl.replace('youtu.be/', 'youtube.com/embed/')}
									title={`${project.title} video`}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						) : (
							<div className={`glass-card rounded-xl p-5 flex items-center justify-center h-52 mb-5 bg-gradient-to-br ${cfg.gradient}`}>
								<div className="drop-shadow-xl scale-125">
									<VRProjectIcon id={project.id} />
								</div>
							</div>
						)}

						<div className="flex flex-wrap gap-2 mb-4">
							{project.tags.map((tag, idx) => (
								<span key={idx} className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>
									{tag}
								</span>
							))}
						</div>

						{project.githubUrl && (
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/70 hover:bg-white/15 transition-colors w-full justify-center"
							>
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
								</svg>
								View on GitHub
							</a>
						)}
					</div>

					{/* Right */}
					<div className="md:w-3/5">
						<h2 className={`text-2xl font-bold mb-2 ${cfg.accent}`}>
							{project.title}
						</h2>
						<div className={`mb-3 font-medium text-sm ${cfg.accent} opacity-70`}>{project.period}</div>
						<p className="text-white/60 mb-4 text-sm">{project.description}</p>
						<p className="text-white mb-6 text-sm leading-relaxed">{project.details}</p>

						<div className="grid grid-cols-2 gap-3">
							{project.metrics.map((metric, idx) => (
								<GlassCard key={idx} className="p-4" hoverEffect={false}>
									<div className={`mb-1 text-xs font-medium ${cfg.metricAccent}`}>{metric.label}</div>
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
const VRProjectsSection = () => {
	const { selectedVRProject, setSelectedVRProject, isAnimating } = usePortfolio();

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
				<GlassHeader title="VR & Mixed Reality Projects" />

				<div className="p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ maxHeight: 'min(70vh, 70dvh)' }}>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
