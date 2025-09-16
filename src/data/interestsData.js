// src/data/interestsData.js
// This file contains data for the Interests & Hobbies section

const interestsData = [
	{
		id: 'travel',
		title: 'Travel',
		description: 'Exploring new cultures and destinations around the world. I love immersing myself in different environments, trying local cuisines, and learning about diverse traditions.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
		images: [
			{
				src: '/images/interests/travel-1.jpeg',
				alt: 'Niagra Falls, Canada',
				caption: 'Niagra Falls, Canada'
			},
			{
				src: '/images/interests/travel-2.jpeg',
				alt: 'Boat at Niagra Falls',
				caption: 'Maid of the Mist, Niagra Falls, Canada'
			},
			{
				src: '/images/interests/travel-3.jpeg',
				alt: 'Lake in New Hampshire',
				caption: 'Wellington State Park, New Hampshire, USA'
			}
		],
		// Example of YouTube video embedding
		youtubeVideos: [
			{
				type: 'youtube',
				id: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
				alt: 'Travel highlights video',
				caption: 'Highlights from my Thailand trip'
			}
		]
	},
	{
		id: 'pets',
		title: 'My Dog',
		description: 'Adventures with my furry best friend. We enjoy hiking trails, playing fetch in the park, and learning new tricks together.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
		images: [
			{
				src: '/images/interests/dog-1.jpeg',
				alt: 'Dog playing at the park',
				caption: 'Weekend at the dog park'
			},
			{
				src: '/images/interests/dog-2.jpg',
				alt: 'Dog sleeping',
				caption: 'Nap time'
			}
		],
		// You can have both local videos and YouTube videos
		videos: [
			{
				src: '/videos/interests/dog-tricks.mp4',
				alt: 'Dog doing tricks',
				caption: 'Learning new tricks',
				poster: '/images/interests/dog-video-poster.jpg'
			}
		],
		youtubeVideos: [
			{
				type: 'youtube',
				id: 'yrOkzDGHN2c', // Replace with your actual YouTube video ID
				alt: 'Funny dog moments',
				caption: 'Compilation of funny moments'
			}
		]
	},
	{
		id: 'photography',
		title: 'Photography',
		description: 'Capturing moments and perspectives through the lens. I particularly enjoy urban landscapes, nature close-ups, and candid street photography.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		),
		images: [
			{
				src: '/images/interests/photo-1.jpg',
				alt: 'Urban photography',
				caption: 'Urban landscapes at dusk'
			},
			{
				src: '/images/interests/photo-2.jpg',
				alt: 'Nature close-up',
				caption: 'Macro photography in nature'
			},
			{
				src: '/images/interests/photo-3.jpg',
				alt: 'Street photography',
				caption: 'Street life in New York City'
			}
		],
		youtubeVideos: [
			{
				type: 'youtube',
				id: 'JHdXqDn5a-Y', // Replace with your actual YouTube video ID
				alt: 'Photography tutorial',
				caption: 'My photography process'
			}
		]
	},
	{
		id: 'cooking',
		title: 'Cooking',
		description: 'Experimenting with flavors and cuisines from around the world. I enjoy making everything from scratch and hosting dinner parties for friends.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
		images: [
			{
				src: '/images/interests/cooking-1.jpg',
				alt: 'Homemade pasta',
				caption: 'Homemade pasta from scratch'
			},
			{
				src: '/images/interests/cooking-2.jpg',
				alt: 'Baking bread',
				caption: 'Sourdough bread experiments'
			}
		],
		youtubeVideos: [
			{
				type: 'youtube',
				id: 'C3G6JnhSY1A', // Replace with your actual YouTube video ID
				alt: 'Cooking demonstration',
				caption: 'Making homemade pizza'
			}
		]
	},
	{
		id: 'reading',
		title: 'Reading',
		description: 'I love diving into books across various genres including science fiction, philosophy, and technical literature. Books help me gain new perspectives and insights.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
		images: [
			{
				src: '/images/interests/book-1.jpg',
				alt: 'Book collection',
				caption: 'Part of my home library'
			}
		],
		youtubeVideos: [
			{
				type: 'youtube',
				id: 'sW5_9H-1lQU', // Replace with your actual YouTube video ID
				alt: 'Book review',
				caption: 'My thoughts on recent sci-fi books'
			}
		]
	},
	{
		id: 'hiking',
		title: 'Hiking',
		description: 'Getting out into nature and exploring trails helps me disconnect and recharge. I try to discover new hiking spots whenever I travel.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
			</svg>
		),
		images: [
			{
				src: '/images/interests/hiking-1.jpg',
				alt: 'Mountain trail',
				caption: 'Summit view at White Mountains, NH'
			},
			{
				src: '/images/interests/hiking-2.jpg',
				alt: 'Forest trail',
				caption: 'Morning hike through Middlesex Fells'
			}
		],
		youtubeVideos: [
			{
				type: 'youtube',
				id: 'ivWalbc17sQ', // Replace with your actual YouTube video ID
				alt: 'Hiking trail',
				caption: 'Hiking the Appalachian Trail'
			}
		]
	}
];

export default interestsData;