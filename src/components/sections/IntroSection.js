// src/components/sections/IntroSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassSocialButton } from '../ui/GlassComponents';
import GlitchEffects from '../effects/GlitchText';
import { GithubIcon, LinkedInIcon, MailIcon, DownloadIcon, ArrowRightIcon } from '../icons';

const NAV_SECTIONS = [
	{ section: 'projects',    icon: '🚀', label: 'Projects',    desc: 'Things I\'ve shipped' },
	{ section: 'vr-projects', icon: '🥽', label: 'VR Projects', desc: 'Immersive builds' },
	{ section: 'interests',   icon: '❤️', label: 'Interests',   desc: 'What I\'m into' },
	{ section: 'skills',      icon: '⚡', label: 'Skills',      desc: 'My toolkit' },
	{ section: 'experience',  icon: '💼', label: 'Experience',  desc: 'Where I\'ve worked' },
	{ section: 'contact',     icon: '✉️', label: 'Contact',     desc: 'Say hello' },
];

const MINIQUEST_METRICS = [
	{ label: 'Agents',      value: '6' },
	{ label: 'Latency',     value: '~4s' },
	{ label: 'Cache hits',  value: '90%+' },
];

const IntroSection = () => {
	const { changeSection } = usePortfolio();

	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 overflow-x-hidden">
			{/* ── Top: Photo + Bio ─────────────────────────────────────────── */}
			<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
				{/* Avatar */}
				<div className="flex-shrink-0">
					<div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[3px] shadow-lg glow-effect">
						<img
							src="/images/Intro/ShreyasSreenivasPhoto.jpeg"
							alt="Shreyas Sreenivas"
							className="w-full h-full rounded-full object-cover object-top"
							onError={(e) => {
								e.target.style.display = 'none';
								e.target.parentElement.innerHTML =
									'<div class="w-full h-full rounded-full flex items-center justify-center"><span class="text-5xl text-white font-bold">S</span></div>';
							}}
						/>
					</div>
				</div>

				{/* Name + title + bio */}
				<div className="text-center sm:text-left w-full min-w-0">
					<GlitchEffects />
					<p className="mt-3 text-white/60 text-sm leading-relaxed max-w-lg">
						Software engineer and AI builder, finishing my MS at Northeastern.
						I spend most of my time shipping production apps and pushing what's possible
						with LLMs and multi-agent systems. Outside of code, I'm into VR, music,
						and figuring out where to travel next.
					</p>

					{/* Social links + Resume */}
					<div className="flex justify-center sm:justify-start gap-3 mt-4 flex-wrap">
						<GlassSocialButton
							icon={<GithubIcon className="w-5 h-5" />}
							url="https://github.com/lambdabypi/"
						/>
						<GlassSocialButton
							icon={<LinkedInIcon className="w-5 h-5" />}
							url="https://www.linkedin.com/in/shreyas-sreenivas-9452a9169/"
						/>
						<GlassSocialButton
							icon={<MailIcon className="w-5 h-5" />}
							url="mailto:shreyas.atneu@gmail.com"
						/>
						{/* Resume download */}
						<a
							href="/assets/resume/Shreyas_Sreenivas_Resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 h-12 rounded-full bg-blue-500/20 hover:bg-blue-500/35 border border-blue-400/30 hover:border-blue-400/55 text-white/80 hover:text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-md"
						>
							<DownloadIcon className="w-4 h-4" />
							Resume
						</a>
					</div>
				</div>
			</div>

			{/* ── MiniQuest featured card ──────────────────────────────────── */}
			<div className="mb-4 rounded-xl border border-blue-500/25 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-blue-500/10 backdrop-blur-md p-4 relative overflow-hidden group">
				{/* Subtle animated shimmer */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

				<div className="flex items-center justify-between gap-4">
					<div className="flex items-start gap-3 min-w-0">
						{/* "Featured" pill */}
						<span className="flex-shrink-0 mt-0.5 text-[0.6rem] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300">
							Featured
						</span>
						<div className="min-w-0">
							<p className="text-white font-semibold text-sm leading-tight truncate">MiniQuest: AI Adventure Planner</p>
							<p className="text-white/45 text-xs mt-0.5 leading-snug">
								6-agent LangGraph pipeline · real-time venue discovery · RAG personalization · live on GCP
							</p>
						</div>
					</div>

					{/* Metrics + action */}
					<div className="flex items-center gap-3 flex-shrink-0">
						{/* Metrics — hidden on very small screens */}
						<div className="hidden sm:flex items-center gap-3">
							{MINIQUEST_METRICS.map(({ label, value }) => (
								<div key={label} className="text-center">
									<p className="text-blue-300 font-bold text-sm leading-none">{value}</p>
									<p className="text-white/35 text-[0.6rem] mt-0.5 leading-none">{label}</p>
								</div>
							))}
						</div>

						<button
							onClick={() => changeSection('projects')}
							className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/25 hover:bg-blue-500/40 border border-blue-400/30 hover:border-blue-400/55 text-blue-200 hover:text-white text-xs font-medium transition-all duration-200 group/btn"
						>
							View
							<ArrowRightIcon className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
						</button>
					</div>
				</div>
			</div>

			{/* ── Section cards grid ───────────────────────────────────────── */}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{NAV_SECTIONS.map(({ section, icon, label, desc }) => (
					<button
						key={section}
						onClick={() => changeSection(section)}
						className="group text-left p-3 sm:p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/25 transition-all duration-200 hover:-translate-y-0.5"
					>
						<span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">{icon}</span>
						<span className="block text-white font-semibold text-sm">{label}</span>
						<span className="block text-white/40 text-xs mt-0.5 group-hover:text-white/60 transition-colors">{desc}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default IntroSection;
