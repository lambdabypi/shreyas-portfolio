// src/components/layout/InteractiveBackground.js
import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const InteractiveBackground = () => {
	const { mousePosition } = usePortfolio();
	const canvasRef = useRef(null);
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		let particles = [];
		let animationFrameId;

		// Handle mouse move event is managed by PortfolioContext

		// Setup canvas
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		// Initialize particles
		const initParticles = () => {
			particles = [];
			const particleCount = Math.floor((canvas.width * canvas.height) / 10000);

			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * 3 + 1,
					speedX: Math.random() * 1 - 0.5,
					speedY: Math.random() * 1 - 0.5,
					color: `rgba(100, 120, 255, ${Math.random() * 0.3 + 0.1})`
				});
			}
		};

		// Animation loop
		const animate = () => {
			ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Update and draw particles
			particles.forEach(particle => {
				// Calculate distance to mouse
				const dx = mousePosition.current.x - particle.x;
				const dy = mousePosition.current.y - particle.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Mouse influence (repel or attract)
				if (distance < 150) {
					const angle = Math.atan2(dy, dx);
					const force = (150 - distance) / 1500;
					particle.speedX -= Math.cos(angle) * force;
					particle.speedY -= Math.sin(angle) * force;
				}

				// Apply speed to position
				particle.x += particle.speedX;
				particle.y += particle.speedY;

				// Dampen speed
				particle.speedX *= 0.98;
				particle.speedY *= 0.98;

				// Boundary checking
				if (particle.x < 0 || particle.x > canvas.width) {
					particle.speedX *= -1;
				}
				if (particle.y < 0 || particle.y > canvas.height) {
					particle.speedY *= -1;
				}

				// Draw particle
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fillStyle = particle.color;
				ctx.fill();
			});

			// Draw connections between particles
			particles.forEach((particleA, i) => {
				particles.slice(i + 1).forEach(particleB => {
					const dx = particleA.x - particleB.x;
					const dy = particleA.y - particleB.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 120) {
						ctx.beginPath();
						ctx.moveTo(particleA.x, particleA.y);
						ctx.lineTo(particleB.x, particleB.y);
						ctx.strokeStyle = `rgba(150, 170, 230, ${(120 - distance) / 120 * 0.2})`;
						ctx.lineWidth = 1;
						ctx.stroke();
					}
				});
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		window.addEventListener('resize', handleResize);

		// Initialize and start animation
		if (canvas) {
			canvas.width = dimensions.width;
			canvas.height = dimensions.height;
			initParticles();
			animate();
		}

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, [dimensions, mousePosition]);

	return (
		<>
			{/* Base background layers */}
			<div className="interactive-background"></div>
			<div className="glass-background"></div>

			{/* Canvas for particle animation */}
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