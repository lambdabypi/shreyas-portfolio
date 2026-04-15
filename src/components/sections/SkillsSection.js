// src/components/sections/SkillsSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader } from '../ui/GlassComponents';
import { skills, categories, categoryColors, categoryIcons } from '../../data/skillsData';

const SkillBar = ({ skill }) => {
	return (
		<div className="mb-4 last:mb-0">
			{/* Label row */}
			<div className="flex items-center justify-between mb-1.5">
				<div className="flex items-center gap-2">
					<span className="text-base leading-none select-none" role="img" aria-label={skill.name}>
						{skill.icon}
					</span>
					<span className="text-white/90 text-sm font-medium">{skill.name}</span>
					{skill.isNew && (
						<span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/20">
							new
						</span>
					)}
				</div>
				<span className={`text-xs font-semibold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
					{skill.level}%
				</span>
			</div>

			{/* Progress bar */}
			<div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
				{/* Track shimmer */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
				{/* Filled portion */}
				<div
					className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
					style={{ width: `${skill.level}%` }}
				>
					{/* Glow tail */}
					<div className="absolute right-0 top-0 h-full w-4 bg-white/30 blur-sm rounded-full" />
				</div>
			</div>
		</div>
	);
};

const CategorySkills = ({ category }) => {
	const filteredSkills = skills.filter(skill => skill.category === category);
	const colorClass = categoryColors[category];
	const icon = categoryIcons[category];
	const newCount = filteredSkills.filter(s => s.isNew).length;

	return (
		<div className="flex flex-col">
			{/* Category header */}
			<div className="flex items-center gap-3 mb-3">
				<div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
					{icon}
				</div>
				<div>
					<h3 className="text-sm font-bold text-white leading-tight">{category}</h3>
					<p className="text-white/40 text-xs leading-tight">
						{filteredSkills.length} skills{newCount > 0 ? ` · ${newCount} new` : ''}
					</p>
				</div>
			</div>

			{/* Skills card — colored left border accent */}
			<div className={`relative rounded-xl bg-white/5 border border-white/10 p-4 flex-1 overflow-hidden`}>
				{/* Subtle top-edge glow matching category color */}
				<div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${colorClass} opacity-60`} />

				{filteredSkills.map((skill) => (
					<SkillBar key={skill.name} skill={skill} />
				))}
			</div>
		</div>
	);
};

// Top skill highlights (top 3 by level)
const TopSkillsBadges = () => {
	const top = [...skills].sort((a, b) => b.level - a.level).slice(0, 6);
	return (
		<div className="flex flex-wrap gap-2 mb-5 px-1">
			{top.map(skill => (
				<div
					key={skill.name}
					className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${skill.color} text-white shadow-md`}
				>
					<span role="img" aria-label={skill.name}>{skill.icon}</span>
					{skill.name}
				</div>
			))}
		</div>
	);
};

const SkillsSection = () => {
	const { isAnimating } = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Skills & Expertise" />

				<div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ maxHeight: 'min(70vh, 70dvh)' }}>
					{/* Top 6 skills as gradient pills */}
					<div className="mb-2">
						<p className="text-white/40 text-xs uppercase tracking-widest mb-3 px-1">Top Proficiencies</p>
						<TopSkillsBadges />
					</div>

					<div className="border-t border-white/10 mb-5" />

					{/* Category grids */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{categories.map((category) => (
							<CategorySkills key={category} category={category} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkillsSection;
