// src/components/layout/InteractiveBackground.js
import { useState, useEffect, useRef, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

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

	// Constellation definitions - memoized to prevent re-creation
	const constellations = useMemo(() => [
		{
			id: 'ursa-minor',
			name: 'Little Dipper',
			level: 5,
			stars: [
				{ x: 0.3, y: 0.2 }, { x: 0.32, y: 0.25 }, { x: 0.35, y: 0.3 },
				{ x: 0.4, y: 0.32 }, { x: 0.38, y: 0.18 }, { x: 0.42, y: 0.15 }, { x: 0.45, y: 0.12 }
			],
			connections: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6]],
			color: '#60A5FA'
		},
		{
			id: 'cassiopeia',
			name: 'Cassiopeia',
			level: 10,
			stars: [
				{ x: 0.6, y: 0.25 }, { x: 0.65, y: 0.3 }, { x: 0.7, y: 0.22 },
				{ x: 0.75, y: 0.28 }, { x: 0.8, y: 0.2 }
			],
			connections: [[0, 1], [1, 2], [2, 3], [3, 4]],
			color: '#A78BFA'
		},
		{
			id: 'orion',
			name: 'Orion',
			level: 15,
			stars: [
				{ x: 0.15, y: 0.6 }, { x: 0.2, y: 0.55 }, { x: 0.25, y: 0.65 },
				{ x: 0.18, y: 0.7 }, { x: 0.22, y: 0.75 }, { x: 0.26, y: 0.78 }, { x: 0.3, y: 0.72 }
			],
			connections: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 6], [2, 6]],
			color: '#34D399'
		},
		{
			id: 'draco',
			name: 'Draco',
			level: 20,
			stars: [
				{ x: 0.7, y: 0.7 }, { x: 0.72, y: 0.65 }, { x: 0.75, y: 0.6 },
				{ x: 0.78, y: 0.55 }, { x: 0.8, y: 0.5 }, { x: 0.82, y: 0.45 },
				{ x: 0.85, y: 0.4 }, { x: 0.88, y: 0.42 }, { x: 0.9, y: 0.38 }
			],
			connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
			color: '#F59E0B'
		},
		{
			id: 'phoenix',
			name: 'Phoenix',
			level: 25,
			stars: [
				{ x: 0.45, y: 0.8 }, { x: 0.5, y: 0.75 }, { x: 0.55, y: 0.78 },
				{ x: 0.52, y: 0.7 }, { x: 0.48, y: 0.65 }, { x: 0.58, y: 0.68 },
				{ x: 0.6, y: 0.72 }, { x: 0.56, y: 0.6 }
			],
			connections: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [5, 6], [3, 7]],
			color: '#EF4444'
		},
		{
			id: 'corona',
			name: 'Corona Borealis',
			level: 30,
			stars: [
				{ x: 0.5, y: 0.3 }, { x: 0.48, y: 0.35 }, { x: 0.52, y: 0.35 },
				{ x: 0.46, y: 0.4 }, { x: 0.54, y: 0.4 }, { x: 0.44, y: 0.45 }, { x: 0.56, y: 0.45 }
			],
			connections: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6]],
			color: '#F59E0B'
		}
	], []);

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

	// Main animation and canvas setup effect
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

			// Restore constellation particles immediately
			restoreConstellations();
		};

		// Function to restore constellation state
		const restoreConstellations = () => {
			if (!canvas) return;

			gameData.unlockedConstellations.forEach(constId => {
				const constellation = constellations.find(c => c.id === constId);
				if (!constellation) return;

				constellation.stars.forEach((star, index) => {
					const targetX = star.x * canvas.width;
					const targetY = star.y * canvas.height;

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

		// Animation loop
		const animate = () => {
			// Clear canvas with background that changes with final constellation
			const bgOpacity = gameData.unlockedConstellations.has('corona') ? 0.05 : 0.1;
			ctx.fillStyle = `rgba(15, 23, 42, ${bgOpacity})`;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Update particles
			particles.current.forEach(particle => {
				if (particle.isConstellationStar) {
					// Constellation stars stay in position but can have gentle movement
					if (particle.targetX !== null && particle.targetY !== null) {
						// Very gentle drift to maintain constellation position
						const dx = particle.targetX - particle.x;
						const dy = particle.targetY - particle.y;
						particle.x += dx * 0.02;
						particle.y += dy * 0.02;

						// Add subtle breathing effect to constellation stars
						const time = Date.now() * 0.001;
						const breathe = Math.sin(time + particle.starIndex) * 0.5;
						particle.size = 4 + breathe;
					}
				} else {
					// Normal particle behavior for non-constellation particles
					const dx = mousePosition.current.x - particle.x;
					const dy = mousePosition.current.y - particle.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 150) {
						const angle = Math.atan2(dy, dx);
						const force = (150 - distance) / 1500;
						particle.speedX -= Math.cos(angle) * force;
						particle.speedY -= Math.sin(angle) * force;
					}

					particle.x += particle.speedX;
					particle.y += particle.speedY;
					particle.speedX *= 0.98;
					particle.speedY *= 0.98;

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

			// Draw constellation connections with enhanced effects
			gameData.unlockedConstellations.forEach(constId => {
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
			animate();
		}

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId.current);
		};
	}, [dimensions, mousePosition, gameData.unlockedConstellations, constellations]);

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

			constellation.stars.forEach((star, index) => {
				const targetX = star.x * canvas.width;
				const targetY = star.y * canvas.height;

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
	}, [gameData.unlockedConstellations, constellations]);

	return (
		<>
			{/* Base background layers */}
			<div className="interactive-background"></div>
			<div className="glass-background"></div>

			{/* Enhanced Canvas with constellation support */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 z-0"
				style={{
					background: gameData.unlockedConstellations.has('corona')
						? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
						: 'transparent'
				}}
				width={dimensions.width}
				height={dimensions.height}
			/>
		</>
	);
};

export default InteractiveBackground;