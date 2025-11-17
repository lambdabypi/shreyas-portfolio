// src/components/ConstellationClickerOverlay.js
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Star, Zap, Trophy, TrendingUp, Sparkles, Crown } from 'lucide-react';

const ConstellationClickerOverlay = () => {
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

	const intervalRef = useRef(null);

	// Constellation definitions - memoized to prevent re-creation
	const constellations = useMemo(() => [
		{ id: 'ursa-minor', name: 'Little Dipper', level: 5, description: 'Your coding journey begins', color: '#60A5FA' },
		{ id: 'cassiopeia', name: 'Cassiopeia', level: 10, description: 'The W of wisdom', color: '#A78BFA' },
		{ id: 'orion', name: 'Orion', level: 15, description: 'The mighty hunter', color: '#34D399' },
		{ id: 'draco', name: 'Draco', level: 20, description: 'The dragon awakens', color: '#F59E0B' },
		{ id: 'phoenix', name: 'Phoenix', level: 25, description: 'Rise from the ashes', color: '#EF4444' },
		{ id: 'corona', name: 'Corona Borealis', level: 30, description: 'The Northern Crown - Master of Portfolio', color: '#F59E0B' }
	], []);

	// Achievement definitions - memoized to prevent re-creation
	const achievementList = useMemo(() => [
		{ id: 'first-milestone', name: 'First Steps', description: 'Reach Level 5', icon: '🌟' },
		{ id: 'experienced', name: 'Getting Good', description: 'Reach Level 10', icon: '⭐' },
		{ id: 'expert', name: 'Portfolio Expert', description: 'Reach Level 25', icon: '🏆' },
		{ id: 'dedicated-clicker', name: 'Dedicated Visitor', description: 'Click 100 times', icon: '👆' },
		{ id: 'click-master', name: 'Click Master', description: 'Click 500 times', icon: '💪' },
		{ id: 'click-legend', name: 'Click Legend', description: 'Click 1000 times', icon: '🔥' },
		{ id: 'automation-expert', name: 'Automation Pro', description: 'Max auto-clicker to Level 5', icon: '🤖' },
		{ id: 'power-clicker', name: 'Power User', description: 'Get 5x click multiplier', icon: '⚡' }
	], []);

	// Load game data from localStorage
	useEffect(() => {
		const savedData = localStorage.getItem('portfolioClickerData');
		if (savedData) {
			try {
				const parsed = JSON.parse(savedData);
				setGameData({
					...parsed,
					achievements: new Set(parsed.achievements || []),
					unlockedConstellations: new Set(parsed.unlockedConstellations || [])
				});

				if (parsed.gameStarted) {
					setShowGameUI(true);
					setShowTip(false);
				}
			} catch (error) {
				console.error('Failed to load game data:', error);
			}
		}
	}, []);

	// Save game data and trigger background update
	const saveGameData = useCallback((data) => {
		try {
			const dataToSave = {
				...data,
				achievements: Array.from(data.achievements),
				unlockedConstellations: Array.from(data.unlockedConstellations)
			};
			localStorage.setItem('portfolioClickerData', JSON.stringify(dataToSave));

			// Trigger custom event for same-tab updates
			window.dispatchEvent(new Event('portfolioClickerUpdate'));
		} catch (error) {
			console.error('Failed to save game data:', error);
		}
	}, []);

	// Auto-clicker effect
	useEffect(() => {
		if (gameData.autoClickerLevel > 0 && gameData.gameStarted) {
			intervalRef.current = setInterval(() => {
				setGameData(prev => {
					const autoXP = prev.autoClickerLevel * 2;
					const newData = {
						...prev,
						experience: prev.experience + autoXP,
						totalClicks: prev.totalClicks + 1
					};
					saveGameData(newData);
					return newData;
				});
			}, 2000);
		} else {
			clearInterval(intervalRef.current);
		}

		return () => clearInterval(intervalRef.current);
	}, [gameData.autoClickerLevel, gameData.gameStarted, saveGameData]);

	// Level up and constellation unlock
	useEffect(() => {
		const requiredXP = gameData.level * 150;
		if (gameData.experience >= requiredXP) {
			setGameData(prev => {
				const newLevel = prev.level + 1;
				const newSkillPoints = prev.skillPoints + 75;
				const newAchievements = new Set(prev.achievements);
				const newUnlockedConstellations = new Set(prev.unlockedConstellations);

				// Check for constellation unlocks
				constellations.forEach(constellation => {
					if (newLevel >= constellation.level && !prev.unlockedConstellations.has(constellation.id)) {
						newUnlockedConstellations.add(constellation.id);
					}
				});

				// Check if final constellation is unlocked
				if (newLevel >= 30 && !prev.unlockedConstellations.has('corona')) {
					setTimeout(() => {
						setShowFinalCelebration(true);
						createConfetti();
					}, 2000);
				}

				// Regular achievements
				if (newLevel >= 5) newAchievements.add('first-milestone');
				if (newLevel >= 10) newAchievements.add('experienced');
				if (newLevel >= 25) newAchievements.add('expert');
				if (prev.totalClicks >= 100) newAchievements.add('dedicated-clicker');
				if (prev.totalClicks >= 500) newAchievements.add('click-master');
				if (prev.totalClicks >= 1000) newAchievements.add('click-legend');
				if (prev.autoClickerLevel >= 5) newAchievements.add('automation-expert');
				if (prev.clickMultiplier >= 5) newAchievements.add('power-clicker');

				const newData = {
					...prev,
					level: newLevel,
					skillPoints: newSkillPoints,
					achievements: newAchievements,
					unlockedConstellations: newUnlockedConstellations
				};

				saveGameData(newData);
				return newData;
			});
		}
	}, [gameData.experience, gameData.level, gameData.totalClicks, gameData.autoClickerLevel, gameData.clickMultiplier, saveGameData, constellations]);

	// Create confetti effect
	const createConfetti = () => {
		const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
		const newConfetti = [];

		for (let i = 0; i < 100; i++) {
			newConfetti.push({
				id: i,
				x: Math.random() * window.innerWidth,
				y: -10,
				color: colors[Math.floor(Math.random() * colors.length)],
				rotation: Math.random() * 360,
				speed: Math.random() * 3 + 2,
				size: Math.random() * 8 + 4
			});
		}

		setConfettiParticles(newConfetti);

		setTimeout(() => {
			setConfettiParticles([]);
			setShowFinalCelebration(false);
		}, 5000);
	};

	// Handle background clicks
	const handleBackgroundClick = useCallback((e) => {
		if (e.target.closest('.game-ui, .glass-card, button, a, input, textarea, .glass-nav')) {
			return;
		}

		if (!gameData.gameStarted) {
			setGameData(prev => {
				const newData = { ...prev, gameStarted: true };
				saveGameData(newData);
				return newData;
			});
			setShowGameUI(true);
			setShowTip(false);
		}

		const xpGain = 15 * gameData.clickMultiplier;

		setGameData(prev => {
			const newData = {
				...prev,
				experience: prev.experience + xpGain,
				totalClicks: prev.totalClicks + 1
			};
			saveGameData(newData);
			return newData;
		});

		const newFloat = {
			id: Date.now(),
			x: e.clientX,
			y: e.clientY,
			xp: xpGain
		};

		setShowFloatingXP(prev => [...prev, newFloat]);

		setTimeout(() => {
			setShowFloatingXP(prev => prev.filter(f => f.id !== newFloat.id));
		}, 1500);
	}, [gameData.gameStarted, gameData.clickMultiplier, saveGameData]);

	useEffect(() => {
		document.addEventListener('click', handleBackgroundClick);
		return () => document.removeEventListener('click', handleBackgroundClick);
	}, [handleBackgroundClick]);

	const buyUpgrade = (upgrade) => {
		setGameData(prev => {
			let newData = { ...prev };

			switch (upgrade) {
				case 'autoClicker':
					if (prev.skillPoints >= 100) {
						newData = {
							...prev,
							skillPoints: prev.skillPoints - 100,
							autoClickerLevel: prev.autoClickerLevel + 1
						};
					}
					break;
				case 'multiplier':
					if (prev.skillPoints >= 200) {
						newData = {
							...prev,
							skillPoints: prev.skillPoints - 200,
							clickMultiplier: prev.clickMultiplier + 1
						};
					}
					break;
				default:
					// No action needed for unknown upgrade types
					break;
			}

			saveGameData(newData);
			return newData;
		});
	};

	const toggleGameUI = () => setShowGameUI(prev => !prev);

	const resetGame = () => {
		const initialData = {
			level: 1,
			experience: 0,
			totalClicks: 0,
			skillPoints: 0,
			clickMultiplier: 1,
			autoClickerLevel: 0,
			achievements: new Set(),
			gameStarted: false,
			unlockedConstellations: new Set()
		};
		setGameData(initialData);
		localStorage.removeItem('portfolioClickerData');
		setShowGameUI(false);
		setShowTip(true);
		window.dispatchEvent(new Event('portfolioClickerUpdate'));
	};

	return (
		<>
			{/* Confetti Effect */}
			{confettiParticles.map((confetti) => (
				<div
					key={confetti.id}
					className="fixed pointer-events-none z-50"
					style={{
						left: confetti.x,
						top: confetti.y,
						width: confetti.size,
						height: confetti.size,
						backgroundColor: confetti.color,
						transform: `rotate(${confetti.rotation}deg)`,
						animation: `fall 3s linear forwards`
					}}
				/>
			))}

			{/* Final Celebration Modal */}
			{showFinalCelebration && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="bg-gradient-to-r from-yellow-400/90 via-orange-500/90 to-red-500/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 text-center animate-pulse">
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

			{/* Floating XP */}
			{showFloatingXP.map(float => (
				<div
					key={float.id}
					className="fixed pointer-events-none text-green-400 font-bold text-lg animate-bounce z-40"
					style={{
						left: float.x - 25,
						top: float.y - 20,
						animation: 'floatUp 1.5s ease-out forwards'
					}}
				>
					+{float.xp} XP
				</div>
			))}

			{/* Tip for new users */}
			{showTip && !gameData.gameStarted && (
				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
					<div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-white/20 animate-pulse">
						<div className="text-center text-white">
							<Zap className="w-8 h-8 mx-auto mb-2" />
							<p className="text-lg font-semibold mb-1">Hidden Portfolio Game!</p>
							<p className="text-sm opacity-90">Click anywhere to start unlocking constellations</p>
						</div>
					</div>
				</div>
			)}

			{/* Game UI Toggle Button */}
			{gameData.gameStarted && (
				<button
					onClick={toggleGameUI}
					className="fixed top-4 right-4 z-40 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-white/30 game-ui"
				>
					<Trophy className="w-5 h-5 text-white" />
				</button>
			)}

			{/* Enhanced Game UI */}
			{showGameUI && gameData.gameStarted && (
				<div className="fixed top-4 left-4 z-40 space-y-4 game-ui max-h-screen overflow-y-auto">
					{/* Progress Bar */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20 min-w-80">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<Star className="w-4 h-4 text-yellow-400" />
								<span className="text-white font-semibold">Level {gameData.level}</span>
							</div>
							<div className="flex items-center gap-2">
								<Trophy className="w-4 h-4 text-purple-400" />
								<span className="text-white text-sm">{gameData.skillPoints} SP</span>
							</div>
						</div>

						<div className="bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
							<div
								className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
								style={{ width: `${((gameData.experience % (gameData.level * 150)) / (gameData.level * 150)) * 100}%` }}
							></div>
						</div>

						<div className="flex justify-between text-xs text-gray-300">
							<span>{gameData.experience % (gameData.level * 150)} / {gameData.level * 150} XP</span>
							<span>{gameData.totalClicks} clicks</span>
						</div>
					</div>

					{/* Constellations Progress */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20 min-w-80">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
							<Star className="w-4 h-4" />
							Constellations ({gameData.unlockedConstellations.size}/{constellations.length})
						</h3>

						<div className="space-y-2 max-h-32 overflow-y-auto">
							{constellations.map((constellation) => (
								<div
									key={constellation.id}
									className={`p-2 rounded text-xs transition-all ${gameData.unlockedConstellations.has(constellation.id)
											? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 text-yellow-200'
											: gameData.level >= constellation.level
												? 'bg-blue-500/20 border border-blue-400/50 text-blue-200'
												: 'bg-gray-700/50 text-gray-400 border border-gray-600/50'
										}`}
								>
									<div className="flex justify-between items-center">
										<span className="font-medium">{constellation.name}</span>
										<span className="text-xs opacity-75">Lvl {constellation.level}</span>
									</div>
									<div className="opacity-75 text-xs">{constellation.description}</div>
									{gameData.unlockedConstellations.has(constellation.id) && (
										<div className="text-xs mt-1" style={{ color: constellation.color }}>
											⭐ Unlocked & Glowing
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Upgrades */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20 min-w-80">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
							<TrendingUp className="w-4 h-4" />
							Upgrades
						</h3>

						<div className="space-y-2">
							<button
								onClick={() => buyUpgrade('autoClicker')}
								disabled={gameData.skillPoints < 100}
								className="w-full p-2 bg-blue-600/70 hover:bg-blue-600/90 disabled:bg-gray-600/50 disabled:opacity-50 rounded text-white text-left transition-colors text-sm"
							>
								<div className="font-medium">Auto-Clicker Lvl {gameData.autoClickerLevel + 1}</div>
								<div className="text-xs opacity-75">Cost: 100 SP • +{(gameData.autoClickerLevel + 1) * 2} XP/2s</div>
							</button>

							<button
								onClick={() => buyUpgrade('multiplier')}
								disabled={gameData.skillPoints < 200}
								className="w-full p-2 bg-purple-600/70 hover:bg-purple-600/90 disabled:bg-gray-600/50 disabled:opacity-50 rounded text-white text-left transition-colors text-sm"
							>
								<div className="font-medium">Click Power x{gameData.clickMultiplier + 1}</div>
								<div className="text-xs opacity-75">Cost: 200 SP • +{15 * (gameData.clickMultiplier + 1)} XP per click</div>
							</button>
						</div>
					</div>

					{/* Achievements */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20 min-w-80">
						<h3 className="text-white font-semibold mb-3 flex items-center gap-2">
							<Trophy className="w-4 h-4" />
							Achievements ({gameData.achievements.size}/{achievementList.length})
						</h3>

						<div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
							{achievementList.map((achievement) => (
								<div
									key={achievement.id}
									className={`p-2 rounded text-xs transition-all ${gameData.achievements.has(achievement.id)
											? 'bg-yellow-500/20 border border-yellow-400/50 text-yellow-200'
											: 'bg-gray-700/50 text-gray-400 border border-gray-600/50'
										}`}
								>
									<div className="flex items-center gap-1 mb-1">
										<span className="text-sm">{achievement.icon}</span>
										<span className="font-medium truncate">{achievement.name}</span>
									</div>
									<div className="opacity-75 truncate">{achievement.description}</div>
								</div>
							))}
						</div>
					</div>

					{/* Controls */}
					<div className="bg-black/30 backdrop-blur-md rounded-lg p-3 shadow-lg border border-white/20 min-w-80">
						<div className="flex gap-2">
							<button
								onClick={toggleGameUI}
								className="flex-1 bg-gray-600/70 hover:bg-gray-600/90 text-white px-3 py-1 rounded text-sm transition-colors"
							>
								Hide
							</button>
							<button
								onClick={resetGame}
								className="bg-red-600/70 hover:bg-red-600/90 text-white px-3 py-1 rounded text-sm transition-colors"
							>
								Reset
							</button>
						</div>
					</div>
				</div>
			)}

			<style jsx>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(-50px); }
        }
        
        @keyframes fall {
          to { transform: translateY(100vh) rotate(720deg); }
        }
      `}</style>
		</>
	);
};

export default ConstellationClickerOverlay;