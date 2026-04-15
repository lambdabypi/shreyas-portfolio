// src/components/sections/ExperienceSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader, GlassButton } from '../ui/GlassComponents';
import { DownloadIcon } from '../icons';
import { experiences, education } from '../../data/experienceData';

// Per-company visual identity
const COMPANY_CONFIG = {
	'Vivytech': {
		gradient:  'from-teal-400 to-emerald-500',
		accent:    'text-teal-400',
		border:    'border-teal-500/25',
		topBar:    'from-teal-400 to-emerald-500',
		badge:     'bg-teal-500/15 text-teal-300 border border-teal-500/20',
		dot:       'from-teal-400 to-emerald-500',
		initial:   'V',
	},
	'Intelligent DataWorks': {
		gradient:  'from-blue-400 to-indigo-500',
		accent:    'text-blue-400',
		border:    'border-blue-500/25',
		topBar:    'from-blue-400 to-indigo-500',
		badge:     'bg-blue-500/15 text-blue-300 border border-blue-500/20',
		dot:       'from-blue-400 to-indigo-500',
		initial:   'I',
	},
	'Chipmonk Technologies Pvt. Ltd.': {
		gradient:  'from-orange-400 to-amber-500',
		accent:    'text-orange-400',
		border:    'border-orange-500/25',
		topBar:    'from-orange-400 to-amber-500',
		badge:     'bg-orange-500/15 text-orange-300 border border-orange-500/20',
		dot:       'from-orange-400 to-amber-500',
		initial:   'C',
	},
};

const SCHOOL_CONFIG = {
	'Northeastern University': {
		gradient: 'from-red-500 to-red-600',
		accent:   'text-red-400',
		badge:    'bg-red-500/15 text-red-300 border border-red-500/20',
		initial:  'N',
	},
	'BMSIT&M': {
		gradient: 'from-blue-500 to-indigo-600',
		accent:   'text-blue-400',
		badge:    'bg-blue-500/15 text-blue-300 border border-blue-500/20',
		initial:  'B',
	},
};

const ExperienceItem = ({ experience, isLast }) => {
	const cfg = COMPANY_CONFIG[experience.company] ?? {
		gradient: 'from-purple-400 to-purple-600',
		accent: 'text-purple-400',
		border: 'border-purple-500/25',
		topBar: 'from-purple-400 to-purple-600',
		badge: 'bg-purple-500/15 text-purple-300 border border-purple-500/20',
		dot: 'from-purple-400 to-purple-600',
		initial: experience.company[0],
	};

	return (
		<div className={`relative flex gap-4 ${isLast ? '' : 'pb-8'}`}>
			{/* Left column: badge + line */}
			<div className="flex flex-col items-center flex-shrink-0">
				{/* Company initial badge */}
				<div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.dot} flex items-center justify-center text-white text-sm font-bold shadow-lg z-10 flex-shrink-0`}>
					{cfg.initial}
				</div>
				{/* Connector line */}
				{!isLast && (
					<div className="flex-1 w-px bg-white/10 mt-2" />
				)}
			</div>

			{/* Right column: card */}
			<div className={`flex-1 rounded-xl bg-white/5 border ${cfg.border} overflow-hidden mb-0`}>
				{/* Colored top accent */}
				<div className={`h-px bg-gradient-to-r ${cfg.topBar}`} />

				<div className="p-4">
					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
						<h3 className="text-white font-bold text-base leading-snug">{experience.title}</h3>
						<span className={`text-xs font-semibold ${cfg.accent} whitespace-nowrap sm:ml-4 flex-shrink-0`}>
							{experience.period}
						</span>
					</div>
					<div className="flex items-center gap-2 mb-3">
						<span className={`text-sm font-semibold ${cfg.accent}`}>{experience.company}</span>
						<span className="text-white/30 text-xs">·</span>
						<span className="text-white/40 text-xs">{experience.location}</span>
					</div>

					{/* Bullets */}
					<ul className="space-y-2 mb-4">
						{experience.description.map((item, i) => (
							<li key={i} className="flex gap-2 text-sm text-white/70 leading-relaxed">
								<span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${cfg.dot} flex-shrink-0`} />
								<span>{item}</span>
							</li>
						))}
					</ul>

					{/* Skills */}
					<div className="flex flex-wrap gap-1.5">
						{experience.skills.map((skill, i) => (
							<span key={i} className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
								{skill}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const EducationItem = ({ edu }) => {
	const cfg = SCHOOL_CONFIG[edu.institution] ?? {
		gradient: 'from-gray-400 to-gray-600',
		accent: 'text-gray-400',
		badge: 'bg-gray-500/15 text-gray-300 border border-gray-500/20',
		initial: edu.institution[0],
	};

	return (
		<div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
			<div className={`h-px bg-gradient-to-r ${cfg.gradient}`} />
			<div className="p-4">
				<div className="flex items-start gap-3 mb-3">
					<div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
						{cfg.initial}
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
							<h4 className="text-white font-bold text-sm leading-snug">{edu.degree}</h4>
							<span className={`text-xs font-semibold ${cfg.accent} whitespace-nowrap sm:ml-4`}>{edu.period}</span>
						</div>
						<div className="flex items-center gap-2 mt-0.5">
							<span className={`text-sm font-medium ${cfg.accent}`}>{edu.institution}</span>
							<span className="text-white/30 text-xs">·</span>
							<span className="text-white/40 text-xs">{edu.location}</span>
						</div>
					</div>
				</div>

				<div>
					<p className="text-white/40 text-xs uppercase tracking-wider mb-2">Relevant Courses</p>
					<div className="flex flex-wrap gap-1.5">
						{edu.courses.map((course, i) => (
							<span key={i} className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
								{course}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const ExperienceSection = () => {
	const { isAnimating } = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Professional Experience" />

				<div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ maxHeight: 'min(70vh, 70dvh)' }}>
					{/* Experience timeline */}
					<div>
						{experiences.map((exp, idx) => (
							<ExperienceItem
								key={idx}
								experience={exp}
								isLast={idx === experiences.length - 1}
							/>
						))}
					</div>

					{/* Education */}
					<div className="mt-8">
						<p className="text-white/40 text-xs uppercase tracking-widest mb-4">Education</p>
						<div className="space-y-4">
							{education.map((edu, idx) => (
								<EducationItem key={idx} edu={edu} />
							))}
						</div>
					</div>

					{/* Resume download */}
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
