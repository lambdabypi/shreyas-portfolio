// src/components/sections/ContactSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import {
	GlassHeader,
	GlassCard,
	GlassContactMethod,
	GlassSocialButton
} from '../ui/GlassComponents';
import {
	GithubIcon,
	LinkedInIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon
} from '../icons';

const ContactSection = () => {
	const {
		isAnimating,
	} = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Get In Touch" />

				<div className="p-6 items-center overflow-y-auto max-h-[80vh] glass-scrollbar">
					<div className="gap-8">
						<div>
							<GlassCard className="p-5 mb-6">
								<p className="text-white mb-6">
									I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out through any of the channels below!
								</p>

								<div className="space-y-5">
									<GlassContactMethod
										icon={<MailIcon className="w-5 h-5" />}
										label="Email"
										value="shreyas.atneu@gmail.com"
										bgColorClass="bg-blue-900/30"
									/>
									<GlassContactMethod
										icon={<LinkedInIcon className="w-5 h-5" />}
										label="LinkedIn"
										value="linkedin.com/in/shreyas-sreenivas-9452a9169/"
										bgColorClass="bg-indigo-900/30"
									/>
									<GlassContactMethod
										icon={<GithubIcon className="w-5 h-5" />}
										label="GitHub"
										value="github.com/lambdabypi"
										bgColorClass="bg-purple-900/30"
									/>
									<GlassContactMethod
										icon={<PhoneIcon className="w-5 h-5" />}
										label="Phone"
										value="(857) 396-9611"
										bgColorClass="bg-pink-900/30"
									/>
									<GlassContactMethod
										icon={<MapPinIcon className="w-5 h-5" />}
										label="Location"
										value="Boston, MA, USA"
										bgColorClass="bg-green-900/30"
									/>
								</div>
							</GlassCard>

							<GlassCard className="p-5">
								<h3 className="text-lg text-center font-bold text-white mb-4">Connect With Me</h3>
								<div className="flex justify-center space-x-4">
									<GlassSocialButton
										icon={<GithubIcon className="w-6 h-6" />}
										url="https://github.com/lambdabypi"
										bgColorClass="bg-gray-800/50"
										hoverColorClass="hover:bg-gray-800/70"
									/>
									<GlassSocialButton
										icon={<LinkedInIcon className="w-6 h-6" />}
										url="https://linkedin.com/in/shreyas-sreenivas-9452a9169/"
										bgColorClass="bg-blue-600/50"
										hoverColorClass="hover:bg-blue-600/70"
									/>
									<GlassSocialButton
										icon={<MailIcon className="w-6 h-6" />}
										url="mailto:shreyas.atneu@gmail.com"
										bgColorClass="bg-red-500/50"
										hoverColorClass="hover:bg-red-500/70"
									/>
								</div>
							</GlassCard>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactSection;