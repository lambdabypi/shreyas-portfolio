// src/components/sections/ContactSection.js
import { usePortfolio } from '../../context/PortfolioContext';
import {
	GlassHeader,
	GlassCard,
	GlassContactMethod,
	GlassSocialButton
} from '../ui/GlassComponents';
import {
	SendIcon,
	GithubIcon,
	LinkedInIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon
} from '../icons';

const ContactSection = () => {
	const {
		isAnimating,
		contactForm,
		handleContactChange,
		handleContactSubmit
	} = usePortfolio();

	return (
		<div className={`transition-opacity duration-800 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
			<div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-lg shadow-lg flex flex-col border border-white/30">
				<GlassHeader title="Get In Touch" />

				<div className="p-6 overflow-y-auto max-h-[80vh] glass-scrollbar">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<GlassCard className="p-5 mb-6">
								<p className="text-black mb-6">
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
								<h3 className="text-lg text-center font-bold text-black mb-4">Connect With Me</h3>
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

						<GlassCard className="p-5">
							<div className="space-y-5">
								<div>
									<label className="block text-blue-300 mb-2 text-sm font-medium">Name</label>
									<input
										type="text"
										name="name"
										value={contactForm.name}
										onChange={handleContactChange}
										className="w-full bg-white/10 border border-black/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-black placeholder-gray-400"
										placeholder="Your name"
									/>
								</div>

								<div>
									<label className="block text-blue-300 mb-2 text-sm font-medium">Email</label>
									<input
										type="email"
										name="email"
										value={contactForm.email}
										onChange={handleContactChange}
										className="w-full bg-white/10 border border-black/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-black placeholder-gray-400"
										placeholder="Your email"
									/>
								</div>

								<div>
									<label className="block text-blue-300 mb-2 text-sm font-medium">Message</label>
									<textarea
										name="message"
										value={contactForm.message}
										onChange={handleContactChange}
										className="w-full bg-white/10 border border-black/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 text-black placeholder-gray-400 min-h-[180px] resize-none"
										placeholder="Your message"
									></textarea>
								</div>

								<button
									type="button"
									onClick={handleContactSubmit}
									className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition-all text-white font-medium flex items-center justify-center shadow-md hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1"
								>
									Send Message
									<SendIcon className="w-4 h-4 ml-2" />
								</button>

								<div className="text-gray-400 text-sm text-center mt-4">
									I'll get back to you as soon as possible!
								</div>
							</div>
						</GlassCard>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactSection;