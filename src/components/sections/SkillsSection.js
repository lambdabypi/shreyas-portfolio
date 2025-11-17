// src/components/sections/SkillsSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader, GlassCard } from '../ui/GlassComponents';
import { skills, categories, categoryColors, categoryIcons } from '../../data/skillsData';

const SkillBar = ({ skill, category }) => {
	const categoryColorClass = categoryColors[category];

	return (
		<div className="mb-5 last:mb-0">
			<div className="flex justify-between mb-2">
				<span className="text-white">{skill.name}</span>
				<span className="text-blue-300 font-medium">{skill.level}%</span>
			</div>

			<div className="relative w-full h-2.5 bg-gray-800/50 rounded-full overflow-hidden shadow-inner">
				<div
					className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${categoryColorClass} transition-all duration-1000 ease-out`}
					style={{ width: `${skill.level}%` }}
				>
					<div className="absolute inset-0 skill-shine"></div>
				</div>
			</div>
		</div>
	);
};

const CategorySkills = ({ category }) => {
	const filteredSkills = skills.filter(skill => skill.category === category);
	const categoryColorClass = categoryColors[category];
	const categoryIcon = categoryIcons[category];

	return (
		<div className="mb-6">
			<div className="flex items-center mb-4">
				<div className={`w-8 h-8 rounded-full bg-gradient-to-r ${categoryColorClass} flex items-center justify-center text-white mr-3`}>
					{categoryIcon}
				</div>
				<h3 className="text-xl font-bold text-white">
					{category}
				</h3>
			</div>

			<GlassCard className="p-5">
				{filteredSkills.map((skill) => (
					<SkillBar key={skill.name} skill={skill} category={category} />
				))}
			</GlassCard>
		</div>
	);
};

const SkillsSection = () => {
	const { isAnimating } = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Skills & Expertise" />

				<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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