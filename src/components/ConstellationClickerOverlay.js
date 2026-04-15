// src/components/ConstellationClickerOverlay.js
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Star, Zap, Trophy, TrendingUp, Sparkles, Crown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import constellationData from '../data/constellationData';

// Build a lookup map: id → { stars, connections, sizes } for the focus overlay
const FOCUS_DATA = Object.fromEntries(
	constellationData.map(c => [c.id, { stars: c.stars, connections: c.connections, sizes: c.sizes }])
);

// Stable background star field for the focus overlay (module-level = computed once)
const BG_STARS = Array.from({ length: 80 }, () => ({
	x: Math.random() * 100,
	y: Math.random() * 100,
	s: 0.8 + Math.random() * 1.4,
	o: 0.10 + Math.random() * 0.28,
}));

// ── Focus overlay – shown fullscreen when a constellation is first unlocked ────
const ConstellationFocusOverlay = ({ constellation, onDismiss }) => {
	const display = FOCUS_DATA[constellation.id];
	// phase: 0 = stars animating in, 1 = lines drawing, 2 = label visible
	const [phase, setPhase] = useState(0);
	// Only allow manual dismiss after the full animation has played
	const [dismissable, setDismissable] = useState(false);

	useEffect(() => {
		const starMs = display.stars.length * 165 + 200;
		const lineMs = display.connections.length * 210 + 200;
		const t1 = setTimeout(() => setPhase(1), starMs);
		const t2 = setTimeout(() => setPhase(2), starMs + lineMs);
		const t3 = setTimeout(() => setDismissable(true), starMs + lineMs + 200);
		const t4 = setTimeout(onDismiss, starMs + lineMs + 3800);
		return () => [t1, t2, t3, t4].forEach(clearTimeout);
	}, [constellation.id, display.stars.length, display.connections.length, onDismiss]);

	const dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);

	return (
		<div
			className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none"
			style={{
				background: 'rgba(0,2,10,0.94)',
				backdropFilter: 'blur(8px)',
				cursor: dismissable ? 'pointer' : 'default',
			}}
			onClick={dismissable ? onDismiss : undefined}
		>
			{/* Background star field */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{BG_STARS.map((s, i) => (
					<div key={i} style={{
						position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
						width: s.s, height: s.s, borderRadius: '50%',
						background: 'white', opacity: s.o,
					}} />
				))}
			</div>

			<div className="relative flex flex-col items-center gap-5 px-4">
				{/* Header label */}
				<div style={{
					opacity: phase >= 2 ? 1 : 0,
					transform: phase >= 2 ? 'translateY(0)' : 'translateY(-14px)',
					transition: 'opacity 0.7s ease, transform 0.7s ease',
					textAlign: 'center',
				}}>
					<p style={{
						fontSize: '0.62rem', letterSpacing: '0.24em',
						color: constellation.color, textTransform: 'uppercase', marginBottom: 8,
						textShadow: `0 0 12px ${constellation.color}`,
					}}>
						✦ Constellation Unlocked ✦
					</p>
					<h2 style={{
						fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 800, color: '#fff', margin: 0,
						textShadow: `0 0 28px ${constellation.color}, 0 0 60px ${constellation.color}44`,
					}}>
						{constellation.name}
					</h2>
					<p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>
						{constellation.description}
					</p>
				</div>

				{/* SVG constellation drawing */}
				<svg
					viewBox="0 0 400 300"
					style={{ width: 'min(400px, 88vw)', height: 'auto', overflow: 'visible' }}
				>
					{/* Lines – drawn in phase 1+ */}
					{phase >= 1 && display.connections.map(([ai, bi], ci) => {
						const a = display.stars[ai];
						const b = display.stars[bi];
						const d = dist(a, b);
						return (
							<line
								key={ci}
								x1={a.x} y1={a.y} x2={b.x} y2={b.y}
								stroke={constellation.color}
								strokeWidth="1.5"
								strokeLinecap="round"
								style={{
									filter: `drop-shadow(0 0 4px ${constellation.color})`,
									strokeDasharray: d,
									strokeDashoffset: d,
									animation: 'focusDrawLine 0.55s ease forwards',
									animationDelay: `${ci * 0.2}s`,
								}}
							/>
						);
					})}

					{/* Stars – appear one by one in phase 0 */}
					{display.stars.map((s, si) => (
						<g key={si} style={{
							opacity: 0,
							transformBox: 'fill-box',
							transformOrigin: 'center',
							animation: 'focusStarIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards',
							animationDelay: `${si * 0.165}s`,
						}}>
							{/* Outer glow halo */}
							<circle cx={s.x} cy={s.y} r={(display.sizes[si] || 4) * 2.8}
								fill={constellation.color} opacity="0.12" />
							{/* Bright core */}
							<circle cx={s.x} cy={s.y} r={display.sizes[si] || 4}
								fill="white"
								style={{ filter: `drop-shadow(0 0 5px ${constellation.color}) drop-shadow(0 0 2px white)` }}
							/>
						</g>
					))}
				</svg>

				{/* Dismiss hint – only shown once the overlay can actually be dismissed */}
				<p style={{
					fontSize: '0.62rem', letterSpacing: '0.12em',
					color: 'rgba(255,255,255,0.22)', margin: 0,
					opacity: dismissable ? 1 : 0,
					transition: 'opacity 0.5s ease',
				}}>
					Click anywhere to continue
				</p>
			</div>

			<style>{`
				@keyframes focusStarIn {
					from { opacity: 0; transform: scale(0.1); }
					to   { opacity: 1; transform: scale(1); }
				}
				@keyframes focusDrawLine {
					to { stroke-dashoffset: 0; }
				}
			`}</style>
		</div>
	);
};

// ── Main overlay component ─────────────────────────────────────────────────────
const ConstellationClickerOverlay = () => {
	const { activeSection } = usePortfolio();

	// Game state
	const [gameData, setGameData] = useState({
		level: 1,
		experience: 0,
		totalClicks: 0,
		skillPoints: 0,
		clickMultiplier: 1,
		autoClickerLevel: 0,
		achievements: new Set(),
		gameStarted: false,
		unlockedConstellations: new Set()
	});

	const [showFloatingXP, setShowFloatingXP] = useState([]);
	const [showGameUI, setShowGameUI] = useState(false);
	const [showTip, setShowTip] = useState(true);
	const [showFinalCelebration, setShowFinalCelebration] = useState(false);
	const [confettiParticles, setConfettiParticles] = useState([]);
	const [focusConstellation, setFocusConstellation] = useState(null);

	// Click particles
	const [clickParticles, setClickParticles] = useState([]);
	const particleIdRef = useRef(0);

	// Shooting stars
	const [shootingStars, setShootingStars] = useState([]);
	const nextStarTimerRef = useRef(null);

	const intervalRef = useRef(null);

	// null = not yet initialized from localStorage (prevents false triggers on load)
	const prevUnlockedRef = useRef(null);

	// Use shared constellation data directly (module-level constant)
	const constellations = constellationData;

	const achievementList = useMemo(() => [
		{ id: 'first-milestone',   name: 'First Steps',       description: 'Reach Level 5',               icon: '🌟' },
		{ id: 'experienced',       name: 'Getting Good',      description: 'Reach Level 10',              icon: '⭐' },
		{ id: 'expert',            name: 'Portfolio Expert',  description: 'Reach Level 25',              icon: '🏆' },
		{ id: 'dedicated-clicker', name: 'Dedicated Visitor', description: 'Click 100 times',             icon: '👆' },
		{ id: 'click-master',      name: 'Click Master',      description: 'Click 500 times',             icon: '💪' },
		{ id: 'click-legend',      name: 'Click Legend',      description: 'Click 1000 times',            icon: '🔥' },
		{ id: 'automation-expert', name: 'Automation Pro',    description: 'Max auto-clicker to Level 5', icon: '🤖' },
		{ id: 'power-clicker',     name: 'Power User',        description: 'Get 5x click multiplier',     icon: '⚡' },
	], []);

	// Load from localStorage
	useEffect(() => {
		const savedData = localStorage.getItem('portfolioClickerData');
		if (savedData) {
			try {
				const parsed = JSON.parse(savedData);
				const unlocked = new Set(parsed.unlockedConstellations || []);
				setGameData({
					...parsed,
					achievements: new Set(parsed.achievements || []),
					unlockedConstellations: unlocked,
				});
				// Initialize ref so existing unlocks don't re-trigger the focus overlay
				prevUnlockedRef.current = new Set(unlocked);
				if (parsed.gameStarted) { setShowGameUI(true); setShowTip(false); }
			} catch (error) {
				console.error('Failed to load game data:', error);
			}
		} else {
			prevUnlockedRef.current = new Set(); // fresh game
		}
	}, []);

	const saveGameData = useCallback((data) => {
		try {
			localStorage.setItem('portfolioClickerData', JSON.stringify({
				...data,
				achievements: Array.from(data.achievements),
				unlockedConstellations: Array.from(data.unlockedConstellations),
			}));
			// Defer so this never fires inside a setGameData updater (avoids setState-during-render)
			setTimeout(() => window.dispatchEvent(new Event('portfolioClickerUpdate')), 0);
		} catch (error) {
			console.error('Failed to save game data:', error);
		}
	}, []);

	// Confetti – stable callback, not called from inside a state updater
	const createConfetti = useCallback(() => {
		const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
		setConfettiParticles(Array.from({ length: 120 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: -12,
			color: colors[i % colors.length],
			rotation: Math.random() * 360,
			size: 5 + Math.random() * 8,
		})));
		setTimeout(() => {
			setConfettiParticles([]);
			setShowFinalCelebration(false);
		}, 5500);
	}, []);

	// Auto-clicker
	useEffect(() => {
		if (gameData.autoClickerLevel > 0 && gameData.gameStarted) {
			intervalRef.current = setInterval(() => {
				setGameData(prev => {
					const newData = { ...prev, experience: prev.experience + prev.autoClickerLevel * 2, totalClicks: prev.totalClicks + 1 };
					saveGameData(newData);
					return newData;
				});
			}, 2000);
		} else {
			clearInterval(intervalRef.current);
		}
		return () => clearInterval(intervalRef.current);
	}, [gameData.autoClickerLevel, gameData.gameStarted, saveGameData]);

	// Level-up + constellation unlock (no side effects beyond state)
	useEffect(() => {
		const requiredXP = gameData.level * 150;
		if (gameData.experience >= requiredXP) {
			setGameData(prev => {
				const newLevel = prev.level + 1;
				const newAchievements = new Set(prev.achievements);
				const newUnlocked = new Set(prev.unlockedConstellations);

				constellations.forEach(c => {
					if (newLevel >= c.level && !prev.unlockedConstellations.has(c.id))
						newUnlocked.add(c.id);
				});

				if (newLevel >= 5)  newAchievements.add('first-milestone');
				if (newLevel >= 10) newAchievements.add('experienced');
				if (newLevel >= 25) newAchievements.add('expert');
				if (prev.totalClicks >= 100)  newAchievements.add('dedicated-clicker');
				if (prev.totalClicks >= 500)  newAchievements.add('click-master');
				if (prev.totalClicks >= 1000) newAchievements.add('click-legend');
				if (prev.autoClickerLevel >= 5) newAchievements.add('automation-expert');
				if (prev.clickMultiplier >= 5)  newAchievements.add('power-clicker');

				const newData = { ...prev, level: newLevel, skillPoints: prev.skillPoints + 75, achievements: newAchievements, unlockedConstellations: newUnlocked };
				saveGameData(newData);
				return newData;
			});
		}
	}, [gameData.experience, gameData.level, gameData.totalClicks, gameData.autoClickerLevel, gameData.clickMultiplier, saveGameData, constellations]);

	// Detect newly unlocked constellations → show focus overlay
	useEffect(() => {
		if (!gameData.gameStarted) return;
		if (prevUnlockedRef.current === null) return; // not yet initialized from localStorage

		const prev = prevUnlockedRef.current;
		const current = gameData.unlockedConstellations;
		const newlyUnlocked = [...current].filter(id => !prev.has(id));

		if (newlyUnlocked.length > 0) {
			const newConst = constellations.find(c => c.id === newlyUnlocked[0]);
			if (newConst) setFocusConstellation(newConst);

			if (newlyUnlocked.includes('corona')) {
				// Show celebration after the focus overlay auto-dismisses (~8s)
				setTimeout(() => {
					setShowFinalCelebration(true);
					createConfetti();
				}, 8500);
			}
		}

		prevUnlockedRef.current = new Set(current);
	}, [gameData.unlockedConstellations, gameData.gameStarted, constellations, createConfetti]);

	// Spawn click particle burst
	const spawnParticles = useCallback((x, y, count = 8, special = false) => {
		const regularColors = ['#60A5FA', '#A78BFA', '#34D399', '#F59E0B', '#EF4444', '#38BDF8'];
		const specialColors = ['#FFD700', '#FFF44F', '#FFB800'];

		const newParticles = Array.from({ length: count }, (_, i) => {
			const angle = (360 / count) * i + (Math.random() - 0.5) * 20;
			const d = 30 + Math.random() * 25;
			const size = special ? 3 + Math.random() * 2 : 2 + Math.random();
			const color = special
				? specialColors[Math.floor(Math.random() * specialColors.length)]
				: regularColors[Math.floor(Math.random() * regularColors.length)];
			particleIdRef.current += 1;
			return { id: particleIdRef.current, x, y, angle, dist: d, size, color };
		});

		setClickParticles(prev => {
			const combined = [...prev, ...newParticles];
			return combined.length > 48 ? combined.slice(combined.length - 48) : combined;
		});
		setTimeout(() => {
			const ids = new Set(newParticles.map(p => p.id));
			setClickParticles(prev => prev.filter(p => !ids.has(p.id)));
		}, 700);
	}, []);

	// Shooting stars
	const spawnShootingStar = useCallback(() => {
		const id = Date.now();
		const startY = 30 + Math.random() * (window.innerHeight * 0.35);
		const duration = 2000 + Math.random() * 1500;
		const star = {
			id,
			startX: -150, startY,
			endX: window.innerWidth + 150, endY: startY + 80 + Math.random() * 150,
			duration, catchable: true,
		};
		setShootingStars(prev => [...prev, star]);
		setTimeout(() => setShootingStars(prev => prev.map(s => s.id === id ? { ...s, catchable: false } : s)), duration * 0.75);
		setTimeout(() => setShootingStars(prev => prev.filter(s => s.id !== id)), duration + 300);
	}, []);

	useEffect(() => {
		if (!gameData.gameStarted) return;
		const scheduleNext = () => {
			nextStarTimerRef.current = setTimeout(() => { spawnShootingStar(); scheduleNext(); }, 12000 + Math.random() * 8000);
		};
		nextStarTimerRef.current = setTimeout(() => { spawnShootingStar(); scheduleNext(); }, 8000 + Math.random() * 4000);
		return () => clearTimeout(nextStarTimerRef.current);
	}, [gameData.gameStarted, spawnShootingStar]);

	const catchShootingStar = useCallback((starId, e) => {
		e.stopPropagation();
		setShootingStars(prev => {
			const star = prev.find(s => s.id === starId);
			if (!star || !star.catchable) return prev;
			return prev.filter(s => s.id !== starId);
		});
		setGameData(prev => {
			const bonusXP = 45 * prev.clickMultiplier;
			const newData = { ...prev, experience: prev.experience + bonusXP, totalClicks: prev.totalClicks + 1 };
			saveGameData(newData);
			const newFloat = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, xp: bonusXP, special: true };
			setShowFloatingXP(fp => [...fp, newFloat]);
			setTimeout(() => setShowFloatingXP(fp => fp.filter(f => f.id !== newFloat.id)), 1500);
			return newData;
		});
		spawnParticles(e.clientX, e.clientY, 16, true);
	}, [saveGameData, spawnParticles]);

	const handleBackgroundClick = useCallback((e) => {
		if (focusConstellation) return; // focus overlay owns all clicks while visible
		if (e.target.closest('.game-ui, .glass-card, button, a, input, textarea, .glass-nav')) return;

		if (!gameData.gameStarted) {
			setGameData(prev => { const d = { ...prev, gameStarted: true }; saveGameData(d); return d; });
			setShowGameUI(true);
			setShowTip(false);
		}

		const xpGain = 15 * gameData.clickMultiplier;
		setGameData(prev => {
			const newData = { ...prev, experience: prev.experience + xpGain, totalClicks: prev.totalClicks + 1 };
			saveGameData(newData);
			return newData;
		});
		const newFloat = { id: Date.now(), x: e.clientX, y: e.clientY, xp: xpGain, special: false };
		setShowFloatingXP(prev => [...prev, newFloat]);
		setTimeout(() => setShowFloatingXP(prev => prev.filter(f => f.id !== newFloat.id)), 1500);
		spawnParticles(e.clientX, e.clientY);
	}, [focusConstellation, gameData.gameStarted, gameData.clickMultiplier, saveGameData, spawnParticles]);

	useEffect(() => {
		document.addEventListener('click', handleBackgroundClick);
		return () => document.removeEventListener('click', handleBackgroundClick);
	}, [handleBackgroundClick]);

	const buyUpgrade = (upgrade) => {
		setGameData(prev => {
			let newData = { ...prev };
			if (upgrade === 'autoClicker' && prev.skillPoints >= 100)
				newData = { ...prev, skillPoints: prev.skillPoints - 100, autoClickerLevel: prev.autoClickerLevel + 1 };
			if (upgrade === 'multiplier' && prev.skillPoints >= 200)
				newData = { ...prev, skillPoints: prev.skillPoints - 200, clickMultiplier: prev.clickMultiplier + 1 };
			saveGameData(newData);
			return newData;
		});
	};

	const resetGame = () => {
		const init = { level: 1, experience: 0, totalClicks: 0, skillPoints: 0, clickMultiplier: 1, autoClickerLevel: 0, achievements: new Set(), gameStarted: false, unlockedConstellations: new Set() };
		setGameData(init);
		localStorage.removeItem('portfolioClickerData');
		setShowGameUI(false);
		setShowTip(true);
		setFocusConstellation(null);
		prevUnlockedRef.current = new Set();
		clearTimeout(nextStarTimerRef.current);
		setShootingStars([]);
		setClickParticles([]);
		window.dispatchEvent(new Event('portfolioClickerUpdate'));
	};

	const handleFocusDismiss = useCallback(() => setFocusConstellation(null), []);

	return (
		<>
			{/* ── Focus overlay – fullscreen when a constellation unlocks ── */}
			{focusConstellation && (
				<ConstellationFocusOverlay
					constellation={focusConstellation}
					onDismiss={handleFocusDismiss}
				/>
			)}

			{/* ── Confetti ── */}
			{confettiParticles.map(c => (
				<div
					key={c.id}
					className="fixed pointer-events-none z-[55]"
					style={{
						left: c.x, top: c.y,
						width: c.size, height: c.size,
						backgroundColor: c.color,
						transform: `rotate(${c.rotation}deg)`,
						animation: 'fall 3.5s linear forwards',
					}}
				/>
			))}

			{/* ── Final celebration modal ── */}
			{showFinalCelebration && (
				<div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowFinalCelebration(false)}>
					<div className="bg-gradient-to-r from-yellow-400/90 via-orange-500/90 to-red-500/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 text-center">
						<Crown className="w-16 h-16 mx-auto mb-4 text-white" />
						<h2 className="text-3xl font-bold text-white mb-2">🎉 PORTFOLIO MASTER! 🎉</h2>
						<p className="text-xl text-white mb-4">You've unlocked all constellations!</p>
						<div className="bg-black/20 rounded-lg p-4 mb-4">
							<p className="text-white">
								<strong>Final Achievement Unlocked:</strong><br />
								You are now a certified Portfolio Explorer!<br />
								🎊 Thanks for exploring every corner! 🎊
							</p>
						</div>
						<div className="flex items-center justify-center gap-2 text-white">
							<Sparkles className="w-6 h-6" />
							<span>The journey through the stars is complete</span>
							<Sparkles className="w-6 h-6" />
						</div>
					</div>
				</div>
			)}

			{/* ── Floating XP ── */}
			{showFloatingXP.map(float => (
				<div
					key={float.id}
					className="fixed pointer-events-none z-40"
					style={{
						left: float.x - 30, top: float.y - 20,
						animation: 'floatUp 1.5s ease-out forwards',
						fontSize: float.special ? '1.1rem' : '0.9rem',
						fontWeight: 'bold',
						color: float.special ? '#FFD700' : '#86efac',
						textShadow: float.special ? '0 0 12px rgba(255,200,0,0.8)' : '0 0 8px rgba(134,239,172,0.6)',
					}}
				>
					{float.special ? '🌠' : '⭐'} +{float.xp} XP
				</div>
			))}

			{/* ── Click particles ── */}
			{clickParticles.map(p => (
				<div
					key={p.id}
					className="fixed pointer-events-none"
					style={{
						left: p.x, top: p.y, zIndex: 42,
						width: p.size, height: p.size,
						borderRadius: '50%',
						background: p.color,
						boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
						'--tx': `${Math.cos(p.angle * Math.PI / 180) * p.dist}px`,
						'--ty': `${Math.sin(p.angle * Math.PI / 180) * p.dist}px`,
						animation: 'particleBurst 0.7s ease-out forwards',
					}}
				/>
			))}

			{/* ── Shooting stars ── */}
			{shootingStars.map(star => {
				const dx = star.endX - star.startX;
				const dy = star.endY - star.startY;
				const angle = Math.atan2(dy, dx) * 180 / Math.PI;
				return (
					<div
						key={star.id}
						style={{
							position: 'fixed', left: star.startX, top: star.startY,
							pointerEvents: star.catchable ? 'auto' : 'none',
							cursor: star.catchable ? 'crosshair' : 'default',
							zIndex: 38,
							'--dx': `${dx}px`, '--dy': `${dy}px`,
							animation: `shootingStarFly ${star.duration}ms linear forwards`,
						}}
						onClick={star.catchable ? (e) => catchShootingStar(star.id, e) : undefined}
					>
						<div style={{
							transform: `rotate(${angle}deg)`, transformOrigin: 'left center',
							width: 90, height: star.catchable ? 28 : 4,
							display: 'flex', alignItems: 'center', position: 'relative',
						}}>
							<div style={{ width: '100%', height: 2, background: 'linear-gradient(to right,transparent,rgba(200,230,255,0.7),white)', borderRadius: 2, boxShadow: '0 0 6px rgba(255,255,255,0.5)' }} />
							<div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(50%,-50%)', width: 5, height: 5, borderRadius: '50%', background: 'white', boxShadow: '0 0 10px white,0 0 20px rgba(200,230,255,0.8)' }} />
							{star.catchable && (
								<div style={{ position: 'absolute', right: -28, top: -14, fontSize: '0.55rem', color: '#FFD700', fontWeight: 'bold', textShadow: '0 0 6px rgba(255,200,0,0.8)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
									⭐ CATCH!
								</div>
							)}
						</div>
					</div>
				);
			})}

			{/* ── Toast tip (intro only) ── */}
			{showTip && !gameData.gameStarted && activeSection === 'intro' && (
				<div className="fixed bottom-6 left-6 z-40 pointer-events-none">
					<div className="bg-gradient-to-r from-purple-600/95 to-blue-600/95 backdrop-blur-sm rounded-md px-3 py-2 shadow-lg border border-white/30 animate-pulse max-w-64">
						<div className="text-white flex items-center gap-2">
							<Zap className="w-4 h-4 flex-shrink-0" />
							<div>
								<p className="text-xs font-medium">Hidden game!</p>
								<p className="text-xs opacity-80">Click anywhere to unlock constellations</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* ── Game UI toggle button ── */}
			{gameData.gameStarted && (
				<button
					onClick={() => setShowGameUI(p => !p)}
					className="fixed top-4 right-4 z-40 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-md rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-white/30 game-ui"
				>
					<Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
				</button>
			)}

			{/* ── Game UI panel ── */}
			{showGameUI && gameData.gameStarted && (
				<div className="fixed top-4 left-2 sm:left-4 z-40 space-y-3 game-ui max-h-[calc(100vh-2rem)] overflow-y-auto pb-4"
					style={{ width: 'min(18rem, calc(100vw - 1rem))' }}>

					{/* Progress */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-3 sm:p-4 shadow-lg border border-white/20">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<Star className="w-4 h-4 text-yellow-400" />
								<span className="text-white font-semibold text-sm">Level {gameData.level}</span>
							</div>
							<div className="flex items-center gap-2">
								<Trophy className="w-4 h-4 text-purple-400" />
								<span className="text-white text-xs sm:text-sm">{gameData.skillPoints} SP</span>
							</div>
						</div>
						<div className="bg-gray-700 rounded-full h-2.5 overflow-hidden mb-2">
							<div
								className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
								style={{ width: `${((gameData.experience % (gameData.level * 150)) / (gameData.level * 150)) * 100}%` }}
							/>
						</div>
						<div className="flex justify-between text-xs text-gray-300">
							<span>{gameData.experience % (gameData.level * 150)} / {gameData.level * 150} XP</span>
							<span>{gameData.totalClicks} clicks</span>
						</div>
					</div>

					{/* Constellations */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-3 sm:p-4 shadow-lg border border-white/20">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
							<Star className="w-4 h-4" />
							Constellations ({gameData.unlockedConstellations.size}/{constellations.length})
						</h3>
						<div className="space-y-1.5 max-h-28 overflow-y-auto">
							{constellations.map(c => (
								<div key={c.id} className={`p-1.5 rounded text-xs transition-all ${
									gameData.unlockedConstellations.has(c.id)
										? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 text-yellow-200'
										: gameData.level >= c.level
											? 'bg-blue-500/20 border border-blue-400/50 text-blue-200'
											: 'bg-gray-700/50 text-gray-400 border border-gray-600/50'
								}`}>
									<div className="flex justify-between items-center">
										<span className="font-medium">{c.name}</span>
										<span className="opacity-75">Lvl {c.level}</span>
									</div>
									<div className="opacity-75">{c.description}</div>
									{gameData.unlockedConstellations.has(c.id) && (
										<div className="mt-0.5" style={{ color: c.color }}>⭐ Unlocked &amp; Glowing</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Upgrades */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-3 sm:p-4 shadow-lg border border-white/20">
						<h3 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
							<TrendingUp className="w-4 h-4" />
							Upgrades
						</h3>
						<div className="space-y-2">
							<button onClick={() => buyUpgrade('autoClicker')} disabled={gameData.skillPoints < 100}
								className="w-full p-2 bg-blue-600/70 hover:bg-blue-600/90 disabled:bg-gray-600/50 disabled:opacity-50 rounded text-white text-left transition-colors text-xs">
								<div className="font-medium">Auto-Clicker Lvl {gameData.autoClickerLevel + 1}</div>
								<div className="opacity-75">Cost: 100 SP • +{(gameData.autoClickerLevel + 1) * 2} XP/2s</div>
							</button>
							<button onClick={() => buyUpgrade('multiplier')} disabled={gameData.skillPoints < 200}
								className="w-full p-2 bg-purple-600/70 hover:bg-purple-600/90 disabled:bg-gray-600/50 disabled:opacity-50 rounded text-white text-left transition-colors text-xs">
								<div className="font-medium">Click Power x{gameData.clickMultiplier + 1}</div>
								<div className="opacity-75">Cost: 200 SP • +{15 * (gameData.clickMultiplier + 1)} XP per click</div>
							</button>
						</div>
					</div>

					{/* Achievements */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-3 sm:p-4 shadow-lg border border-white/20">
						<h3 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
							<Trophy className="w-4 h-4" />
							Achievements ({gameData.achievements.size}/{achievementList.length})
						</h3>
						<div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto">
							{achievementList.map(a => (
								<div key={a.id} className={`p-1.5 rounded text-xs transition-all ${
									gameData.achievements.has(a.id)
										? 'bg-yellow-500/20 border border-yellow-400/50 text-yellow-200'
										: 'bg-gray-700/50 text-gray-400 border border-gray-600/50'
								}`}>
									<div className="flex items-center gap-1 mb-0.5">
										<span className="text-sm">{a.icon}</span>
										<span className="font-medium truncate text-xs">{a.name}</span>
									</div>
									<div className="opacity-75 truncate text-xs">{a.description}</div>
								</div>
							))}
						</div>
					</div>

					{/* Controls */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-2.5 shadow-lg border border-white/20">
						<div className="flex gap-2">
							<button onClick={() => setShowGameUI(false)} className="flex-1 bg-gray-600/70 hover:bg-gray-600/90 text-white px-3 py-1.5 rounded text-xs transition-colors">Hide</button>
							<button onClick={resetGame} className="bg-red-600/70 hover:bg-red-600/90 text-white px-3 py-1.5 rounded text-xs transition-colors">Reset</button>
						</div>
					</div>
				</div>
			)}

			<style>{`
				@keyframes floatUp {
					0%   { opacity: 1; transform: translateY(0); }
					100% { opacity: 0; transform: translateY(-50px); }
				}
				@keyframes fall {
					to { transform: translateY(110vh) rotate(720deg); }
				}
				@keyframes particleBurst {
					0%   { transform: translate(-50%,-50%); opacity: 1; }
					100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))); opacity: 0; }
				}
				@keyframes shootingStarFly {
					from { transform: translate(0, 0); }
					to   { transform: translate(var(--dx), var(--dy)); }
				}
			`}</style>
		</>
	);
};

export default ConstellationClickerOverlay;
