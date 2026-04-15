// src/components/layout/InteractiveBackground.js
import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import constellationData from '../../data/constellationData';

const InteractiveBackground = () => {
	const { mousePosition } = usePortfolio();
	const canvasRef = useRef(null);
	const animationFrameId = useRef(null);
	const particles = useRef([]);

	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	});

	// Game state - sync with constellation clicker
	const [gameData, setGameData] = useState({
		unlockedConstellations: new Set()
	});

	// Constellation definitions – imported from shared data file
	const constellations = constellationData;

	// Load game data from localStorage
	useEffect(() => {
		const savedData = localStorage.getItem('portfolioClickerData');
		if (savedData) {
			try {
				const parsed = JSON.parse(savedData);
				setGameData({
					unlockedConstellations: new Set(parsed.unlockedConstellations || [])
				});
			} catch (error) {
				console.error('Failed to load game data:', error);
			}
		}

		// Listen for storage changes to sync across components
		const handleStorageChange = () => {
			const updatedData = localStorage.getItem('portfolioClickerData');
			if (updatedData) {
				try {
					const parsed = JSON.parse(updatedData);
					setGameData({
						unlockedConstellations: new Set(parsed.unlockedConstellations || [])
					});
				} catch (error) {
					console.error('Failed to sync game data:', error);
				}
			}
		};

		window.addEventListener('storage', handleStorageChange);

		// Custom event for same-tab updates
		window.addEventListener('portfolioClickerUpdate', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('portfolioClickerUpdate', handleStorageChange);
		};
	}, []);

	// Main animation and canvas setup effect - removed gameData.unlockedConstellations from dependency
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		// Setup canvas
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		// Initialize particles and restore constellation state
		const initParticles = () => {
			particles.current = [];
			const particleCount = Math.floor((canvas.width * canvas.height) / 8000);

			for (let i = 0; i < particleCount; i++) {
				particles.current.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * 3 + 1,
					speedX: Math.random() * 1 - 0.5,
					speedY: Math.random() * 1 - 0.5,
					color: `rgba(100, 120, 255, ${Math.random() * 0.3 + 0.1})`,
					isConstellationStar: false,
					targetX: null,
					targetY: null,
					constellationId: null,
					starIndex: null
				});
			}

			// Don't restore constellations here - let the separate effect handle it
		};

		// Function to restore constellation state (will be called from separate effect)
		const restoreConstellations = () => {
			if (!canvas) return;

			// Get current game data from localStorage directly to avoid dependency issues
			const savedData = localStorage.getItem('portfolioClickerData');
			let currentUnlocked = new Set();

			if (savedData) {
				try {
					const parsed = JSON.parse(savedData);
					currentUnlocked = new Set(parsed.unlockedConstellations || []);
				} catch (error) {
					console.error('Failed to parse game data:', error);
				}
			}

			currentUnlocked.forEach(constId => {
				const constellation = constellations.find(c => c.id === constId);
				if (!constellation) return;

				const pxScale = constellation.placement.scale * Math.min(canvas.width, canvas.height) / 400;
				const centX = constellation.stars.reduce((sum, s) => sum + s.x, 0) / constellation.stars.length;
				const centY = constellation.stars.reduce((sum, s) => sum + s.y, 0) / constellation.stars.length;

				constellation.stars.forEach((star, index) => {
					const targetX = constellation.placement.cx * canvas.width  + (star.x - centX) * pxScale;
					const targetY = constellation.placement.cy * canvas.height + (star.y - centY) * pxScale;

					// Find available particle to assign as constellation star
					const availableParticle = particles.current.find(p =>
						!p.isConstellationStar && !p.constellationId
					);

					if (availableParticle) {
						availableParticle.isConstellationStar = true;
						availableParticle.x = targetX;
						availableParticle.y = targetY;
						availableParticle.targetX = targetX;
						availableParticle.targetY = targetY;
						availableParticle.constellationId = constId;
						availableParticle.starIndex = index;
						availableParticle.color = constellation.color;
						availableParticle.size = 4;
						availableParticle.speedX = 0;
						availableParticle.speedY = 0;
					}
				});
			});
		};

		// Animation loop - now stable and not dependent on external state
		const animate = () => {
			// Clear canvas completely for clean rendering
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update particles
			particles.current.forEach(particle => {
				if (particle.isConstellationStar) {
					// Constellation stars stay perfectly in position with gentle breathing
					if (particle.targetX !== null && particle.targetY !== null) {
						// Keep constellation stars exactly in place
						particle.x = particle.targetX;
						particle.y = particle.targetY;

						// Add subtle breathing effect to constellation stars
						const time = Date.now() * 0.001;
						const breathe = Math.sin(time + particle.starIndex) * 0.3;
						particle.size = 4 + breathe;
					}
				} else {
					// Normal particle behavior for non-constellation particles
					const dx = mousePosition.current.x - particle.x;
					const dy = mousePosition.current.y - particle.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					// Reduced mouse influence for gentler interaction
					if (distance < 100) {
						const angle = Math.atan2(dy, dx);
						const force = (100 - distance) / 2000; // Reduced force
						particle.speedX -= Math.cos(angle) * force;
						particle.speedY -= Math.sin(angle) * force;
					}

					particle.x += particle.speedX;
					particle.y += particle.speedY;
					particle.speedX *= 0.99; // Slightly stronger dampening
					particle.speedY *= 0.99;

					// Boundary checking
					if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
					if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
				}

				// Draw particle with enhanced constellation star effects
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

				if (particle.isConstellationStar) {
					// Enhanced glowing constellation star
					const intensity = Math.sin(Date.now() * 0.002 + particle.starIndex) * 0.3 + 0.7;
					ctx.shadowBlur = 25 * intensity;
					ctx.shadowColor = particle.color;
					ctx.fillStyle = particle.color;
					ctx.globalAlpha = intensity;
					ctx.fill();

					// Add inner bright core
					ctx.beginPath();
					ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
					ctx.fillStyle = '#ffffff';
					ctx.globalAlpha = intensity * 0.8;
					ctx.fill();

					ctx.globalAlpha = 1;
				} else {
					ctx.shadowBlur = 0;
					ctx.fillStyle = particle.color;
					ctx.fill();
				}
			});

			// Draw constellation connections - get current state directly from localStorage
			const savedData = localStorage.getItem('portfolioClickerData');
			let currentUnlocked = new Set();

			if (savedData) {
				try {
					const parsed = JSON.parse(savedData);
					currentUnlocked = new Set(parsed.unlockedConstellations || []);
				} catch (error) {
					// Silently continue if parsing fails
				}
			}

			currentUnlocked.forEach(constId => {
				const constellation = constellations.find(c => c.id === constId);
				if (!constellation) return;

				const time = Date.now() * 0.001;
				const pulseIntensity = Math.sin(time * 0.5) * 0.3 + 0.7;

				constellation.connections.forEach(([startIdx, endIdx]) => {
					const startStar = particles.current.find(p =>
						p.constellationId === constId && p.starIndex === startIdx
					);
					const endStar = particles.current.find(p =>
						p.constellationId === constId && p.starIndex === endIdx
					);

					if (startStar && endStar) {
						// Main constellation line
						ctx.beginPath();
						ctx.moveTo(startStar.x, startStar.y);
						ctx.lineTo(endStar.x, endStar.y);
						ctx.strokeStyle = constellation.color + Math.floor(pulseIntensity * 255).toString(16).padStart(2, '0');
						ctx.lineWidth = 3;
						ctx.shadowBlur = 15 * pulseIntensity;
						ctx.shadowColor = constellation.color;
						ctx.stroke();

						// Add subtle inner glow line
						ctx.beginPath();
						ctx.moveTo(startStar.x, startStar.y);
						ctx.lineTo(endStar.x, endStar.y);
						ctx.strokeStyle = '#ffffff' + Math.floor(pulseIntensity * 100).toString(16).padStart(2, '0');
						ctx.lineWidth = 1;
						ctx.shadowBlur = 5;
						ctx.shadowColor = '#ffffff';
						ctx.stroke();
					}
				});
			});

			// Draw normal connections for non-constellation particles
			particles.current.forEach((particleA, i) => {
				if (particleA.isConstellationStar) return;

				particles.current.slice(i + 1).forEach(particleB => {
					if (particleB.isConstellationStar) return;

					const dx = particleA.x - particleB.x;
					const dy = particleA.y - particleB.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 120) {
						ctx.beginPath();
						ctx.moveTo(particleA.x, particleA.y);
						ctx.lineTo(particleB.x, particleB.y);
						ctx.strokeStyle = `rgba(150, 170, 230, ${(120 - distance) / 120 * 0.2})`;
						ctx.lineWidth = 1;
						ctx.shadowBlur = 0;
						ctx.stroke();
					}
				});
			});

			animationFrameId.current = requestAnimationFrame(animate);
		};

		window.addEventListener('resize', handleResize);

		// Initialize and start animation
		if (canvas) {
			canvas.width = dimensions.width;
			canvas.height = dimensions.height;
			initParticles();
			restoreConstellations(); // Initial restore
			animate();
		}

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId.current);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dimensions, mousePosition]); // constellationData is a module-level constant — never changes

	// Separate effect to handle constellation restoration when data changes
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || particles.current.length === 0) return;

		// Clear existing constellation assignments
		particles.current.forEach(p => {
			if (p.isConstellationStar) {
				p.isConstellationStar = false;
				p.targetX = null;
				p.targetY = null;
				p.constellationId = null;
				p.starIndex = null;
				p.color = `rgba(100, 120, 255, ${Math.random() * 0.3 + 0.1})`;
				p.size = Math.random() * 3 + 1;
			}
		});

		// Restore all unlocked constellations
		gameData.unlockedConstellations.forEach(constId => {
			const constellation = constellations.find(c => c.id === constId);
			if (!constellation) return;

			const pxScale = constellation.placement.scale * Math.min(canvas.width, canvas.height) / 400;
			const centX = constellation.stars.reduce((sum, s) => sum + s.x, 0) / constellation.stars.length;
			const centY = constellation.stars.reduce((sum, s) => sum + s.y, 0) / constellation.stars.length;

			constellation.stars.forEach((star, index) => {
				const targetX = constellation.placement.cx * canvas.width  + (star.x - centX) * pxScale;
				const targetY = constellation.placement.cy * canvas.height + (star.y - centY) * pxScale;

				// Find available particle to assign as constellation star
				const availableParticle = particles.current.find(p =>
					!p.isConstellationStar && !p.constellationId
				);

				if (availableParticle) {
					availableParticle.isConstellationStar = true;
					availableParticle.x = targetX;
					availableParticle.y = targetY;
					availableParticle.targetX = targetX;
					availableParticle.targetY = targetY;
					availableParticle.constellationId = constId;
					availableParticle.starIndex = index;
					availableParticle.color = constellation.color;
					availableParticle.size = 4;
					availableParticle.speedX = 0;
					availableParticle.speedY = 0;
				}
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameData.unlockedConstellations]); // constellationData is a module-level constant — never changes

	return (
		<>
			{/* Base background layers */}
			<div className="interactive-background"></div>
			<div className="glass-background"></div>

			{/* Enhanced Canvas with constellation support */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 z-0"
				width={dimensions.width}
				height={dimensions.height}
			/>
		</>
	);
};

export default InteractiveBackground;