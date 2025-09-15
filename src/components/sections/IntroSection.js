// src/components/sections/IntroSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton, GlassCard, GlassSocialButton } from '../ui/GlassComponents';
import GlitchEffects from '../effects/GlitchText';
import { GithubIcon, LinkedInIcon, MailIcon } from '../icons';

const IntroSection = () => {
	const { changeSection } = usePortfolio();

	return (
		<div className="text-center p-6 max-w-3xl mx-auto">
			<div className="mb-8 relative inline-block">
				<div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg glow-effect">
					<div className="text-6xl text-white font-bold">S</div>
				</div>
			</div>

			<GlassCard className="p-8 mb-10">
				<GlitchEffects />

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<GlassButton
						label="Projects"
						onClick={() => changeSection('projects')}
					/>
					<GlassButton
						label="Skills"
						onClick={() => changeSection('skills')}
					/>
					<GlassButton
						label="Experience"
						onClick={() => changeSection('experience')}
					/>
					<GlassButton
						label="Contact"
						onClick={() => changeSection('contact')}
					/>
				</div>
			</GlassCard>

			<div className="flex justify-center space-x-6">
				<GlassSocialButton
					icon={<GithubIcon className="w-6 h-6" />}
					url="https://github.com/lambdabypi/"
				/>
				<GlassSocialButton
					icon={<LinkedInIcon className="w-6 h-6" />}
					url="https://www.linkedin.com/in/shreyas-sreenivas-9452a9169/"
				/>
				<GlassSocialButton
					icon={<MailIcon className="w-6 h-6" />}
					url="mailto:shreyas.atneu@gmail.com"
				/>
			</div>
		</div>
	);
};

export default IntroSection;