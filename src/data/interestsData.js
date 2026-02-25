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
				src: '/images/interests/NewYork-1.jpeg',
				alt: 'New York City skyline',
				caption: 'New York City skyline at night'
			},
			{
				src: '/images/interests/travel-1.jpeg',
				alt: 'Niagra Falls, Canada',
				caption: 'Niagra Falls, Canada'
			},
			{
				src: '/images/interests/travel-3.jpeg',
				alt: 'Lake in New Hampshire',
				caption: 'Wellington State Park, New Hampshire, USA'
			},
		],
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
				src: '/images/interests/Fido-nap.jpeg',
				alt: 'Dog sleeping',
				caption: 'Nap time'
			}
		],
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
				src: '/images/interests/Shakshuka.jpeg',
				alt: 'Shakshuka dish',
				caption: 'Homemade Shakshuka'
			},
			{
				src: '/images/interests/MushroomLasagna.jpeg',
				alt: 'Mushroom lasagna',
				caption: 'Mushroom lasagna with homemade sauce'
			}
		],
	},
];

export default interestsData;