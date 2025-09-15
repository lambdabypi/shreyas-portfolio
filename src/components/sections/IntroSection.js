import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GlassButton, GlassCard, GlassSocialButton } from '../ui/GlassComponents';
import GlitchEffects from '../effects/GlitchText';
import { GithubIcon, LinkedInIcon, MailIcon } from '../icons';
import { motion, AnimatePresence } from 'framer-motion';
import MemojiSpeakingAvatar from '../avatar/MemojiSpeakingAvatar';

const IntroSection = () => {
	const { changeSection } = usePortfolio();
	const [activeTab, setActiveTab] = useState('about');
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const tabContent = {
		about: (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="text-center space-y-4"
			>
				<h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
					Hi, I'm Shreyas!
				</h2>
				<p className="text-gray-200">
					Data Engineer & AI Developer passionate about building intelligent systems
					that solve real-world problems.
				</p>
				<p className="text-gray-300">
					I specialize in machine learning, data engineering, and fullstack development.
					Currently working at Intelligent DataWorks and co-founding Clau API.
				</p>
			</motion.div>
		),
		skills: (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="flex flex-wrap justify-center gap-2"
			>
				{['Python', 'React', 'TensorFlow', 'AWS', 'SQL', 'Node.js', 'Data Engineering', 'LLMs'].map((skill) => (
					<motion.div
						key={skill}
						className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white"
						whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.5)' }}
					>
						{skill}
					</motion.div>
				))}
			</motion.div>
		),
		mission: (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="text-center space-y-4"
			>
				<h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
					My Mission
				</h2>
				<p className="text-gray-200">
					To leverage AI and data engineering to create systems that are both powerful and ethical,
					making technology more accessible and beneficial for everyone.
				</p>
			</motion.div>
		)
	};

	return (
		<div className="text-center p-6 max-w-3xl mx-auto">
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="mb-8 relative inline-block"
			>
				<MemojiSpeakingAvatar
					name="Shreyas"
					idleImageSrc="/memoji-idle.png"
					talkingImageSrcs={[
						'/memoji-talking-1.png',
						'/memoji-talking-2.png',
						'/memoji-talking-3.png'
					]}
				/>
			</motion.div>
			<GlassCard className="p-8 mb-10">
				<GlitchEffects />

				{/* About section tabs */}
				<div className="flex justify-center space-x-2 mb-6">
					{['about', 'skills', 'mission'].map((tab) => (
						<motion.button
							key={tab}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
								? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white'
								: 'text-gray-300 hover:text-white'
								}`}
							onClick={() => setActiveTab(tab)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</motion.button>
					))}
				</div>

				{/* Tab content with animation */}
				<div className="min-h-[120px] flex items-center justify-center">
					<AnimatePresence mode="wait">
						{tabContent[activeTab]}
					</AnimatePresence>
				</div>

				{/* Navigation buttons */}
				<motion.div
					className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: isLoaded ? 1 : 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
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
				</motion.div>
			</GlassCard>

			{/* Social links with animation */}
			<motion.div
				className="flex justify-center space-x-6"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: isLoaded ? 1 : 0 }}
				transition={{ delay: 0.5, duration: 0.5 }}
			>
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
			</motion.div>
		</div>
	);
};

export default IntroSection;