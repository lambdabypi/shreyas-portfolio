// src/components/sections/ContactSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassHeader } from '../ui/GlassComponents';
import {
	GithubIcon,
	LinkedInIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon
} from '../icons';

// --- Data ---

const CONTACT_METHODS = [
	{
		icon: <MailIcon className="w-4 h-4" />,
		label: 'Email',
		value: 'shreyas.atneu@gmail.com',
		href: 'mailto:shreyas.atneu@gmail.com',
		gradient: 'from-rose-500 to-red-600',
		bg: 'bg-rose-500/10',
		border: 'border-rose-500/20',
		accent: 'text-rose-400',
	},
	{
		icon: <LinkedInIcon className="w-4 h-4" />,
		label: 'LinkedIn',
		value: 'shreyas-sreenivas-9452a9169',
		href: 'https://linkedin.com/in/shreyas-sreenivas-9452a9169/',
		gradient: 'from-blue-500 to-blue-700',
		bg: 'bg-blue-500/10',
		border: 'border-blue-500/20',
		accent: 'text-blue-400',
	},
	{
		icon: <GithubIcon className="w-4 h-4" />,
		label: 'GitHub',
		value: 'github.com/lambdabypi',
		href: 'https://github.com/lambdabypi',
		gradient: 'from-slate-400 to-slate-600',
		bg: 'bg-slate-500/10',
		border: 'border-slate-500/20',
		accent: 'text-slate-300',
	},
	{
		icon: <PhoneIcon className="w-4 h-4" />,
		label: 'Phone',
		value: '(857) 396-9611',
		href: 'tel:+18573969611',
		gradient: 'from-emerald-400 to-green-600',
		bg: 'bg-emerald-500/10',
		border: 'border-emerald-500/20',
		accent: 'text-emerald-400',
	},
	{
		icon: <MapPinIcon className="w-4 h-4" />,
		label: 'Location',
		value: 'Boston, MA · Open to Remote',
		href: null,
		gradient: 'from-amber-400 to-orange-500',
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/20',
		accent: 'text-amber-400',
	},
];

const SOCIAL_LINKS = [
	{
		label: 'GitHub',
		icon: <GithubIcon className="w-4 h-4" />,
		href: 'https://github.com/lambdabypi',
		gradient: 'from-slate-600 to-slate-800',
		border: 'border-slate-500/30',
	},
	{
		label: 'LinkedIn',
		icon: <LinkedInIcon className="w-4 h-4" />,
		href: 'https://linkedin.com/in/shreyas-sreenivas-9452a9169/',
		gradient: 'from-blue-600 to-blue-800',
		border: 'border-blue-500/30',
	},
	{
		label: 'Email Me',
		icon: <MailIcon className="w-4 h-4" />,
		href: 'mailto:shreyas.atneu@gmail.com',
		gradient: 'from-rose-500 to-red-700',
		border: 'border-rose-500/30',
	},
];

// --- Sub-components ---

const ContactCard = ({ method }) => {
	const content = (
		<div className={`relative rounded-xl ${method.bg} border ${method.border} overflow-hidden p-4 transition-all duration-200 hover:bg-white/10 group h-full`}>
			{/* Top accent line */}
			<div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${method.gradient}`} />
			{/* Icon badge */}
			<div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${method.gradient} flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-105 transition-transform duration-200`}>
				{method.icon}
			</div>
			<p className="text-white/40 text-xs uppercase tracking-wider mb-1">{method.label}</p>
			<p className={`${method.accent} text-sm font-medium truncate`}>{method.value}</p>
		</div>
	);

	if (method.href) {
		return (
			<a href={method.href} target="_blank" rel="noopener noreferrer" className="block">
				{content}
			</a>
		);
	}
	return content;
};

// --- Main section ---

const ContactSection = () => {
	const { isAnimating } = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Get In Touch" />

				<div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh] glass-scrollbar" style={{ maxHeight: 'min(70vh, 70dvh)' }}>
					{/* Availability + intro */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit flex-shrink-0">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
							</span>
							<span className="text-emerald-400 text-xs font-semibold">Open to opportunities</span>
						</div>
						<p className="text-white/60 text-sm leading-relaxed">
							Always open to new projects, collaborations, or just a good conversation about AI and tech.
						</p>
					</div>

					{/* Contact method cards */}
					<p className="text-white/40 text-xs uppercase tracking-widest mb-3">Contact</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
						{CONTACT_METHODS.map((method) => (
							<ContactCard key={method.label} method={method} />
						))}
					</div>

					<div className="border-t border-white/10 mb-5" />

					{/* Social quick-links */}
					<p className="text-white/40 text-xs uppercase tracking-widest mb-3">Connect</p>
					<div className="flex flex-wrap gap-3">
						{SOCIAL_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${link.gradient} border ${link.border} text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg`}
							>
								{link.icon}
								{link.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactSection;
