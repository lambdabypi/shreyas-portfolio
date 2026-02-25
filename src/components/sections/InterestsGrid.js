// src/components/sections/InterestsGrid.js
import { useState } from 'react';
import { motion, AnimatePresence } from '../../utils/motionUtils';
import interestsData from '../../data/interestsData';
import './InterestsGrid.css';

const META = {
	travel: { icon: '🌎', gradient: 'from-blue-500/30 to-cyan-500/20', accent: '#3b82f6' },
	pets: { icon: '🐕', gradient: 'from-amber-500/30 to-yellow-400/20', accent: '#f59e0b' },
	photography: { icon: '📸', gradient: 'from-emerald-500/30 to-teal-400/20', accent: '#10b981' },
	cooking: { icon: '🍳', gradient: 'from-red-500/30 to-orange-400/20', accent: '#ef4444' },
	reading: { icon: '📚', gradient: 'from-purple-500/30 to-violet-400/20', accent: '#8b5cf6' },
	hiking: { icon: '🥾', gradient: 'from-teal-500/30 to-green-400/20', accent: '#14b8a6' },
};
const getMeta = (id) => META[id] || { icon: '⭐', gradient: 'from-gray-500/30 to-gray-400/20', accent: '#6b7280' };

const enriched = interestsData.map((item) => ({
	...item,
	images: (item.images || []).map((img) => ({ src: img.src, caption: img.caption || img.alt })),
}));

// ── Grid card ────────────────────────────────────────────────────────────────
const InterestCard = ({ interest, isSelected, onClick }) => {
	const meta = getMeta(interest.id);
	return (
		<motion.button
			className={`interest-card bg-gradient-to-br ${meta.gradient} ${isSelected ? 'interest-card--active' : ''}`}
			style={{ '--accent': meta.accent }}
			whileHover={{ y: -3, scale: 1.02 }}
			whileTap={{ scale: 0.97 }}
			onClick={onClick}
		>
			<span className="interest-card-icon">{meta.icon}</span>
			<span className="interest-card-title">{interest.title}</span>
			<span className="interest-card-count">
				{interest.images.length > 0 ? `${interest.images.length} photo${interest.images.length > 1 ? 's' : ''}` : 'explore'}
			</span>
		</motion.button>
	);
};

// ── Detail panel ─────────────────────────────────────────────────────────────
const DetailPanel = ({ interest, onClose }) => {
	const [imgIdx, setImgIdx] = useState(0);
	const [activeTab, setTab] = useState('images');
	const meta = getMeta(interest.id);
	const images = interest.images || [];
	const hasVideo = interest.youtubeVideos?.length > 0;
	const videoId = interest.youtubeVideos?.[0]?.id;
	const showTabs = images.length > 0 && hasVideo;

	const prev = () => setImgIdx((p) => (p - 1 + images.length) % images.length);
	const next = () => setImgIdx((p) => (p + 1) % images.length);

	return (
		<motion.div
			className="detail-panel"
			style={{ '--accent': meta.accent }}
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 16 }}
			transition={{ type: 'spring', stiffness: 300, damping: 28 }}
		>
			{/* Header */}
			<div className="detail-header">
				<div className="detail-header-left">
					<span className="detail-header-icon">{meta.icon}</span>
					<h3 className="detail-header-title">{interest.title}</h3>
				</div>
				<button className="detail-close-btn" onClick={onClose}>✕</button>
			</div>

			{/* Body: side-by-side on wide, stacked on mobile */}
			<div className="detail-body">
				{/* Left: description + tabs */}
				<div className="detail-text">
					<p className="detail-description">{interest.description}</p>

					{showTabs && (
						<div className="detail-tabs">
							<button
								className={`detail-tab ${activeTab === 'images' ? 'detail-tab--on' : ''}`}
								onClick={() => setTab('images')}
							>
								📷 Photos
							</button>
							<button
								className={`detail-tab ${activeTab === 'video' ? 'detail-tab--on' : ''}`}
								onClick={() => setTab('video')}
							>
								🎬 Video
							</button>
						</div>
					)}
				</div>

				{/* Right: media */}
				<div className="detail-media">
					<AnimatePresence mode="wait">
						{/* ── Images ── */}
						{(activeTab === 'images' || !hasVideo) && images.length > 0 && (
							<motion.div key="imgs" className="media-wrap"
								initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

								{/* Main image */}
								<div className="media-main-wrap">
									<AnimatePresence mode="wait">
										<motion.img
											key={imgIdx}
											src={images[imgIdx].src}
											alt={images[imgIdx].caption}
											className="media-main-img"
											initial={{ opacity: 0, scale: 1.03 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.97 }}
											transition={{ duration: 0.22 }}
										/>
									</AnimatePresence>

									{/* Prev / Next arrows — only if > 1 image */}
									{images.length > 1 && (
										<>
											<button className="media-arrow media-arrow--l" onClick={prev}>‹</button>
											<button className="media-arrow media-arrow--r" onClick={next}>›</button>
										</>
									)}

									{/* Caption */}
									{images[imgIdx].caption && (
										<div className="media-caption">{images[imgIdx].caption}</div>
									)}

									{/* Counter badge */}
									{images.length > 1 && (
										<div className="media-counter">{imgIdx + 1} / {images.length}</div>
									)}
								</div>

								{/* Thumbnail strip — only when > 1 image */}
								{images.length > 1 && (
									<div className="media-strip">
										{images.map((img, i) => (
											<button
												key={i}
												className={`media-thumb ${i === imgIdx ? 'media-thumb--on' : ''}`}
												onClick={() => setImgIdx(i)}
											>
												<img src={img.src} alt={img.caption} />
											</button>
										))}
									</div>
								)}
							</motion.div>
						)}

						{/* ── Video ── */}
						{activeTab === 'video' && hasVideo && (
							<motion.div key="vid" className="media-wrap"
								initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
								<div className="media-video-wrap">
									<iframe
										src={`https://www.youtube.com/embed/${videoId}?rel=0`}
										title={interest.title}
										className="media-video"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};

// ── Main ─────────────────────────────────────────────────────────────────────
const InterestsGrid = () => {
	const [selected, setSelected] = useState(null);

	const handleSelect = (interest) => {
		setSelected((prev) => prev?.id === interest.id ? null : interest);
	};

	return (
		<div className="interests-root">
			<div className="interests-grid">
				{enriched.map((item) => (
					<InterestCard
						key={item.id}
						interest={item}
						isSelected={selected?.id === item.id}
						onClick={() => handleSelect(item)}
					/>
				))}
			</div>

			<AnimatePresence mode="wait">
				{selected && (
					<DetailPanel
						key={selected.id}
						interest={selected}
						onClose={() => setSelected(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default InterestsGrid;