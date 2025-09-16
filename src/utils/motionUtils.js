// src/utils/motionUtils.js
// This file provides fallbacks in case Framer Motion isn't available
import React from 'react';

// Try to import Framer Motion, but provide fallbacks if it fails
let motion, AnimatePresence;

try {
	// Attempt to import Framer Motion
	const framerMotion = require('framer-motion');
	motion = framerMotion.motion;
	AnimatePresence = framerMotion.AnimatePresence;
} catch (error) {
	// If Framer Motion isn't available, create fallback components
	console.warn('Framer Motion not available, using fallback components');

	// Create a proxy object that returns the original component
	// This allows us to use motion.div, motion.button, etc. without errors
	motion = new Proxy({}, {
		get: (_, prop) => {
			return React.forwardRef((props, ref) => {
				const { initial, animate, exit, transition, whileHover, whileTap, ...otherProps } = props;
				return React.createElement(prop, { ...otherProps, ref });
			});
		}
	});

	// Create a simple AnimatePresence component that just renders its children
	AnimatePresence = ({ children }) => children;
}

export { motion, AnimatePresence };