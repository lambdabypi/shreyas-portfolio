// src/components/sections/ExperienceSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassCard, GlassBadge, GlassButton } from '../ui/GlassComponents';
import { DownloadIcon } from '../icons';
import { experiences, education } from '../../data/experienceData';

const ExperienceItem = ({ experience, index }) => {
	const isEvenIndex = index % 2 === 0;

	return (
		<div className="relative mb-12">
			{/* Timeline dot */}
			<div className="absolute left-0 w-3 h-3 rounded-full bg-purple-500 border-4 border-white/50 shadow-md md:left-1/2 md:-ml-1.5"></div>

			{/* Content */}
			<div className={`ml-6 md:w-1/2 ${isEvenIndex ? 'md:ml-0 md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
				<GlassCard className="p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
					<div className="text-blue-400 mb-1">{experience.period}</div>
					<h3 className="text-xl font-bold mb-1 text-white">{experience.title}</h3>
					<div className="text-white text-opacity-60 font-bold mb-1">{experience.company}</div>
					<div className="text-gray-400 mb-3 text-sm">{experience.location}</div>

					<ul className="text-white mb-4 list-disc pl-5 space-y-2">
						{experience.description.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>

					<div className="flex flex-wrap gap-2">
						{experience.skills.map((skill, skillIdx) => (
							<GlassBadge
								key={skillIdx}
								text={skill}
								bgColorClass="bg-blue-500/20"
								textColorClass="text-black"
							/>
						))}
					</div>
				</GlassCard>
			</div>
		</div>
	);
};

const EducationItem = ({ edu }) => {
	return (
		<GlassCard className="p-4 hover:shadow-xl transition-all duration-300">
			<div className="flex flex-col md:flex-row md:justify-between md:items-start">
				<div>
					<h4 className="text-xl font-bold text-white">{edu.degree}</h4>
					<div className="text-blue-300">{edu.institution}</div>
					<div className="text-gray-400 text-sm">{edu.location}</div>
				</div>
				<div className="text-blue-300 mt-2 md:mt-0">{edu.period}</div>
			</div>

			<div className="mt-4">
				<div className="font-medium text-white text-opacity-50">Relevant Courses:</div>
				<div className="flex flex-wrap gap-2 mt-2">
					{edu.courses.map((course, i) => (
						<GlassBadge
							key={i}
							text={course}
							bgColorClass="bg-white/10"
							textColorClass="text-black"
						/>
					))}
				</div>
			</div>
		</GlassCard>
	);
};

const ExperienceSection = () => {
	const { isAnimating } = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				{/* Fixed header */}
				<div className="p-6 border-b border-white/30 sticky top-0 z-10">
					<div className="rounded-lg p-2">
						<h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
							Professional Experience
						</h2>
					</div>
					<div className="glass-header-glow"></div>
				</div>

				{/* Scrollable content */}
				<div className="p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ scrollbarWidth: 'thin' }}>
					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/60 md:left-1/2 md:-ml-0.5"></div>

						{experiences.map((exp, idx) => (
							<ExperienceItem key={idx} experience={exp} index={idx} />
						))}
					</div>

					<h3 className="text-2xl font-bold mt-12 mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
						Education
					</h3>

					<div className="space-y-6">
						{education.map((edu, idx) => (
							<EducationItem key={idx} edu={edu} />
						))}
					</div>

					<div className="mt-8 text-center">
						<GlassButton
							label="Download Resume"
							icon={<DownloadIcon className="w-4 h-4" />}
							onClick={() => window.open('/assets/resume/Shreyas_Sreenivas_Resume.pdf', '_blank')}
							className="inline-block"
							bgClass="from-blue-400/50 to-purple-500/50"
							textColorClass="text-white"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExperienceSection;