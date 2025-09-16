// src/components/sections/TimelineExperience.js
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from '../../utils/motionUtils';
import interestsData from '../../data/interestsData';
import './TimelineExperience.css';

// Timeline component for interests
const TimelineExperience = () => {
	const [selectedInterest, setSelectedInterest] = useState(null);
	const [activeMedia, setActiveMedia] = useState('images'); // 'images' or 'video'
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const timelineRef = useRef(null);

	// Convert the imported interestsData to the format needed for the timeline
	const timelineData = interestsData.map((interest, index) => {
		// Add some additional properties needed for the timeline
		return {
			...interest,
			// Generate a year if one doesn't exist in your data
			year: interest.year || `202${index}`,
			// Generate a location if one doesn't exist in your data
			location: interest.location || (
				interest.id === 'travel' ? 'Various Places' :
					interest.id === 'pets' ? 'Home' :
						interest.id === 'photography' ? 'Everywhere' :
							interest.id === 'cooking' ? 'Kitchen' :
								interest.id === 'reading' ? 'Libraries' :
									'Outdoors'
			),
			// Map your existing images to the format expected by the timeline
			images: (interest.images || []).map(img => ({
				src: img.src,
				caption: img.caption || img.alt
			})),
			// Determine a color for each interest
			color: getInterestColor(interest.id)
		};
	});

	// Function to assign colors to different interests
	function getInterestColor(id) {
		switch (id) {
			case 'travel': return 'bg-blue-500';
			case 'pets': return 'bg-amber-500';
			case 'photography': return 'bg-emerald-500';
			case 'cooking': return 'bg-red-500';
			case 'reading': return 'bg-purple-500';
			case 'hiking': return 'bg-teal-500';
			default: return 'bg-gray-500';
		}
	}

	// Function to get the icon for each interest
	function getInterestIcon(id) {
		switch (id) {
			case 'travel': return '🌎';
			case 'pets': return '🐕';
			case 'photography': return '📸';
			case 'cooking': return '🍳';
			case 'reading': return '📚';
			case 'hiking': return '🥾';
			default: return '⭐';
		}
	}

	const handleInterestClick = (interest) => {
		setSelectedInterest(interest);
		setActiveMedia('images');
		setCurrentImageIndex(0);
	};

	const nextImage = () => {
		if (!selectedInterest || !selectedInterest.images || selectedInterest.images.length <= 1) return;
		setCurrentImageIndex((prev) =>
			(prev + 1) % selectedInterest.images.length
		);
	};

	const prevImage = () => {
		if (!selectedInterest || !selectedInterest.images || selectedInterest.images.length <= 1) return;
		setCurrentImageIndex((prev) =>
			(prev - 1 + selectedInterest.images.length) % selectedInterest.images.length
		);
	};

	// Function to get video ID from youtubeVideos array or default to a placeholder
	const getVideoId = (interest) => {
		if (interest.youtubeVideos && interest.youtubeVideos.length > 0) {
			return interest.youtubeVideos[0].id;
		}
		return 'dQw4w9WgXcQ'; // Default placeholder video
	};

	return (
		<div className="relative bg-gray-900 text-white p-4 rounded-xl overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 overflow-hidden z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
				{/* Removed the line that references the missing noise.png image */}
				<div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
				<div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"></div>
			</div>

			<div className="relative z-10">
				{/* Timeline */}
				<div ref={timelineRef} className="relative mb-16 px-4">
					{/* Timeline bar */}
					<div className="absolute left-0 right-0 h-1 top-20 bg-gray-700"></div>

					{/* Timeline nodes */}
					<div className="flex justify-between relative">
						{timelineData.map((interest, index) => {
							const isSelected = selectedInterest && selectedInterest.id === interest.id;

							return (
								<div key={interest.id} className="flex flex-col items-center relative z-10">
									{/* Year label */}
									<span className="timeline-node-year text-gray-400 mb-2">{interest.year}</span>

									{/* Timeline node */}
									<motion.button
										className={`timeline-node w-12 h-12 rounded-full flex items-center justify-center text-white ${interest.color} ${isSelected ? 'ring-4 ring-white/30' : ''}`}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										animate={{ scale: isSelected ? 1.2 : 1 }}
										onClick={() => handleInterestClick(interest)}
									>
										<span className="timeline-node-icon">{getInterestIcon(interest.id)}</span>
									</motion.button>

									{/* Title */}
									<span className={`timeline-node-title mt-2 font-semibold text-center ${isSelected ? 'text-white' : 'text-gray-400'}`}>
										{interest.title}
									</span>

									{/* Location tag */}
									<span className="timeline-node-location mt-1 text-xs text-gray-500">{interest.location}</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* Selected interest details */}
				<AnimatePresence mode="wait">
					{selectedInterest && (
						<motion.div
							key={selectedInterest.id}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							transition={{ type: 'spring', damping: 25 }}
							className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
						>
							<div className="grid md:grid-cols-5 gap-0">
								{/* Content column */}
								<div className="p-8 md:col-span-2 timeline-content-column">
									<div className={`inline-block ${selectedInterest.color} rounded-full p-3 mb-6`}>
										<span className="text-3xl">
											{getInterestIcon(selectedInterest.id)}
										</span>
									</div>

									<h2 className="timeline-interest-title text-3xl font-bold mb-2">{selectedInterest.title}</h2>
									<div className="flex items-center text-gray-400 mb-6">
										<span className="mr-4">{selectedInterest.year}</span>
										<span>{selectedInterest.location}</span>
									</div>

									<p className="text-gray-300 mb-8">
										{selectedInterest.description}
									</p>

									{/* Media type toggles - Only show if both images and videos are available */}
									{(selectedInterest.images?.length > 0 || selectedInterest.youtubeVideos?.length > 0) && (
										<div className="flex gap-4 mb-4">
											{selectedInterest.images?.length > 0 && (
												<button
													className={`px-4 py-2 rounded-full border ${activeMedia === 'images' ? 'bg-white/10 border-white/30' : 'border-gray-700 hover:border-gray-500'} transition-colors`}
													onClick={() => setActiveMedia('images')}
												>
													📷 Photos
												</button>
											)}
											{selectedInterest.youtubeVideos?.length > 0 && (
												<button
													className={`px-4 py-2 rounded-full border ${activeMedia === 'video' ? 'bg-white/10 border-white/30' : 'border-gray-700 hover:border-gray-500'} transition-colors`}
													onClick={() => setActiveMedia('video')}
												>
													🎬 Video
												</button>
											)}
										</div>
									)}
								</div>

								{/* Media column */}
								<div className="relative md:col-span-3 bg-black/50">
									<AnimatePresence mode="wait">
										{activeMedia === 'images' && selectedInterest.images?.length > 0 ? (
											<motion.div
												key="images"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className="relative aspect-[4/3] md:aspect-auto md:h-full timeline-media-container"
											>
												<img
													src={selectedInterest.images[currentImageIndex].src}
													alt={selectedInterest.images[currentImageIndex].caption || 'Interest image'}
													className="absolute inset-0 w-full h-full object-cover"
												/>

												{/* Caption */}
												{selectedInterest.images[currentImageIndex].caption && (
													<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
														<p className="text-white">
															{selectedInterest.images[currentImageIndex].caption}
														</p>
													</div>
												)}

												{/* Navigation arrows - Only show if multiple images */}
												{selectedInterest.images.length > 1 && (
													<>
														<button
															onClick={prevImage}
															className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
														>
															←
														</button>
														<button
															onClick={nextImage}
															className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
														>
															→
														</button>

														{/* Image counter */}
														<div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded-full text-xs">
															{currentImageIndex + 1} / {selectedInterest.images.length}
														</div>
													</>
												)}
											</motion.div>
										) : activeMedia === 'video' && selectedInterest.youtubeVideos?.length > 0 ? (
											<motion.div
												key="video"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className="relative aspect-video md:aspect-auto md:h-full timeline-media-container"
											>
												<iframe
													src={`https://www.youtube.com/embed/${getVideoId(selectedInterest)}?rel=0&autoplay=0`}
													title={selectedInterest.title}
													className="absolute inset-0 w-full h-full"
													frameBorder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen
												/>
											</motion.div>
										) : (
											<motion.div
												key="no-media"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className="flex items-center justify-center aspect-[4/3] md:aspect-auto md:h-full"
											>
												<p className="text-gray-400">No media available</p>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* If no interest is selected, show a prompt */}
				{!selectedInterest && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center text-gray-400 py-16"
					>
						<p className="text-xl">Select an interest from the timeline above to explore</p>
						<div className="mt-4 animation-bounce">↑</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default TimelineExperience;