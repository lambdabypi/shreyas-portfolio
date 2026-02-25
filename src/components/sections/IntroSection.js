// src/components/sections/IntroSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassSocialButton } from '../ui/GlassComponents';
import GlitchEffects from '../effects/GlitchText';
import { GithubIcon, LinkedInIcon, MailIcon } from '../icons';

const NAV_SECTIONS = [
	{
		section: 'projects',
		icon: '🚀',
		label: 'Projects',
		desc: 'Data & AI work',
	},
	{
		section: 'vr-projects',
		icon: '🥽',
		label: 'VR Projects',
		desc: 'Immersive experiences',
	},
	{
		section: 'interests',
		icon: '❤️',
		label: 'Interests',
		desc: 'Life outside of work',
	},
	{
		section: 'skills',
		icon: '⚡',
		label: 'Skills',
		desc: 'Tools & technologies',
	},
	{
		section: 'experience',
		icon: '💼',
		label: 'Experience',
		desc: 'Work history',
	},
	{
		section: 'contact',
		icon: '✉️',
		label: 'Contact',
		desc: 'Get in touch',
	},
];

const IntroSection = () => {
	const { changeSection } = usePortfolio();

	return (
		<div className="max-w-4xl mx-auto px-4 py-6">
			{/* ── Top: Photo + Bio ─────────────────────────────────────────── */}
			<div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
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
				<div className="text-center sm:text-left">
					<GlitchEffects />
					<p className="mt-3 text-white/60 text-sm leading-relaxed max-w-lg">
						MS in Data Analytics Engineering at Northeastern University. I build AI-powered systems,
						data pipelines, and immersive experiences, passionate about making technology both
						powerful and human.
					</p>

					{/* Social links */}
					<div className="flex justify-center sm:justify-start gap-3 mt-4">
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
					</div>
				</div>
			</div>

			{/* ── Section cards grid ───────────────────────────────────────── */}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
				{NAV_SECTIONS.map(({ section, icon, label, desc }) => (
					<button
						key={section}
						onClick={() => changeSection(section)}
						className="group text-left p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/25 transition-all duration-200 hover:-translate-y-0.5"
					>
						<span className="text-2xl mb-2 block">{icon}</span>
						<span className="block text-white font-semibold text-sm">{label}</span>
						<span className="block text-white/40 text-xs mt-0.5 group-hover:text-white/60 transition-colors">{desc}</span>
					</button>
				))}
			</div>

			{/* ── Navbar hint ──────────────────────────────────────────────── */}
			<p className="text-center text-white/25 text-xs tracking-widest select-none">
				↑ MOVE MOUSE TO BOTTOM EDGE FOR QUICK NAV ↑
			</p>
		</div>
	);
};

export default IntroSection;